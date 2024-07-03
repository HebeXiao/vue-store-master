<!-- Top navigation bar of the shopping mall  -->
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
            <button @click="goBack" class="button-back">
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
          </div>
        </el-menu>
      </el-header>
      <!-- top bar container END -->
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: "", // Selected tabs in the header navigation bar
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    // Back button logic
    goBack() {
      if (this.$route.path === "/goods") {
        this.$confirm("Are you sure you want to exit the challenge?", {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning",
        })
          // if yes
          .then(() => {
            this.$store.commit("resetChallengeId");
            this.$store.commit("closeSocket");
            this.$router.push("/scoreboard");
          })
          // if no
          .catch(() => {});
      } else {
        // If you're not on the 'goods' page, do the normal return operation
        this.$router.push("/goods");
      }
    },
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
  margin-left: -745px; 
}

.button-back {
  cursor: pointer; 
}

.button-back img {
  width: 30px; 
  background-color: transparent;
}
/* Top bar container CSS END */
</style>