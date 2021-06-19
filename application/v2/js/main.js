///<reference path="jquery.d.ts" />
///<reference path="vue/types/index.d.ts" />

require.config({
    baseUrl: "./",
    paths: {
        jquery: "../assets/js/jQuery-3.1.0",
        text: "js/text",
        R: "js/R",
        vue: "js/vue/index",
        app: "js/app",
    },
});

require(["jquery", "app"], (jquery, App) => {
    App.startPage({
        name: "Home",
    });
});

