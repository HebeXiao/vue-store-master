<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-dialog">
      <div class="dialog-header">
        <img src="@/assets/imgs/hint.png" alt="Hint" class="hint-image" />
        <h3>Hint</h3>
        <button class="close-button" @click="close">×</button>
      </div>
      <div class="dialog-body" v-if="!showConfirmDialog">
        <p v-html="hintMessage.split('\n').join('<br>')"></p>
        <!-- 只在需要显示图片或占位符时渲染 image-container -->
        <div
          v-if="hintImage && currentLevel !== 4"
          class="image-container"
          :class="{ 'with-border': needsBorder(currentLevel) }"
          @click="toggleImage"
        >
          <img
            v-if="showImage && hintImage"
            :src="hintImage"
            :class="getImageClass(currentLevel)"
            alt="Hint Image"
            class="hint-level-image"
          />
          <div v-else-if="needsPlaceholder(currentLevel)" class="placeholder">
            Click Me for a Visual Surprise!
          </div>
        </div>
      </div>
      <!-- Confirmation Dialog for Solution -->
      <div v-if="showConfirmDialog" class="confirm-dialog">
        <p>
          Sure you want to check the answer? <br />
          Think again, maybe you're pretty close to the answer yourself!
        </p>
        <button @click="viewSolution">Yes</button>
        <button @click="toggleConfirmDialog">No</button>
      </div>
      <div class="dialog-footer">
        <!-- 在 level 4 显示 DevTools 和 Postman Tutorial 按钮 -->
        <div v-if="currentLevel === 4 && currentChallengeId === 1" class="tutorial-buttons-container">
          <button class="tutorial-button" @click="navigateToDevTools">
            DevTools Tutorial
          </button>
          <button class="tutorial-button" @click="navigateToPostman">
            Postman Tutorial
          </button>
          <button class="tutorial-button" @click="navigateToToken">
            Token Tutorial
          </button>
        </div>
        <div v-if="currentLevel === 4 && currentChallengeId === 2" class="tutorial-buttons-container">
          <button class="tutorial-button" @click="navigateToDevTools">
            DevTools Tutorial
          </button>
          <button class="tutorial-button" @click="navigateToPostman">
            Postman Tutorial
          </button>
        </div>
        <!-- 新增按钮在当前等级为2时显示，并且在其他按钮上方 -->
        <button
          v-if="currentLevel === 1"
          class="tutorial-button"
          @click="navigateToDevTools"
        >
          DevTools Tutorial
        </button>
        <button
          v-if="currentLevel === 2 && currentChallengeId === 1"
          class="tutorial-button"
          @click="navigateToPostman"
        >
          Postman Tutorial
        </button>
        <button
          v-if="currentLevel === 3 && currentChallengeId === 1"
          class="tutorial-button"
          @click="navigateToToken"
        >
          Token Tutorial
        </button>
        <button
          v-if="currentLevel === 3 && currentChallengeId === 2"
          class="tutorial-button"
          @click="navigateToPostman"
        >
          Postman Tutorial
        </button>
        <button class="dialog-button" @click="setHint(1, currentChallengeId)">
          Level 1 Hint
        </button>
        <button class="dialog-button" @click="setHint(2, currentChallengeId)">
          Level 2 Hint
        </button>
        <button class="dialog-button" @click="setHint(3, currentChallengeId)">
          Level 3 Hint
        </button>
        <button class="solution-button" @click="toggleConfirmDialog">
          Solution
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HintWindow",
  data() {
    return {
      visible: false,
      currentLevel: 0,
      showImage: false, // 添加一个控制图片显示的变量
      showConfirmDialog: false,
      hintMessage:
        "Here lie the mysterious clues you need! Click the button to uncover the secrets that will lend you a helping hand.",
      hintImage: null, // 初始化为 null 或空字符串
      hints: {
        1: {
          1: {
            text: "To view order details, you first need to master how to track API requests.\n\n Use the Developer Tools (press F12 or right-click and select 'Inspect') to gain a detailed understanding of the communication between your browser and the website's server. Try viewing an order and pay attention to how the browser requests information. Every detail here could be the key to unlocking the secrets of the API.",
            img: "developer.png",
          },
          2: {
            text: "Launch Postman and start your API exploration journey. Create a new request, enter the API URL, and send the request. Observe the response and understand how the API responds to your query.\n\n If you're new to Postman or eager to master more magical techniques, consider clicking the 'Learn More' button to delve deeper into this powerful tool, making your API exploration journey smoother.",
            img: "Postman.png",
          },
          3: {
            text: "The token is key to verifying your identity. If your request is rejected, it might mean you need a valid token to prove who you are. Open your developer tools and examine the response headers or body to find this elusive token. Once you've found it, insert it into your API request like a key to unlock the door to the data.",
            img: "token.png",
          },
          4: {
            text:
              "Step 1: Get an API request using developer tools\nUse your browser's developer tools (usually the F12 key or the “Inspect” option in the context menu) to monitor network requests when a user views an order.\n" +
              "Step 2: Find User Token\nFind the API request in the Network tab of the Developer Tools and look at the Headers of the request, look for a Token starting with Authorization: Bearer <token> in the Headers.\n"+
              "Step 3: Accessing the API with Token\nOpen Postman (or continue to use developer tools) add the API URL to Postman, set the request method to GET, add a Token to Headers, then send the request and see the response. If the Token is valid and the request is successful, you will see the user's order information in the response.\n\n"+
              "Additional Notes:\n"+
              "For a detailed Postman tutorial, check out Postman Tutorial.\n"+
              "For a detailed tutorial on Developer Tools, check out the Developer Tools Tutorial.\n"+
              "For a detailed tutorial on Token, check out the Token Tutorial."
          },
        },
        2: {
          1: {
            text: "Solution: Hey, remember the Developer Tools from the first mission? The Network panel in Developer Tools has a number of tabs hiding secrets, each of which can lead you to discover new information. Explore carefully and see what interesting details you can find!\n\nHeaders: See the headers of requests and responses for their metadata.\nPayload: view the content of the data sent in the request.\nPreview: Preview the response to quickly understand the data returned by the server.\nResponse: view the full server response, in-depth understanding of the returned data.",
            img: "hint1.png",
          },
          2: {
            text: "Remember the Network panel we explored? Now it's time to dive into the Payload tab. This tab shows you the data you're sending in your request. By taking a closer look at the Payload, you can understand the structure and content of the request.\n\nRemember, finding the right data structure and content is a key step in cracking this challenge.",
            img: "hint2.png",
          },
          3: {
            text: "Ready for the last step of the challenge? Take advantage of the powerful tool Postman that we introduced earlier. Open Postman, create a new POST request, remember to set up Headers, try to find and modify the membership information, send the request and see if your changes are successful!",
            img: "hint3.png",
          },
          4: {
            text:
              "Step 1: Use Developer Tools to View API Requests\nNavigate to the Profile page and try to edit the profile. In the Network tab of the Developer Tools, find the API request that was sent. Looking at the request body in detail, notice that the membership attribute has a value of false or true.\n" +
              "Step 2: Replay API requests using Postman or developer tools\nSet the request method to POST, select raw and JSON format in Body, construct the request body, and change the value of the membership attribute from false to true.\n"+
              "Step 3: Send a request and verify the result\nSend a modified POST request and view the response. Reload the Profile page or view the Profile information via another GET request to confirm that the membership attribute has been modified to true.\n\n"+
              "Additional Notes:\n"+
              "For a detailed Postman tutorial, check out Postman Tutorial.\n"+
              "For a detailed tutorial on Developer Tools, check out the Developer Tools Tutorial.\n"
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["getCurrentChallengeId"]),
    currentChallengeId() {
      return this.getCurrentChallengeId;
    },
  },
  methods: {
    open() {
      this.visible = true;
      this.resetState(); // 重置状态
    },
    close() {
      this.visible = false;
      this.resetState(); // 重置状态
    },
    toggleImage() {
      this.showImage = !this.showImage; // 切换图片显示状态
    },
    setHint(level, challengeId) {
      if (this.hints[challengeId] && this.hints[challengeId][level]) {
        this.currentLevel = level; // 更新当前提示级别
        this.hintMessage = this.hints[challengeId][level].text;
        if (level !== 4) {
          // 排除 level 4 的图片
          this.hintImage = require("@/assets/imgs/" +
            this.hints[challengeId][level].img);
        } else {
          this.hintImage = null; // 不显示图片
        }
      } else {
        console.error(
          `Hint not found for challengeId ${challengeId} and level ${level}`
        );
        this.hintMessage = "Hint not available.";
        this.hintImage = require("@/assets/imgs/error.png");
      }
      this.showImage = false; // 每次设置新提示时重置图片显示状态
    },
    resetState() {
      // 重置到默认状态
      this.currentLevel = 0;
      this.showImage = false;
      this.hintMessage =
        "Here lie the mysterious clues you need! Click the button to uncover the secrets that will lend you a helping hand.";
      this.hintImage = null;
    },
    needsPlaceholder(level) {
      // 返回一个布尔值，根据你的需求判断是否在某个特定的level显示占位符
      return [1, 2, 3].includes(level);
    },
    needsBorder(level) {
      // 可能与 needsPlaceholder 相同，或根据其他逻辑决定
      return [1, 2, 3].includes(level);
    },
    navigateToPostman() {
      this.close(); // 关闭弹窗
      this.$router.push({ name: "Postman" });
    },
    navigateToDevTools() {
      this.close(); // 关闭弹窗
      this.$router.push({ name: "DevTools" });
    },
    navigateToToken() {
      this.close(); // 关闭弹窗
      this.$router.push({ name: "Token" });
    },
    getImageClass(level) {
      switch (level) {
        case 1:
          return "level-one-image";
        case 2:
          return "level-two-image";
        case 3:
          return "level-three-image";
        default:
          return "";
      }
    },
    toggleConfirmDialog() {
      this.showConfirmDialog = !this.showConfirmDialog;
    },
    viewSolution() {
      this.setHint(4, this.currentChallengeId); // 假设已经有这个方法处理显示解决方案
      this.showConfirmDialog = false;
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-dialog {
  background: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 700px;
  padding: 10px;
}

.dialog-header {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  margin-left: 280px;
}

.dialog-body {
  padding: 5px;
  line-height: 1.5;
  font-size: 15px;
  color: #ffffff;
}

.dialog-footer {
  padding: 10px 20px;
  text-align: center;
}

.hint-image,
.hint-level-image {
  width: 35px;
  height: auto;
}

.close-button {
  background: none;
  border: none;
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: auto;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
}

.dialog-button:hover {
  background-color: #367c39;
}

.solution-button {
  background-color: #476cff;
}

.solution-button:hover {
  background-color: #3159f7;
}

button:focus {
  outline: none;
}

.tutorial-button {
  background-color: #007bff;
}

.tutorial-button:hover {
  background-color: #0056b3;
}

.level-one-image {
  width: 290px;
  height: 180px;
}

.level-two-image {
  width: 290px;
  height: 180px;
}

.level-three-image {
  width: 290px;
  height: 180px;
}

.image-container {
  margin-top: 20px;
  width: 290px; /* 根据图片实际宽度调整 */
  height: 180px; /* 根据图片实际高度调整 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative; /* 为占位符定位 */
  margin-left: auto; /* 水平居中 */
  margin-right: auto; /* 水平居中 */
}

.image-container.with-border {
  border: 2px dashed #ccc; /* 仅在需要时显示边框 */
}

.placeholder {
  text-align: center;
  color: #ccc;
  font-size: 14px; /* 调整字体大小为合适的值 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 居中显示 */
}

.confirm-dialog {
  background-color: white;
  color: black;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.confirm-dialog button {
  margin: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.confirm-dialog button:hover {
  background-color: #367c39;
}

.tutorial-buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
