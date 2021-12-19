import { Audio } from "../../common/audio";

import "./tree.css";

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

export const Tree = {
  components: {
    "icon-choice-yes": IconChoiceYes,
    "icon-choice-no": IconChoiceNo,
    "app-audio": Audio,
  },
  template: `
<div class="tree">
  <app-audio 
    ref="audio"
    :url="currentQuestion.audioUrl" 
    @ready="onAudioReady"
    @ended="onAudioEnded" 
    @replay="onAudioReplay"/>

  <img 
    v-if="currentQuestion.imageUrl" 
    :src="currentQuestion.imageUrl" 
    class="tree__image"
  />

  <div class="tree__options" :class="{disabled: optionsDisabled}">
    <button 
      class="tree__options-button" 
      @click="choose('no')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-no/>
    </button>
    <button 
      class="tree__options-button" 
      @click="choose('yes')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-yes/> 
    </button>
  </div>
</div>
  `,
  props: {
    questions: Array,
    config: Object,
  },
  emits: ["result"],
  setup(props, ctx) {
    const audio = Vue.ref();
    const currentQuestionId = Vue.ref(props.config.questions[0].id);
    const optionsDisabled = Vue.ref(true);
    const firstQuestion = Vue.ref(true);

    const currentQuestion = Vue.computed(
      () => props.questions.filter((q) => q.id == currentQuestionId.value)[0]
    );

    function setQuestion(id) {
      currentQuestionId.value = id;
      optionsDisabled.value = true;
    }

    function choose(option) {
      optionsDisabled.value = true;
      firstQuestion.value = false;

      const action =
        option == "yes"
          ? currentQuestion.value.onYes
          : option == "no"
          ? currentQuestion.value.onNo
          : null;

      if (action.startsWith("question:")) {
        setQuestion(action.slice("question:".length));
      } else if (action.startsWith("result:")) {
        ctx.emit("result", action.slice("result:".length));
      } else {
        throw new Error("invalid action");
      }
    }

    function onAudioReady() {
      if (!firstQuestion.value) {
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
      currentQuestionId,
      optionsDisabled,
      currentQuestion,
      choose,
      onAudioReady,
      onAudioEnded,
      onAudioReplay,
      setQuestion,
    };
  },
};
