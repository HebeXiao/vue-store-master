<template>
  <div class="challenge-container">
    <h1 class="challenge-title">Challenge Successfully</h1>
    <div class="challenge-details">
      <!-- 展示其他挑战详细信息 -->
      <p>Congratulations! You have successfully completed the challenge.</p>
      <p>Keep up the good work and continue to hone your skills.</p>
      <el-button type="primary" @click="goToDashboard">Go to Scoreboard</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getCurrentChallengeId'])
  },
  methods: {
    goToDashboard() {
    const challengeId = this.getCurrentChallengeId;
    console.log('Current Challenge ID:', challengeId);

    // 添加一条数据到 challenge_status 表中
    const userData = localStorage.getItem('user');

    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData.user.user_id;
    console.log('Current User ID:', userId);
    const requestBody = {
        user_id: userId,
        challenge_id: challengeId,
        is_completed: 1 // 假设 is_completed 为 1 表示挑战完成
    };

    this.$axios.post('/api/challenge/add', requestBody)
        .then(response => {
        console.log('Challenge status added:', response.data);
        // 在重定向之前刷新 Scoreboard 页面的数据
        this.$router.push({ path: '/Scoreboard' }).then(() => {
            window.location.reload(); // 强制刷新页面
        });
        })
        .catch(error => {
        console.error('Error adding challenge status:', error);
        });
    }
  }
};
</script>

<style scoped>
.challenge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.challenge-title {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.challenge-details {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 600px;
}

.challenge-details p {
  font-size: 1.2em;
  margin: 10px 0;
}

.el-button {
  margin-top: 20px;
}
</style>
