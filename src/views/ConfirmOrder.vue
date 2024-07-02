<template>
  <div class="confirmOrder">
    <WebHome />
    <!-- 头部 -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order"></i>
        </p>
        <p>Confirm Orders</p>
        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <!-- 选择地址 -->
      <div class="section-address">
        <p class="title">Shipping Address</p>
        <div class="address-body">
          <ul>
            <li
              v-for="(item) in address"
              :class="confirmAddress==item.id?'in-section':''"
              :key="item.id"
              @click="confirmAddress=item.id"
            >
              <h2>{{item.linkman}}</h2>
              <p class="phone">Phone: {{item.phone}}</p>
              <p class="address">Address:</p>
              <p>{{item.address}}</p>
            </li>
            <li class="add-address" @click="isAdd=true">
              <i class="el-icon-circle-plus-outline"></i>
              <p>Add new address</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 选择地址END -->

      <!-- 商品 -->
      <div class="section-goods">
        <p class="title">Products</p>
        <div class="goods-list">
          <ul>
            <li v-for="item in processedGoods" :key="item.id">
              <img :src="item.imageUrl" />
              <span class="pro-name">{{ item.productName }}</span>
              <span class="pro-price">{{ item.displayPrice }}</span>
              <span class="pro-total">{{ item.totalPrice }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品END -->

      <!-- 配送方式 -->
      <div class="section-shipment">
        <p class="title">Delivery Method</p>
        <p class="shipment">Free shipping</p>
      </div>
      <!-- 配送方式END -->

      <!-- 结算列表 -->
      <div class="section-count">
        <div class="money-box">
          <ul>
            <li>
              <span class="title">Number of items: </span>
              <span class="value">{{getCheckNum}}</span>
            </li>
            <li>
              <span class="title">Total price of goods: </span>
              <span class="value">{{getTotalPrice}}£</span>
            </li>
            <li>
              <span class="title">Shipping: </span>
              <span class="value">0£</span>
            </li>
            <li class="total">
              <span class="title">Total amount due: </span>
              <span class="value">
                <span class="total-price">{{getTotalPrice}}</span>£
              </span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 结算列表END -->

      <!-- 结算导航 -->
      <div class="section-bar">
        <div class="btn">
          <router-link to="/shoppingCart" class="btn-base btn-return">Back to Shopping Cart</router-link>
          <a href="javascript:void(0);" @click="addOrder" class="btn-base btn-primary">Order</a>
        </div>
      </div>
      <!-- 结算导航END -->
    </div>
    <!-- 主要内容容器END -->

    <!-- 弹出框 -->
    <el-dialog title="Add Address" width="400px" center :visible.sync="isAdd">
      <el-form :model="add" status-icon ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="linkman">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="Please enter the recipient's name!"
            v-model="add.linkman"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            prefix-icon="el-icon-view"
            type="text"
            placeholder="Please enter the recipient's phone number!"
            v-model="add.phone"
            maxlength="11"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item prop="address">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Please enter the full address!"
            v-model="add.address"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="save" style="width:100%;">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import WebHome from '../WebHome.vue';
import { mapGetters, mapActions } from 'vuex';
import feedbackService from '@/feedbackService';

export default {
  components: {
    WebHome
  },
  data() {
    return {
      confirmAddress: 0,
      isAdd: false,
      add: {
        linkman: "",
        phone: "",
        address: ""
      },
      address: []
    };
  },
  created() {
    if (this.getCheckNum < 1) {
      this.notifyError("Please check the box before checkout");
      this.$router.push({ path: "/shoppingCart" });
    }
    const userData = localStorage.getItem('user');
    const parsedUserData = JSON.parse(userData);
    this.$axios
      .post("api/user/address/list", { user_id: parsedUserData.user.user_id })
      .then(res => {
        this.address = res.data.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  computed: {
    ...mapGetters(["getCheckNum", "getTotalPrice", "getCheckGoods", "isGuidanceMode","getCurrentChallengeId"]),
      processedGoods() {
        const goods = this.getCheckGoods.map(item => ({
          ...item,
          displayPrice: `${item.price}£ x ${item.num}`,
          totalPrice: `${item.price * item.num}£`,
          imageUrl: item.productImg.includes('http:') ? item.productImg : this.$target + item.productImg
        }));
        console.log('Processed Goods:', goods);
        return goods;
      }
  },
  methods: {
    ...mapActions(["deleteShoppingCart"]),
    remove() {
      this.$axios
        .post("/api/user/address/remove", { id: this.delId })
        .then(res => {
          if (res.data.code === "001") {
            this.address = this.address.filter(addr => addr.id !== this.delId);
            this.delId = 0;
            this.dialogVisible = false;
            this.notifySucceed(res.data.msg);
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    save() {
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      this.$axios
        .post("/api/user/address/save", {
          user_id: parsedUserData.user.user_id,
          ...this.add
        })
        .then(res => {
          if (res.data.code === "001") {
            this.isAdd = false;
            this.address = res.data.data;
            this.notifySucceed(res.data.msg);
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    addOrder() {
      const userData = localStorage.getItem('user');
      const parsedUserData = JSON.parse(userData);
      const challengeId = this.getCurrentChallengeId;
      this.$axios
        .post("/api/order/save", {
          user_id: parsedUserData.user.user_id,
          products: this.getCheckGoods
        })
        .then(res => {
          if (res.data.code === "001") {
            this.getCheckGoods.forEach(item => {
              this.deleteShoppingCart(item.id);
            });
            this.notifySucceed(res.data.msg);
            if (this.isGuidanceMode && challengeId === 1) {
              feedbackService.sendFeedback('You have successfully placed your order! Please note how to access the order information and how the system responds to your request.');
              setTimeout(() => {
                feedbackService.sendFeedback("Press the magic F12 key to summon up your browser's developer tools, then click on the 'Network' (Network) tab and refresh this page, you'll find something!");
              }, 4000); // 延迟4秒发送
            }
            this.$router.push({ path: '/order' });
          } else {
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style scoped>
.confirmOrder {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 头部CSS */
.confirmOrder .confirmOrder-header {
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
  margin-bottom: 20px;
}
.confirmOrder .confirmOrder-header .header-content {
  width: 1225px;
  margin: 0 auto;
  height: 80px;
}
.confirmOrder .confirmOrder-header .header-content p {
  float: left;
  font-size: 28px;
  line-height: 80px;
  color: #424242;
  margin-right: 20px;
}
.confirmOrder .confirmOrder-header .header-content p i {
  font-size: 45px;
  color: #ff6700;
  line-height: 80px;
}
/* 头部CSS END */

/* 主要内容容器CSS */
.confirmOrder .content {
  width: 1225px;
  margin: 0 auto;
  padding: 48px 0 0;
  background-color: #fff;
}

/* 选择地址CSS */
.confirmOrder .content .section-address {
  margin: 0 48px;
  overflow: hidden;
}
.confirmOrder .content .section-address .title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 20px;
}
.confirmOrder .content .address-body li {
  float: left;
  color: #333;
  width: 220px;
  height: 178px;
  border: 1px solid #e0e0e0;
  padding: 15px 24px 0;
  margin-right: 17px;
  margin-bottom: 24px;
}
.confirmOrder .content .address-body .in-section {
  border: 1px solid #ff6700;
}
.confirmOrder .content .address-body li h2 {
  font-size: 18px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.confirmOrder .content .address-body li p {
  font-size: 14px;
  color: #757575;
}
.confirmOrder .content .address-body li .address {
  padding: 10px 0;
  max-width: 180px;
  max-height: 88px;
  line-height: 22px;
  overflow: hidden;
}
.confirmOrder .content .address-body .add-address {
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .address-body .add-address i {
  font-size: 30px;
  padding-top: 50px;
  text-align: center;
}
/* 选择地址CSS END */

/* 商品及优惠券CSS */
.confirmOrder .content .section-goods {
  margin: 0 48px;
}
.confirmOrder .content .section-goods p.title {
  color: #333;
  font-size: 18px;
  line-height: 40px;
}
.confirmOrder .content .section-goods .goods-list {
  padding: 5px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.confirmOrder .content .section-goods .goods-list li {
  padding: 10px 0;
  color: #424242;
  overflow: hidden;
}
.confirmOrder .content .section-goods .goods-list li img {
  float: left;
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.confirmOrder .content .section-goods .goods-list li .pro-name {
  float: left;
  width: 650px;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-price {
  float: left;
  width: 150px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-status {
  float: left;
  width: 99px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.confirmOrder .content .section-goods .goods-list li .pro-total {
  float: left;
  width: 190px;
  text-align: center;
  color: #ff6700;
  line-height: 30px;
}
/* 商品及优惠券CSS END */

/* 配送方式CSS */
.confirmOrder .content .section-shipment {
  margin: 0 48px;
  padding: 25px 0;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
}
.confirmOrder .content .section-shipment .title {
  float: left;
  width: 150px;
  color: #333;
  font-size: 18px;
  line-height: 38px;
}
.confirmOrder .content .section-shipment .shipment {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #ff6700;
}
/* 配送方式CSS END */

/* 结算列表CSS */
.confirmOrder .content .section-count {
  margin: 0 48px;
  padding: 20px 0;
  overflow: hidden;
}
.confirmOrder .content .section-count .money-box {
  float: right;
  text-align: right;
}
.confirmOrder .content .section-count .money-box .title {
  float: left;
  width: 150px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #757575;
}
.confirmOrder .content .section-count .money-box .value {
  float: left;
  min-width: 105px;
  height: 30px;
  display: block;
  line-height: 30px;
  color: #ff6700;
}
.confirmOrder .content .section-count .money-box .total .title {
  padding-top: 15px;
}
.confirmOrder .content .section-count .money-box .total .value {
  padding-top: 10px;
}
.confirmOrder .content .section-count .money-box .total-price {
  font-size: 30px;
}
/* 结算列表CSS END */

/* 结算导航CSS */
.confirmOrder .content .section-bar {
  padding: 20px 48px;
  border-top: 2px solid #f5f5f5;
  overflow: hidden;
}
.confirmOrder .content .section-bar .btn {
  float: right;
}
.confirmOrder .content .section-bar .btn .btn-base {
  float: left;
  margin-left: 30px;
  width: 158px;
  height: 38px;
  border: 1px solid #b0b0b0;
  font-size: 14px;
  line-height: 38px;
  text-align: center;
}
.confirmOrder .content .section-bar .btn .btn-return {
  color: rgba(0, 0, 0, 0.27);
  border-color: rgba(0, 0, 0, 0.27);
}
.confirmOrder .content .section-bar .btn .btn-primary {
  background: #ff6700;
  border-color: #ff6700;
  color: #fff;
}
/* 结算导航CSS */

/* 主要内容容器CSS END */
</style>
