<template>
  <div>
    <h1 class="centered-title" v-if="getCurrentChallengeId === 1">Preventing BOLA: Your Adventure Toolkit</h1>
    <h1 class="centered-title" v-if="getCurrentChallengeId === 2">Preventing BOPLA: Your Adventure Toolkit</h1>
    <div class="defences-content" v-if="getCurrentChallengeId === 1">
      <div class="title-with-image">
        <img src="@/assets/imgs/postman1.png" class="defences-image" />
        <h2>
          1. Implement an Authorization Mechanism Based on User Policies and
          Hierarchies
        </h2>
      </div>
      <p>
        In an e-commerce platform, different users have different permissions.
        For example, a normal user can only view his/her own orders, while an
        administrator can view all orders. For this, we need to define user
        roles and implement these roles in the business logic.
      </p>
      <div class="title-with-image">
        <img src="@/assets/imgs/postman2.png" class="defences-image" />
        <h2>2. Use Authorization Mechanisms to Check User Permissions</h2>
      </div>
      <p>
        When processing each client request, we need to verify not only the
        user's identity but also their authorization to access specific
        resources.
      </p>
      <div class="title-with-image">
        <img src="@/assets/imgs/postman4.png" class="defences-image" />
        <h2>3. Use Random and Unpredictable Values as Record IDs (GUIDs)</h2>
      </div>
      <p>
        To enhance security, we should use GUIDs (Globally Unique Identifiers)
        instead of simple integer IDs. GUIDs are unpredictable, making it much
        harder for attackers to guess and access other users' resources.
      </p>
    </div>
    <div v-else-if="getCurrentChallengeId === 2">
      <p>
        This fix is for Challenge 2. Here are the details about the next
        vulnerability...
      </p>
    </div>
    <div class="button-container">
      <button @click="goBack">Back to Scoreboard</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ChallengeFix",
  computed: {
    ...mapGetters(["getCurrentChallengeId"]),
  },
  methods: {
    goBack() {
      this.$store.commit("resetChallengeId");
      this.$router.push("/scoreboard");
    },
  },
};
</script>

<style scoped>
.centered-title {
  text-align: center;
  font-size: 30px;
  color: #45a049;
}

.title-with-image {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.defences-image {
  width: 30px; /* 调整图片的宽度 */
  height: auto; /* 使图片保持比例 */
  margin-right: 10px; /* 调整图片与标题之间的间距 */
}

h2 {
  font-size: 18px;
  margin: 0; /* 确保标题与图片在同一行 */
}

.defences-content {
  padding: 0 50px;
}

.button-container {
  display: flex;
  justify-content: center; /* 将按钮居中 */
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #45a049;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:hover {
  background-color: #357938;
}
</style>
