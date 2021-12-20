import { Audio } from "../../common/audio";
import {
  IconChoiceYes,
  IconChoiceNo,
  IconChoiceSkip,
} from "../../common/icons";

import "./survey.css";

const Progress = {
  template: `
<div>
  <svg viewBox="0 0 100 5">
    <rect width="100" height="5" fill="#ddd"/>
    <rect :width="percentage" height="5" fill="#000" style="transition: width 1s ease;"/>
  </svg>
</div>`,
  props: {
    percentage: Number,
  },
};

export const Survey = {
  components: {
    "icon-choice-yes": IconChoiceYes,
    "icon-choice-no": IconChoiceNo,
    "icon-choice-skip": IconChoiceSkip,
    "app-progress": Progress,
    "app-audio": Audio,
  },
  template: `
<div class="survey">
  <app-audio 
    ref="audio"
    :url="currentQuestion.audioUrl" 
    @ready="onAudioReady"
    @ended="onAudioEnded" 
    @replay="onAudioReplay"/>

  <app-progress 
    :percentage="percentageProgress"
    class="survey__progress"/>

  <div class="survey__options" :class="{disabled: optionsDisabled}">
    <button 
      class="survey__options-button" 
      @click="choose('no')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-no
        :bgColor="config.theme.buttonNoBgColor"
        :fgColor="config.theme.buttonNoFgColor"/>
    </button>
    <button 
      class="survey__options-button" 
      @click="choose('yes')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-yes
        :bgColor="config.theme.buttonYesBgColor"
        :fgColor="config.theme.buttonYesFgColor"/> 
    </button>
  </div>

  <div 
    v-if="config.allowSkip"
    class="survey__options" :class="{disabled: optionsDisabled}">
    <button 
      class="survey__options-button" 
      @click="choose('skip')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-skip
        :width="32"
        :bgColor="config.theme.buttonSkipBgColor"
        :fgColor="config.theme.buttonSkipFgColor"/> 
    </button>
  </div>
</div>
  `,
  props: {
    questions: Array,
    config: Object,
  },
  emits: ["submit"],
  setup(props, ctx) {
    const audio = Vue.ref();
    const currentQuestionIdx = Vue.ref(0);
    const optionsDisabled = Vue.ref(true);
    const results = Vue.ref([]);

    const currentQuestion = Vue.computed(
      () => props.questions[currentQuestionIdx.value]
    );
    const percentageProgress = Vue.computed(
      () => 100 * (currentQuestionIdx.value / props.questions.length)
    );

    function setQuestion(idx) {
      currentQuestionIdx.value = idx;
      optionsDisabled.value = true;
    }

    function choose(option) {
      optionsDisabled.value = true;
      results.value.push({
        question: currentQuestion.value.id,
        option: option,
      });

      if (props.questions[currentQuestionIdx.value + 1]) {
        setQuestion(currentQuestionIdx.value + 1);
      } else {
        props.config.trackFn("COMPLETE_SURVEY", {
          score: results.value.filter((r) => r.option === "yes").length,
          outOf: results.value.length,
        });
        ctx.emit("submit", results.value);
      }
    }

    function onAudioReady() {
      if (currentQuestionIdx.value > 0) {
        audio.value.play();
      }
    }

    function onAudioEnded() {
      optionsDisabled.value = false;
    }

    function onAudioReplay() {
      optionsDisabled.value = true;
    }

    return {
      audio,
      currentQuestionIdx,
      optionsDisabled,
      results,
      currentQuestion,
      percentageProgress,
      choose,
      onAudioReady,
      onAudioEnded,
      onAudioReplay,
      setQuestion,
    };
  },
};
