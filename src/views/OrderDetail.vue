<template>
  <div class="detail-body">
    <WebHome />
    <div class="order-detail">
      <h2>Order Details</h2>
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
          <button @click="editOrderDetail">Edit</button>
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
      isEditing: false, // 控制编辑表单的显示
      editableOrder: null, // 存储编辑中的订单信息
    };
  },
  created() {
    this.fetchOrderDetail();
  },
  watch: {
    // 监听$route变化来重新获取订单数据
    $route: {
      immediate: true, // 立即触发，包括页面初次加载
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
        console.log("Order ID:", order_id); // 更新ID确认日志
        const response = await axios.post(`/api/order/detail`, {
          order_id, // 将order_id作为请求体发送
        });
        console.log("Response data:", response.data); // 添加日志
        this.orderDetail = response.data.orderDetailVo;
        console.log("Order Address:", this.orderDetail.order_address); // 更新调试日志
        this.orders = response.data.orders;
        console.log("Order Items:", this.orders); // 更新调试日志
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    },
    editOrderDetail() {
      this.isEditing = true;
      this.editableOrder = { ...this.orderDetail }; // 深拷贝当前订单详情
      console.log("Editing order details:", this.editableOrder);
    },
    async saveOrderDetail() {
      try {
        const order_id = this.editableOrder.order_id; // 使用正确的属性名
        await axios.put(`/api/order/${order_id}`, this.editableOrder);
        this.orderDetail = { ...this.editableOrder };
        this.isEditing = false;
        console.log("Order updated successfully."); // 添加成功日志
      } catch (error) {
        console.error("Error saving order details:", error);
      }
    },
  },
};
</script>


<style scoped>
.order-detail {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

.order-detail h2 {
  color: #333;
  font-family: "Arial", sans-serif;
  font-size: 24px;
  margin-bottom: 15px;
}

.order-info p {
  margin: 5px 0;
  font-family: "Arial", sans-serif;
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

.order-detail p {
  font-size: 16px;
  color: #888;
}

.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  width: 100%; /* 确保占满父元素宽度 */
}

.button-container {
  display: flex;
  justify-content: flex-start; /* 按钮对齐到左边 */
  margin-top: 10px;
}

.button {
  padding: 8px 15px;
  margin-right: 10px; /* 按钮之间的间距 */
  background-color: #007BFF; /* 蓝色背景 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3; /* 鼠标悬浮时的背景色变化 */
}

.edit-form {
  position: fixed; /* 固定位置，总是在视口中央 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 中心对齐 */
  width: 300px; /* 定义宽度 */
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2); /* 添加阴影效果 */
  z-index: 1000; /* 确保在顶层 */
}

.edit-form input {
  width: 100%; /* 输入框占满容器宽度 */
  padding: 8px;
  margin-bottom: 10px; /* 输入框之间的间距 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 4px; /* 边框圆角 */
}

.edit-form button {
  width: calc(50% - 5px); /* 两个按钮平分宽度，减去间隙 */
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.edit-form button:nth-child(1) {
  background-color: #28a745; /* 保存按钮绿色 */
  color: white;
}

.edit-form button:nth-child(2) {
  background-color: #dc3545; /* 取消按钮红色 */
  color: white;
  margin-left: 10px; /* 与保存按钮的间隔 */
}

.edit-form button:hover {
  opacity: 0.8; /* 鼠标悬浮时的透明度变化 */
}
</style>
