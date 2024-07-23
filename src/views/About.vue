<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li><a href="#section1">API Security Class Schedule</a></li>
        <li><a href="#section2">Secrets of Architecture</a></li>
        <li><a href="#section3">RESTful API</a></li>
        <li><a href="#section4">Token</a></li>
        <li><a href="#section5">Developer Tools</a></li>
        <li><a href="#section6">Postman</a></li>
        <li class="back-button"><button @click="goBack">Back</button></li>
      </ul>
    </div>
    <div class="main-content">
      <!-- 你的模板内容 -->
      <h1 class="centered-title">Information Hub</h1>
      <div class="postman-content">
        <p>
          Greetings to our info hub! This is a source of API security knowledge.
          Ready to outsmart hackers? Join us to uncover the secrets of
          protecting APIs!
        </p>
        <div id="section1" class="title-with-image">
          <img src="@/assets/imgs/postman1.png" class="postman-image" />
          <h2>1. Your API Security Class Schedule</h2>
        </div>
        <p>
          We've prepared "mini-lessons" on the OWASP Top 10 API Security Risks,
          including:
        </p>
        <ul>
          <li>
            <router-link
              :to="{ name: 'APIDetail', query: { challengeID: '1' } }"
            >
              <el-button type="text" style="font-weight: bold; font-size: 16px">
                Broken Object Level Authorisation
              </el-button>
            </router-link>
          </li>

          <li>
            <router-link
              :to="{ name: 'APIDetail', query: { challengeID: '2' } }"
            >
              <el-button type="text" style="font-weight: bold; font-size: 16px">
                Broken Object Property Level Authorization
              </el-button>
            </router-link>
          </li>
        </ul>
        <p>
          Each "lesson" comes with detailed case studies, not just telling you
          "what" but more importantly "why" and "how to fix it".
        </p>
        <div id="section2" class="title-with-image">
          <img src="@/assets/imgs/postman2.png" class="postman-image" />
          <h2>2. The Secrets of Architecture</h2>
        </div>
        <p>
          Our simulated e-commerce platform is ingeniously crafted using a
          microservices architecture, designed to enhance both flexibility and
          resilience. In this structure, we break down the platform into four
          key services—User, Product, Order, and Cart. Each service operates
          independently yet communicates seamlessly with the others through
          RESTful APIs.
        </p>
        <p>
          <strong style="color: #45a049">1. User Service: </strong> Manages user
          authentication and profile data. This is the gatekeeper of personal
          and sensitive data, making security paramount.<br />
          <strong style="color: #45a049">2. Product Service: </strong> Handles
          everything related to product listings, descriptions, and inventory
          levels. It’s crucial for maintaining accurate and secure product
          data.<br />
          <strong style="color: #45a049">3. Order Service: </strong> Responsible
          for processing orders, including payment transactions. This service is
          a hotbed for financial data and thus a critical point for security.<br />
          <strong style="color: #45a049">4. Cart Service: </strong>Manages the
          shopping cart operations, interacting closely with the Product and
          Order services to ensure smooth transaction flows.
        </p>
        <img src="@/assets/imgs/architecture.png" class="guidance-image" />
        <div id="section3" class="title-with-image">
          <img src="@/assets/imgs/postman4.png" class="postman-image" />
          <h2>3. What is a RESTful API?</h2>
        </div>
        <p>
          RESTful API stands for Representational State Transfer API. It's a way
          for different parts of a computer program or different programs to
          talk to each other in a simple and predictable way. Imagine it as a
          set of rules that help software components communicate.RESTful APIs
          use standard web methods like those used for web pages, primarily HTTP
          (the protocol browsers use to communicate with websites).Each request
          from your phone or computer to the server must include all the
          information the server needs to understand it. This means the server
          doesn't need to remember anything about the user after the request is
          done.
        </p>
        <p><strong>Simple Commands:</strong></p>
        <p>
          <strong style="color: #45a049">GET to retrieve information</strong>
          <br />
          <strong style="color: #45a049">POST to send new information</strong
          ><br />
          <strong style="color: #45a049"
            >PUT to change existing information </strong
          ><br />
          <strong style="color: #45a049"
            >DELETE to remove existing information</strong
          >
        </p>
        <p>
          Even though RESTful APIs are simple, they need to be secured to
          prevent unauthorized access.
        </p>
        <div id="section4" class="title-with-image">
          <img src="@/assets/imgs/postman6.png" class="postman-image" />
          <h2>4. Token</h2>
        </div>
        <p>
          A token is a small piece of information, usually encrypted, that is
          issued by an authentication server when a user or service is
          authenticated. When a user logs in, the authentication server verifies
          the user's credentials (e.g., username and password) and issues a
          token. Thereafter, when accessing other services, the user simply
          attaches this token to the request instead of reusing the username and
          password.<br /><br />
          In Java microservices frameworks such as Spring Boot, it is common to
          use JWT (JSON Web Token) as a token implementation.JWT is a widely
          used open standard (RFC 7519) that defines a clean, self-contained way
          to securely pass information between two communicating parties in JSON
          objects. Each message is digitally signed to verify the authenticity
          of the message.JWT is often used for Bearer tokens, which are simply
          passed in the Authorization header of an HTTP request.
        </p>
        <button
          @click="learnMoreToken"
          style="font-weight: bold; font-size: 16px"
        >
          View Details
        </button>
        <div id="section5" class="title-with-image">
          <img src="@/assets/imgs/postman6.png" class="postman-image" />
          <h2>5. Introduction to Developer Tools</h2>
        </div>
        <p>
          Developer tools, often referred to as "DevTools," are software
          applications that help developers create, test, and debug their
          software. These tools are essential for efficient development and are
          integrated into many of the web browsers and development environments
          we use today. They provide a deep insight into the internals of
          applications running in the browser or on other platforms.
        </p>
        <button
          @click="learnMoreDeveloper"
          style="font-weight: bold; font-size: 16px"
        >
          View Details
        </button>
        <div id="section6" class="title-with-image">
          <img src="@/assets/imgs/postman7.png" class="postman-image" />
          <h2>6. Introduction to Postman</h2>
        </div>
        <p>
          Postman is a popular software development tool used primarily for
          building and testing APIs. It provides a user-friendly graphical
          interface that allows developers to create, send, and analyze HTTP
          requests and responses.
        </p>
        <button @click="learnMore" style="font-weight: bold; font-size: 16px">
          View Details
        </button>
      </div>
      <div class="button-container">
        <button @click="goBack">Back to Home</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 你的数据属性
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    learnMore() {
      this.$router.push("/Postman");
    },
    learnMoreDeveloper() {
      this.$router.push("/DevTools");
    },
    learnMoreToken() {
      this.$router.push("/Token");
    },
  },
};
</script>

<style scoped>
* {
  list-style: none;
}
.container {
  display: flex;
}
.sidebar {
  width: 220px;
  padding: 5px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  position: fixed;
  height: 250px;
  overflow-y: auto;
  margin-top: -20px;
}
.sidebar ul {
  padding: 0;
}
.sidebar ul li {
  margin-bottom: 10px;
}
.sidebar ul li a {
  text-decoration: none;
  color: #45a049;
}
.sidebar ul li a:hover {
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
  margin-left: 220px; /* 确保内容不会被侧边栏遮挡 */
  padding: 20px;
}
/* 你的样式 */
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
  font-size: 18px;
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

.guidance-image {
  width: 450px;
  display: block;
  margin: 20px auto; /* 水平居中 */
}
</style>
