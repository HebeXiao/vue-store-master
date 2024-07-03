<template>
  <div class="shoppingCart">
    <WebHome />
    <!-- Shopping Cart Header -->
    <div class="cart-header">
      <div class="cart-header-content">
        <p>
          <i class="el-icon-shopping-cart-full cart-icon"></i>
          My Shopping Cart
        </p>
      </div>
    </div>
    <!-- Shopping Cart Header END -->

    <!-- Shopping Cart Main Content Area -->
    <div class="content" v-if="getShoppingCart.length > 0">
      <ul>
        <!-- Shopping Cart Header -->
        <li class="header">
          <div class="pro-check">
            <el-checkbox v-model="isAllCheck">Select All</el-checkbox>
          </div>
          <div class="pro-img"></div>
          <div class="pro-name">Product</div>
          <div class="pro-price">Unit Price</div>
          <div class="pro-num">Quantities</div>
          <div class="pro-total">Subtotal</div>
          <div class="pro-action">Delete</div>
        </li>
        <!-- Shopping Cart Header END -->

        <!-- Shopping Cart List -->
        <li
          class="product-list"
          v-for="(item, index) in getShoppingCart"
          :key="item.id"
        >
          <div class="pro-check">
            <el-checkbox
              :value="item.check"
              @change="checkChange($event, index)"
            ></el-checkbox>
          </div>
          <div class="pro-img">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
            >
              <img
                :src="
                  item.productImg.includes('http:')
                    ? item.productImg
                    : $target + item.productImg
                "
              />
            </router-link>
          </div>
          <div class="pro-name">
            <router-link
              :to="{
                path: '/goods/details',
                query: { productID: item.productID },
              }"
            >
              {{ item.productName }}
            </router-link>
          </div>
          <div class="pro-price">{{ item.price }}£</div>
          <div class="pro-num">
            <el-input-number
              size="small"
              :value="item.num"
              @change="handleChange($event, index, item.productID)"
              :min="1"
              :max="item.maxNum"
            ></el-input-number>
          </div>
          <div class="pro-total pro-total-in">{{ item.price * item.num }}£</div>
          <div class="pro-action">
            <el-popover placement="right">
              <p>Are you sure about the deletion?</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button
                  type="primary"
                  size="mini"
                  @click="deleteItem($event, item.id, item.productID)"
                  >Confirm</el-button
                >
              </div>
              <i class="el-icon-error delete-icon" slot="reference"></i>
            </el-popover>
          </div>
        </li>
        <!-- Shopping Cart List END -->
      </ul>
      <!-- Shopping cart bottom navigation bar -->
      <div class="cart-bar">
        <div class="cart-bar-left">
          <span class="cart-total">
            Total <span style="color: #4caf50;">{{ getNum }}</span> items,
            <span style="color: #4caf50;">{{ getCheckNum }}</span> items selected
          </span>
        </div>
        <div class="cart-bar-right">
          <span>
            <span style= "color: #4caf50; font-size: 20px;">Total：</span>
            <span class="total-price">{{ getTotalPrice }}£</span>
          </span>
          <div
            :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'"
            @click="handleOrderClick"
          >
            Order
          </div>
        </div>
      </div>
      <!-- Shopping cart bottom navigation bar END -->
    </div>
    <!-- Shopping Cart Main Content Area END -->

    <!-- Content displayed when the shopping cart is empty -->
    <div v-else class="cart-empty">
      <div class="empty">
        <h2>Your shopping cart is empty!</h2>
        <p>Go shopping!</p>
      </div>
    </div>
    <!-- Content displayed when the shopping cart is empty END -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import WebHome from "../WebHome.vue";

