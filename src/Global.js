exports.install = function (Vue) {
   Vue.prototype.$target = "http://localhost:3000/"; // local backend address
  // Encapsulating the pop-up box that indicates success
  Vue.prototype.notifySucceed = function (msg) {
    this.$notify({
      title: "Success",
      message: msg,
      type: "success",
      offset: 100
    });
  };
  // Encapsulation prompts a failed pop-up box
  Vue.prototype.notifyError = function (msg) {
    this.$notify.error({
      title: "Error",
      message: msg,
      offset: 100
    });
  };
}