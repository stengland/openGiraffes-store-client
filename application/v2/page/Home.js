
define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                    tabs: [],
                    tab: null,
                    items: [],
                    item: null,
                    focusType: null,
                    updateTime: null,
                    contributors: null,
                }
            },
            render(h) {
                return h("page", {
                    props: {
                        options: this.pageOptions,
                    },
                }, [
                    h("div", {
                        class: "Search flex-h",
                        attrs: { focusable: true, },
                        on: {
                            onFocus: () => {
                                this.focusType = "Search";
                            },
                        }
                    }, "搜索"),
                    h("div", {
                        class: "Tabs flex-h middle scroll-x", ref: "Tabs",
                        attrs: { focusable: true, },
                        on: {
                            onFocus: () => {
                                this.$refs.Tab && focusable.requestFocus(this.$refs.Tab[this.tab]);
                            }
                        }
                    }, this.tabs.map((item, index) => {
                        return h("div", {
                            class: "Item flex-h middle center", refInFor: true, ref: "Tab",
                            attrs: { selected: index == this.tab, focusable: true, },
                            on: {
                                onFocus: () => {
                                    this.tab = index;
                                    this.focusType = "Tabs";
                                }
                            }
                        }, [
                            h("div", { class: "Name" }, item.name)
                        ]);
                    })),
                    h("div", { class: "Items flex-1 flex-v scroll-y", ref: "Items" }, this.items.map((item, index) => {
                        return h("div", {
                            class: "Item flex-h middle",
                            attrs: { selected: index == this.item, focusable: true, },
                            on: {
                                onFocus: () => {
                                    this.item = index;
                                    this.focusType = "Items";
                                },
                            }
                        }, [
                            h("img", { class: "Icon", domProps: { src: item.icon } }),
                            h("div", { class: "Right flex-v flex-1", }, [
                                h("div", { class: "Title ellipsis", }, item.name),
                                h("div", { class: "Info ellipsis", }, item.tags),
                                h("div", { class: "Subtitle ellipsis", }, item.description),
                            ])
                        ])
                    }))
                ]);
            },
            mounted() {
                this.loadData();
            },
            watch: {
                tab(value) {
                    this.items = this.tabs[value].apps;
                },
                focusType(value) {
                    switch (value) {
                        case "Tabs":
                            focusable.scrollEl = this.$refs.Tabs;
                            break;
                        case "Items":
                            focusable.scrollEl = this.$refs.Items;
                            break;
                    }
                }
            },
            methods: {
                onStart() {
                    this.themeLight();
                },
                createPageOptions() {
                    let context = this;
                    return {
                        statusBar: {
                            backgroundColor: "white",
                        },
                        toolBar: {
                            show: false,
                            title: "主页",
                        },
                        navigationBar: {
                            show: true,
                            options: {
                                right: "关于",
                                get center() {
                                    switch (context.focusType) {
                                        case "Search":
                                            return "搜索"
                                        case "Items":
                                            return "选择"
                                    }
                                },
                                on: {
                                    keyPress: {
                                        softRight: () => {
                                            App.startPage({
                                                name: "About",
                                                params: {
                                                    updateTime: this.updateTime,
                                                    contributors: this.contributors,
                                                },
                                            });
                                        },
                                        enter: () => {
                                        }
                                    }
                                }
                            },
                        }
                    }
                },
                loadData() {
                    let contributors = [];

                    let data = BackendApi.getData();
                    let apps = data.apps;
                    apps = apps.map((item) => {
                        let item_author = item.author.toString();
                        let just_author_name = item_author.split("<")[0].trim();
                        if (contributors.indexOf(just_author_name) == -1) {
                            contributors.push(just_author_name);
                        }
                        return {
                            icon: item.icon,
                            name: item.name,
                            description: item.description,
                            tags: item.meta.tags || "",
                            categories: item.meta && item.meta.categories || [],
                        }
                    });
                    let categories = data.categories;
                    categories = Object.keys(categories).map((key) => {
                        let item = categories[key];
                        let name = item.locales && item.locales.length && item.locales.find(o => o["zh-CN"]);
                        if (name) {
                            name = name["zh-CN"];
                        }
                        return {
                            name: name || item.name,
                            id: key,
                            apps: [],
                        }
                    });
                    let unkown = {
                        name: "无分类",
                        id: "unkown",
                        apps: [],
                    };
                    apps.forEach(item => {
                        if (item.categories.length) {
                            item.categories.forEach(category => {
                                let findIndex = categories.findIndex(o => o.id == category);
                                if (findIndex != -1) {
                                    categories[findIndex].apps.push(item);
                                }
                            });
                        } else {
                            unkown.apps.push(item);
                        }
                    });
                    categories.push(unkown);
                    this.tabs = categories.filter(o => o.apps.length);
                    if (this.tabs.length) {
                        this.tab = 0;
                        this.$nextTick(() => {
                            this.requestFocus(this.$refs.Tabs);
                        })
                    }

                    this.updateTime = new Date(data.generated_at).format("yyyy-MM-dd HH:mm");
                    //unique author list
                    this.contributors = contributors.sort().join(", ");
                }
            }
        })
    }
});