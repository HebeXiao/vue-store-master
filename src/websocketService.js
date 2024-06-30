// src/websocketService.js
let socket;
const reconnectInterval = 1000; // 1 second
let reconnectTimeout;
import store from '@/store'; // 确保路径正确


export function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close(); // 关闭旧的会话
  }

  socket = new WebSocket('ws://localhost:3006/challenge');

  socket.onmessage = (event) => {
    const message = event.data;
    // 直接从 Vuex store 获取当前挑战 ID
    const currentChallengeId = store.getters.getCurrentChallengeId;
    if (currentChallengeId === 1) {
      if (message === 'Challenge succeeded: Triggered by invalid token.') {
        // 当 challenge_id = 1 时才触发以下操作
        window.location.href = 'http://localhost:8080/#/ChallengeResult';
      }
    } else {
      console.log('Received message for different challenge_id:', currentChallengeId);
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
    console.log('WebSocket connection closed, attempting to reconnect...');
    reconnectTimeout = setTimeout(connectWebSocket, reconnectInterval); // 尝试重连
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

// 初始连接
connectWebSocket();
