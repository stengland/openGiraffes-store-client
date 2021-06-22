
define(["app"], (App) => {
    return (params) => {
        return App.Page({
            data() {
                return {
                    pageOptions: this.createPageOptions(),
                    apps: [],
                    tabs: [],
                    tab: null,
                    items: [],
                    item: null,
                    focusType: null,
                    updateTime: null,
                    contributors: null,
                    keyword: null,
                    searchResult: null,
                }
            },
            render(h) {
                return h("page", {
                    props: {
                        options: this.pageOptions,
                    },
                }, [
                    h("input", {
                        class: "Search flex-h", ref: "Search",
                        domProps: { "placeholder": "搜索", value: this.keyword, },
                        attrs: { focusable: true, },
                        on: {
                            input: (event) => {
                                this.keyword = event.target.value;
                            },
                            onFocus: () => {
                                this.focusType = "Search";
                                this.$refs.Search.focus();
                            },
                            onBlur: () => {
                                this.$refs.Search.blur();
                            },
                            click: () => {
                                this.onSearch();
                            }
                        }
                    }, "搜索"),
                    h("div", {
                        class: "Tabs flex-h middle scroll-x", ref: "Tabs",
                        directives: [{ name: "show", value: !this.searchResult }],
                        attrs: { focusable: true, },
                        on: {
                            onFocus: () => {
                                this.$refs.Tab && focusable.requestFocus(this.$refs.Tab[this.tab]);
                            },
                        }
                    }, this.tabs.map((item, index) => {
                        return h("div", {
                            class: "Item flex-h middle center", refInFor: true, ref: "Tab",
                            attrs: { selected: index == this.tab, focusable: true, },
                            on: {
                                onFocus: () => {
                                    this.tab = index;
                                    this.focusType = "Tabs";
                                },
                            }
                        }, [
                            h("div", { class: "Name" }, item.name)
                        ]);
                    })),
                    h("div", { class: "Items flex-1 flex-v scroll-y", ref: "Items" },
                        (this.searchResult ? this.searchResult : this.items).map((item, index) => {
                            return h("div", {
                                class: "Item flex-h middle",
                                attrs: { selected: index == this.item, focusable: true, },
                                on: {
                                    onFocus: () => {
                                        this.item = index;
                                        this.focusType = "Items";
                                    },
                                    left: () => {
                                        let el = this.$refs.Tab[this.tab - 1];
                                        el && focusable.requestFocus(el);
                                    },
                                    right: () => {
                                        let el = this.$refs.Tab[this.tab + 1];
                                        el && focusable.requestFocus(el);
                                    },
                                    click: () => {
                                        App.startPage({
                                            name: "AppDetails",
                                            params: {
                                                data: item.data,
                                            },
                                        });
                                    }
                                }
                            }, [
                                h("img", { class: "Icon", domProps: { src: item.icon,key:`Icon-${this.tab}-${index}` } }),
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
                                get left() {
                                    if (context.searchResult) {
                                        return "清空搜索";
                                    }
                                },
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
                                        softLeft: () => {
                                            if (this.searchResult) {
                                                this.clearSearch();
                                            }
                                        }
                                    }
                                }
                            },
                        }
                    }
                },
                loadData() {
                    BackendApi.update()
                        .then(() => {
                            this.loadData_Set();
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("数据获取失败");
                        });
                },
                loadData_Set() {
                    let contributors = [];

                    let data = BackendApi.getData();
                    // console.log(data);
                    let apps = data.apps;
                    apps = apps.map((item) => {
                        let item_author = item.author.toString();
                        let just_author_name = item_author.split("<")[0].trim();
                        if (contributors.indexOf(just_author_name) == -1) {
                            contributors.push(just_author_name);
                        }
                        return {
                            icon: item.icon,
                            name: item.name || "",
                            description: item.description || "",
                            tags: item.meta.tags || "",
                            categories: item.meta && item.meta.categories || [],
                            data: item,
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

                    this.apps = apps;
                },
                onSearch() {
                    if (this.keyword) {
                        let keyword = this.keyword.toLowerCase();
                        this.searchResult = this.apps.filter(o => {
                            return o.name.toLowerCase().includes(keyword)
                                || o.description.toLowerCase().includes(keyword)
                                || o.tags.toLowerCase().includes(keyword);
                        });
                    } else {
                        this.clearSearch();
                    }
                },
                clearSearch() {
                    this.searchResult = null;
                    this.keyword = null;
                }
            }
        })
    }
});