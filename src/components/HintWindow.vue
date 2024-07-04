<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal-dialog">
      <div class="dialog-header">
        <img src="@/assets/imgs/hint.png" alt="Hint" class="hint-image" />
        <h3>Hint</h3>
        <button class="close-button" @click="close">×</button>
      </div>
      <div class="dialog-body">
        <p v-html="hintMessage.split('\n').join('<br>')"></p>
        <!-- 只在需要显示图片或占位符时渲染 image-container -->
        <div
          v-if="hintImage || needsPlaceholder(currentLevel)"
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
            点击查看图片
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="dialog-button" @click="setHint(1, currentChallengeId)">
          Level 1 Hint
        </button>
        <button class="dialog-button" @click="setHint(2, currentChallengeId)">
          Level 2 Hint
        </button>
        <button class="dialog-button" @click="setHint(3, currentChallengeId)">
          Level 3 Hint
        </button>
        <!-- 新增按钮仅在当前等级为2时显示 -->
        <button v-if="currentLevel === 2" class="dialog-button" @click="navigateToPostman">Go to Postman Tutorial</button>
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
      hintMessage:
        "Here lie the mysterious clues you need! Click the button to uncover the secrets that will lend you a helping hand.",
      hintImage: null, // 初始化为 null 或空字符串
      hints: {
        1: {
          1: {
            text: "To view order details, you first need to master how to track API requests.\n\n Use the Developer Tools (press F12 or right-click and select 'Inspect') to gain a detailed understanding of the communication between your browser and the website's server. Navigate to the 'Network' tab, which records all network requests and responses.\n\n Try viewing an order and pay attention to how the browser requests information. Every detail here could be the key to unlocking the secrets of the API.",
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
        },
        2: {
          1: "Look at the HTML structure of the page. Which element seems to be incorrectly nested?",
          2: "Consider using a browser’s developer tools to inspect the HTML elements and see where the nesting issue occurs.",
          3: "Ensure that all opening tags have corresponding closing tags and are properly nested according to HTML specifications.",
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
    },
    close() {
      this.visible = false;
    },
    toggleImage() {
      this.showImage = !this.showImage; // 切换图片显示状态
    },
    setHint(level, challengeId) {
      if (this.hints[challengeId] && this.hints[challengeId][level]) {
        this.currentLevel = level; // 更新当前提示级别
        this.hintMessage = this.hints[challengeId][level].text;
        this.hintImage = require("@/assets/imgs/" +
          this.hints[challengeId][level].img);
      } else {
        console.error(
          `Hint not found for challengeId ${challengeId} and level ${level}`
        );
        this.hintMessage = "Hint not available.";
        this.hintImage = require("@/assets/imgs/error.png");
      }
      this.showImage = false; // 每次设置新提示时重置图片显示状态
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
        this.$router.push({ name: 'Postman' });
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
}

.dialog-header {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  margin-left: 270px;
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

button:focus {
  outline: none;
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
</style>
