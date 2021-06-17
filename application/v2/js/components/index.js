define(["vue"], function (Vue) {
    Vue.component("navigation-bar", {
        props: {
            options: {
                default: () => {
                    return {}
                },
            }
        },
        data() {
            return {
                mEventAdded: false,
                mKeyEvents: [],
            }
        },
        template: `
            <div class="NavigationBar" @keydown="onKeyDown">
                <div class="Left button" @click="onClick_Left">{{left.text}}</div>
                <div class="Center button" @click="onClick_Center">{{center.text}}</div>
                <div class="Right button" @click="onClick_Right">{{right.text}}</div>
            </div>
        `,
        computed: {
            left() {
                return this.item(this.options.left);
            },
            center() {
                return this.item(this.options.center);
            },
            right() {
                return this.item(this.options.right);
            },
        },
        methods: {
            addEventListener() {
                if (this.mEventAdded) {
                    return;
                }
                document.addEventListener("keydown", this.onKeyDown);
                document.addEventListener("keyup", this.onKeyUp);
                this.mEventAdded = true;
            },
            removeEventListener() {
                if (!this.mEventAdded) {
                    return;
                }
                this.mKeyEvents.forEach(o => {
                    clearTimeout(o.timer);
                })
                this.mKeyEvents = [];
                document.removeEventListener("keydown", this.onKeyDown);
                document.removeEventListener("keyup", this.onKeyUp);
                this.mEventAdded = false;
            },
            item(key) {
                if (!key) {
                    return {}
                }
                return typeof key === "string" ? {
                    text: key,
                } : key
            },
            onKeyDown(e) {
                if (!e.repeat) {
                    let t = setTimeout(() => {
                        clearTimeout(t);
                        this.mKeyEvents.splice(this.mKeyEvents.findIndex(o => o.key == e.key), 1)
                        this.on("keyLongPress", {
                            key: e.key
                        });
                    }, 500);
                    this.mKeyEvents.push({
                        key: e.key,
                        timer: t,
                    })
                }
                this.on("keyDown", e);
            },
            onKeyUp(e) {
                this.on("keyUp", e);
                let key = this.mKeyEvents.splice(this.mKeyEvents.findIndex(o => o.key == e.key), 1);
                if (key.length) {
                    clearTimeout(key[0].timer);
                    this.on("keyPress", {
                        key: e.key
                    });
                }
            },
            on(eventType, e) {
                let event = this.options.on && this.options.on[eventType];
                if (!event) {
                    return;
                }
                switch (e.key) {
                    case "SoftLeft":
                    case "F1":
                        event.softLeft && event.softLeft();
                        break;
                    case "Enter":
                        event.enter && event.enter();
                        break;
                    case "SoftRight":
                    case "F2":
                        event.softRight && event.softRight();
                        break;
                    case "ArrowUp":
                        event.arrowUp && event.arrowUp();
                        break;
                    case "ArrowDown":
                        event.arrowDown && event.arrowDown();
                        break;
                    case "ArrowLeft":
                        event.arrowLeft && event.arrowLeft();
                        break;
                    case "ArrowRight":
                        event.arrowRight && event.arrowRight();
                        break;
                    default:
                        if (e.key in event) {
                            event[e.key]();
                        }
                        break
                }
            },
            onClick_Left() {
                this.options.on && this.options.on.keyPress && this.options.on.keyPress.softLeft && this.options.on.keyPress.softLeft();
            },
            onClick_Center() {
                this.options.on && this.options.on.keyPress && this.options.on.keyPress.center && this.options.on.keyPress.center();
            },
            onClick_Right() {
                this.options.on && this.options.on.keyPress && this.options.on.keyPress.softRight && this.options.on.keyPress.softRight();
            }
        }
    })

    Vue.component("tool-bar", {
        props: {
            title: {}
        },
        data() {
            return {}
        },
        template: `
            <div class="ToolBar flex-h middle">
                <div class="Title">{{title}}</div>
            </div>
        `,
        computed: {},
        methods: {}
    })


    const deepObjectMerge = (FirstOBJ, SecondOBJ)  => { // 深度合并对象
        for (var key in SecondOBJ) {
            FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
                deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
        }
        return FirstOBJ;
    }

    Vue.component("page", {
        props: {
            options: {}
        },
        data() {
            return {}
        },
        template: `
            <div class="Page flex-v wh-100">
                <slot name="root"></slot>
                <div class="Content flex-v" :style="style_Content">
                    <slot></slot>
                </div>
                <div v-show="mOptions.statusBar.show" class="StatusBar w-100"
                    :style="style_StatusBar"></div>
                <tool-bar v-show="mOptions.toolBar.show" class="ToolBar w-100"
                    :title="mOptions.toolBar.title" :style="style_ToolBar"></tool-bar>
                <navigation-bar v-show="mOptions.navigationBar.show" class="NavigationBar w-100"
                    :options="mOptions.navigationBar.options" :style="style_NavigationBar"></navigation-bar>
            </div>
        `,
        computed: {
            mOptions() {
                return deepObjectMerge({
                    statusBar: {
                        show: true,
                        padding: true,
                    },
                    toolBar: {
                        show: true,
                        title: "",
                        padding: true,
                    },
                    navigationBar: {
                        show: false,
                        padding: true,
                    }
                }, this.options);
            },
            style_Content() {
                return {
                    top: ((this.mOptions.statusBar.show && this.mOptions.statusBar.padding ? App.R.dimen.statusBarHeight : 0)
                        + (this.mOptions.toolBar.show && this.mOptions.toolBar.padding ? App.R.dimen.toolBarHeight : 0)) + "px",
                    bottom: (this.mOptions.navigationBar.show && this.mOptions.navigationBar.padding ? App.R.dimen.navigationBarHeight : 0) + "px",
                }
            },
            style_StatusBar() {
                return {
                    backgroundColor: this.mOptions.statusBar && this.mOptions.statusBar.backgroundColor,
                }
            },
            style_ToolBar() {
                return {
                    backgroundColor: this.mOptions.toolBar && this.mOptions.toolBar.backgroundColor,
                }
            },
            style_NavigationBar() {
                return {
                    backgroundColor: this.mOptions.navigationBar && this.mOptions.navigationBar.backgroundColor,
                }
            },
        },
        methods: {}
    })
});