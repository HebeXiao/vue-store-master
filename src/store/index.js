/*
 * @Description: Vuex入口
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-25 22:51:50
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import user from './modules/user'
import shoppingCart from './modules/shoppingCart'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    shoppingCart
  },
  state: {
    currentOrderId: null, // 存储当前订单ID
    currentChallengeId: null, //存储当前挑战ID
    challenges: [],
    user: null,
  },
  getters: {
    getCurrentChallengeId: state => state.currentChallengeId,
    getChallenges: state => state.challenges
  },
  mutations: {
    setCurrentOrderId(state, orderId) {
      state.currentOrderId = orderId; // 设置当前订单ID
    },
    setCurrentChallengeId(state, challengeId) {
      state.currentChallengeId= challengeId;
    },
    setChallenges(state, challenges) {
      state.challenges = challenges;
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
    }
  }
})
