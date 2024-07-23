<template>
  <div class="container">
    <aside class="sidebar">
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#common-token-type">Common Token Type</a></li>
        <li><a href="#APIs">The Role of Token in APIs</a></li>
        <li><a href="#authorization">The Role of Token in Authorization</a></li>
        <li class="back-button"><button @click="goBack">Back</button></li>
      </ul>
    </aside>
    <main class="main-content">
      <h1 class="centered-title">What is Token?</h1>
      <div class="postman-content">
        <p id="introduction">
          A Token is a small packet of data used for authentication and
          authorization, usually consisting of a string of characters. It is
          generated after a user logs in and is used to authenticate the user in
          subsequent requests.
        </p>
        <div class="title-with-image" id="common-token-type">
          <img src="@/assets/imgs/postman1.png" class="postman-image" />
          <h2>1. Common Token Types - JWT（JSON Web Token）</h2>
        </div>
        <p>
          <strong style="color: #45a049">Structure:</strong><br />
          consists of Header, Payload and Signature, encoded in Base64.
          <br />
          <br />
          <strong style="color: #45a049">JWT workflow:</strong><br />
          1. User Login: The user logs in using credentials (e.g. username and
          password). 2. Generate JWT: After the server verifies that the user
          information is correct, it generates a JWT and returns it to the
          user.<br />
          3. User Request: The user includes the JWT in the HTTP header in
          subsequent requests, e.g. Authorization: Bearer token.<br />
          4. Validate JWT: After receiving the request, the server validates the
          validity of the JWT, including the signature, expiration time, and so
          on.<br />
          5. Processing the request: After the validation is passed, the server
          processes the request and returns the response.<br />
          <br />
          <strong style="color: #45a049">JWT Benefits: </strong><br />
          1. Compactness: JWT is compact and can be sent via URL, POST
          parameters or HTTP headers.<br />
          2. Self-contained: The JWT load contains all the necessary
          information, avoiding multiple queries to the database.<br />
          3. Security: The integrity of the token can be verified by signing it
          to prevent tampering. Sensitive information can be encrypted.<br />
          4. Cross-language support: JWT is in JSON format and supports multiple
          programming languages, making it easy to transfer between different
          platforms.<br />
        </p>
        <div class="title-with-image" id="APIs">
          <img src="@/assets/imgs/postman2.png" class="postman-image" />
          <h2>2. The Role of Token in APIs</h2>
        </div>
        <p>
          <strong style="color: #45a049">Secure Communication:</strong><br />
          1. Preventing unauthorized access: each API request needs to carry a
          Token, and the server prevents unauthorized access by verifying the
          Token to ensure that the request comes from an authorized user.<br />
          2. Protecting data: Token is usually encrypted to ensure that it is
          not stolen or tampered with during transmission, ensuring secure
          communication.
          <br />
          <strong style="color: #45a049">Statelessness:</strong><br />
          1. Simplifies server design: with each request carrying a Token, the
          server does not need to save the user's session state, thus
          simplifying the design.<br />
          2. Easily scalable: since the server does not need to maintain session
          state, it can be easily scaled up by adding servers to handle more
          requests.
          <br />
          <strong style="color: #45a049">Flexibility: </strong><br />
          1. Cross-platform use: Token can be passed between different clients
          and servers, supporting the integration of web applications, mobile
          applications, and third-party applications.<br />
          2. Support for different types of Token: Token can be generated as
          needed for short-term or long-term validity to meet different needs.
        </p>
        <div class="title-with-image" id="authorization">
          <img src="@/assets/imgs/postman4.png" class="postman-image" />
          <h2>3. The Role of Token in Authorization</h2>
        </div>
        <p>
          <strong style="color: #45a049">Authentication:</strong><br />
          1. Confirming the user's identity: When a user logs in, the server
          generates a Token and returns it to the user. This Token is used to
          prove the user's identity.<br />
          2. Simplify the login process: the user only needs to log in once, and
          each subsequent request will carry the Token, the server confirms the
          user's identity by verifying the Token, and there is no need to log in
          again each time.
          <br />
          <strong style="color: #45a049">Access Controls:</strong><br />
          1. Manage Privileges: Token can contain information about the user's
          privileges, and different Token can give the user different operation
          privileges.<br />
          2. Protecting Resources: By verifying the Token, the server can
          control the resources accessed by users, ensuring that only authorized
          users can perform specific operations.
          <br />
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
  height: 215px;
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
  width: 100%; /* Make the button expand to fill the list item */
  background-color: #f4f4f4; /* Match the sidebar background color */
  border: 1px solid #ddd; /* Add a subtle border */
  color: #45a049; /* Use the theme's green color */
  margin-top: -2px;
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
</style>
