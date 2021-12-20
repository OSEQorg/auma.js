import { Audio } from "../../common/audio";
import { IconChoiceYes, IconChoiceNo } from "../../common/icons";

import "./tree.css";

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
      <icon-choice-no
        :bgColor="config.theme.buttonNoBgColor"
        :fgColor="config.theme.buttonNoFgColor"/>
    </button>
    <button 
      class="tree__options-button" 
      @click="choose('yes')" 
      :disabled="optionsDisabled"
    >
      <icon-choice-yes
        :bgColor="config.theme.buttonYesBgColor"
        :fgColor="config.theme.buttonYesFgColor"/> 
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
