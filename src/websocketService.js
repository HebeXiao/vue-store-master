// src/websocketService.js
let socket;
let reconnectTimeout;
import store from '@/store'; // 确保路径正确
import feedbackService from './feedbackService';

export function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close(); // 关闭旧的会话
  }

 
  socket = new WebSocket('ws://localhost:3006/challenge');

  store.commit('setSocket', socket);
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const message = data.message;
      const receivedUserId = data.userID;

      // 直接从 Vuex store 获取当前挑战 ID 和用户 ID
      const currentChallengeId = store.getters.getCurrentChallengeId;
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      const user_id = parsedUserData.user.user_id;

      // 处理 token 为空的特定消息
      if (message === 'Challenge succeeded: Triggered by empty token.') {
        feedbackService.sendLongFeedback("Oops, looks like you forgot one important thing! A request without a Token is like a door without a key, how can you get in?");
      }

      if (currentChallengeId === 1 &&  user_id !== receivedUserId) {
        if (message === 'Challenge succeeded: Triggered by user ID mismatch.') {
          // 当 challenge_id = 1 并且 userID 匹配时才触发以下操作
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      } else {
        console.log('Received message for different challenge_id or user:', user_id, receivedUserId);
      }
    } catch (error) {
      console.error('Error parsing message from WebSocket:', error);
    }
  };

  socket.onopen = () => {
    console.log('WebSocket connection established');
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout); // 成功连接后清除重连定时器
      reconnectTimeout = null;
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
    // 当连接关闭时，也更新 Vuex store
    store.commit('setSocket', null);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

export function sendMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error('WebSocket connection is not open');
  }
}


