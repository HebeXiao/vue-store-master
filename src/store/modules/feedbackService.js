import FeedbackWindow from '../../components/FeedbackWindow.vue';

import Vue from 'vue';

const FeedbackInstance = new Vue({
  render: h => h(FeedbackWindow)
}).$mount();

document.body.appendChild(FeedbackInstance.$el);

const feedbackService = {
  sendFeedback(message) {
    FeedbackInstance.$children[0].showMessage(message);
  },
  sendLongFeedback(message){
    FeedbackInstance.$children[0].showMessageLong(message);
  },
  sendFeedbackRight(message){
    FeedbackInstance.$children[0].showMessageRight(message);
  },

};

export default feedbackService;
