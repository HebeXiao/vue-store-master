import Vue from 'vue';
import Router from 'vue-router';
import { connectWebSocket, isWebSocketConnected } from '@/websocketService';

Vue.use(Router);

const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/Postman',
    name: 'Postman',
    component: () => import('../views/Postman.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
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
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/App.vue')
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
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/goods/details',
    name: 'Details',
    component: () => import('../views/Details.vue'),
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/shoppingCart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import('../views/ConfirmOrder.vue'),
    meta: {
      requireAuth: true // 需要验证登录状态
    },
    beforeEnter: (to, from, next) => {
      if (!isWebSocketConnected()) {
        connectWebSocket(); // 仅在 WebSocket 未连接时开启连接
      }
      next();
    }
  }
];

const router = new Router({
  // base: '/dist',
  // mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }; // 每次导航时滚动到页面顶部
  },
});

/* 由于Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理。
vue-router先报了一个Uncaught(in promise)的错误(因为push没加回调) ，然后再点击路由的时候才会触发NavigationDuplicated的错误(路由出现的错误，全局错误处理打印了出来)。*/
// 禁止全局路由错误处理打印
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
