import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import user from './modules/user'
import shoppingCart from './modules/shoppingCart'
import feedbackService from './modules/feedbackService'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart,
    feedbackService
  },
  state: {
    currentOrderId: null, 
    currentChallengeId: null, 
    challenges: [],
    user: null,
    socket: null,
    guidanceMode: false,
    navigationHistory: []
  },
  getters: {
    getCurrentChallengeId: state => {
      return state.currentChallengeId || localStorage.getItem('currentChallengeId');
    },
    getChallenges: state => state.challenges,
    isGuidanceMode: state => {
      return state.guidanceMode || (localStorage.getItem('guidanceMode') === 'true');
    },
    previousPageSection(state) {
      const sectionUrls = new Set([
        '/about',
        '/goods',
        '/order',
        '/shoppingCart',
        '/confirmOrder',
      ]);
      const historyLength = state.navigationHistory.length;
      const prevPage = historyLength > 1 ? state.navigationHistory[historyLength - 2] : null;
      return prevPage && sectionUrls.has(prevPage) ? prevPage : null;
    },
  },
  mutations: {
    addHistory(state, path) {
      state.navigationHistory.push(path);
    },
    clearHistory(state) {
      state.navigationHistory = [];
    },
    setCurrentOrderId(state, orderId) {
      state.currentOrderId = orderId; 
    },
    setCurrentChallengeId(state, challengeId) {
      state.currentChallengeId = challengeId;
      localStorage.setItem('currentChallengeId', challengeId);
    },
    setChallenges(state, challenges) {
      state.challenges = challenges;
    },
    resetChallengeId(state) {
      state.currentChallengeId = null; 
      localStorage.removeItem('currentChallengeId');
    },
    resetGuidanceMode(state) {
      state.guidanceMode = false;
      localStorage.removeItem('guidanceMode');
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
    closeSocket(state) {
      if (state.socket) {
        state.socket.close();
      }
    },
    setGuidanceMode(state, mode) {
      state.guidanceMode = mode;
      localStorage.setItem('guidanceMode', mode);
    },
  },
  actions: {
    fetchScoreboardData({ commit, state }) {
      return new Promise((resolve, reject) => {
        const requestBody = {
          user_id: state.user.user_id
        };
        axios.post('/api/challenge/list', requestBody)
          .then(response => {
            commit('setChallenges', response.data);
            resolve();
          })
          .catch(error => {
            console.error('Error fetching challenge data:', error);
            reject(error);
          });
      });
    },
    startChallenge({ commit }, { challengeId, guidance }) {
      commit('setCurrentChallengeId', challengeId);
      commit('setGuidanceMode', guidance);
    },
  }
})
