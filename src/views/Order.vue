<template>
  <div class="order">
    <WebHome />
    <!-- Order Header -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px; color: #4caf50;"></i>
          My Orders
        </p>
      </div>
    </div>
    <!-- Order Header END -->

    <!-- Main contents of the order -->
    <div class="order-content" v-if="orders.length>0">
      <div class="content" v-for="(item,index) in orders" :key="index">
        <ul>
          <!-- Order Form Header -->
          <li class="order-info">
            <div class="order-id">
              <button @click="viewOrderDetail(item[0].order_id)">
                Order Number: {{ item[0].order_id }}
              </button>
            </div>
            <div class="order-time">Order Time: {{item[0].order_time | dateFormat}}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">Product Name</div>
            <div class="pro-price">Unit Price</div>
            <div class="pro-num">Quantities</div>
            <div class="pro-total">Subtotal</div>
          </li>
          <!-- Order Form Header END -->

          <!-- Order List -->
          <li class="product-list" v-for="(product,i) in item" :key="i">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: {productID:product.product_id} }">
                <img :src="$target + product.product_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{ path: '/goods/details', query: {productID:product.product_id} }"
              >{{product.product_name}}</router-link>
            </div>
            <div class="pro-price">{{product.product_price}}£</div>
            <div class="pro-num">{{product.product_num}}</div>
            <div class="pro-total pro-total-in">{{product.product_price*product.product_num}}£</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              Total
              <span class="order-total-num">{{total[index].totalNum}}</span> items
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">Total：</span>
              <span class="total-price">{{total[index].totalPrice}}£</span>
            </span>
          </div>
          <!-- Order List END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- Main contents of the order END -->

    <!-- Displayed when the order is empty -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>Your order is still empty!</h2>
        <p>Go shopping！</p>
      </div>
    </div>
    <!-- Displayed when the order is empty END -->
  </div>
</template>

<script>
import WebHome from '../WebHome.vue';
export default {
  components: {
    WebHome
  },
  data() {
    return {
      orders: [], // 订单列表
      total: [] // 每个订单的商品数量及总价列表
    };
  },
  methods: {
    viewOrderDetail(orderId) {
      this.$router.push({ path: '/orderDetail', query: { order_id: orderId } });
    }
  },
  activated() {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const parsedUserData = JSON.parse(userData);

    this.$axios
      .get(`/api/order/list`, { params: { user_id: parsedUserData.user.user_id },
      headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.data.code === "001") {
          this.orders = res.data.data.sort((a, b) => {
            return new Date(b[0].order_time) - new Date(a[0].order_time);
          });
        } else {
            this.notifyError(res.data.msg);
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 503) {
          this.notifyError('Service is unavailable, please try again later.');
        } else {
          this.notifyError(err.response.data.msg);
        }
        return Promise.reject(err);
      });
  },
  watch: {
    // Calculate the number of items and the total price of each order from the order information.
    orders: function(val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    }
  }
};
</script>

<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

/* Order Header CSS */
.order .order-header {
  height: 64px;
  border-bottom: 2px solid #4caf50;
  background-color: #fff;
  margin-bottom: 20px;
}

.order .order-header .order-header-content {
  width: 1225px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: bold;
  color: #424242;
  padding:10px 0;
}
/* Order Header CSS END */

.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}

/* Order Form Header CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #4caf50;
}

.order .content ul .order-info .order-id {
  float: left;
  color: #4caf50;
}

.order .content ul .order-info .order-time {
  float: right;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* Order Form Header CSS END */

/* Order list CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}

.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}

.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}

.order .content ul .pro-name {
  float: left;
  width: 380px;
}

.order .content ul .pro-name a {
  color: #424242;
}

.order .content ul .pro-name a:hover {
  color: #4caf50;
}

.order .content ul .pro-price {
  float: left;
  width: 160px;
  padding-right: 18px;
  text-align: center;
}

.order .content ul .pro-num {
  float: left;
  width: 190px;
  text-align: center;
}

.order .content ul .pro-total {
  float: left;
  width: 160px;
  padding-right: 81px;
  text-align: right;
}

.order .content ul .pro-total-in {
  color: #4caf50;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #4caf50;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}

.order .order-bar .order-bar-left {
  float: left;
}

.order .order-bar .order-bar-left .order-total {
  color: #757575;
}

.order .order-bar .order-bar-left .order-total-num {
  color: #4caf50;
}

.order .order-bar .order-bar-right {
  float: right;
}

.order .order-bar .order-bar-right .total-price-title {
  color: #4caf50;
  font-size: 14px;
}

.order .order-bar .order-bar-right .total-price {
  color: #4caf50;
  font-size: 30px;
}
/* Order list CSS END */

/* Displayed when the order is empty CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}

.order .order-empty .empty {
  height: 300px; 
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  margin: 45px auto 0;
  background: url(../assets/imgs/shoppingcart.png) no-repeat center 20px; 
  background-size: 220px 220px; 
  color: #b0b0b0;
  overflow: hidden;
  padding-top: 150px; 
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* Displayed when the order is empty CSS END */
</style>