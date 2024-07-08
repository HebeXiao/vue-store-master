<template>
  <div>
    <WebHome />
    <h1>用户资料</h1>
    <div v-if="user">
      <div class="user-info">
        <p><strong>用户名:</strong> {{ user.userName }}</p>
        <p><strong>电话:</strong> {{ user.userPhonenumber }}</p>
        <p><strong>联系人:</strong> {{ user.linkman }}</p>
        <p><strong>地址:</strong> {{ user.address }}</p>
        <p><strong>会员等级:</strong> {{ user.membership }}</p>
        <button @click="editUser">编辑</button>
      </div>
    </div>
    <div v-else>
      <p>正在加载用户信息...</p>
    </div>

    <div v-if="isEditing">
      <h2>编辑用户资料</h2>
      <form @submit.prevent="updateUser">
        <div>
          <label for="user_phonenumber">电话:</label>
          <input
            type="text"
            v-model="editUserForm.user_phonenumber"
            id="user_phonenumber"
          />
        </div>
        <div>
          <label for="linkman">联系人:</label>
          <input type="text" v-model="editUserForm.linkman" id="linkman" />
        </div>
        <div>
          <label for="address">地址:</label>
          <input type="text" v-model="editUserForm.address" id="address" />
        </div>
        <button type="submit">保存</button>
        <button type="button" @click="cancelEdit">取消</button>
      </form>
    </div>
  </div>
</template>

<script>
import WebHome from "../WebHome.vue";
export default {
  components: {
    WebHome,
  },
  data() {
    return {
      user: null,
      isEditing: false,
      editUserForm: {
        user_phonenumber: "",
        linkman: "",
        address: "",
      },
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      const userData = localStorage.getItem("user");
      const parsedUserData = JSON.parse(userData);
      this.$axios
        .post("api/user/info", { user_id: parsedUserData.user.user_id })
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editUser() {
      this.isEditing = true;
      this.editUserForm.user_phonenumber = this.user.user_phonenumber;
      this.editUserForm.linkman = this.user.linkman;
      this.editUserForm.address = this.user.address;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editUserForm = {
        user_phonenumber: "",
        linkman: "",
        address: "",
      };
    },
    updateUser() {
      const userData = localStorage.getItem("user");
      const parsedUserData = JSON.parse(userData);
      this.$axios
        .post("api/user/update", {
          user_id: parsedUserData.user.user_id,
          user_phonenumber: this.editUserForm.user_phonenumber,
          linkman: this.editUserForm.linkman,
          address: this.editUserForm.address,
        })
        .then(() => {
          this.fetchUser(); // 重新获取用户信息
          this.isEditing = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style>
/* 添加一些样式以使显示更美观 */
.user-info {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}
form {
  margin-top: 20px;
}
form div {
  margin-bottom: 10px;
}
form label {
  display: block;
}
form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
form button {
  margin-right: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
form button[type="button"] {
  background-color: #6c757d;
}
</style>
