<template>
  <div v-if="challenges.length">
    <!-- Show progress -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <span class="progress-text"
          >Challenge Progress: {{ progress.toFixed(2) }}%</span
        >
      </div>
    </div>
    <!-- Show all challenge -->
    <div class="card">
      <div
        v-for="challenge in orderedChallenges"
        :key="challenge.challenge_id"
        :class="['card_challenge', { completed: challenge.is_completed }]"
      >
        <h3>{{ challenge.challenge_name }}</h3>
        <p v-html="challenge.challenge_description"></p>
        <div class="button-container">
          <button
            v-if="challenge.challenge_id === 3 || challenge.challenge_id === 4"
            @click="startExercise(challenge.challenge_id)"
            class="button"
            :class="{
              'btn-restart': challenge.is_completed,
              'btn-start': !challenge.is_completed,
            }"
          >
            {{ challenge.is_completed ? "Challenge Again" : "Start Challenge" }}
          </button>
          <template v-else>
            <button
              @click="showConfirmationModal(challenge.challenge_id)"
              class="button"
              :class="{
                'btn-restart': challenge.is_completed,
                'btn-start': !challenge.is_completed,
              }"
            >
              {{
                challenge.is_completed ? "Challenge Again" : "Start Challenge"
              }}
            </button>
            <!-- View Fix button -->
            <button
              @click="viewFix(challenge.challenge_id)"
              class="button btn-fix"
            >
              How To Prevent
            </button>
          </template>
        </div>
        <!-- Conditional Rendering Challenge Success Picture -->
        <img
          v-if="challenge.is_completed"
          src="@/assets/imgs/successful.png"
          alt="Challenge successful"
          class="success-image"
        />
      </div>
    </div>
    <ConfirmationModal
      v-if="showModal"
      :show-modal="showModal"
      :challenge-id="currentChallengeId"
      @confirm="confirmEntry"
      @start-guidance="startWithGuidance"
      @cancel="cancelEntry"
    />
  </div>
</template>

<script>
import ConfirmationModal from "../components/ConfirmationModal.vue";
import feedbackService from "@/store/modules/feedbackService";

