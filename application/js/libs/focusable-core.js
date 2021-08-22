var __extends = this && this.__extends || function () {
    var e = function (t, n) {
        return (e = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(t, n)
    };
    return function (t, n) {
        function o() {
            this.constructor = t
        }
        e(t, n), t.prototype = null === n ? Object.create(n) : (o.prototype = n.prototype, new o)
    }
}();
const defineFocusable = function (e) {
    Object.defineProperty(e, "__esModule", {
            value: !0
        }),
        function () {
            if ("function" == typeof window.CustomEvent) return !1;
            var e = function (e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var n = document.createEvent("CustomEvent");
                return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
            };
            e.prototype = window.Event.prototype, window.CustomEvent = e
        }();
    var t = {
            KEY_LEFT: [37, 21],
            KEY_UP: [38, 19],
            KEY_RIGHT: [39, 22],
            KEY_DOWN: [40, 20],
            KEY_ENTER: [13, 23]
        },
        n = {
            type: "left",
            event: new CustomEvent("left", {
                detail: {}
            })
        },
        o = {
            type: "right",
            event: new CustomEvent("right", {
                detail: {}
            })
        },
        l = {
            type: "up",
            event: new CustomEvent("up", {
                detail: {}
            })
        },
        i = {
            type: "down",
            event: new CustomEvent("down", {
                detail: {}
            })
        },
        s = 0,
        r = null,
        u = 0,
        c = function (e) {
            function c() {
                var c = null !== e && e.apply(this, arguments) || this;
                return c.focusKeyUpEvent = function (e) {
                    var t = window.event ? window.event.keyCode : e.which,
                        n = document.querySelectorAll("[focusable]");
                    if (n.length) {
                        var o = document.querySelectorAll("[focused]");
                        n = o.length ? o[o.length - 1] : n[0], -1 !== c._KEYS.KEY_ENTER.indexOf(t) && (clearTimeout(r), 0 === s && (c.preventDefault(e), n.click(), s = 0))
                    }
                    s = u = 0
                }, c.focusKeyDownEvent = function (e) {
                    var t = window.event ? window.event.keyCode : e.which,
                        f = document.querySelectorAll("[focusable]");
                    if (f.length) {
                        var a = document.querySelectorAll("[focused]"),
                            d = a.length ? a[a.length - 1] : f[0]; - 1 !== c._KEYS.KEY_ENTER.indexOf(t) ? 0 === u && (u = 1, r = setTimeout((function () {
                            s++, d.dispatchEvent(new CustomEvent("longPress", {
                                detail: {
                                    el: d
                                }
                            })), clearTimeout(r)
                        }), c._longPressTime)) : -1 !== c._KEYS.KEY_LEFT.indexOf(t) ? (c.preventDefault(e), c.keyEvent(n, d)) : -1 !== c._KEYS.KEY_UP.indexOf(t) ? (c.preventDefault(e), c.keyEvent(l, d)) : -1 !== c._KEYS.KEY_DOWN.indexOf(t) ? (c.preventDefault(e), c.keyEvent(i, d)) : -1 !== c._KEYS.KEY_RIGHT.indexOf(t) && (c.preventDefault(e), c.keyEvent(o, d))
                    }
                }, c.init = function (e) {
                    c._focusClassName = e.focusClassName || c._focusClassName, c._initDis = e.initDis || c._initDis, c._findFocusType = void 0 === e.findFocusType ? c._findFocusType : e.findFocusType, c._KEYS.KEY_UP = e.KEYS && e.KEYS.KEY_UP || c._KEYS.KEY_UP, c._KEYS.KEY_RIGHT = e.KEYS && e.KEYS.KEY_RIGHT || c._KEYS.KEY_RIGHT, c._KEYS.KEY_DOWN = e.KEYS && e.KEYS.KEY_DOWN || c._KEYS.KEY_DOWN, c._KEYS.KEY_LEFT = e.KEYS && e.KEYS.KEY_LEFT || c._KEYS.KEY_LEFT, c._KEYS.KEY_ENTER = e.KEYS && e.KEYS.KEY_ENTER || c._KEYS.KEY_ENTER, c._offsetDistance = void 0 === e.offsetDistance ? c._offsetDistance : e.offsetDistance, c._longPressTime = void 0 === e.longPressTime ? c._longPressTime : e.longPressTime, c._distanceToCenter = void 0 === e.distanceToCenter ? c._distanceToCenter : e.distanceToCenter
                }, c.requestFocus = function (e, t) {
                    if (void 0 === t && (t = !0), c.eventDisabled = c.eventDisabled ? "eventSkip" : "initSkip", !(e = e && e.length && e[0] || e)) throw Error("Element not found!");
                    if (null !== (e = e.$el || e).getAttribute("focused")) return !1;
                    for (var n = document.getElementsByClassName(c._focusClassName), o = 0; o < n.length; o++) c.removeOneClassName(n[o], c._focusClassName);
                    c.addAttrName(e, "focused"), "initSkip" === c.eventDisabled ? t ? c.doScroll(e, t) : setTimeout((function () {
                        c.doScroll(e, t)
                    }), 100) : c.doScroll(e, t)
                }, c.getElementByPath = c.getElementByPath, c.reset = function () {
                    c._KEYS = t, c._scrollEl = null, c._focusClassName = "focus", c._initDis = 20, c._findFocusType = 1, c._offsetDistance = 50, c._longPressTime = 500, c._distanceToCenter = !1, c._limitingEl = null
                }, c.resetFocusClassName = function () {
                    c._focusClassName = "focus"
                }, c.resetInitDis = function () {
                    c._initDis = 20
                }, c.resetFindFocusType = function () {
                    c._findFocusType = 1
                }, c.resetKEYS = function () {
                    c._KEYS = t
                }, c.resetTheDis = function () {
                    c._offsetDistance = 50
                }, c.resetOffsetDistance = function () {
                    c._offsetDistance = 50
                }, c.resetLongPressTime = function () {
                    c._longPressTime = 500
                }, c.resetDistanceToCenter = function () {
                    c._distanceToCenter = !1
                }, c.resetLimitingEl = function () {
                    c._limitingEl = null
                }, c.resetScrollEl = function () {
                    c._scrollEl = null
                }, c.setScrollEl = function (e) {
                    c._scrollEl = e || c._scrollEl
                }, c
            }
            return __extends(c, e), Object.defineProperty(c.prototype, "focusClassName", {
                get: function () {
                    return this._focusClassName
                },
                set: function (e) {
                    this._focusClassName = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "initDis", {
                get: function () {
                    return this._initDis
                },
                set: function (e) {
                    this._initDis = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "findFocusType", {
                get: function () {
                    return this._findFocusType
                },
                set: function (e) {
                    this._findFocusType = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "KEYS", {
                get: function () {
                    return this._KEYS
                },
                set: function (e) {
                    this._KEYS = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "offsetDistance", {
                get: function () {
                    return this._offsetDistance
                },
                set: function (e) {
                    this._offsetDistance = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "longPressTime", {
                get: function () {
                    return this._longPressTime
                },
                set: function (e) {
                    this._longPressTime = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "distanceToCenter", {
                get: function () {
                    return this._distanceToCenter
                },
                set: function (e) {
                    this._distanceToCenter = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "limitingEl", {
                get: function () {
                    return this._limitingEl
                },
                set: function (e) {
                    null !== e ? (Array.from(document.querySelectorAll("[focusable]")).forEach((function (e) {
                        e.setAttribute("focusdisable", ""), e.removeAttribute("focusable")
                    })), Array.from(e.querySelectorAll("[focusdisable]")).forEach((function (e) {
                        e.setAttribute("focusable", ""), e.removeAttribute("focusdisable")
                    }))) : (Array.from(document.querySelectorAll("[focusable]")).forEach((function (e) {
                        e.removeAttribute("focusdisable")
                    })), Array.from(document.querySelectorAll("[focusdisable]")).forEach((function (e) {
                        e.setAttribute("focusable", ""), e.removeAttribute("focusdisable")
                    }))), this._limitingEl = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(c.prototype, "scrollEl", {
                get: function () {
                    return this._scrollEl
                },
                set: function (e) {
                    this._scrollEl = e
                },
                enumerable: !0,
                configurable: !0
            }), c
        }(function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.keyEvent = function (e, n) {
                    t.eventDisabled = "event", n.dispatchEvent(e.event), n.dispatchEvent(new CustomEvent("onBlur", {
                        detail: {
                            el: n
                        }
                    })), "eventSkip" === t.eventDisabled ? t.eventDisabled = "" : t.setFocus(e.type)
                }, t.setFocus = function (e) {
                    var n = t.getNextFocusElement(e);
                    document.querySelector("focused"), null !== n && "none" !== window.getComputedStyle(n).display && t.parentShow(n) && null === n.getAttribute("focusdisable") && (n && t.addAttrName(n, "focused"), t.doScroll(n, !0, e))
                }, t.scrollFn = function (e, n, o, l) {
                    void 0 === o && (o = !0), t.Scroll2({
                        number: e,
                        time: o ? 200 : 0,
                        getNumFn: function () {
                            return "scrollTop" === n ? l ? l.scrollTop : document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset : "scrollLeft" === n ? l ? l.scrollLeft : document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset : void 0
                        },
                        setNumFn: function (e) {
                            "scrollTop" === n && (l ? l.scrollTop = e : document.body.scrollTop = document.documentElement.scrollTop = e), "scrollLeft" === n && (l ? l.scrollLeft = e : document.body.scrollLeft = document.documentElement.scrollLeft = e)
                        }
                    })
                }, t.doScroll = function (e, n, o) {
                    let l = t._scrollEl;
                    if ("left" == o || "right" == o) {
                        let t = e.parentElement;
                        t.classList.contains("scroll-x") && (l = t)
                    } else if ("up" == o || "down" == o) {
                        let t = e.parentElement;
                        t.classList.contains("scroll-y") && (l = t)
                    }
                    if (void 0 === n && (n = !0), e = e && e.length && e[0] || e, (!l || t.inNode(e, l)) && e) {
                        if (e = e.getBoundingClientRect(), l) {
                            var i = l.scrollTop,
                                s = l.scrollLeft,
                                r = l.getBoundingClientRect(),
                                u = r.height,
                                c = r.width,
                                f = e.left - r.left;
                            r = e.top - r.top
                        } else i = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset, s = document.body.scrollLeft || document.documentElement.scrollLeft || window.pageYOffset, c = document.documentElement.clientWidth || document.body.clientWidth, u = document.documentElement.clientHeight || document.body.clientHeight, f = e.left, r = e.top;
                        var a = c / 2,
                            d = u / 2,
                            m = f + e.width / 2,
                            E = r + e.height / 2;
                        t._distanceToCenter ? "down" === o || "up" === o ? t.scrollFn(E + i - d, "scrollTop", n, l) : "left" === o || "right" === o ? t.scrollFn(m + s - a, "scrollLeft", n, l) : e.top > e.left ? (t.scrollFn(m + s - a, "scrollLeft", n, l), t.scrollFn(E + i - d, "scrollTop", n, l)) : (t.scrollFn(E + i - d, "scrollTop", n, l), t.scrollFn(m + s - a, "scrollLeft", n, l)) : ((o = r + e.height) > u && (o = o - u + i + t._offsetDistance, t.scrollFn(o, "scrollTop", n, l)), 0 > r && (o = r + i - t._offsetDistance, t.scrollFn(o, "scrollTop", n, l)), (o = f + e.width) > c && (o = o - c + s + t._offsetDistance, t.scrollFn(o, "scrollLeft", n, l)), 0 > f && (o = f + s - t._offsetDistance, t.scrollFn(o, "scrollLeft", n, l)))
                    }
                }, t.calLineEl = function (e, t, n, o, l, i, s) {
                    return 1 !== i && (i = 0, "up" === e || "down" === e ? i = t : "right" !== e && "left" !== e || (i = n), i <= s && ((e = Math.min(t + n, o.dis)) != o.dis && (o.dis = e, o.el = l)), o)
                }, t.getNextFocusElement = function (e) {
                    var n = document.querySelectorAll("[focusable]"),
                        o = document.querySelectorAll("[focused]");
                    if (!n || !n.length) return null;
                    var l = null,
                        i = Number.MAX_VALUE,
                        s = Number.MAX_VALUE,
                        r = {
                            el: null,
                            dis: Number.MAX_VALUE,
                            absDis: Number.MAX_VALUE
                        };
                    if (!o.length) return o = n[0], t.addAttrName(o, "focused"), o;
                    var u = (o = o[o.length - 1]).getBoundingClientRect(),
                        c = (u.width - o.offsetWidth) / 2,
                        f = (u.height - o.offsetHeight) / 2,
                        a = o = 0,
                        d = 0,
                        m = 0,
                        E = [u.top + f, u.right - c, u.bottom - f, u.left + c];
                    for ("up" === e && (o = u.left + u.width / 2, a = Math.round(u.bottom - f), d = u.left + c, m = u.left + u.width - c), "right" === e && (a = u.top + u.height / 2, o = Math.round(u.left + c), d = u.top + f, m = u.top + u.height - f), "down" === e && (o = u.left + u.width / 2, a = Math.round(u.top + f), d = u.left + c, m = u.left + u.width - c), "left" === e && (a = u.top + u.height / 2, o = Math.round(u.right - c), d = u.top + f, m = u.top + u.height - f), u = !1, c = 0; c < n.length; c++) {
                        var h = (f = n[c]).getBoundingClientRect(),
                            p = 0,
                            _ = 0,
                            g = 0,
                            v = 0;
                        if (document.querySelector("." + t._focusClassName) !== f) {
                            if ("up" === e) {
                                if (_ = h.top + h.height, (h.right < E[3] || h.left > E[1]) && h.bottom > E[0]) continue;
                                if (Math.round(_) >= a) continue;
                                p = h.left + h.width / 2, g = h.left, v = h.left + h.width
                            } else if ("right" === e) {
                                if (p = h.left, (h.bottom < E[0] || h.top > E[2]) && h.left < E[1]) continue;
                                if (Math.round(p) <= o) continue;
                                _ = h.top + h.height / 2, g = h.top, v = h.top + h.height
                            } else if ("down" === e) {
                                if (_ = h.top, (h.right < E[3] || h.left > E[1]) && h.top < E[2]) continue;
                                if (Math.round(_) <= a) continue;
                                p = h.left + h.width / 2, g = h.left, v = h.left + h.width
                            } else if ("left" === e) {
                                if (p = h.left + h.width, (h.bottom < E[0] || h.top > E[2]) && h.right > E[3]) continue;
                                if (Math.round(p) >= o) continue;
                                _ = h.top + h.height / 2, g = h.top, v = h.top + h.height
                            }
                            h = Math.abs(o - p), _ = Math.abs(a - _), t.calLineEl(e, h, _, r, f, t._findFocusType, t._initDis), d <= v && m >= g ? (u = !0, g = 0, "up" === e || "down" === e ? g = _ : "right" !== e && "left" !== e || (g = h), s === g ? (g = Math.min(Math.sqrt(h * h + _ * _), i)) != i && (i = g, l = f) : (g = Math.min(s, g)) != s && (s = g, i = Math.min(Math.sqrt(h * h + _ * _), i), l = f)) : u || (g = Math.min(Math.sqrt(h * h + _ * _), i)) != i && (i = g, l = f)
                        }
                    }
                    return 1 === t._findFocusType ? l : r.el || l
                }, t
            }
            return __extends(t, e), t
        }(function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.hasClass = function (e, t) {
                    return e.classList.contains(t)
                }, t.toggleClass = function (e, t) {
                    return e.classList.toggle(t)
                }, t.getParentTag = function (e, n) {
                    return void 0 === n && (n = []), e instanceof HTMLElement ? "BODY" !== e.parentElement.nodeName ? (n.push(e.parentElement), t.getParentTag(e.parentElement, n)) : n : void 0
                }, t.parentShow = function (e) {
                    return 0 === t.getParentTag(e).filter((function (e) {
                        return "none" === window.getComputedStyle(e).display
                    })).length
                }, t.removeOneClassName = function (e, n) {
                    e && t.hasClass(e, n) && t.toggleClass(e, n)
                }, t.getElementByPath = function (e) {
                    return document.evaluate(e, document).iterateNext()
                }, t.getElementsByPath = function (e) {
                    var t = [],
                        n = (e = document.evaluate(e, document, null, XPathResult.ANY_TYPE, null)).iterateNext();
                    for (n && t.push(n); n;)(n = e.iterateNext()) && t.push(n);
                    return t
                }, t.addClassName = function (e, n) {
                    e && t.toggleClass(e, n)
                }, t.addAttrName = function (e, n) {
                    t.focusOriginalEl !== e && (t.focusOriginalSize = e.getBoundingClientRect(), t.focusOriginalEl = e);
                    var o = document.querySelector("[focused]");
                    o && (o.removeAttribute(n), t.removeOneClassName(o, t._focusClassName)), e.setAttribute(n, ""), "focused" === n && (t.addClassName(e, t._focusClassName), e.dispatchEvent(new CustomEvent("onFocus", {
                        detail: {
                            el: e
                        }
                    })))
                }, t.inNode = function (e, t) {
                    return t !== e && t.contains(e)
                }, t.preventDefault = function (e) {
                    (e = e || window.event).preventDefault && e.preventDefault(), e.returnValue = !1
                }, t.onEvent = function (e, t, n) {
                    return e.dispatchEvent(new CustomEvent(t, {
                        detail: n
                    }))
                }, t.offEvent = function (e, t, n, o) {
                    return void 0 === o && (o = !1), e.removeEventListener(t, n, o)
                }, t
            }
            return __extends(t, e), t.prototype.Scroll2 = function (e) {
                var t = this;
                if (!e.time) return e.setNumFn && e.setNumFn(e.number), e.number;
                null != this.scrollTimer && (clearInterval(this.scrollTimer), this.lastOpt.setNumFn && this.lastOpt.setNumFn(this.lastOpt.number)), this.lastOpt = e;
                var n = e.time / 20,
                    o = 0;
                e.getNumFn && (o = e.getNumFn());
                var l = (e.number - o) / n;
                this.scrollTimer = setInterval((function () {
                    0 < n ? (n--, t.Scroll2({
                        number: o += l,
                        getNumFn: e.getNumFn,
                        setNumFn: e.setNumFn
                    })) : (clearInterval(t.scrollTimer), t.scrollTimer = null, t.lastOpt = null)
                }), 20)
            }, t
        }((function () {
            this._KEYS = t, this._scrollEl = null, this._focusClassName = "focus", this._initDis = 20, this._findFocusType = 1, this._offsetDistance = 50, this._longPressTime = 500, this._limitingEl = null, this._distanceToCenter = !1, this.eventDisabled = "", this.focusOriginalEl = this.focusOriginalSize = this.lastOpt = this.scrollTimer = null
        }))));
    e.default = new c
};
let _focusable = {};
defineFocusable(_focusable);
const focusable = _focusable.default;
document.removeEventListener("keydown", focusable.focusKeyDownEvent, !1), document.addEventListener("keydown", focusable.focusKeyDownEvent), document.removeEventListener("keyup", focusable.focusKeyUpEvent, !1), document.addEventListener("keyup", focusable.focusKeyUpEvent);