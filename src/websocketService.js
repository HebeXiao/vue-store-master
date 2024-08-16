// src/websocketService.js
let socket;
let reconnectTimeout;
import store from '@/store'; 
import feedbackService from "./store/modules/feedbackService";

export function connectWebSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log('WebSocket connection already established');
    return; // WebSocket is connected, no action is taken.
  }

  socket = new WebSocket('ws://localhost:3006/challenge');

  store.commit('setSocket', socket);
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      const message = data.message;
      const receivedUserId = data.userID;

      // Get the current challenge ID and user ID directly from the Vuex store
      const currentChallengeId = store.getters.getCurrentChallengeId;
      const isGuidanceMode = store.getters.isGuidanceMode;
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      const user_id = parsedUserData.user.user_id;

      // Handling specific messages with empty tokens
      if (message === 'Challenge failed: Triggered by empty token.' && Number(currentChallengeId) === 1 && isGuidanceMode === true) {
        feedbackService.sendLongFeedback("Oops, looks like you forgot one important thing! A request without a Token is like a door without a key, how can you get in?");
        setTimeout(() => {
          feedbackService.sendFeedback("No worries! Just pop open your browser's developer tools, hop over to the 'Application' tab, and you'll find it chilling under 'Local Storage'.");
        }, 8000);
      }

      if (Number(currentChallengeId) === 1 && user_id !== receivedUserId) {
        // The following actions are triggered when challenge_id = 1 and userID matches
        if (message === 'Challenge succeeded: Triggered by user ID mismatch.') {
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      }

      if (Number(currentChallengeId) === 2) {
        // Handling specific messages from unauthorized people modifying member attributes
        if (message === 'Challenge succeeded: Triggered by unauthorized modification.') {
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      }

      if (Number(currentChallengeId) === 2 && isGuidanceMode === true) {
        // Handling of invalid membership type specific messages
        if (message === 'Challenge failed: Triggered by invalid membership type.') {
          feedbackService.sendLongFeedback("Oops, it seems like there's an issue with the membership type provided!");
          setTimeout(() => {
            feedbackService.sendFeedback("Make sure the membership type is either true or false.");
          }, 8000); 
        }
      }

      if (Number(currentChallengeId) === 3) {
        // View another user's shopping cart data
        if (message === 'Challenge succeeded: Triggered by user ID mismatch in cart.') {
          window.location.href = 'http://localhost:8080/#/ChallengeResult';
        }
      }

      if (Number(currentChallengeId) === 4) {
        // Modifying properties that cannot be modified
        if (message === 'Challenge succeeded: Triggered by modify number.') {
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
      clearTimeout(reconnectTimeout); // Clear reconnect timer after successful connection
      reconnectTimeout = null;
    }
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed.');
    // When the connection closes, also update the Vuex store
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
