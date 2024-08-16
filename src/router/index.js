import Vue from 'vue';
import Router from 'vue-router';
import { connectWebSocket, isWebSocketConnected } from '@/websocketService';
import store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  },
  {
    path: '/Postman',
    name: 'Postman',
    component: () => import('../views/Postman.vue'),
  },
  {
    path: '/DevTools',
    name: 'DevTools',
    component: () => import('../views/DevTools.vue'),
  },
  {
    path: '/Token',
    name: 'Token',
    component: () => import('../views/Token.vue'),
  },
  {
    path: '/ChallengeFix',
    name: 'ChallengeFix',
    component: () => import('../views/ChallengeFix.vue'),
  },
  {
    path: '/ChallengeResult',
    name: 'ChallengeResult',
    component: () => import('../views/ChallengeResult.vue'),
    meta: { hideRootComponents: true } 
  },
  {
    path: '/APIDetail',
    name: 'APIDetail',
    component: () => import('../views/APIDetail.vue')
  },
  {
    path: '/orderDetail',
    name: 'OrderDetail',
    component: () => import('../views/OrderDetail.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket();
      }
      next();
    }
  },
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/Welcome.vue')
  },
  {
    path: '/scoreboard',
    name: 'Scoreboard',
    component: () => import('../views/Scoreboard.vue')
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../components/Error.vue')
  },
  {
    path: '/goods',
    name: 'Goods',
    component: () => import('../views/Goods.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  },
  {
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information.vue')
  },
  {
    path: '/goods/details',
    name: 'Details',
    component: () => import('../views/Details.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true 
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true 
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); 
      }
      next();
    }
  }
];

const router = new Router({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; 
  },
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  if (from.fullPath) {
    store.commit('addHistory', from.fullPath);
  }
  if (to.fullPath) {
    store.commit('addHistory', to.fullPath);
  }
  next();
});

export default router;
