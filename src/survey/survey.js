import { Audio } from "./audio";

import "./survey.css";

const IconChoiceYes = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24">
  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" fill="#000"/>
</svg>`,
};

const IconChoiceNo = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="64" viewBox="0 0 24 24">
  <path 
    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
    fill="#000"/>
</svg>`,
};

const IconChoiceSkip = {
  template: `
<svg xmlns="http://www.w3.org/2000/svg" width="32" viewBox="0 0 24 24">
  <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" fill="#000"/>
</svg>`,
};

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
      <icon-choice-no/>
    </button>
    <button 
      class="survey__options-button" 
      @click="choose('yes')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-yes/> 
    </button>
  </div>

  <div class="survey__options" :class="{disabled: optionsDisabled}">
    <button 
      class="survey__options-button" 
      @click="choose('skip')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-skip/> 
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
