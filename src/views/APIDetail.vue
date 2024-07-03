<template>
  <div v-if="challengeDetails">
    <h1 class="name">{{ challengeDetails.challenge_name }}</h1>
    <div class="detail">
      <div v-html="formattedData"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      challengeID: null,
      challengeDetails: null,
    };
  },
  activated() {
    // 从路由中获取挑战ID
    if (this.$route.query.challengeID !== undefined) {
      this.challengeID = this.$route.query.challengeID;
      this.getChallengeDetails(this.challengeID);
    }
  },
  methods: {
    getChallengeDetails(challengeID) {
      axios
        .post("/api/challenge/detail", { challengeID })
        .then((response) => {
          this.challengeDetails = response.data;
        })
        .catch((error) => {
          console.error("Error fetching challenge details:", error);
        });
    },
  },
  computed: {
    // Converting line breaks to HTML <br> tags
    formattedData() {
      return this.challengeDetails.challenge_details.replace(/\\n/g, "<br>");
    },
  },
};
</script>

<style scoped>
.name {
  color: #4caf50;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail {
  background-color: bisque; 
  max-width: 800px; 
  border-radius: 10px; 
  margin: 10px auto; 
  padding: 10px; 
  text-align: left; 
}
</style>
