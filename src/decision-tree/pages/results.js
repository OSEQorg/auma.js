import { Audio } from "../components/audio";

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
    result: Object,
  },
};
