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
                }, params.id);
            },
            mounted() {

            },
            methods: {
                createPageOptions() {
                    let context = this;
                    return {
                        toolBar: {
                            title: "关于",
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                right: "返回",
                                center: "确定",
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            this.close();
                                        },
                                        enter: () => {
                                            console.log("enter");
                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            }
        });
    }
});