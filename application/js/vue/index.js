define(["js/vue/vue.runtime.min"], (Vue) => {
  const keep = (el) => {
    let attr = el.getAttribute("data-vue-keep-scroll");
    if (!attr) {
      return;
    }
    let scroll = attr.split("-");
    if (!scroll) {
      return;
    }
    el.scrollLeft = Number.parseInt(scroll[0]);
    el.scrollTop = Number.parseInt(scroll[1]);
  };
  Vue.directive("keep-scroll", {
    bind: (el, binding, vnode, oldVnode) => {
      el.addEventListener("scroll", (event) => {
        event.target.setAttribute(
          "data-vue-keep-scroll",
          event.target.scrollLeft + "-" + event.target.scrollTop
        );
      });
      vnode.context &&
        vnode.context.$on("hook:activated", () => {
          keep(el);
        });
    },
  });
  return Vue;
});
