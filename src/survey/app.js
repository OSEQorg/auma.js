import { Welcome } from "./pages/welcome";
import { Survey } from "./pages/survey";
import { Results } from "./pages/results";

import "./app.css";

export const App = {
  components: {
    welcome: Welcome,
    survey: Survey,
    results: Results,
  },
  template: `
<div class="app" v-if="config">
  <div v-if="config.theme.logoUrl" class="app__logo">
    <img :src="config.theme.logoUrl" alt="" class="app__logo-img"/>
  </div>
  <welcome 
    v-if="view == 'welcome'" 
    :config="config"
    @done="welcomeDone"
  ></welcome>
  <survey 
    v-if="view == 'survey'" 
    :config="config"
    :questions="config.questions" 
    @submit="surveyDone"
  ></survey>
  <results 
    v-if="view == 'results'" 
    :config="config"
    :results="results"
  ></results>
</div>`,
  setup() {
    const config = Vue.ref();
    const view = Vue.ref("init");
    const results = Vue.ref([]);

    function start() {
      view.value = "welcome";
      config.value.trackFn("PAGE_WELCOME");
    }

    function welcomeDone() {
      view.value = "survey";
    }

    function surveyDone(surveyResults) {
      results.value = surveyResults;
      view.value = "results";
    }

    return {
      config,
      view,
      results,
      start,
      welcomeDone,
      surveyDone,
    };
  },
};
