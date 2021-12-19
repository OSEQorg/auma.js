import { Audio } from "../../common/audio";

import "./results.css";

export const Results = {
  components: {
    "app-audio": Audio,
  },
  template: `
<div class="results">
  <app-audio :url="audioUrl" :style="{width: '240px'}"/>
</div>`,
  props: {
    config: Object,
    results: Array,
  },
  setup(props) {
    Vue.onMounted(() => {
      if (props.results.length != props.config.questions.length) {
        throw new Error("results and questions have different length");
      }
    });

    const audioUrl = Vue.computed(() => {
      const numberYes = props.results.filter((r) => r.option === "yes").length;
      for (let i = 0; i < props.config.results.length; i++) {
        if (
          numberYes >= props.config.results[i].from &&
          numberYes <= props.config.results[i].to
        ) {
          return props.config.results[i].audioUrl;
        }
      }
      throw new Error("could not find results audio");
    });

    return {
      audioUrl,
    };
  },
};
