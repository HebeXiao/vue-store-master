<template>
  <div class="container">
    <div class="sidebar">
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#attack-vectors">Attack Vectors</a></li>
        <li><a href="#security-weakness">Security Weakness</a></li>
        <li><a href="#impact">Impact</a></li>
        <li><a href="#vulnerability-check">Vulnerability Check</a></li>
        <li class="back-button"><button @click="goBack">Back</button></li>
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
          Imagine an attacker as a crafty fox, manipulating object IDs in
          requests to exploit weakly defended API endpoints. These object IDs
          could be sequential integers, UUIDs, or any generic string. Whether
          they appear in path parameters, query string parameters, request
          headers, or request payloads, attackers can always find them.
        </p>
        <h3 id="security-weakness">Security Weakness</h3>
        <p>
          In API-based applications, this vulnerability is very common. Server
          components often don't fully track client state and instead rely on
          parameters like object IDs sent from the client to decide which
          objects to access. The server's response is usually like a diary
          entry, revealing whether the request was successful.
        </p>
        <h3 id="impact">Impact</h3>
        <p>
          Unauthorized access to other users' objects can lead to data leaks,
          data loss, or data manipulation. Sometimes, it can even result in
          complete account takeovers. Yes, you heard that right, it's a big
          deal!
        </p>
        <h3 id="vulnerability-check">Does Your API Have This Vulnerability?</h3>
        <p>
          Object-level authorization is an access control mechanism usually
          implemented at the code level to ensure users can only access objects
          they are authorized to access.<br /><br />
          Every API endpoint that receives an object ID and performs any
          operation on that object should implement object-level authorization
          checks. These checks should verify if the logged-in user is authorized
          to perform the requested action on the requested object.
        </p>
        <div class="button-container">
          <button @click="learnMore">Learn More</button>
        </div>
        <div class="button-container">
          <button @click="goBack">Back to Home</button>
        </div>
        <!-- API security vulnerability 2 -->
      </div>
      <div v-else-if="challengeID === '2'">
        <h2 class="centered-title">
          Broken Object Property Level Authorization
        </h2>
        <p>
          This challenge focuses on Broken Object Property Level Authorization.
          It involves exploiting vulnerabilities where the application doesn't
          correctly enforce permissions on individual properties of an object.
          Your goal is to manipulate these properties to access or modify
          restricted data.
        </p>
        <h3 id="attack-vectors">Attack Vectors</h3>
        <p>
          Application Programming Interfaces (APIs) typically provide an
          endpoint that returns properties for all objects, especially in REST
          APIs. Whereas in a protocol like GraphQL, it may require a carefully
          crafted request to specify which properties should be returned.
        </p>
        <h3 id="security-weakness">Security Weakness</h3>
        <p>
          Examining the API response identifies whether there is sensitive
          information in the returned data. Fuzzy testing is often used to
          discover hidden attributes. To determine if these attributes can be
          modified, you must create an API request and analyze the response. If
          the target attributes are not returned in the response, further
          analysis of the side effects may be required.
        </p>
        <h3 id="impact">Impact</h3>
        <p>
          Unauthorized access to private or sensitive object properties may
          result in data leakage, loss or corruption. In some cases, such access
          may also result in elevated privileges or partial or complete account
          takeover.
        </p>
        <h3 id="vulnerability-check">Does Your API Have This Vulnerability?</h3>
        <p>
          When allowing a user to access an object using an API endpoint, it is
          important to validate that the user has access to the specific object
          properties they are trying to access. An API endpoint is vulnerable if
          the API endpoint allows a user to change, add/or delete the value of a
          sensitive object's property which the user should not be able to
          access.
        </p>
        <div class="button-container">
          <button @click="learnMore2">Learn More</button>
        </div>
        <div class="button-container">
          <button @click="goBack">Back to Home</button>
        </div>
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
  height: 240px;
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
  margin-left: 220px;
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
  width: 100px;
  height: auto; 
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
