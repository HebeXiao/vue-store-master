<template>
  <div class="profile">
    <WebHome />
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-header-content">
        <p>
          <i
            class="el-icon-s-order"
            style="font-size: 30px; color: #4caf50"
          ></i>
          My Profile
        </p>
      </div>
    </div>
    <!-- Profile Header END -->

    <div class="profile-container">
      <div v-if="user">
        <div class="user-info">
          <p><strong>User Name:</strong> {{ user.userName }}</p>
          <p><strong>Phone:</strong> {{ user.userPhonenumber }}</p>
          <p><strong>Linkman:</strong> {{ user.linkman }}</p>
          <p><strong>Address:</strong> {{ user.address }}</p>
          <p>
            <strong>Membership:</strong><br />
            <!-- 条件渲染Membership状态 -->
            <span v-if="user.membership === false">
              <img
                src="@/assets/imgs/not_activated.png"
                alt="Not Activated"
                class="membership-image"
              />
            </span>
            <span v-else>
              <img
                src="@/assets/imgs/activated.png"
                alt="Activated"
                class="membership-image"
              />
            </span>
          </p>
          <!-- 其他内容 -->
          <div class="button-container">
            <button @click="editUser">Edit</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>
    <!-- Edit User Modal -->
    <el-dialog :visible.sync="isEditing" title="Edit User Profile">
      <el-form @submit.prevent="updateUser">
        <el-form-item label="Phone">
          <el-input v-model="editUserForm.user_phonenumber" />
        </el-form-item>
        <el-form-item label="Linkman">
          <el-input v-model="editUserForm.linkman" />
        </el-form-item>
        <el-form-item label="Address">
          <el-input v-model="editUserForm.address" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser">Save</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import WebHome from "../WebHome.vue";
import { mapGetters } from "vuex";
import { Button, Dialog, Form, FormItem, Input } from "element-ui";
import feedbackService from "@/store/modules/feedbackService";
import store from '@/store'; // 确保路径正确

export default {
  components: {
    WebHome,
    "el-button": Button,
    "el-dialog": Dialog,
    "el-form": Form,
    "el-form-item": FormItem,
    "el-input": Input,
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
  computed: {
    ...mapGetters([
      "isGuidanceMode",
      "getCurrentChallengeId",
    ]),
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
      this.editUserForm.user_phonenumber = this.user.userPhonenumber;
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
      const currentChallengeId = store.getters.getCurrentChallengeId;

      // 原始用户信息
      const originalPhone = parsedUserData.user.user_phonenumber;
      const originalLinkman = parsedUserData.user.linkman;
      const originalAddress = parsedUserData.user.address;

      // 构建payload，仅包含已更改的字段
      const payload = {
        user_id: parsedUserData.user.user_id, // 用户ID总是需要的
      };

      // 检查电话号码是否更改
      if (this.editUserForm.user_phonenumber !== originalPhone) {
        payload.user_phonenumber = this.editUserForm.user_phonenumber;
      }

      // 检查联系人是否更改
      if (this.editUserForm.linkman !== originalLinkman) {
        payload.linkman = this.editUserForm.linkman;
      }

      // 检查地址是否更改
      if (this.editUserForm.address !== originalAddress) {
        payload.address = this.editUserForm.address;
      }

      // 发送POST请求更新用户信息
      this.$axios
        .post("api/user/update", payload)
        .then(() => {
          this.fetchUser(); // 重新获取用户信息
          this.isEditing = false;
        })
        .catch((err) => {
          console.error(err);
        });

      if (this.isGuidanceMode && Number(currentChallengeId) === 2) {
        feedbackService.sendFeedback(
          "You have successfully edited the Profile! Notice how the edit request occurred and think about how the request was constructed."
        );
        setTimeout(() => {
          feedbackService.sendFeedback(
            "Tip: The Developer tool is your observation tool, and the Postman tool is your little testing helper! Take care to check that the Header is set."
          );
        }, 10000);
      }
    },
  },
};
</script>

<style>
/* 弹窗样式调整 */
.el-dialog {
  width: 600px;
  margin: auto;
}

.el-dialog__body {
  font-size: 14px;
}

.el-dialog .el-button {
  margin-top: 10px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

.el-dialog .el-button:hover {
  background-color: #39873b;
}

.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  width: 100%; /* 确保占满父元素宽度 */
}

/* Profile Header CSS */
.profile .profile-header {
  height: 64px;
  border-bottom: 2px solid #4caf50;
  background-color: #fff;
  margin-bottom: 20px;
}

.profile .profile-header .profile-header-content {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.profile .profile-header p {
  font-size: 28px;
  line-height: 58px;
  font-weight: bold;
  color: #424242;
  padding: 10px 0;
}
/* Profile Header CSS END */

/* User Info CSS */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 800px;
}

.user-info p {
  margin: 10px 0;
  font-size: 16px;
}

.user-info strong {
  font-weight: bold;
}

.user-info button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-info button:hover {
  background-color: #39873b;
}

.membership-image {
  width: 100px;
}
</style>
