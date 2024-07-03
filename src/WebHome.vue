<!-- 商场的顶部导航栏 (order+cart) -->
<template>
  <div id="app" name="app">
    <el-container>
      <!-- 顶栏容器 -->
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
                <img src="./assets/imgs/back.png" alt="Back" style="width:30px;background-color: white;">
              </button>
            </div>
            <div class="logo">
              <img src="./assets/imgs/logo.png" alt="Logo" />
            </div>

            <div class="menu-items">
            <el-menu-item v-if="this.$store.getters.getUser" index="/order">
                <router-link to="/order">Orders</router-link>
            </el-menu-item>
            <el-menu-item v-if="this.$store.getters.getUser" index="/shoppingCart" :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
                <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> Basket
                </router-link>
            </el-menu-item>
            </div>
        </el-menu>
    </el-header>


      <!-- 顶栏容器END -->

      <!-- 登录模块 -->
      <MyLogin></MyLogin>
      <!-- 注册模块 -->
      <MyRegister :register="register" @fromChild="isRegister"></MyRegister>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeIndex: "", // 头部导航栏选中的标签
      search: "", // 搜索条件
      register: false, // 是否显示注册组件
      visible: false // 是否退出登录
    };
  },
  created() {
    // 获取浏览器localStorage，判断用户是否已经登录
    if (localStorage.getItem("user")) {
      // 如果已经登录，设置vuex登录状态
      this.setUser(JSON.parse(localStorage.getItem("user")));
    }
  },
  computed: {
    ...mapGetters(["getUser", "getNum"])
  },
  watch: {
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === "") {
        // 用户没有登录
        // this.setShoppingCart([]);s
      } else {
        const userData = localStorage.getItem('user');
        const parsedUserData = JSON.parse(userData);
        // 用户已经登录,获取该用户的购物车信息
        this.$axios
          .post("/api/cart/list", {
            user_id: parsedUserData.user.user_id
          })
          .then(res => {
            if (res.data.code === "001") {
              // 001 为成功, 更新vuex购物车状态
              // this.setShoppingCart(res.data.data);
            } else {
              // 提示失败信息
              this.notifyError(res.data.msg);
            }
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
   goBack() {
      // 检查当前路由是否为 'goods'
      if (this.$route.path === '/goods') {
        // 弹出确认对话框询问用户是否要退出挑战
        this.$confirm('Are you sure you want to exit the challenge?', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          // 如果用户选择是，先重置 challenge_id
          this.$store.commit('resetChallengeId');

          // 关闭 WebSocket 连接
          this.$store.commit('closeSocket');

          // 然后跳转到 '/scoreboard'
          this.$router.push('/scoreboard');
        }).catch(() => {
          // 如果用户选择否，不执行任何操作
        });
      } else {
        // 如果不是在 'goods' 页面，执行正常的返回操作
        this.$router.push('/goods');
      }
    },
    login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
    // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("Successfully logged out");
    },
    // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
  }
};
</script>

<style>
/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app {
  background-color: white; /* 确保背景是白色 */
}
#app .el-header {
  padding: 0;
}
a,
a:hover {
  text-decoration: none;
}
/* 全局CSS END */


/* 顶栏容器CSS */
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;  /* 确保菜单使用可用的全部宽度 */
}

.menu-items {
  display: flex;
  align-items: center;  /* 如果需要，确保子项垂直居中 */
  margin-right: -680px;
}
.image{
  margin-left: -680px;
}
.logo {
  margin-left: -745px;  /* 根据需要调整这个值 */
}
.button-back {
  cursor: pointer; /* 这将改变鼠标悬停时的图标为手形指针 */
}

.button-back img {
  width: 30px; /* 保持图像大小设置 */
  background-color: transparent; /* 确保背景透明 */
}


/* 顶栏容器CSS END */
</style>