export default {
  state: {
    shoppingCart: []
  },
  getters: {
    getShoppingCart: state => state.shoppingCart,
    getNum: state => state.shoppingCart.reduce((acc, item) => acc + item.num, 0),
    getIsAllCheck: state => state.shoppingCart.every(item => item.check),
    getCheckGoods: state => state.shoppingCart.filter(item => item.check),
    getCheckNum: state => state.shoppingCart.reduce((acc, item) => item.check ? acc + item.num : acc, 0),
    getTotalPrice: state => state.shoppingCart.reduce((acc, item) => item.check ? acc + (item.price * item.num) : acc, 0)
  },
  mutations: {
    setShoppingCart(state, data) {
      state.shoppingCart = data;
    },
    unshiftShoppingCart(state, data) {
      state.shoppingCart.unshift(data);
    },
    updateShoppingCart(state, { key, prop, val }) {
      let item = state.shoppingCart[key];
      if (prop === "num") {
        if (val < 1 || item.maxNum < val) {
          return;
        }
      }
      item[prop] = val;
    },
    addShoppingCartNum(state, productID) {
      let item = state.shoppingCart.find(item => item.productID === productID);
      if (item && item.num < item.maxNum) {
        item.num++;
      }
    },
    deleteShoppingCart(state, id) {
      let index = state.shoppingCart.findIndex(item => item.id === id);
      if (index !== -1) {
        state.shoppingCart.splice(index, 1);
      }
    },
    checkAll(state, check) {
      state.shoppingCart.forEach(item => item.check = check);
    }
  },
  actions: {
    setShoppingCart({ commit }, data) {
      commit('setShoppingCart', data);
    },
    unshiftShoppingCart({ commit }, data) {
      commit('unshiftShoppingCart', data);
    },
    updateShoppingCart({ commit }, payload) {
      commit('updateShoppingCart', payload);
    },
    addShoppingCartNum({ commit }, productID) {
      commit('addShoppingCartNum', productID);
    },
    deleteShoppingCart({ commit }, id) {
      commit('deleteShoppingCart', id);
    },
    checkAll({ commit }, data) {
      commit('checkAll', data);
    },
  }
}
