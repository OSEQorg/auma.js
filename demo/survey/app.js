auma({
  id: "demo-survey",
  welcome: {
    audioUrl: "./mp3/welcome.mp3",
  },
  questions: [
    {
      id: "question-1",
      audioUrl: "./mp3/question-1.mp3",
    },
    {
      id: "question-2",
      audioUrl: "./mp3/question-2.mp3",
    },
    {
      id: "question-3",
      audioUrl: "./mp3/question-3.mp3",
    },
  ],
  results: [
    {
      from: 0,
      to: 1,
      audioUrl: "./mp3/results_0-1.mp3",
    },
    {
      from: 2,
      to: 3,
      audioUrl: "./mp3/results_2-3.mp3",
    },
  ],
  trackFn: function (event, extraData = {}) {
    console.log({ event, extraData });
  },
});
