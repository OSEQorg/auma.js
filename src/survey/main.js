import { App } from "./app";

import "./main.css";

function auma(config) {
  config.trackFn = config.trackFn || function () {};

  document.title = "Auma Survey | " + config.id;

  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";
  document.head.append(metaViewport);

  const vue = document.createElement("script");
  vue.src = VUE_CDN_URL;
  vue.onload = () => {
    const el = document.createElement("div");
    document.body.append(el);
    const vm = Vue.createApp(App).mount(el);
    vm.config = config;
    vm.start();
  };
  document.head.append(vue);
}

window.auma = auma;
