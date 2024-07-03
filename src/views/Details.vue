<template>
  <div id="details">
    <WebHome />
    <div class="main">
      <!-- Left Product Rotator -->
      <div class="block">
        <el-carousel height="450px" v-if="productPicture.length > 1">
          <el-carousel-item v-for="item in productPicture" :key="item.id">
            <img
              style="height: 450px"
              :src="
                item.product_picture.includes('http:')
                  ? item.product_picture
                  : $target + item.product_picture
              "
              :alt="item.intro"
            />
          </el-carousel-item>
        </el-carousel>
        <div v-else-if="productPicture.length == 1">
          <img
            style="height: 400px"
            :src="
              productPicture[0].product_picture.includes('http:')
                ? productPicture[0].product_picture
                : $target + productPicture[0].product_picture
            "
            :alt="productPicture[0].intro"
          />
        </div>
      </div>
      <!-- Left Product Rotator END -->

      <!-- Right content area -->
      <div class="content">
        <h1 class="name">{{ productDetails.product_name }}</h1>
        <p class="intro">{{ productDetails.product_intro }}</p>
        <div class="price">
          <span>{{ productDetails.product_selling_price }}£</span>
          <span
            v-if="
              productDetails.product_price !=
              productDetails.product_selling_price
            "
            class="del"
            >{{ productDetails.product_price }}£</span
          >
        </div>
        <!-- Buttons at the bottom of the content area -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart"
            >Add to cart</el-button
          >
        </div>
        <!-- Buttons at the bottom of the content area END -->
      </div>
      <!-- Right content area END -->
    </div>
  </div>
</template>

<script>
import WebHome from "../WebHome.vue";
import { mapActions } from "vuex";

export default {
  components: {
    WebHome,
  },
  data() {
    return {
      productID: "",
      productDetails: {},
      productPicture: [],
    };
  },
  activated() {
    if (this.$route.query.productID !== undefined) {
      this.productID = this.$route.query.productID;
      this.getDetails(this.productID);
      this.getDetailsPicture(this.productID);
    }
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // Get product details
    getDetails(productID) {
      this.$axios
        .post("/api/product/detail", { productID })
        .then((res) => {
          this.productDetails = res.data.data;
        })
        .catch((err) => {
          console.error("Error fetching product details:", err);
        });
    },
    // Get Product Images
    getDetailsPicture(productID) {
      this.$axios
        .post("/api/product/pictures", { productID })
        .then((res) => {
          this.productPicture = res.data.data;
        })
        .catch((err) => {
          console.error("Error fetching product pictures:", err);
        });
    },
    // Add to cart
    addShoppingCart() {
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.$axios
          .post("/api/cart/save", {
            user_id: parsedUserData.user.user_id,
            product_id: this.productID,
          })
          .then((res) => {
            switch (res.data.code) {
              case "001":
                // Newly added to cart successfully
                this.unshiftShoppingCart(res.data.data);
                this.notifySucceed(res.data.msg);
                break;
              case "002":
                // This item is already in the shopping cart, quantity +1
                this.addShoppingCartNum(this.productID);
                this.notifySucceed(res.data.msg);
                break;
              default:
                this.notifyError(res.data.msg);
            }
          })
          .catch((err) => {
            console.error("Error adding to cart:", err);
          });
      }
    },
  },
};
</script>

<style scoped>
#details .main {
  width: 1000px;
  padding-top: 30px;
  margin: 0 150px;
}
#details .main .block {
  float: left;
  width: 430px;
  height: 450px;
}

#details .main .content {
  float: left;
  margin-left: 40px;
  width: 450px;
}

#details .main .content .name {
  font-size: 30px;
  font-weight: normal;
  color: #212121;
}

#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 20px;
}

#details .main .content .price {
  display: block;
  font-size: 24px;
  color: #4caf50;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0;
}

#details .main .content .price .del {
  font-size: 20px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}

#details .main .content .button {
  height: 55px;
  margin: 50px 0 20px 0;
}

#details .main .content .button .el-button {
  width: 100%;
  height: 55px;
  font-size: 18px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  text-align: center;
}

#details .main .content .button .el-button:hover {
  background-color: #39a03c;
}
</style>