export default {
  computed: {
    // Computing attributes to dynamically sort challenges
    orderedChallenges() {
      const order = [1, 3, 2, 4];
      const orderedChallenges = [];
      order.forEach((id) => {
        const challenge = this.challenges.find((ch) => ch.challenge_id === id);
        if (challenge) {
          orderedChallenges.push(challenge);
        }
      });
      return orderedChallenges;
    },
  },
  components: {
    ConfirmationModal,
  },
  data() {
    return {
      challenges: [],
      progress: 0,
      showModal: false,
      currentChallengeId: null,
      withGuidance: false,
    };
  },
  mounted() {
    this.fetchChallenges();
    this.fetchProgress();
  },
  methods: {
    // Obtain the challenge information
    fetchChallenges() {
      const userData = localStorage.getItem("user");
      const { user_id } = JSON.parse(userData).user;
      this.user_id = user_id;
      this.$axios
        .post("/api/challenge/list", { user_id })
        .then((response) => {
          this.challenges = response.data.map((challenge) => ({
            ...challenge,
            isCompleted: challenge.isCompleted === 1,
          }));
        })
        .catch((error) => {
          console.error("Error fetching challenges:", error);
        });
    },
    // Obtain the challenge status
    fetchProgress() {
      if (this.user_id) {
        this.$axios
          .post("/api/challenge/progress", { user_id: this.user_id })
          .then((response) => {
            this.progress = response.data;
          })
          .catch((error) => {
            console.error("Error fetching progress:", error);
          });
      }
    },
    // Show confirmation modal
    showConfirmationModal(challengeId) {
      if (
        challengeId === 2 &&
        !this.challenges.find((ch) => ch.challenge_id === 1).is_completed
      ) {
        alert("Please complete the first challenge first!");
        return;
      }
      this.currentChallengeId = challengeId;
      this.withGuidance = false;
      this.showModal = true;
    },
    startExercise(challengeId) {
      if (
        challengeId === 3 &&
        !this.challenges.find((ch) => ch.challenge_id === 1).is_completed
      ) {
        alert("Please complete the challenge first!");
        return;
      }
      if (
        challengeId === 4 &&
        !this.challenges.find((ch) => ch.challenge_id === 2).is_completed
      ) {
        alert("Please complete the challenge first!");
        return;
      }
      this.currentChallengeId = challengeId;
      this.withGuidance = false;
      this.showModal = true;
    },
    // Handle confirmation modal actions
    confirmEntry() {
      this.showModal = false;
      this.start(this.currentChallengeId);
    },
    startWithGuidance() {
      this.showModal = false;
      this.$store.dispatch("startChallenge", {
        challengeId: this.currentChallengeId,
        guidance: true,
      });
      let welcomeMessages = [];
      switch (this.currentChallengeId) {
        case 1:
          welcomeMessages = [
            "Welcome to our Challenge! For this challenge, we will be looking at the Broken Object Level Authorization (BOLA) vulnerability. Please proceed carefully and observe the security implications.",
            "Please try to shop using the platform normally first and try to view your order. Watch for system responses and any possible security alerts.",
            "If you need help you can check the hint.",
          ];
          break;
        case 2:
          welcomeMessages = [
            "In this challenge, we will examine the Broken Object Property Level Authorization (BOPLA) vulnerability. This vulnerability allows an attacker to modify object properties that should not be modified. Please proceed with caution.",
            "Please check the Profile and try to edit the information normally. Note that developer tools are still very useful here.",
            "If you need help you can check the hint.",
          ];
          break;
      }
      // Send messages with delays
      feedbackService.sendFeedback(welcomeMessages[0]);
      setTimeout(() => {
        feedbackService.sendFeedback(welcomeMessages[1]);
      }, 10000); // Send second message after 5 seconds
      if (welcomeMessages[2]) {
        setTimeout(() => {
          feedbackService.sendFeedbackRight(welcomeMessages[2]);
        }, 18000); // Send third message after 10 seconds
      }
      this.$router.push("/goods");
    },
    cancelEntry() {
      this.showModal = false;
      this.currentChallengeId = null;
    },
    // Stores the ID of the current challenge and starts the challenge
    start(challengeId) {
      this.$store.commit("setCurrentChallengeId", challengeId);
      this.$router.push("/goods");
    },
    viewFix(challengeId) {
      this.$store.commit("setCurrentChallengeId", challengeId);
      this.$router.push("/ChallengeFix");
    },
  },
};
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #ddd; /* Setting the background color of unfinished sections */
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adding a shadow effect to the progress bar */
}

.progress-bar {
  height: 50px; /* Height of the progress bar */
  background-color: #4caf50; /* Background color of the completed section */
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  transition: width 0.5s ease-in-out; /* Transition effect for smoother width changes */
}

.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch; /* Ensure that child elements are equal in height */
  justify-content: center;
  padding: 20px;
  gap: 50px;
  max-width: 1100px;
  margin: 50px auto;
}

.card_challenge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  box-sizing: border-box;
  margin: 20px 0;
  width: calc(50% - 40px);
}

@media (max-width: 768px) {
  .card_challenge {
    width: 100%; /* Single column display on smaller screens */
  }
}

.completed {
  background-color: #4caf50;
  color: #ffffff; /* Darker text color for readability on light background */
}

.button-container {
  display: flex;
  justify-content: space-between; /* Spacing between buttons */
  align-items: center;
  gap: 10px; /* Spacing between buttons */
  margin-top: 20px;
}

.button {
  flex-grow: 1;
  width: 180px;
  padding: 12px 20px;
  font-size: 16px;
  margin-top: auto;
  text-align: center;
  border: none;
  color: white;
  background-color: #4caf50;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #45a049;
}

.btn-restart,
.btn-fix {
  background-color: #476cff;
}

.btn-restart:hover,
.btn-fix:hover {
  background-color: #3159f7;
}

.success-image {
  width: 100px;
  height: auto;
  display: block;
  margin: 10px 0;
}
</style>
