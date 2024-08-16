import Vue from 'vue';
import App from './HomePage.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// Global Functions and Variables
import Global from './Global';
Vue.use(Global);

import Axios from 'axios';
Vue.prototype.$axios = Axios;

// Global Request Interceptor
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

// Global Response Interceptor
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

// Global interceptor, checks if a user is logged in before going to a page that requires user permissions
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

// Relative time filter, converts timestamps to time.
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

// global component
import MyLogin from './components/MyLogin';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/MyRegister';
Vue.component(MyRegister.name, MyRegister);
import ConfirmationModal from './components/ConfirmationModal';
Vue.component(ConfirmationModal.name, ConfirmationModal);
import FeedbackWindow from './components/FeedbackWindow';
Vue.component(FeedbackWindow.name, FeedbackWindow);
import HintWindow from './components/HintWindow';
Vue.component(HintWindow.name, HintWindow);
import DialogWindow from './components/DialogWindow';
Vue.component(DialogWindow.name, DialogWindow);

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
