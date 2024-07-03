<template>
  <div class="challenge-container">
    <img src="@/assets/imgs/winner.png" alt="Challenge successful" class="success-image">
    <div class="content">
      <h1 class="challenge-title">Challenge Successfully</h1>
      <div class="challenge-details">
        <!-- 展示其他挑战详细信息 -->
        <p>Congratulations! You have successfully completed the challenge.</p>
        <p>Keep up the good work and continue to hone your skills.</p>
        <el-button type="primary" @click="goToDashboard">Go to Scoreboard</el-button>
      </div>
    </div>
    <img src="@/assets/imgs/confetti.png" alt="Confetti left" class="confetti-image left">
    <img src="@/assets/imgs/confetti.png" alt="Confetti right" class="confetti-image right">
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

    // 添加一条数据到 challenge_status 表中
    const userData = localStorage.getItem('user');

    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData.user.user_id;

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
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 禁用滚动条 */
}

#app {
  height: 100%; /* 确保根容器高度为100% */
}

.challenge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; /* 使用视口高度 */
  background: linear-gradient(to right, #4CAF50, #4CAF50);
  color: #fff;
  font-family: 'Arial', sans-serif;
  position: relative; /* 为了放置绝对定位的图片 */
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background-color: #476cff;
  border-color: #476cff;
  color: #fff;
  border-radius: 5px;
  transition: background-color 0.3s; /* 平滑背景色变化 */
}

.el-button:hover {
  background-color: #3159f7;
  border-color: #3159f7;
}

.success-image {
  width: 100px; /* 或者任何适合的尺寸 */
  height: auto;
  display: block; /* 确保图片正确显示 */
  margin: 0 auto 20px auto; /* 使其在上方正中间 */
  top: 20px; /* 根据需要调整位置 */
}

.confetti-image {
  width: 150px; /* 或者任何适合的尺寸 */
  height: auto;
  position: absolute; /* 使其绝对定位 */
  bottom: 10px; /* 固定在底部 */
}

.confetti-image.left {
  left: 10px; /* 左下角位置 */
}

.confetti-image.right {
  right: 10px; /* 右下角位置 */
  transform: scaleX(-1); /* 水平翻转 */
}
</style>

