<template>
  <div class="challenge-container">
    <img
      src="@/assets/imgs/winner.png"
      alt="Challenge successful"
      class="success-image"
    />
    <div class="content">
      <h1 class="challenge-title">Challenge Successfully</h1>
      <div class="challenge-details">
        <p>Congratulations! You have successfully completed the challenge.</p>
        <p v-if="Number(currentChallengeId) === 1" style="font-size: 15px">
          Congratulations on successfully retrieving other users' order data
          from the API. This data is returned in JSON format. JSON is like a
          super sticky note for data, using simple key-value pairs to record all
          the information. By checking the API response, you can discover that
          you have obtained all the information you want.
        </p>
        <p v-if="Number(currentChallengeId) === 2" style="font-size: 15px">
          Congratulations! You've cheekily tweaked a membership attribute that
          was supposed to be set in stone. Check out the API's response to see
          the mischief you've managed to make. Keep up the playful spirit!
        </p>
        <p>Keep up the good work and continue to hone your skills.</p>
        <el-button type="primary" @click="goToDashboard"
          >Go to Scoreboard</el-button
        >
      </div>
    </div>
    <img
      src="@/assets/imgs/confetti.png"
      alt="Confetti left"
      class="confetti-image left"
    />
    <img
      src="@/assets/imgs/confetti.png"
      alt="Confetti right"
      class="confetti-image right"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import store from "@/store"; // 确保路径正确
export default {
  data() {
    return {
      currentChallengeId: store.getters.getCurrentChallengeId,
    };
  },
  computed: {
    ...mapGetters(["getCurrentChallengeId"]),
    ...mapMutations(["setCurrentChallengeId"]),
  },
  methods: {
    goToDashboard() {
      const challengeId = this.getCurrentChallengeId;
      const userData = localStorage.getItem("user");
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.user.user_id;

      const requestBody = {
        user_id: userId,
        challenge_id: challengeId,
        is_completed: 1, // Assuming is_completed is 1, which means the challenge is complete.
      };

      this.$store.commit("resetChallengeId");

      this.$axios
        .post("/api/challenge/add", requestBody)
        .then(() => {
          // Refresh the data on the Scoreboard page before redirection
          this.$router.push({ path: "/Scoreboard" }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          console.error("Error adding challenge status:", error);
        });
    },
  },
};
</script>

<style scoped>
.challenge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  background: linear-gradient(to right, #4caf50, #4caf50);
  color: #fff;
  font-family: "Arial", sans-serif;
  position: relative;
  padding-bottom: 60px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.challenge-title {
  font-size: 3em;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.challenge-details {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 900px;
}

.challenge-details p {
  font-size: 1.2em;
  margin: 10px 0;
}

.el-button {
  margin-top: 20px;
  background-color: #476cff;
  border-color: #476cff;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.el-button:hover {
  background-color: #3159f7;
  border-color: #3159f7;
}

.success-image {
  width: 100px;
  height: auto;
  display: block;
  margin: 0 auto 20px auto;
  top: 20px;
}

.confetti-image {
  width: 150px;
  height: auto;
  position: absolute;
  bottom: 10px;
}

.confetti-image.left {
  left: 10px;
}

.confetti-image.right {
  right: 10px;
  transform: scaleX(-1);
}
</style>

