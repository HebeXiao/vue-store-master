<template>
  <div id="app" name="app">
    <el-container>
      <!-- Top Navigation Bar -->
      <div class="topbar" v-if="!$route.meta.hideRootComponents">
        <div class="nav">
          <ul>
            <li>
              <el-button
                @click="goBack('/')"
                type="text"
                style="font-size: 18px"
                >Home</el-button
              >
            </li>
            <li v-if="!this.$store.getters.getUser">
              <el-button type="text" @click="login" style="font-size: 18px"
                >Login</el-button
              >
              <span class="sep">|</span>
              <el-button
                type="text"
                @click="register = true"
                style="font-size: 18px"
                >Register</el-button
              >
            </li>
            <!-- Only the following is displayed when logged in -->
            <li v-else>
              <el-button
                @click="goBack('/scoreboard')"
                type="text"
                style="font-size: 18px"
                >Scoreboard</el-button
              >
            </li>
            <li v-if="showHintButton">
              <el-button @click="showHint" type="text" style="font-size: 18px"
                >Hint</el-button
              >
            </li>
            <li v-if="this.$store.getters.getUser && !getCurrentChallengeId">
              <span class="sep"></span>
              <span class="sep"></span>
              <span class="divider">|</span> 
              <el-popover placement="top" width="180" v-model="visible">
                <p>Are you sure you want to log out?</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false"
                    >No</el-button
                  >
                  <el-button type="primary" size="mini" @click="logout"
                    >Yes</el-button
                  >
                </div>
                <el-button type="text" slot="reference" style="font-size: 18px"
                  >Logout</el-button
                >
              </el-popover>
            </li>
          </ul>
          <hint-window ref="hintWindow"></hint-window>
        </div>
      </div>
      <!-- Top navigation bar END -->

      <!-- Login Module -->
      <MyLogin></MyLogin>
      <!-- Registration Module -->
      <MyRegister :register="register" @fromChild="isRegister"></MyRegister>

      <!-- Major area packagings -->
      <el-main>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
      <!-- Major area packagings END -->

      <!-- Bottom row container -->
      <el-footer>
        <div class="footer" v-if="!$route.meta.hideRootComponents">
          <div class="ng-promise-box">
            <div class="ng-promise">
              <p class="text">
                <a class="icon1" href="javascript:;"
                  >Learn how hackers find security vulnerabilities!</a
                >
                <a class="icon2" href="javascript:;"
                  >Learn how hackers exploit web applications!</a
                >
                <a class="icon3" style="margin-right: 0" href="javascript:;"
                  >Learn how to stop them!</a
                >
              </p>
            </div>
          </div>
          <div class="mod_help">
            <p class="coty">
              Web Application Exploits and Defenses &copy; 2012-2021
            </p>
          </div>
        </div>
      </el-footer>
      <!-- Bottom row container END -->
    </el-container>
    
    <!-- Confirmation Dialog -->
    <dialog-window :visible.sync="showDialog" @confirm="confirmExit"></dialog-window>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import HintWindow from "./components/HintWindow.vue";
import DialogWindow from './components/DialogWindow.vue'; // Import the DialogWindow component

export default {
  created() {
    this.refreshState();
  },
  components: {
    HintWindow,
    DialogWindow  // Register the DialogWindow component
  },
  data() {
    return {
      activeIndex: "", // Selected tabs in the header navigation bar
      register: false, // Whether to show registered components
      visible: false, // Whether to log out
      showDialog: false, // Control the visibility of the confirmation dialog
      targetRoute: '' // Store the target route to navigate after confirmation
    };
  },
  computed: {
    showHintButton() {
      return this.$store.getters.getUser && this.getCurrentChallengeId && this.$route.path !== '/ChallengeFix';
    },
    ...mapGetters(["getUser", "getNum", "getCurrentChallengeId"]),
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),
    ...mapMutations(["setCurrentChallengeId"]),
    // Receive data from registered subcomponents
    refreshState() {
      if (this.getCurrentChallengeId){
        this.$store.commit('setCurrentChallengeId', localStorage.getItem('currentChallengeId'));
      }
    },
    isRegister(val) {
      this.register = val;
    },
    // Click the login button, and show the login component by changing the showLogin value of the vuex.
    login() {
      this.setShowLogin(true);
    },
    // Log out
    logout() {
      this.visible = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('guidanceMode');
      this.setUser("");
      // If in the challenge
      if (this.getCurrentChallengeId) {
        this.setCurrentChallengeId("");
        this.$store.commit("closeSocket");
      }
      this.$router.push("/").catch((err) => {
        console.error("Router error:", err);
      });
      this.notifySucceed("Successfully logged out");
    },
    // Calling HintWindow methods with refs
    showHint() {
      this.$refs.hintWindow.open();
    },
    // Exit the challenge via the navigation bar
    goBack(targetRoute) {
      if (this.getCurrentChallengeId && this.$route.path !== '/ChallengeFix') {
        this.showDialog = true;
        this.targetRoute = targetRoute;  // Save the target route for later use
      } else {
        this.$router.push(targetRoute);
      }
    },
    // Confirm exit from the challenge
    confirmExit() {
      this.$store.commit("resetChallengeId");
      this.$store.commit("closeSocket");
      this.$store.commit("resetGuidanceMode");
      this.$router.push(this.targetRoute).catch(err => {
        console.error("Router error:", err);
      });
      this.showDialog = false; // Close the dialog
    }
  }
};
</script>


<style scoped>
/* Global CSS END */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}

#app .el-header {
  padding: 0;
}

#app .el-main {
  min-height: 100px;
  padding: 0 0;
}

#app .el-footer {
  padding: 0;
}

a,
a:hover {
  text-decoration: none;
}
/* Global CSS END */

/* Top navigation bar CSS */
.topbar {
  height: 50px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}

.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}

.topbar .nav ul {
  float: right;
}

.topbar .nav li {
  float: left;
  height: 50px;
  color: #b0b0b0;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
  margin-left: 20px;
}

.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 16px;
  margin: 0 5px;
}

.topbar .nav .divider {
  height: 30px;
  width: 1px;
  background-color: #b0b0b0;
  margin: 0 5px;
  margin-left:-10px;
}

.topbar .nav li .el-button {
  color: #b0b0b0;
}

.topbar .nav .el-button:hover {
  color: #fff;
}

.topbar .nav li a {
  color: #b0b0b0;
}

.topbar .nav a:hover {
  color: #fff;
}
/* Top navigation bar CSS END */

/* Bottom Bar Container CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}

.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}

.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 18px;
  margin-right: 100px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/imgs/us-icon.png") no-repeat left 0;
}

.footer .mod_help {
  text-align: center;
  color: #888888;
}

.footer .mod_help p {
  margin: 20px 0 16px 0;
}
/* Bottom Bar Container CSS END */
</style>
