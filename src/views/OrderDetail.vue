<template>
  <div class="detail-body">
    <WebHome />
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px; color: #4caf50;"></i>
          Order Details
        </p>
      </div>
    </div>
    <div class="order-detail">
      <div v-if="orderDetail" class="order-info">
        <p><strong>Order ID:</strong> {{ orderDetail.order_id }}</p>
        <p><strong>Total Amount:</strong> {{ orderDetail.totalAmount }}</p>
        <p><strong>Total Quantity:</strong> {{ orderDetail.totalQuantity }}</p>
        <p><strong>Order Address:</strong> {{ orderDetail.order_address }}</p>
        <p><strong>Order Phone:</strong> {{ orderDetail.order_phone }}</p>
        <p><strong>Order Name:</strong> {{ orderDetail.order_name }}</p>
        <h3>Items:</h3>
        <ul class="items-list">
          <li v-for="order in orders" :key="order.id" class="item">
            <p><strong>Item ID:</strong> {{ order.id }}</p>
            <p><strong>Amount:</strong> {{ order.product_price }}</p>
            <p><strong>Quantity:</strong> {{ order.product_num }}</p>
          </li>
        </ul>
        <div class="button-container">
          <button class="button" @click="editOrderDetail">Edit</button>
        </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
    <div v-if="isEditing" class="edit-form">
      <input v-model="editableOrder.order_name" placeholder="Order Name" />
      <input v-model="editableOrder.order_phone" placeholder="Order Phone" />
      <input
        v-model="editableOrder.order_address"
        placeholder="Order Address"
      />
      <button @click="saveOrderDetail">Save</button>
      <button @click="isEditing = false">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WebHome from "../WebHome.vue";

export default {
  name: "OrderDetail",
  components: {
    WebHome,
  },
  data() {
    return {
      orderDetail: null,
      orders: [],
      isEditing: false, 
      editableOrder: null, 
    };
  },
  created() {
    this.fetchOrderDetail();
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.query.order_id) {
          this.fetchOrderDetail();
        }
      },
    },
  },
  methods: {
    async fetchOrderDetail() {
      try {
        const order_id = this.$route.query.order_id;
        const response = await axios.post(`/api/order/detail`, {
          order_id, 
        });
        this.orderDetail = response.data.orderDetailVo;
        this.orders = response.data.orders;
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },
    editOrderDetail() {
      this.isEditing = true;
      this.editableOrder = { ...this.orderDetail }; // 深拷贝当前订单详情
    },
    async saveOrderDetail() {
      try {
        const order_id = this.editableOrder.order_id; 
        await axios.put(`/api/order/${order_id}`, this.editableOrder);
        this.orderDetail = { ...this.editableOrder };
        this.isEditing = false;
      } catch (error) {
        console.error("Error saving order details:", error);
      }
    },
  },
};
</script>

<style scoped>
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

.order-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

.order-info p {
  margin: 5px 0;
  font-size: 16px;
  color: #555;
}

.order-info strong {
  color: #333;
}

.items-list {
  list-style-type: none;
  padding: 0;
}

.item {
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
}

.item p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.item strong {
  color: #333;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #388e3c;
}

.edit-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

.edit-form input{
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

.edit-form button {
  width: 80px;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}

.edit-form input {
  border: 1px solid #ccc;
}

.edit-form button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.edit-form button:nth-child(2) {
  background-color: #dc3545;
  margin-left: 0;
}

.edit-form button:hover {
  opacity: 0.9;
}
</style>
