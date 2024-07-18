<template>
  <div id="app" name="app">
    <el-container>
      <!-- top bar container -->
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#409eff"
          router
        >
          <div class="image">
            <button @click="promptExit" class="button-back">
              <img
                src="./assets/imgs/back.png"
                alt="Back"
                style="width: 30px; background-color: white"
              />
            </button>
          </div>
          <div class="logo">
            <img src="./assets/imgs/logo.png" alt="Logo" />
          </div>

          <div class="menu-items">
            <el-menu-item v-if="this.$store.getters.getUser" index="/order">
              <router-link to="/order">Orders</router-link>
            </el-menu-item>
            <el-menu-item
              v-if="this.$store.getters.getUser"
              index="/shoppingCart"
            >
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> Basket
              </router-link>
            </el-menu-item>
            <el-menu-item v-if="this.$store.getters.getUser" index="/profile">
              <router-link to="/profile">Profile</router-link>
            </el-menu-item>
          </div>
        </el-menu>
      </el-header>
      <!-- top bar container END -->
    </el-container>
    <!-- Confirmation Dialog -->
    <dialog-window :visible.sync="showDialog" @confirm="confirmExit"></dialog-window>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DialogWindow from './components/DialogWindow.vue'; // Import the DialogWindow component

export default {
  components: {
    DialogWindow // Register the DialogWindow component
  },
  data() {
    return {
      activeIndex: "", // Selected tabs in the header navigation bar
      showDialog: false, // Control the visibility of the confirmation dialog
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    // Prompt the exit confirmation dialog
    promptExit() {
      if (this.$route.path === "/goods") {
        this.showDialog = true;
      } else {
        // If you're not on the 'goods' page, do the normal return operation
        this.$router.push("/goods");
      }
    },
    // Confirm exit from the challenge
    confirmExit() {
      this.$store.commit("resetChallengeId");
      this.$store.commit("resetGuidanceMode");
      this.$store.commit("closeSocket");
      this.$router.push("/scoreboard");
      this.showDialog = false; // Close the dialog
    }
  },
};
</script>

<style>
/* Global CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}

#app {
  background-color: white;
}

#app .el-header {
  padding: 0;
}

a,
a:hover {
  text-decoration: none;
}
/* Global CSS END */

/* Top bar container CSS */
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; 
}

.menu-items {
  display: flex;
  align-items: center; 
  margin-right: -680px;
}

.image {
  margin-left: -680px;
}

.logo {
  margin-left: -730px; 
}

.button-back {
  cursor: pointer; 
}

.button-back img {
  width: 30px; 
  background-color: transparent;
  margin-left:-30px;
}
/* Top bar container CSS END */
</style>