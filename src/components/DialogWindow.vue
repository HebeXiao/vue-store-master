<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-box">
      <div class="dialog-header">
        <img src="@/assets/imgs/question.png" alt="Question" class="question-image"/>
        <span>Confirmation</span>
      </div>
      <div class="dialog-content">
        <span>Are you sure you want to exit the challenge?</span>
      </div>
      <div class="dialog-footer">
        <button @click="handleClose" class="dialog-button">No</button>
        <button @click="handleConfirm" class="dialog-button dialog-button-confirm">Yes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogWindow",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    handleConfirm() {
      this.$emit('confirm');
      this.handleClose();
    }
  }
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* 确保弹窗在最上方 */
}

.dialog-box {
  background-color: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-header {
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中 */
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.question-image {
  width: 30px;
  height: auto;
  margin-right: 10px;
}

.dialog-content {
  margin-bottom: 20px;
  text-align: center; /* 使内容文本居中 */
}

.dialog-footer {
  text-align: right;
}

.dialog-button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #444;
  color: white;
}

.dialog-button-confirm {
  background-color: #4caf50;
}

.dialog-button:hover {
  background-color: #555;
}

.dialog-button-confirm:hover {
  background-color: #45a049;
}
</style>
