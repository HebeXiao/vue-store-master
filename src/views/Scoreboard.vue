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
        v-for="challenge in challenges"
        :key="challenge.challenge_id"
        :class="['card_challenge', { completed: challenge.is_completed }]"
      >
        <h3>{{ challenge.challenge_name }}</h3>
        <p v-html="formattedDescription(challenge.challenge_description)"></p>
        <div class="button-container">
          <!-- Start/Re-challenge button -->
          <button
            @click="start(challenge.challenge_id)"
            class="button"
            :class="{
              'btn-restart': challenge.is_completed,
              'btn-start': !challenge.is_completed,
            }"
          >
            {{ challenge.is_completed ? "Challenge Again" : "Start Challenge" }}
          </button>
          <!-- Start Challenge Button with Interactive Guidance -->
          <button
            @click="startWithGuidance(challenge.challenge_id)"
            class="button"
            :class="{
              'btn-restart': challenge.is_completed,
              'btn-start': !challenge.is_completed,
            }"
          >
            {{
              challenge.is_completed
                ? "Again with Guidance "
                : "Start with Guidance"
            }}
          </button>
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
  </div>
</template>

<script>
import feedbackService from "@/feedbackService";
export default {
  data() {
    return {
      challenges: [],
      progress: 0,
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
    // Stores the ID of the current challenge and starts the challenge
    start(challenge_id) {
      this.$store.commit("setCurrentChallengeId", challenge_id);
      this.$router.push("/goods");
    },
    // Starting a guided challenge
    startWithGuidance(challengeId) {
      const guidance = true;
      this.$store.dispatch("startChallenge", {
        challengeId: challengeId,
        guidance: guidance,
      });
      // Provide different welcome message feedback based on different challengeIds
      let welcomeMessages = [];
      switch (challengeId) {
        case 1:
          welcomeMessages = [
            "Welcome to our Challenge! For this challenge, we will be looking at the Broken Object Level Authorization (BOLA) vulnerability. Please proceed carefully and observe the security implications.",
            "Please try to shop using the platform normally first and try to view your order. Watch for system responses and any possible security alerts.",
          ];
          break;
        case 2:
          welcomeMessages = [
            "Welcome to Challenge 2！",
            "Stay tuned for subsequent guidance.",
          ];
          break;
      }
      // Send messages
      feedbackService.sendFeedback(welcomeMessages[0]);
      setTimeout(() => {
        feedbackService.sendFeedback(welcomeMessages[1]);
      }, 5000); // Send with a delay of 5 seconds
      this.$router.push("/goods");
    },
    // Change the format
    formattedDescription(description) {
      return description.replace(/\\n/g, "<br>");
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
  margin: 10px 0;
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
}

.button {
  flex-grow: 1;
  width: 100%;
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

.btn-restart {
  background-color: #476cff;
}

.btn-restart:hover {
  background-color: #3159f7;
}

.success-image {
  width: 100px;
  height: auto;
  display: block;
  margin: 10px 0;
}
</style>
