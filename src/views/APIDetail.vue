<template>
  <div v-if="challengeDetails">
    <h1 class="name">{{ challengeDetails.challenge_name }}</h1>
  <div class="detail">
    <div v-html="formattedData"></div>
  </div>
    <!-- 展示其他挑战详细信息 -->
  </div>
  <div v-else>
    Loading challenge details...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      challengeID: null,
      challengeDetails: null
    };
  },
  activated() {
    // 从路由中获取挑战ID
    if (this.$route.query.challengeID !== undefined) {
      this.challengeID = this.$route.query.challengeID;
      this.getChallengeDetails(this.challengeID);
      console.log('challenges:', this.challengeID); // 调试输出处理后的数据
    }
  },
  methods: {
    getChallengeDetails(challengeID) {
      axios.post('/api/challenge/detail', { challengeID })
        .then(response => {
          this.challengeDetails = response.data;
          console.log(this.challengeDetails.challenge_details); // 看看输出中是否包含 \n 字符
        })
        .catch(error => {
          console.error('Error fetching challenge details:', error);
        });
    }
  },
  computed: {
    formattedData() {
      // 将换行符转换为HTML的<br>标签
      return this.challengeDetails.challenge_details.replace(/\\n/g, '<br>');
    }
  },
};
</script>

<style scoped>
.name{
  color:#4CAF50;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail {
  background-color: bisque; /* 浅棕色背景 */
  max-width: 800px; /* 最大宽度 */
  border-radius: 10px; /* 边角圆滑 */
  margin: 10px auto; /* 上下间隔10px, 左右自动居中 */
  padding: 10px; /* 内边距，用于在文本和背景框之间留出空间 */
  text-align: left; /* 文本右对齐 */
}


/* Carousel CSS */
.block {
  margin: 0 auto;
  max-width: 700px; /* Ensure the block container matches the image width */
}

/* Apply rounded corners to images within the carousel */
.el-carousel__item img {
  border-radius: 15px;  /* Rounded corners for images */
  max-width: 700px; /* Set max-width for images to ensure they fit in the container */
  width: 100%; /* Make images responsive within the container */
  display: block; /* Ensures no extra space at the bottom of the image */
}
/* Carousel CSS END */
</style>
