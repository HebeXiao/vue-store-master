<template>
  <transition name="fade">
    <div v-if="visible" class="feedback-window">
      <img src="@/assets/imgs/robot.png" alt="Robot" class="robot-image">
      <div class="message-container">
        <p style="font-size: 13px;">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: ''
    };
  },
  methods: {
    showMessage(msg) {
      this.message = msg;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 10000); // Message shows for 10 seconds
    },
    showMessageLong(msg) {
      this.message = msg;
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 15000); // Message shows for 20 seconds
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.feedback-window {
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 15px;
  background: linear-gradient(to right, #2b972f, #4CAF50); /* Gradient background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: white;
  font-family: 'Arial', sans-serif;
  z-index: 1000;
  width: auto;
  min-width: 200px; /* Ensure it has a decent width */
  max-width: 300px; /* Max width to avoid too long lines */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.robot-image {
  width: 50px; /* Adjust the size as needed */
  height: auto;
  display: block;
  margin-bottom: 3px; /* Space between image and text */
}

.message-container {
  text-align: center;
}
</style>
