<!-- Landing Page -->
<template>
  <div class="home" id="home" name="home">
    <div class="title">
      <h1>Welcome to our intentionally insecure application!</h1>
    </div>
    <div class="content">
      <div class="block">
        <el-carousel height="470px">
          <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
            <router-link
              :to="{
                name: 'APIDetail',
                query: { challengeID: item.carousel_id },
              }"
            >
              <img
                style="height: 470px"
                :src="item.imgPath"
                :alt="item.description"
              />
            </router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="introduction">
        <p>
          Welcome to the Playground of API Security Vulnerabilities! Explore our
          "slightly insecure" mock-up e-commerce website based on a
          microservices architecture. Are you ready to tackle two of the most
          critical vulnerabilities listed in the OWASP API Security Top 10?
        </p>
        <ul>
          <li>
            <router-link
              :to="{ name: 'APIDetail', query: { challengeID: '1' } }"
            >
              <el-button
                type="text"
                style="font-weight: bold; font-size: 16px; margin: -5px 0"
              >
                Broken Object Level Authorisation
              </el-button>
            </router-link>
          </li>

          <li>
            <router-link
              :to="{ name: 'APIDetail', query: { challengeID: '2' } }"
            >
              <el-button
                type="text"
                style="font-weight: bold; font-size: 16px; margin: -5px 0"
              >
                Broken Object Property Level Authorization
              </el-button>
            </router-link>
          </li>
        </ul>
        <p>
          Before you dive deep into the code abyss, don't forget to visit our
          <router-link to="/about" class="nav-link" style="color: #45a049"
            >Information Page</router-link
          >. It's packed with detailed descriptions of each vulnerability and
          related tutorials, plus an extensive architectural background of our
          simulated e-commerce platform. These resources are key to your journey
          towards becoming an API security master.
        </p>
        <p>
          Ready to take on the challenge? Log in and head over to the scoreboard
          page, where you can kick off your challenges, track your progress, and
          see if you can rise to the rank of defense master!
        </p>
      </div>
    </div>
    <div class="title">
      <h1>Have fun exploring!</h1>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      carousel: [
        {
          carousel_id: 1,
          imgPath: require("@/assets/imgs/homepage2.png"),
          description: "Image 1",
        },
        {
          carousel_id: 2,
          imgPath: require("@/assets/imgs/homepage1.png"),
          description: "Image 2",
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  list-style: none;
}

.title {
  font-size: 30px;
  color: #45a049;
  text-align: center;
  margin-top: -15px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 30px 30px;
}

.block {
  flex: 1; /* The rotating image takes up half the space */
  max-width: 50%;
}

.introduction {
  flex: 1; /* The introductory text takes up the other half of the space */
  padding: 0 20px;
  font-size: 18px;
  font-weight: 500;
}

.el-carousel__item img {
  border-radius: 15px;
  width: 100%;
  display: block;
}
</style>
