<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <img
          src="@/assets/imgs/challenge.png"
          alt="Challenge"
          class="challenge-image"
        />
        <h2 class="modal-title">Challenge</h2>
        <button class="close-button" @click="cancelEntry">×</button>
      </div>
      <div class="modal-body">
        <div v-html="challengeMessage"></div>
      </div>
      <p style="font-weight: bold; font-size: 20px">
        Are you ready to start your adventure?
      </p>
      <div class="modal-footer" :class="{'center-buttons': challengeId === 3 || challengeId === 4}">
        <button @click="confirmEntry" class="confirm-button">
          Start Challenge
        </button>
        <!-- 仅在 challengeId 不等于 3 或 4 时显示 Start with Guidance 按钮 -->
        <button
          v-if="challengeId !== 3 && challengeId !== 4"
          @click="startWithGuidance"
          class="guidance-button"
        >
          Start with Guidance
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    challengeId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    challengeMessage() {
      switch (this.challengeId) {
        case 1: {
          const message = `Your first mission is ready and waiting! You are now a detective exploring the secrets of a simulated shopping platform. <br><br>
          Your objective? To uncover how to view other users' order information through API vulnerabilities.`;
          return message;
        }
        case 2: {
          const message = `Your second mission is queued up and ready to go! <br><br>
          What's your mission? To exploit the system's flaws and alter user membership attributes that are typically non-editable. Your goal is to change membership attributes from false to true, uncovering how to bypass restrictions that prevent such modifications.<br><br>
          Check the profile to discover the secret!`;
          return message;
        }
        case 3: {
          const message = `Congratulations on conquering Challenge 1!<br><br> Now, let's aim higher and join the Advanced Challenge together to discover even more excitement!<br><br>Your objective? <br><br>View shopping cart information for user with user id 20.`;
          return message;
        }
        case 4: {
          const message = `Congratulations on conquering Challenge 2!<br><br> Now, let's aim higher and join the Advanced Challenge together to discover even more excitement!`;
          return message;
        }
        default: {
          return "You are about to start a new challenge, confirmed to continue?";
        }
      }
    },
  },
  methods: {
    confirmEntry() {
      this.$emit("confirm");
    },
    startWithGuidance() {
      this.$emit("start-guidance");
    },
    cancelEntry() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.challenge-image {
  width: 30px; /* Adjust the size as needed */
  height: auto;
  margin-right: 10px; /* Space between image and title */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background-color: #333;
  color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  width: 500px;
  text-align: center;
  position: relative;
}

.modal-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* Center the content horizontally */
  align-items: center;
  margin-right: 30px;
}

.modal-title {
  font-size: 24px;
}

.close-button {
  background: none;
  border: none;
  font-size: 30px;
  color: #ffffff;
  cursor: pointer;
  position: absolute; /* Position the close button in the top-right corner */
  right: 20px;
}

.modal-body {
  margin-top: 40px;
  margin-bottom: 50px;
  text-align: left;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button,
.guidance-button {
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover,
.guidance-button:hover {
  background-color: #45a049;
}

.center-buttons {
  justify-content: center; /* 居中显示按钮 */
}

</style>
