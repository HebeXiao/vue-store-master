<template>
  <div class="order-detail">
    <h2>Order Details</h2>
    <div v-if="orderDetail">
      <p><strong>Order ID:</strong> {{ orderDetail.order_id }}</p>
      <p><strong>Total Amount:</strong> {{ orderDetail.totalAmount }}</p>
      <p><strong>Total Quantity:</strong> {{ orderDetail.totalQuantity }}</p>
      <p><strong>Order Address:</strong> {{ orderDetail.order_address }}</p>
      <p><strong>Order Phone:</strong> {{ orderDetail.order_phone }}</p>
      <p><strong>Order Name:</strong> {{ orderDetail.order_name }}</p>
      <h3>Items:</h3>
      <ul>
        <li v-for="order in orders" :key="order.id">
          <p><strong>Item ID:</strong> {{ order.id }}</p>
          <p><strong>Amount:</strong> {{ order.product_price }}</p>
          <p><strong>Quantity:</strong> {{ order.product_num }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'OrderDetail',
  data() {
    return {
      orderDetail: null,
      orders: [],
    };
  },
  created() {
    this.fetchOrderDetail();
  },
  methods: {
    async fetchOrderDetail() {
      try {
        const order_id = this.$store.state.currentOrderId;
        console.log('Order ID:', this.$store.state.currentOrderId); // 确认id是否正确
        // 修改为GET请求，并通过查询参数传递订单ID
        const response = await axios.get(`/api/order/order/detail`, {
          params: { order_id }
        });
        console.log('Response data:', response.data); // 添加日志
        this.orderDetail = response.data.orderDetailVo;
        console.log('challenges:', this.orderDetail.order_address); // 调试输出处理后的数据
        this.orders = response.data.orders;
        console.log('challenges:', this.orders); // 调试输出处理后的数据
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    },
  },
};
</script>

<style scoped>
.order-detail {
  padding: 20px;
}
</style>

