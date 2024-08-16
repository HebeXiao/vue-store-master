<template>
  <div class="goods" id="goods" name="goods">
    <WebHome />
    <div class="main">
      <div class="list">
        <div id="myList" class="myList" v-if="hasProducts">
          <ul>
            <li v-for="item in product" :key="item.product_id">
              <router-link :to="{ path: '/goods/details', query: { productID: item.product_id } }">
                <img :src="getImageSrc(item.product_picture)" alt />
                <h2>{{ item.product_name }}</h2>
                <h3>{{ item.product_title }}</h3>
                <p>
                  <span>{{ item.product_selling_price }}£</span>
                  <span v-if="item.product_price !== item.product_selling_price" class="del">{{ item.product_price }}£</span>
                </p>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else class="none-product">Sorry, no related products found, please take a look at other products.</div>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          @current-change="currentChange"
        ></el-pagination>
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
      product: [],
      total: 0,
      pageSize: 15,
      currentPage: 1
    };
  },
  computed: {
    hasProducts() {
      return this.product.length > 0;
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    backtop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async currentChange(currentPage) {
      this.currentPage = currentPage;
      await this.fetchData();
      this.backtop();
    },
    async fetchData() {
      try {
        const response = await this.$axios.post('/api/product/all', {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
        this.product = response.data.data;
        this.total = response.data.total;
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    },
    getImageSrc(picture) {
      return picture.includes('http:') ? picture : this.$target + picture;
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
  float: left;
  width: 234px;
  height: 280px;
  padding: 10px 0;
  margin: 0 0 14.5px 13.7px;
  background-color: white;
  transition: all 0.2s linear;
  position: relative;
}

.myList ul li:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}

.myList ul li img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background: url(../assets/imgs/placeholder.png) no-repeat 50%;
}

.myList ul li h2, .myList ul li h3, .myList ul li p {
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.myList ul li h2 {
  margin: 25px 10px 0;
  font-size: 14px;
}

.myList ul li h3 {
  margin: 5px 10px;
  height: 18px;
  font-size: 12px;
  color: #b0b0b0;
}

.myList ul li p {
  margin: 10px 10px 10px;
  color: #4caf50;
  font-weight: 500;
}

.myList ul li p .del {
  margin-left: 0.5em;
  color: #b0b0b0;
  text-decoration: line-through;
}
</style>
