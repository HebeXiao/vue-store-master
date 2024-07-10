
Copy code
<template>
  <transition name="fade">
    <div v-if="visible" :class="['feedback-window', positionClass]" @mouseenter="stopClose" @mouseleave="allowClose">
      <img src="@/assets/imgs/robot.png" alt="Robot" class="robot-image" />
      <div class="message-container">
        <p style="font-size: 13px">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "FeedbackWindow",
  data() {
    return {
      visible: false,
      message: "",
      positionClass: "left-top", // Default position
      closeTimeout: null,
    };
  },
  methods: {
    showMessage(msg) {
      this.message = msg;
      this.positionClass = "left-top";
      this.visible = true;
      this.resetTimeout(15000); // Message shows for 10 seconds
    },
    showMessageRight(msg) {
      this.message = msg;
      this.positionClass = "right-top";
      this.visible = true;
      this.resetTimeout(15000); // Message shows for 10 seconds
    },
    showMessageLong(msg) {
      this.message = msg;
      this.positionClass = "left-top";
      this.visible = true;
      this.resetTimeout(20000); // Message shows for 15 seconds
    },
    resetTimeout(delay) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = setTimeout(() => {
        this.visible = false;
      }, delay);
    },
    stopClose() {
      clearTimeout(this.closeTimeout); // Stop the close timeout when mouse is over the component
    },
    allowClose() {
      this.resetTimeout(5000); // Restart the close timeout when mouse leaves
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.feedback-window {
  position: fixed;
  padding: 15px;
  background: linear-gradient(
    to right,
    #2b972f,
    #4caf50
  ); /* Gradient background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  font-family: "Arial", sans-serif;
  z-index: 1000;
  width: auto;
  min-width: 200px; /* Ensure it has a decent width */
  max-width: 300px; /* Max width to avoid too long lines */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.robot-image {
  width: 40px; /* Adjust the size as needed */
  height: auto;
  display: block;
  margin-bottom: 3px; /* Space between image and text */
}

.message-container {
  text-align: center;
}

/* Position classes */
.left-top {
  top: 20px;
  left: 20px;
}

.right-top {
  top: 35px;
  right: 20px;
}
</style>
