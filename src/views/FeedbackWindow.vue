<template>
  <transition name="fade">
    <div v-if="visible" class="feedback-window">
      <h4>Feedback</h4>
      <p>{{ message }}</p>
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
  background: linear-gradient(to right, #6a11cb, #2575fc); /* Gradient background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  color: white;
  font-family: 'Arial', sans-serif;
  z-index: 1000;
  width: auto;
  min-width: 200px; /* Ensure it has a decent width */
  max-width: 300px; /* Max width to avoid too long lines */
}

h4 {
  margin: 0 0 10px 0;
  font-size: 16px;
}

p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}
</style>
