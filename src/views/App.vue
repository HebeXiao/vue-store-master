<!-- Teaching Tool的首页 -->
<template>
  <div class="home" id="home" name="home">
    <div class="title">
      <h1>Web Application Exploits and Defenses</h1>
    </div>
    <div class="content">
      <div class="block">
        <el-carousel height="470px">
          <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
            <router-link :to="{ name: 'APIDetail', query: { challengeID: item.carousel_id }}">
              <img style="height:470px;" :src="item.imgPath" :alt="item.description" />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="introduction">
        <p style="color: #45A049;font-size: 20px">Welcome to our intentionally insecure application!</p>
        <p>In this tool designed to demonstrate and educate on API security vulnerabilities, 
          you will have the opportunity to challenge and explore an insecure e-commerce mock-up website 
          based on a microservices architecture. This challenge covers two critical vulnerabilities from 
          the OWASP API Security Top 10:</p>
        <ul>
          <li>
            <router-link :to="{ name: 'APIDetail', query: { challengeID: '1' }}">
              <el-button type="text" style="font-weight: bold; font-size: 16px;">
                API1:2023 Broken Object Level Authorisation
              </el-button>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'APIDetail', query: { challengeID: '2' }}">
              <el-button type="text" style="font-weight: bold; font-size: 16px;">
                API3:2023 Broken Object Property Level Authorization
              </el-button>
            </router-link>
          </li>
        </ul>
        <p>Before you start exploring, You can also visit the information page, 
          which provides a detailed description of each vulnerability and related tutorials. Besides, it is also recommended that you can visit our 
          <router-link to="/about" class="nav-link" style="color: #409EFF">information page</router-link>
        , which provides a detailed architectural background of the simulated e-commerce platform.</p>
        <p>When you're ready to start the challenge, you can log in and go to the scoreboard page to begin the challenge, 
          where you can also view your challenge progress and achievements.</p>
        <p>If you're a beginner in cybersecurity, don't worry, you have the option to turn on interactive tips 
          when you start the challenge to help you understand and overcome each challenge step-by-step. 
          Our goal is to improve your understanding of cybersecurity strategies through practice and interaction.</p>
        <p style="color: #45A049;font-size: 20px">Have fun exploring!</p>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      carousel: [
        { carousel_id: 1, imgPath: require('@/assets/imgs/homepage2.png'), description: 'Image 1' },
        { carousel_id: 2, imgPath: require('@/assets/imgs/homepage1.png'), description: 'Image 2' }
      ],
    };
  }
};
</script>

<style scoped>
*{
  list-style: none;
}
.title{
  font-size: 30px;
  color:#45A049;
  text-align: center;
  margin: 5px 10px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 确保子元素顶部对齐 */
  margin: 30px 30px;
}

.block {
  flex: 1;  /* 轮播图占据一半的空间 */
  max-width: 50%; /* 限制最大宽度 */
}

.introduction {
  flex: 1;  /* 介绍文本占据另一半的空间 */
  padding: 0 20px;
}

.el-carousel__item img {
  border-radius: 15px;
  width: 100%; /* 保证图片响应式填充容器 */
  display: block;
}
</style>
