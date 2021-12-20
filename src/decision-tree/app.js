import { Welcome } from "./pages/welcome";
import { Tree } from "./pages/tree";
import { Results } from "./pages/results";

import "./app.css";

export const App = {
  components: {
    welcome: Welcome,
    tree: Tree,
    results: Results,
  },
  template: `
<div class="app">
  <welcome 
    v-if="view == 'welcome'" 
    :config="config"
    @done="welcomeDone"
  ></welcome>
  <tree 
    v-if="view == 'tree'" 
    :config="config"
    :questions="config.questions" 
    @result="showResult"
  ></tree>
  <results
    v-if="view == 'results'" 
    :result="result"
  ></results>
</div>`,
  setup() {
    const config = Vue.ref();
    const view = Vue.ref("init");
    const result = Vue.ref();

    function start() {
      view.value = "welcome";
    }

    function welcomeDone() {
      view.value = "tree";
    }

    function showResult(resultId) {
      result.value = config.value.results.filter((r) => r.id == resultId)[0];
      view.value = "results";
    }

    return {
      config,
      view,
      result,
      start,
      welcomeDone,
      showResult,
    };
  },
};
