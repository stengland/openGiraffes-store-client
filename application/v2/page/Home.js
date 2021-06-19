define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    aaa: "bbb",
                    mPageOptions: this.createPageOptions(),
                }
            },
            render(h) {
                return h("page", {
                    props: {
                        options: this.mPageOptions,
                    }
                }, this.aaa);
            },
            mounted() {

            },
            methods: {
                createPageOptions() {
                    let context = this;
                    return {
                        toolBar: {
                            title: "主页",
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                right: "返回",
                                center: "确定",
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            console.log("back");
                                            // this.$destroy();
                                            // App.closePage(params.pageId);
                                            // context.back();
                                        },
                                        enter: () => {
                                            console.log("enter");
                                            App.startPage({ name: "About", params: { id: "000001" } });
                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            }
        })
    }
});