export default {
  components: {
    WebHome,
  },
  created() {
    this.initShoppingCart();
  },
  methods: {
    ...mapActions([
      "updateShoppingCart",
      "deleteShoppingCart",
      "checkAll",
      "setShoppingCart",
    ]),
    // Get shopping cart information  
    initShoppingCart() {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.$axios
          .post("/api/cart/list", { user_id: parsedUserData.user.user_id })
          .then((res) => {
            if (res.data.code === "001") {
              this.setShoppingCart(res.data.data);
            } else {
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            console.error("Error fetching shopping cart:", err);
          });
      }
    },
    // confirm order
    handleOrderClick() {
      if (this.getCheckGoods.length > 0) {
        this.$router.push("/confirmOrder");
      } else {
        this.notifyError("Please select items to order.");
      }
    },
    // update the shopping cart
    handleChange(currentValue, key, productID) {
      this.updateShoppingCart({ key, prop: "check", val: true });
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.$axios
          .post("/api/cart/update", {
            user_id: parsedUserData.user.user_id,
            product_id: productID,
            num: currentValue,
          })
          .then((res) => {
            if (res.data.code === "001") {
              this.updateShoppingCart({ key, prop: "num", val: currentValue });
              this.notifySucceed(res.data.msg);
            } else {
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            console.error("Error updating shopping cart:", err);
          });
      }
    },
    checkChange(val, key) {
      this.updateShoppingCart({ key, prop: "check", val });
    },
    // delete the item from the shopping cart
    deleteItem(e, id, productID) {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.$axios
          .post("/api/cart/remove", {
            user_id: parsedUserData.user.user_id,
            product_id: productID,
          })
          .then((res) => {
            if (res.data.code === "001") {
              this.deleteShoppingCart(id);
              this.notifySucceed(res.data.msg);
            } else {
              this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            console.error("Error deleting item from shopping cart:", err);
          });
      }
    },
  },
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
      "getCheckGoods",
    ]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
};
</script>

<style scoped>
.shoppingCart {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

/* Shopping Cart Header CSS */
.shoppingCart .cart-header {
  height: 64px;
  border-bottom: 2px solid #4caf50;
  background-color: #fff;
  margin-bottom: 20px;
}

.shoppingCart .cart-header .cart-header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.shoppingCart .cart-header p {
  font-size: 28px;
  line-height: 58px;
  color: #424242;
  margin: 10px 0;
}

.cart-icon {
  color: #4caf50;
  font-weight: 550;
}

/* Shopping Cart Header CSS END */

/* Shopping Cart Main Content Area CSS */
.shoppingCart .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}

.shoppingCart .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 100px;
}

/* Shopping cart header CSS */
.shoppingCart .content ul .header {
  height: 70px;
  padding-right: 26px;
  color: #424242;
}

.shoppingCart .content ul .product-list {
  height: 85px;
  padding: 10px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}

.shoppingCart .content ul .pro-check {
  float: left;
  height: 85px;
  width: 110px;
}

.shoppingCart .content ul .pro-check .el-checkbox {
  font-size: 16px;
  margin-left: 24px;
}

.shoppingCart .content ul .pro-img {
  float: left;
  height: 85px;
  width: 120px;
}

.shoppingCart .content ul .pro-img img {
  height: 80px;
  width: 80px;
}

.shoppingCart .content ul .pro-name {
  float: left;
  width: 380px;
}

.shoppingCart .content ul .pro-name a {
  color: #424242;
}

.shoppingCart .content ul .pro-name a:hover {
  color: #4caf50;
}

.shoppingCart .content ul .pro-price {
  float: left;
  width: 140px;
  padding-right: 18px;
  text-align: center;
}

.shoppingCart .content ul .pro-num {
  float: left;
  width: 150px;
  text-align: center;
}

.shoppingCart .content ul .pro-total {
  float: left;
  width: 120px;
  padding-right: 81px;
  text-align: right;
}

.shoppingCart .content ul .pro-total-in {
  color: #4caf50;
}

.shoppingCart .content ul .pro-action {
  float: left;
  width: 80px;
  text-align: center;
}

.shoppingCart .content ul .pro-action i:hover {
  color: #39823c;
}

.delete-icon {
  font-size: 20px;
  cursor: pointer
}

/* Shopping cart header CSS END */

/* Shopping cart bottom navigation bar CSS */
.shoppingCart .cart-bar {
  width: 1225px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e0e0e0; /* 添加这一行 */
}

.shoppingCart .cart-bar .cart-bar-left .cart-total {
  color: #757575;
  margin: 0 20px;
}

.shoppingCart .cart-bar .cart-bar-right {
  display: flex;
  align-items: center;
}

.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #4caf50;
  font-size: 30px;
  margin-right: 30px;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary,
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  width: 200px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  background: #4caf50;
  color: #fff;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #37893a;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  background: #e0e0e0;
  color: #b0b0b0;
}
/* Shopping cart bottom navigation bar CSS END */

/* Content displayed when the shopping cart is empty CSS */
.shoppingCart .cart-empty {
  width: 1225px;
  margin: 0 auto;
}
.shoppingCart .cart-empty .empty {
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

.shoppingCart .cart-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}

.shoppingCart .cart-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* Content displayed when the shopping cart is empty CSS END */
</style>
