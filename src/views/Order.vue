<template>
  <div class="order">
    <WebHome />
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px; color: #4caf50;"></i>
          My Orders
        </p>
      </div>
    </div>

    <div class="order-content" v-if="orders.length > 0">
      <div class="content" v-for="(item, index) in orders" :key="index">
        <ul>
          <li class="order-info">
            <div class="order-id">
              <button @click="viewOrderDetail(item[0].order_id)">
                Order Number: {{ item[0].order_id }}
              </button>
            </div>
            <div class="order-time">Order Time: {{ formatDate(item[0].order_time) }}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">Product Name</div>
            <div class="pro-price">Unit Price</div>
            <div class="pro-num">Quantities</div>
            <div class="pro-total">Subtotal</div>
          </li>

          <li class="product-list" v-for="(product, i) in item" :key="i">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: { productID: product.product_id } }">
                <img :src="getImageSrc(product.product_picture)" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link :to="{ path: '/goods/details', query: { productID: product.product_id } }">
                {{ product.product_name }}
              </router-link>
            </div>
            <div class="pro-price">{{ product.product_price }}£</div>
            <div class="pro-num">{{ product.product_num }}</div>
            <div class="pro-total pro-total-in">{{ computeSubtotal(product) }}£</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              Total <span class="order-total-num">{{ total[index].totalNum }}</span> items
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">Total：</span>
              <span class="total-price">{{ total[index].totalPrice }}£</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="order-empty">
      <div class="empty">
        <h2>Your order is still empty!</h2>
        <p>Go shopping！</p>
      </div>
    </div>
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
      orders: [],
      total: []
    };
  },
  methods: {
    async fetchData() {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const response = await this.$axios.get('/api/order/list', {
          params: { user_id: userData.user.user_id },
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.code === "001") {
          this.orders = response.data.data.sort((a, b) => new Date(b[0].order_time) - new Date(a[0].order_time));
        } else {
          this.notifyError(response.data.msg);
        }
      } catch (err) {
        this.notifyError('Service is unavailable, please try again later.');
      }
    },
    computeTotals() {
      this.total = this.orders.map(order => ({
        totalNum: order.reduce((acc, product) => acc + product.product_num, 0),
        totalPrice: order.reduce((acc, product) => acc + product.product_price * product.product_num, 0)
      }));
    },
    formatDate(date) {
      return new Date(date).toLocaleString(); // Simple date formatting, consider using libraries like date-fns for more complex needs
    },
    getImageSrc(picture) {
      return picture.includes('http:') ? picture : this.$target + picture;
    },
    computeSubtotal(product) {
      return (product.product_price * product.product_num).toFixed(2);
    },
    viewOrderDetail(orderId) {
      this.$router.push({ path: '/orderDetail', query: { order_id: orderId } });
    }
  },
  watch: {
    orders: 'computeTotals'
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.order-header {
  height: 64px;
  border-bottom: 2px solid #4caf50;
  background-color: #fff;
  margin-bottom: 20px;
}

.order-header-content {
  width: 1225px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-header p {
  font-size: 28px;
  line-height: 58px;
  font-weight: bold;
  color: #424242;
  padding: 10px 0;
}

.content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}

.order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #4caf50;
}

.order-info .order-id {
  float: left;
}

.order-info .order-id button {
  background: none;
  border: none;
  color: #4caf50;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  font-size: 16px;
}

.order-info .order-id button:hover {
  color: #388e3c;
  text-decoration: underline;
}

.order-info .order-time {
  float: right;
  color: #757575;
}

.header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}

.product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}

.pro-img {
  float: left;
  height: 85px;
  width: 120px;
  padding-left: 80px;
}

.pro-img img {
  height: 80px;
  width: 80px;
}

.pro-name,
.pro-price,
.pro-num,
.pro-total {
  float: left;
  text-align: center;
}

.pro-name {
  width: 380px;
}

.pro-price,
.pro-total {
  width: 160px;
}

.pro-num {
  width: 190px;
}

.pro-total-in {
  color: #4caf50;
}

.order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #4caf50;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}

.order-bar-left,
.order-bar-right {
  float: left;
}

.order-bar-right {
  float: right;
}

.total-price-title,
.total-price {
  color: #4caf50;
}

.total-price {
  font-size: 30px;
}

.order-empty {
  width: 1225px;
  margin: 0 auto;
}

.empty {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 45px auto 0;
  background: url(../assets/imgs/shoppingcart.png) no-repeat center 20px;
  background-size: 220px 220px;
  color: #b0b0b0;
  padding-top: 150px;
}

.empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}

.empty p {
  font-size: 20px;
}
</style>
