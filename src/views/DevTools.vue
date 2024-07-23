<template>
  <div class="container">
    <aside class="sidebar">
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#launching">Launching Developer Tools</a></li>
        <li><a href="#view-requests">View API Requests</a></li>
        <li><a href="#network">Network Panel Information</a></li>
        <li><a href="#send-requests">Send API Requests</a></li>
        <li><a href="#discover-token">Discover Token</a></li>
        <li><a href="#send-token-requests">Send API Request with Token</a></li>
        <li class="back-button"><button @click="goBack">Back</button></li>
      </ul>
    </aside>
    <main class="main-content">
      <!-- 你的模板内容 -->
      <h1 class="centered-title">
        Using Developer Tools to Explore and Test APIs
      </h1>
      <div class="devtools-content">
        <p id="introduction">
          Developer Tools are powerful features built into modern browsers
          designed to help developers and security researchers debug, analyze,
          and optimize web pages. By using these tools, you can view the source
          code of web pages, debug JavaScript, analyze network requests and
          responses, detect performance bottlenecks, and perform security
          checks. This tutorial will help you utilize developer tools to
          identify and exploit API requests to understand vulnerabilities
          related to API security and improve your cybersecurity skills.
        </p>
        <div class="title-with-image" id="launching">
          <img src="@/assets/imgs/postman1.png" class="devtools-image" />
          <h2>1. Launching Developer Tools</h2>
        </div>
        <p>
          To use Developer Tools, you need to open it first. Right-click on a
          web page and select “Inspect” or press Ctrl+Shift+I (Windows) or
          Cmd+Option+I (Mac). Once Developer Tools opens, you'll see a window
          with multiple tabs, such as Elements, Console, Network, and so on.
        </p>
        <img src="@/assets/imgs/devtools1.png" class="guidance-image" />
        <p><strong>Common Tab Functions</strong></p>
        <p>
          <strong style="color: #45a049">1. Console: </strong> Debug JavaScript
          code, view and output variable values, detect script errors and
          warnings.<br />
          <strong style="color: #45a049">2. Network: </strong> Monitor all
          network requests and responses, analyze API requests and responses,
          and examine request and response headers.<br />
          <strong style="color: #45a049">3. Application: </strong> Manage
          application-related resources for the web page.<br />
        </p>
        <div class="title-with-image" id="view-requests">
          <img src="@/assets/imgs/postman1.png" class="devtools-image" />
          <h2>2. View API Requests</h2>
        </div>
        <p>
          To use Developer Tools, you need to open it first. Right-click on a
          web page and select “Inspect” or press Ctrl+Shift+I (Windows) or
          Cmd+Option+I (Mac). Once Developer Tools opens, you'll see a window
          with multiple tabs, such as Elements, Console, Network, and so on.
        </p>
        <img src="@/assets/imgs/devtools1.png" class="guidance-image" />
        <p><strong>Common Tab Functions</strong></p>
        <p>
          <strong style="color: #45a049">1. Console: </strong> Debug JavaScript
          code, view and output variable values, detect script errors and
          warnings.<br />
          <strong style="color: #45a049">2. Network: </strong> Monitor all
          network requests and responses, analyze API requests and responses,
          and examine request and response headers.<br />
          <strong style="color: #45a049">3. Application: </strong> Manage
          application-related resources for the web page.<br />
        </p>
        <div class="title-with-image" id="network">
          <img src="@/assets/imgs/postman2.png" class="devtools-image" />
          <h2>3. Network Panel Information</h2>
        </div>
        <p>
          In the Network panel in Developer Tools, you will see various tabs,
          each with a different function:
        </p>
        <p>
          <strong style="color: #45a049">1. Headers:</strong><br /><strong
            >General: </strong
          >Displays basic information about the request, such as URL, request
          method (GET, POST, etc.), status code and status message.<br />
          <strong>Request Headers: </strong> Displays information about the
          headers of the HTTP request sent to the server. The request headers
          contain metadata about the client and the request itself, such as
          Host, User-Agent, Accept, Content-Type, and so on.<br />
          <strong>Response Headers: </strong> displays the HTTP response headers
          returned by the server. The response headers contain metadata about
          the response and the server, such as Content-Type, Content-Length,
          Set-Cookie, and so on.<br />
          <strong style="color: #45a049">2. Payload:</strong><br />
          Used to see the data sent in a POST request. This usually includes
          form data, JSON objects, or other types of request body data. It shows
          the actual content portion of the request, making it easy for
          developers to debug and view the data passed to the server.<br />
          <strong style="color: #45a049">3. Preview:</strong><br />
          Displays a preview of the response data in an easy-to-read format,
          especially if the response content is in a parsable format such as
          JSON, XML, HTML, and so on. This tab helps the developer to quickly
          view and understand the response without having to read the original
          response text.<br />
          <strong style="color: #45a049">4. Response:</strong><br />
          Displays the full response content returned by the server. The
          response may be HTML, JSON, plain text, image, video, etc. This is the
          raw response data. This is the most raw response data, without any
          parsing and formatting, suitable for scenarios where you need to view
          detailed content.<br />
        </p>
        <p>
          In the Network tab, you will see a list of all network activity,
          including API requests. You can click on a request to see its details,
          including the request URL, method, status code, response data, and
          more.
        </p>
        <img src="@/assets/imgs/hint1.png" class="guidance-image" />
        <div class="title-with-image" id="send-requests">
          <img src="@/assets/imgs/postman4.png" class="devtools-image" />
          <h2>4. Send API request</h2>
        </div>
        <p>
          Developer tools usually do not directly support sending custom API
          requests. You can send custom API requests using Postman, a very
          popular tool for building and testing APIs. There is a detailed
          tutorial on this in Postman Tutorial. If you don't want to download
          Postman, you can use the Console to write JavaScript code to send
          requests.
        </p>
        <p><strong>Steps:</strong></p>
        <p>
          <strong style="color: #45a049"
            >1. Open the Console tab of the Developer Tools. </strong
          ><br />
          <strong style="color: #45a049"
            >2. Write and send a request using fetch or XMLHttpRequest. For
            example: </strong
          ><br />
        </p>
        <pre
          style="
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
          "
        ><code>
