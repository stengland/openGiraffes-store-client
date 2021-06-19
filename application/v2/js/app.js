define(["vue", "js/components/index"], (Vue) => {
    let PageId = 1;
    const createPageId = () => {
        return PageId++;
    };
    let Pages = [];
    let App = {};
    App.startPage = (location) => {
        let name = location.name;
        require([`page/${name}`], (page) => {
            page(location.params || {});
        })
    };
    App.Page = (options) => {
        let extend = Vue.extend({
            methods: {
                close() {
                    let pageId = this.$el.id;
                    this.$destroy();
                    $("#" + pageId).remove();
                },
                startPage: App.startPage,
            }
        });
        let vue = new extend(options);
        vue.$mount();
        let pageId = "_Page_" + createPageId();
        vue.$el.id = pageId;
        $("#app").append(vue.$el);
        // Pages.push({ id: pageId, vue: vue, });
    };

    App.closePage = (vue) => {
        let findIndex = Pages.findIndex((o) => o.id == pageId);
        if (findIndex == -1) {
            return;
        }
        let page = Pages.splice(findIndex, 1)[0];
        page.vue.$destroy();
        $("#" + pageId).remove();
    };
    return App;
});
