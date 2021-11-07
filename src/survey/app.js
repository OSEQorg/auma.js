import { Welcome } from "./welcome";
import { Survey } from "./survey";
import { Results } from "./results";

import "./app.css";

const App = {
  template: `
<div class="app">
  <welcome 
    v-if="view == 'welcome'" 
    :config="config"
    @done="handleWelcomeDone"
  ></welcome>
  <survey 
    v-if="view == 'survey'" 
    :config="config"
    :questions="config.questions" 
    @submit="handleSurveySubmit"
  ></survey>
  <results 
    v-if="view == 'results'" 
    :config="config"
    :results="results"
  ></results>
</div>`,
  data() {
    return {
      config: undefined,
      view: "init",
      results: [],
    };
  },
  methods: {
    start() {
      this.view = "welcome";
      this.config.trackFn("PAGE_WELCOME");
    },
    handleWelcomeDone() {
      this.view = "survey";
    },
    handleSurveySubmit(results) {
      this.results = results;
      this.view = "results";
    },
  },
};

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
    const vm = Vue.createApp(App)
      .component("welcome", Welcome)
      .component("survey", Survey)
      .component("results", Results)
      .mount(el);
    vm.config = config;
    vm.start();
  };
  document.head.append(vue);
}

window.auma = auma;
