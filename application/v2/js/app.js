///<reference path="jquery.d.ts" />
///<reference path="vue/types/index.d.ts" />

const rgba_hex = (color, alpha = 1) => {
    let a = Math.floor(alpha * 255).toString(16);
    a.length == 1 && (a = "0" + a);
    return color + a;
}

window.App = {
    R: {
        dimen: {
            navigationBarHeight: 18,
            statusBarHeight: 26,
            toolBarHeight: 36,
        },
        color: {
            transparent: "transparent",
            primary: "#00aeff",
            primaryAlpha: function (alpha = 1) {
                return rgba_hex(this.primary, alpha);
            }
        }
    }
};

require.config({
    baseUrl: "./",
    paths: {
        "jquery": "../assets/js/jQuery-3.1.0",
        "text": "js/text",
        "vue": "js/vue/vue.min",
        "components": "js/components/index",
        "focusable": "js/focusable-core",
        "Home": "page/Home.html",
    }
});

const PageMap = {};
const Pages = [];

let Vue;

let PageId = 1;

const createPageId = () => {
    return PageId++;
}

require(["jquery", "vue", "components", "focusable", "text!Home"], (jquery, vue, components, focusable, Home) => {
    Vue = vue;
    initVue();
    addPage("Home", Home);
    startPage({
        name: "Home"
    });
})

const initVue = () => {

}

const addPage = (name, page) => {
    PageMap[name] = {
        content: page,
        style: null,
        script: null,
    };
}

const startPage = (location) => {
    let name = location.name;
    let page = $(PageMap[name].content);
    if (!PageMap[name].style) {
        let style = page[4];
        style.innerHTML = style.innerHTML.replace(new RegExp("\.page", "gm"), `.${name}.page`);
        $("head").append(style);
        PageMap[name].style = style;
    }
    let data = {
        pageId: "_Page_" + createPageId(),
    };
    let content = page[0];
    content.id = data.pageId;
    content.classList.add(name);
    $("#app").append(content);

    let script = page[2];
    script.innerHTML = script.innerHTML.replace(new RegExp("params;"), `params=${JSON.stringify(data)};`);
    Pages.push({
        id: data.pageId,
        page: page,
        vue: null,
    })
    $("head").append(script);
}

const closePage = (pageId) => {
    let findIndex = Pages.findIndex(o => o.id == pageId);
    if (findIndex == -1) {
        return;
    }
    let page = Pages.splice(findIndex, 1);
    // page.vue.$destroy();
    $("#app").remove(page.page);
}

App.startPage = startPage;
App.closePage = closePage;
App.Page = (pageId, options) => {
    let extend = Vue.extend({
        el: "#" + pageId
    });
    let vue = new extend(options);
    Pages.find(o => o.id == pageId).vue = vue;
}