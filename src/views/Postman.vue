<!-- src/views/ChallengeFix.vue -->
<template>
  <div class="container">
    <aside class="sidebar">
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#installing">Installing Postman</a></li>
        <li><a href="#creating-request">Creating a New Request</a></li>
        <li><a href="#adding-headers">Adding Request Headers</a></li>
        <li><a href="#inspecting-debugging">Inspecting and Debugging the Response</a></li>
      </ul>
    </aside>
    <main class="main-content">
      <h1 class="centered-title">Using Postman to Explore and Test APIs</h1>
      <div class="postman-content">
        <p id="introduction">
          Postman is a powerful tool designed for testing and developing APIs.
          Here’s a comprehensive tutorial to help you master the basic skills
          needed to complete your API challenge.
        </p>
        <div class="title-with-image" id="installing">
          <img src="@/assets/imgs/postman1.png" class="postman-image" />
          <h2>1. Installing Postman</h2>
        </div>
        <p>
          First, you need to download and install Postman. Visit
          <a
            class="link"
            href="https://www.postman.com/downloads/"
            target="_blank"
            >the Postman website</a
          >
          to download the version for your operating system and follow the
          installation instructions.
        </p>
        <div class="title-with-image" id="creating-request">
          <img src="@/assets/imgs/postman2.png" class="postman-image" />
          <h2>2. Creating a New Request</h2>
        </div>
        <p>
          Once installed, open Postman and follow these steps to create a new API
          request: <br />
          1. Click "+" to create a new request. <br />
          2. Select the request method <br />
          3. Enter the API URL in the request field. <br />
          4. Click "Send" to start the test.<br />
          5. After the test is completed, you can see the status 200, indicating
          that the API is connected and returns the result successfully.<br />
          6. The result value returned by the GET API is a JSON file.
        </p>
        <img src="@/assets/imgs/postman3.png" class="guidance-image" />
        <div class="title-with-image" id="adding-headers">
          <img src="@/assets/imgs/postman4.png" class="postman-image" />
          <h2>3. Adding Request Headers</h2>
        </div>
        <p>
          Some API requests require specific headers, such as a token for
          authentication. Several types of authorization are supported by Postman.
          Select a type from the Type dropdown list on the Authorization tab of a
          request.<br />
          【Ps. Bearer tokens enable requests to authenticate using an access key,
          such as a JSON Web Token (JWT). The token is a text string, included in
          the request header. In the request Authorization tab, select Bearer
          Token from the Type dropdown list. In the Token field, enter your API
          key value.】
        </p>
        <img src="@/assets/imgs/postman5.png" class="guidance-image" />
        <div class="title-with-image" id="inspecting-debugging">
          <img src="@/assets/imgs/postman6.png" class="postman-image" />
          <h2>4. Inspecting and Debugging the Response</h2>
        </div>
        <p>
          If your request is rejected or returns an error, you can inspect and
          debug it by following these steps:<br />
          1. Check the response status code. For example, 401 indicates
          unauthorized access, which might mean an invalid or missing token.<br />
          2. Review the response headers and body for error messages to identify
          the issue.<br />
          3. Go back and modify your request. For example, verify and ensure the
          token is correct or adjust request parameters.<br />
        </p>
      </div>
      <div class="button-container">
        <button @click="goBack">Back</button>
        <button @click="learnMore">Learn More</button>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isPreviousPageSection']),
  },
  data() {
    return {
      // 你的数据属性
    };
  },
  methods: {
    goBack() {
      if (this.isPreviousPageSection) {
        this.$router.push('/about');
      } else {
        this.$router.go(-1);
      }
    },
    learnMore() {
      window.open(
        "https://learning.postman.com/docs/getting-started/basics/postman-basics/",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
/* 样式 */
.container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #f4f4f4;
  padding: 5px;
  border-right: 1px solid #ddd;
  position: fixed;
  height: 230px;
  margin-top: -20px;
  overflow-y: auto;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  color: #45a049;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}

.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 220px; /* 确保主内容不被固定的侧边栏覆盖 */
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #357938;
}

.centered-title {
  text-align: center;
  font-size: 30px;
  color: #45a049;
}

.postman-content {
  padding: 0 50px;
}

.title-with-image {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.postman-image {
  width: 30px; /* 调整图片的宽度 */
  height: auto; /* 使图片保持比例 */
  margin-right: 10px; /* 调整图片与标题之间的间距 */
}

h2 {
  font-size: 18px;
  margin: 0; /* 确保标题与图片在同一行 */
}

.link {
  color: #0056b3;
}

.guidance-image {
  width: 500px;
  display: block;
  margin: 20px auto; /* 水平居中 */
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px; /* 按钮之间的间距 */
  margin-bottom: 30px;
}
</style>
