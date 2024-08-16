<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog-box">
      <div class="dialog-header">
        <div class = "dialog-header-content" style="margin-left:110px">
            <img src="@/assets/imgs/question.png" alt="Question" class="question-image"/>
            <span>Confirmation</span>
        </div>
        <button @click="handleClose" class="close-button">×</button>
      </div>
      <div class="dialog-content">
        <span>Are you sure you want to exit the challenge?</span>
      </div>
      <div class="dialog-footer">
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
  z-index: 9999; 
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
  justify-content: space-between; 
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.question-image {
  width: 30px;
  height: auto;
  margin-right: 10px;
  margin-bottom: -8px;
}

.close-button {
  background: none;
  border: none;
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
  margin-left: auto; 
}

.dialog-content {
  margin-bottom: 40px;
  text-align: center; 
  margin-top: 40px;
  font-size:18px;
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
