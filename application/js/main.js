///<reference path="types/jquery.d.ts" />
///<reference path="types/vue/index.d.ts" />
///<reference path="types/App.d.ts" />

require.config({
  baseUrl: "./",
  paths: {
    jquery: "js/jquery.min",
    text: "js/text",
    R: "js/R",
    vue: "js/vue/index",
    app: "js/app",
  },
});

require(["jquery", "app"], (jquery, App) => {
  focusable.distanceToCenter = true;
  focusable.findFocusType = 0;
  // this.$tv.offsetDistance = 50;
  focusable.initDis = 0;

  App.startPage({
    name: "Home",
  });
});
