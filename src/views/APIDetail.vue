<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#attack-vectors">Attack Vectors</a></li>
        <li><a href="#security-weakness">Security Weakness</a></li>
        <li><a href="#impact">Impact</a></li>
        <li><a href="#vulnerability-check">Vulnerability Check</a></li>
      </ul>
    </div>
    <div class="main-content">
      <img src="@/assets/imgs/detective.png" class="image" />
      <div v-if="challengeID === '1'">
        <h2 id="overview" class="centered-title">
          Broken Object Level Authorisation
        </h2>
        <p>
          Hey there, security adventurer! Today, let's dive into the world of
          Broken Object Level Authorization (BOLA). Get your magnifying glass
          ready, and let's start our detective journey!
        </p>
        <h3 id="attack-vectors">Attack Vectors</h3>
        <p>
          Imagine an attacker as a crafty fox, manipulating object IDs in requests
          to exploit weakly defended API endpoints. These object IDs could be
          sequential integers, UUIDs, or any generic string. Whether they appear
          in path parameters, query string parameters, request headers, or request
          payloads, attackers can always find them.
        </p>
        <h3 id="security-weakness">Security Weakness</h3>
        <p>
          In API-based applications, this vulnerability is very common. Server
          components often don't fully track client state and instead rely on
          parameters like object IDs sent from the client to decide which objects
          to access. The server's response is usually like a diary entry,
          revealing whether the request was successful.
        </p>
        <h3 id="impact">Impact</h3>
        <p>
          Unauthorized access to other users' objects can lead to data leaks, data
          loss, or data manipulation. Sometimes, it can even result in complete
          account takeovers. Yes, you heard that right, it's a big deal!
        </p>
        <h3 id="vulnerability-check">Does Your API Have This Vulnerability?</h3>
        <p>
          Object-level authorization is an access control mechanism usually
          implemented at the code level to ensure users can only access objects
          they are authorized to access.<br><br> Every API endpoint that receives an
          object ID and performs any operation on that object should implement
          object-level authorization checks. These checks should verify if the
          logged-in user is authorized to perform the requested action on the
          requested object.
        </p>
        <div class="button-container">
          <button @click="learnMore">Learn More</button>
        </div>
        <div class="button-container">
          <button @click="goBack">Back to Home</button>
        </div>
        <!-- 这里可以添加更多相关内容 -->
      </div>
      <div v-else-if="challengeID === '2'">
        <h2 class="centered-title">
          Broken Object Property Level Authorization
        </h2>
        <p>
          This challenge focuses on Broken Object Property Level Authorization. It
          involves exploiting vulnerabilities where the application doesn't
          correctly enforce permissions on individual properties of an object.
          Your goal is to manipulate these properties to access or modify
          restricted data.
        </p>
        <div class="button-container">
          <button @click="learnMore2">Learn More</button>
        </div>
        <div class="button-container">
          <button @click="goBack">Back to Home</button>
        </div>
        <!-- 这里可以添加更多相关内容 -->
      </div>
      <div v-else>
        <p>Invalid challenge ID.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      challengeID: this.$route.query.challengeID,
    };
  },
  watch: {
    "$route.query.challengeID": function (newVal) {
      this.challengeID = newVal;
    },
  },
  methods: {
    learnMore() {
      window.open(
        "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/",
        "_blank"
      );
    },
    learnMore2() {
      window.open(
        "https://owasp.org/API-Security/editions/2023/en/0xa3-broken-object-property-level-authorization/",
        "_blank"
      );
    },
    goBack() {
      this.$router.push("/");
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
  width: 180px;
  padding: 10px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  position: fixed;
  height: 200px;
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
.main-content {
  margin-left: 220px; /* 确保内容不会被侧边栏遮挡 */
  padding: 20px;
}
.api-detail {
  padding: 0 50px;
}

.centered-title {
  text-align: center;
  font-size: 30px;
  color: #45a049;
  margin-top: -50px;
}

.image {
  width: 100px; /* 调整图片的宽度 */
  height: auto; /* 使图片保持比例 */
  margin-left: 20px;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
}

p {
  font-size: 16px;
  line-height: 1.5;
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

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>
