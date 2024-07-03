import Vue from 'vue';
import App from './HomePage.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 全局函数及变量
import Global from './Global';
Vue.use(Global);

import Axios from 'axios';
Vue.prototype.$axios = Axios;

// 全局请求拦截器
Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局响应拦截器
Axios.interceptors.response.use(
  res => {
    if (res.data.code === "401") {
      Vue.prototype.notifyError(res.data.msg);
      store.dispatch("setShowLogin", true);
    }
    if (res.data.code === "500") {
      router.push({ path: "/error" });
    }
    return res;
  },
  error => {
    router.push({ path: "/error" });
    return Promise.reject(error);
  }
);

// 全局拦截器, 在进入需要用户权限的页面前校验是否已经登录
router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user;
  if (to.meta.requireAuth && !loginUser) {
    store.dispatch("setShowLogin", true);
    if (from.name == null) {
      next("/");
      return;
    }
    next(false);
    return;
  }
  next();
});

// 相对时间过滤器, 把时间戳转换成时间
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

// 全局组件
import MyLogin from './components/MyLogin';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/MyRegister';
Vue.component(MyRegister.name, MyRegister);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      this.$store.dispatch('setUser', parsedUserData);
    }
  }
}).$mount('#app');
