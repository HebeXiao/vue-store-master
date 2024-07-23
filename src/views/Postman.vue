<template>
  <div class="container">
    <aside class="sidebar">
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#installing">Installing Postman</a></li>
        <li><a href="#creating-request">Creating a New Request</a></li>
        <li><a href="#request_editor">Request Editor</a></li>
        <li>
          <a href="#inspecting-debugging"
            >Inspecting and Debugging the Response</a
          >
        </li>
        <li class="back-button"><button @click="goBack">Back</button></li>
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
          Once installed, open Postman and follow these steps to create a new
          API request: <br />
          1. Click "+" to create a new request. <br />
          2. Select the request method <br />
          3. Enter the API URL in the request field. <br />
          4. Click "Send" to start the test.<br />
          5. After the test is completed, you can see the status 200, indicating
          that the API is connected and returns the result successfully.<br />
          6. The result value returned by the GET API is a JSON file.
        </p>
        <img src="@/assets/imgs/postman3.png" class="guidance-image" />
        <div class="title-with-image" id="request_editor">
          <img src="@/assets/imgs/postman7.png" class="postman-image" />
          <h2>3. Request Editor</h2>
        </div>
        <p>
          The Request Editor is the main interface part of Postman for building,
          editing and sending API requests, allowing the user to set various
          parameters of the request in detail, such as the URL, method, header
          information, request body, authentication method, and so on.<br />
          <strong style="color: #45a049">1. Params: </strong>This tab is used to
          edit the query parameters of the URL. Query parameters are key-value
          pairs appended to the URL and are usually used to pass additional
          information to the server.
        </p>
        <div>
          <button
            @click="showExample1 = !showExample1"
            style="margin-top: -5px"
          >
            {{ showExample1 ? "Hide Example" : "Show Example" }}
          </button>
          <div v-if="showExample1" class="example_container">
            Let's say you want to query a user with the username “example”, your
            base URL is https://api.example.com/users, and under the Params tab,
            you can add a query parameter: <br /><strong>Key: </strong>username
            <br /><strong>Value: </strong> example <br />Postman will
            automatically format these parameters and append them to the URL,
            which will be <br />
            <strong>https://api.example.com/users?username=example</strong>.
          </div>
        </div>
        <p>
          <strong style="color: #45a049">2. Auth: </strong>The Auth tag is used
          to configure the authentication method for the request.Postman
          supports a variety of authentication protocols, such as Basic Auth,
          Bearer Token, and so on.If the API requires a Bearer Token to
          authenticate the user, you can select “Bearer Token” in the Auth tab
          and enter your token; Postman will automatically add the appropriate
          authentication header when sending the request.<br />
        </p>
        <div>
          <button
            @click="showExample2 = !showExample2"
            style="margin-top: -5px"
          >
            {{ showExample2 ? "Hide Example" : "Show Example" }}
          </button>
          <div v-if="showExample2" class="example_container">
            <img src="@/assets/imgs/postman5.png" class="guidance-image" />
          </div>
        </div>
        <p>
          <strong style="color: #45a049">3. Headers: </strong>The Headers tag is
          used to define the headers of an HTTP request. Headers can contain a
          lot of useful information such as content type, authentication
          information, etc.
        </p>
        <div>
          <button
            @click="showExample3 = !showExample3"
            style="margin-top: -5px"
          >
            {{ showExample3 ? "Hide Example" : "Show Example" }}
          </button>
          <div v-if="showExample3" class="example_container">
            If you are sending data in JSON format, you may need to set the
            Content-Type header to application/json. this can be done by adding
            it under the Headers tag: <br /><strong>Key: </strong>Content-Type
            <br /><strong>Value: </strong> application/json
          </div>
        </div>
        <p>
          <strong style="color: #45a049">4. Body: </strong>The Body tag is used
          to edit the content body of a POST or PUT request. You can choose from
          different content types such as form-data, x-www-form-urlencoded, raw
          (JSON, text, JavaScript, etc.).
        </p>
        <div>
          <button
            @click="showExample4 = !showExample4"
            style="margin-top: -5px"
          >
            {{ showExample4 ? "Hide Example" : "Show Example" }}
          </button>
          <div v-if="showExample4" class="example_container">
            Suppose you need to send a JSON object to create a new user, you can
            choose the Body type as “raw”, the format as “JSON”, and then enter
            the following content:
            <pre
              style="
                background-color: #f4f4f4;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
              "
            ><code>
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}

</code></pre>
          </div>
        </div>
        <p>
          <strong style="color: #45a049">5. Scripts: </strong>The Scripts tag
          allows you to write JavaScript code that can be executed before a
          request is sent (Pre-request Script) or after a request (Tests).<br />
        </p>
        <img src="@/assets/imgs/postman9.png" class="guidance-image" />
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["previousPageSection"]),
  },
  data() {
    return {
      showExample1: false, // 初始状态为不显示
      showExample2: false, // 初始状态为不显示
      showExample3: false, // 初始状态为不显示
      showExample4: false,
      // 你的数据属性
    };
  },
  methods: {
    goBack() {
      if (this.previousPageSection) {
        this.$router.push(this.previousPageSection);
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
  height: 260px;
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

.sidebar li.back-button {
  text-align: center; /* Center the button within the list item */
}

.sidebar li.back-button button {
  margin-top: -2px;
  width: 100%; /* Make the button expand to fill the list item */
  background-color: #f4f4f4; /* Match the sidebar background color */
  border: 1px solid #ddd; /* Add a subtle border */
  color: #45a049; /* Use the theme's green color */
}

.sidebar li.back-button button:hover {
  background-color: #e0e0e0; /* Slightly darker on hover for feedback */
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

.example_container {
  padding: 10px;
  background-color: #f4f4f4;
  margin-top: 5px;
  border-radius: 5px;
}
</style>
