// src/websocketService.js
let socket;
let reconnectTimeout;
import store from '@/store'; // 确保路径正确
import feedbackService from "./store/modules/feedbackService";

export function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log('WebSocket connection already established');
    return; // WebSocket 已连接，不做任何操作
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
      const isGuidanceMode = store.getters.isGuidanceMode;
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      const user_id = parsedUserData.user.user_id;

      // 处理 token 为空的特定消息
      if (message === 'Challenge succeeded: Triggered by empty token.' && Number(currentChallengeId) === 1 && isGuidanceMode === true) {
        feedbackService.sendLongFeedback("Oops, looks like you forgot one important thing! A request without a Token is like a door without a key, how can you get in?");
        setTimeout(() => {
          feedbackService.sendFeedback("No worries! Just pop open your browser's developer tools, hop over to the 'Application' tab, and you'll find it chilling under 'Local Storage'.");
        }, 8000); // 延迟4秒发送
      }

      if (Number(currentChallengeId) === 1 && user_id !== receivedUserId) {
        if (message === 'Challenge succeeded: Triggered by user ID mismatch.') {
          // 当 challenge_id = 1 并且 userID 匹配时才触发以下操作
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      }

      if (Number(currentChallengeId) === 2) {
        // 处理未经授权的人修改会员属性的特定消息
        if (message === 'Challenge succeeded: Triggered by unauthorized modification.') {
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      }

      if (Number(currentChallengeId) === 2 && isGuidanceMode === true) {
        // 处理无效的 membership 类型的特定消息
        if (message === 'Challenge succeeded: Triggered by invalid membership type.') {
          feedbackService.sendLongFeedback("Oops, it seems like there's an issue with the membership type provided!");
          setTimeout(() => {
            feedbackService.sendFeedback("Make sure the membership type is either true or false.");
          }, 8000); // 延迟8秒发送
        }
      }

      if (Number(currentChallengeId) === 3) {
        // 处理未经授权的人修改会员属性的特定消息
        if (message === 'Challenge succeeded: Triggered by user ID mismatch in cart.') {
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
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

export function isWebSocketConnected() {
  return socket && socket.readyState === WebSocket.OPEN;
}

export function sendMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error('WebSocket connection is not open');
  }
}
