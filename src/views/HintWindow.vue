<template>
  <el-dialog
    :visible.sync="visible"
    width="40%">
    <template #title>
      <div class="dialog-title">
        <img src="@/assets/imgs/hint.png" alt="Hint" class="hint-image">
        <span>Hint</span>
      </div>
    </template>
    <div>
      <p>{{ hintMessage }}</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="setHint(1, currentChallengeId)">Level 1 Hint</el-button>
      <el-button @click="setHint(2, currentChallengeId)">Level 2 Hint</el-button>
      <el-button @click="setHint(3, currentChallengeId)">Level 3 Hint</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      visible: false,
      hintMessage: 'Click a button below to receive a hint corresponding to the level of guidance you need.',
      hints: {
        1: {
          1: 'Notice the API request URL, especially the parameters section. Should every user see the same content?',
          2: 'The return message mentions "Token is invalid". This means you need some form of authentication to access the data.',
          3: "Use Postman or another API tool to include a valid Token in your request. Tokens can be found in the browser's developer tools under the Application tab."
        },
        2: {
          1: 'Look at the HTML structure of the page. Which element seems to be incorrectly nested?',
          2: 'Consider using a browser’s developer tools to inspect the HTML elements and see where the nesting issue occurs.',
          3: 'Ensure that all opening tags have corresponding closing tags and are properly nested according to HTML specifications.'
        },
        // Add more challengeIds and their hints here
      }
    };
  },
  computed: {
    ...mapGetters(['getCurrentChallengeId']),
    currentChallengeId() {
      return this.getCurrentChallengeId;
    }
  },
  methods: {
    open() {
      this.visible = true;
      console.log(this.currentChallengeId);
    },
    setHint(level, challengeId) {
      if (this.hints[challengeId] && this.hints[challengeId][level]) {
        this.hintMessage = this.hints[challengeId][level];
      } else {
        console.error(`Hint not found for challengeId ${challengeId} and level ${level}`);
        this.hintMessage = 'Hint not available.';
      }
    },
  },
}
</script>

<style scoped>
/* 对话框整体样式 */
.el-dialog {
  border-radius: 8px; /* 增加圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

/* 自定义标题样式 */
.dialog-title {
  display: flex;
  align-items: center;
}

.dialog-title .hint-image {
  width: 50px; /* Adjust the size as needed */
  height: auto;
  margin-right: 10px; /* Space between image and title text */
}

/* 文本样式 */
p {
  font-size: 16px; /* 调整字体大小 */
  line-height: 1.5; /* 设置行间距 */
  color: #333; /* 字体颜色 */
}

/* 按钮样式 */
.el-button {
  margin-right: 10px; /* 按钮间距 */
  border: none; /* 去除边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* 按钮添加轻微阴影 */
}

.el-button:focus, .el-button:hover {
  background-color: #4CAF50; /* 鼠标悬停或焦点时的背景色 */
  color: white; /* 文本颜色 */
}

.el-button:active {
  transform: translateY(2px); /* 点击时产生下压效果 */
}

/* 弹窗底部按钮区域样式 */
.dialog-footer {
  text-align: right; /* 按钮右对齐 */
  padding: 10px 20px; /* 设置内边距 */
}
</style>
