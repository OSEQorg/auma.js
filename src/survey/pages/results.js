import { Audio } from "../../common/audio";

import "./results.css";

export const Results = {
  components: {
    "app-audio": Audio,
  },
  template: `
<div class="results">
  <app-audio :url="result.audioUrl"/>

  <img 
    v-if="result.imageUrl" 
    :src="result.imageUrl" 
    class="results__image"
  />
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

    const result = Vue.computed(() => {
      const numberYes = props.results.filter((r) => r.option === "yes").length;
      for (let i = 0; i < props.config.results.length; i++) {
        if (
          numberYes >= props.config.results[i].from &&
          numberYes <= props.config.results[i].to
        ) {
          return props.config.results[i];
        }
      }
      throw new Error("could not find result");
    });

    return {
      result,
    };
  },
};
