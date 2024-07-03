<template>
  <div class="goods" id="goods" name="goods">
    <WebHome />
    <!-- Main content -->
    <div class="main">
      <div class="list">
        <div id="myList" class="myList" v-if="product.length > 0">
          <ul>
            <li v-for="item in product" :key="item.product_id">
              <router-link :to="{ path: '/goods/details', query: {productID:item.product_id} }">
                <img :src="item.product_picture.includes('http:') ? item.product_picture : $target + item.product_picture" alt />
                <h2>{{item.product_name}}</h2>
                <h3>{{item.product_title}}</h3>
                <p>
                  <span>{{item.product_selling_price}}£</span>
                  <span v-show="item.product_price != item.product_selling_price" class="del">{{item.product_price}}£</span>
                </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else class="none-product">Sorry, no related products found, please take a look at other products</div>
      </div>
      <!-- pagination -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
      </div>
      <!-- pagination END -->
    </div>
    <!-- Main content END -->
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
      product: [], 
      total: 0, 
      pageSize: 15,
      currentPage: 1
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    backtop() {
      const timer = setInterval(function() {
        const top = document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop = top + speed;
        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.getData();
      this.backtop();
    },
    getData() {
      this.$axios
        .post('/api/product/all', {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.product = res.data.data;
          this.total = res.data.total;
        })
        .catch(err => {
          console.error('Error fetching products:', err);
        });
    }
  }
};
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}
.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}
.goods .main .pagination {
  height: 50px;
  text-align: center;
}
.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}

.myList ul li {
  z-index: 1;
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: white;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
  position: relative;
}
.myList ul li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}
.myList ul li img {
  display: block;
  width: 160px;
  height: 160px;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
  margin: 0 auto;
}
.myList ul li h2 {
  margin: 25px 10px 0;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: #b0b0b0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.myList ul li p {
  margin: 10px 10px 10px;
  text-align: center;
  color: #4caf50;
  font-weight: 500;
}
.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>
