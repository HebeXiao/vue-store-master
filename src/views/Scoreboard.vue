<template>
  <div v-if="challenges.length">
    <!-- Show progress -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }">
        <span class="progress-text">Challenge Progress: {{ progress.toFixed(2) }}%</span>
      </div>
    </div>
    <!-- Show all challenge -->
    <div class="card">
      <div v-for="challenge in challenges" :key="challenge.challenge_id"
          :class="['card_challenge', { 'completed': challenge.is_completed }]">
        <h3>{{ challenge.challenge_name }}</h3>
        <p>{{ challenge.challenge_description }}</p>
        <div class="button-container">
          <!-- 原有的开始/重新挑战按钮 -->
          <button
            @click="start(challenge.challenge_id)"
            class="button"
            :class="{ 'btn-restart': challenge.is_completed, 'btn-start': !challenge.is_completed }">
            {{ challenge.is_completed ? 'Challenge Again' : 'Start Challenge' }}
          </button>
          <!-- 新增的带交互式指导的开始挑战按钮 -->
          <button
            @click="startWithGuidance(challenge.challenge_id)"
            class="button"
            :class="{ 'btn-restart': challenge.is_completed, 'btn-start': !challenge.is_completed }">
            {{ challenge.is_completed ? 'Again with Guidance ' : 'Start with Guidance' }}
          </button>
        </div>
        <!-- 条件渲染成功文本 -->
        <p v-if="challenge.is_completed" class="success-text">Challenge successful!</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No challenges found.</p>
    <!-- 显示进度即使没有挑战 -->
    <p class="progress">Progress: {{ progress.toFixed(2) }}%</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      challenges: [],
      user_id: null, // 初始化 user_id
      progress: 0 // 用户完成挑战的百分比
    };
  },
  mounted() {
    this.fetchChallenges();
    this.fetchProgress();
  },
  methods: {
    fetchChallenges() {
      // 添加一条数据到 challenge_status 表中
      const userData = localStorage.getItem('user');

      const parsedUserData = JSON.parse(userData);
      const user_id = parsedUserData.user.user_id;
      this.user_id = user_id; // 赋值给 data 中的 user_id

      const requestBody = {
        user_id: user_id
      };
      this.$axios.post('/api/challenge/list', requestBody)
        .then(response => {
          this.challenges = response.data.map(challenge => ({
            ...challenge,
            isCompleted: challenge.isCompleted === 1 // 转换为布尔值
          }));
        })
        .catch(error => {
          console.error('Error fetching challenges:', error);
        });
    },
    fetchProgress() {
      if (this.user_id) {
        this.$axios.post('/api/challenge/progress', { user_id: this.user_id })
          .then(response => {
            this.progress = response.data;
          })
          .catch(error => {
            console.error('Error fetching progress:', error);
          });
      }
    },
    start(challenge_id) {
      // 存储当前挑战的 ID
      this.$store.commit('setCurrentChallengeId', challenge_id);
      console.log('current challenge:', challenge_id);
      // 然后跳转到 goods 页面
      this.$router.push('/goods');
    },
    startWithGuidance(challenge_id) {
      // 存储当前挑战的 ID
      this.$store.commit('setCurrentChallengeId', challenge_id);
      console.log('current challenge:', challenge_id);
      // 然后跳转到 goods 页面
      this.$router.push('/goods');
    }
  }
}
</script>

<style scoped>
/* 保持现有样式 */
.progress-container {
    width: 100%; /* 设置外部容器的宽度 */
    background-color: #ddd; /* 设置未完成部分的背景色 */
    border-radius: 5px; /* 圆角 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* 给进度条添加阴影效果 */
}

.progress-bar {
    height: 50px; /* 进度条的高度 */
    background-color: #4CAF50; /* 已完成部分的背景色 */
    text-align: center; /* 文字居中 */
    line-height: 50px; /* 设置行高以垂直居中文字 */
    color: white; /* 文字颜色 */
    border-radius: 5px; /* 圆角 */
    transition: width 0.5s ease-in-out; /* 过渡效果使宽度变化更平滑 */
}

.progress-text {
    font-weight: bold; /* 加粗文字 */
}

.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch; /* 确保子元素高度相等 */
  justify-content: center;
  padding: 20px;
  gap: 50px;
  max-width: 1100px;
  margin: 50px auto;
}

.card_challenge {
  display: flex;
  flex-direction: column;
  align-items: center; /* 中心对齐子元素 */
  padding: 20px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  box-sizing: border-box;
  margin: 10px 0;
  width: calc(50% - 40px); /* 维持已有的宽度设置 */
}

@media (max-width: 768px) {
  .card_challenge {
    width: 100%; /* 在较小屏幕上单列显示 */
  }
}


.completed {
  background-color: #4CAF50;
  color: #FFFFFF; /* Darker text color for readability on light background */
}

.success-text {
  text-align: center; /* 文本居中 */
  color: #FF69B4; /* 明亮的粉红色 */
  font-family: 'Comic Sans MS', 'Chalkboard SE', 'Arial', sans-serif; /* 可爱的字体 */
  font-size: 18px; /* 字体大小 */
  font-weight: bold; /* 字体加粗 */
  background-color: #FFFFE0; /* 浅黄色背景 */
  border-radius: 10px; /* 圆角边框 */
  padding: 10px 20px; /* 增加内边距使文本更为醒目 */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* 轻微阴影 */
  margin: 10px 0; /* 上下边距，确保与其他内容有间隔 */
}

.button-container {
  display: flex;      /* 使用Flexbox */
  justify-content: space-between; /* 如果希望按钮之间有间隔，使用space-between */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px;           /* 按钮之间的间隔 */
}

.button {
  flex-grow: 1;   
  width: 100%; /* 按钮宽度充满容器 */
  padding: 12px 20px; /* 增加内边距，使按钮更高 */
  font-size: 16px; /* 可以调整字体大小 */
  margin-top: auto; /* 推到容器底部 */
  text-align: center; /* 文本居中 */
  border: none;
  color: white;
  background-color: #4CAF50; /* 按钮背景颜色 */
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* 平滑背景色变化 */
}

.button:hover {
  background-color: #45A049; /* 悬停时颜色变深 */
}

/* 如果使用不同的类名为每种按钮设置不同样式 */
.btn-restart {
  background-color: #476cff; /* 重新挑战按钮的颜色 */
}

.btn-restart:hover {
  background-color: #3159f7; /* 悬停时颜色 */
}


.progress {
  font-size: 20px; /* Larger font size for better visibility */
  color: darkblue; /* Make the text color blue to differentiate it */
  font-weight: bold;
  margin-bottom: 20px; /* Add some space below the progress */
}
</style>
