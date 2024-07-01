import FeedbackWindow from './views/FeedbackWindow.vue';

import Vue from 'vue';

const FeedbackInstance = new Vue({
  render: h => h(FeedbackWindow)
}).$mount();

document.body.appendChild(FeedbackInstance.$el);

const feedbackService = {
  sendFeedback(message) {
    FeedbackInstance.$children[0].showMessage(message);
  }
};

export default feedbackService;