fetch('https://api.example.com/data', {
  method: 'GET'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
</code></pre>
        <div class="title-with-image" id="discover-token">
          <img src="@/assets/imgs/postman6.png" class="devtools-image" />
          <h2>5. Discover Token</h2>
        </div>
        <p>
          API requests often use Token for authentication. Here's how to find
          Token in Developer Tools:
        </p>
        <p><strong>Steps:</strong></p>
        <p>
          <strong style="color: #45a049"
            >1. Find and click on an API request in the Network tab. </strong
          ><br />
          <strong style="color: #45a049"
            >2. In the right panel, select the Headers sub-tab. </strong
          ><br />
          <strong style="color: #45a049"
            >3. In the Request Headers section, look for a header that contains
            fields such as Authorization, Token, and Bearer. </strong
          ><br />
        </p>
        <img src="@/assets/imgs/devtools3.png" class="guidance-image" />
        <div class="title-with-image" id="send-token-requests">
          <img src="@/assets/imgs/postman7.png" class="devtools-image" />
          <h2>6. Send API request with Token</h2>
        </div>
        <p>
          <strong style="color: #45a049"
            >1. Write the request code that contains the Token in the
            Console.</strong
          ><br />
          <strong style="color: #45a049"
            >2. Use fetch or XMLHttpRequest to set the request header to include
            the Token. For example: </strong
          ><br />
        </p>
        <pre
          style="
            background-color: #f4f4f4;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
          "
        ><code>
fetch('https://api.example.com/protected-data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
</code></pre>
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
        "https://developer.chrome.com/docs/devtools/overview",
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
  width: 220px;
  background-color: #f4f4f4;
  padding: 5px;
  border-right: 1px solid #ddd;
  position: fixed;
  margin-top: -20px;
  height: 315px;
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

.devtools-content {
  padding: 0 50px;
}

.title-with-image {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.devtools-image {
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
  width: 600px;
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
