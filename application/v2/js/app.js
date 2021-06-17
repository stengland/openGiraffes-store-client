define(["vue","js/components/index"],(Vue) => {
    let App = {};
    App.Page = (pageId, options) => {
        let extend = Vue.extend({
            el: "#" + pageId,
        });
        let vue = new extend(options);
        Pages.find((o) => o.id == pageId).vue = vue;
    };
    return App;
});
