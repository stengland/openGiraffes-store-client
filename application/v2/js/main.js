///<reference path="jquery.d.ts" />
///<reference path="vue/types/index.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        jquery: "../assets/js/jQuery-3.1.0",
        text: "js/text",
        R: "js/R",
        vue: "js/vue/index",
        app: "js/app",
        Home: "page/Home.html",
        About: "page/About.html",
    },
});

const PageMap = {};
const Pages = [];

let PageId = 1;

const createPageId = () => {
    return PageId++;
};

require(["jquery", "text!Home", "text!About"], (jquery, Home, About) => {
    addPage("Home", Home);
    addPage("About", About);
    startPage({
        name: "Home",
    });
});

const addPage = (name, page) => {
    PageMap[name] = {
        content: page,
        style: null,
        script: null,
    };
};

const startPage = (location) => {
    let name = location.name;
    let page = $(PageMap[name].content);
    if (!PageMap[name].style) {
        let style = page[4];
        style.innerHTML = style.innerHTML.replace(new RegExp(".page", "gm"), `.${name}.page`);
        $("head").append(style);
        PageMap[name].style = style;
    }
    let data = {
        pageId: "_Page_" + createPageId(),
    };
    let content = page.get(0);
    content.id = data.pageId;
    content.classList.add(name);
    $("#app").append(content);

    let script = page.get(2);
    script.id = data.pageId + "_Script";
    script.innerHTML = script.innerHTML.replace(new RegExp("params;"), `params=${JSON.stringify(data)};`);
    Pages.push({
        id: data.pageId,
        vue: null,
    });
    $("head").append(script);
};

const closePage = (pageId) => {
    let findIndex = Pages.findIndex((o) => o.id == pageId);
    if (findIndex == -1) {
        return;
    }
    let page = Pages.splice(findIndex, 1)[0];
    page.vue.$destroy();
    $("#" + pageId + "_Script").remove();
    $("#" + pageId).remove();
};

require(["app"], (App) => {
    App.startPage = startPage;
    App.closePage = closePage;
});
