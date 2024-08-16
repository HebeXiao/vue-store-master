<template>
  <div id="myLogin">
    <el-dialog title="Login" width="300px" center :visible.sync="isLogin">
      <el-form :model="loginUser" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user-solid" placeholder="Username" v-model="loginUser.name"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input prefix-icon="el-icon-view" type="password" placeholder="Password" v-model="loginUser.pass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="login" class="full-width-button">Login</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MyLogin",
  data() {
    return {
      loginUser: { name: "", pass: "" },
      rules: {
        name: [{ validator: this.validateName, trigger: "blur" }],
        pass: [{ validator: this.validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    isLogin: {
      get() {
        return this.$store.getters.getShowLogin;
      },
      set(val) {
        this.$refs.ruleForm.resetFields();
        this.setShowLogin(val);
      }
    }
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),

    validateName(rule, value, callback) {
      if (!value) {
        callback(new Error("Please provide a username."));
      } else {
        callback();
      }
    },

    validatePass(rule, value, callback) {
      if (!value) {
        callback(new Error("Please provide a password."));
      } else {
        callback();
      }
    },

    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$axios.post("/api/user/login", {
            userName: this.loginUser.name,
            password: this.loginUser.pass
          }).then(res => {
            if (res.data.code === "001") {
              this.handleLoginSuccess(res.data);
            } else {
              this.$refs.ruleForm.resetFields();
              this.notifyError(res.data.msg);
            }
          }).catch(err => {
            this.notifyError(err.message);
          });
        }
      });
    },

    handleLoginSuccess(data) {
      this.isLogin = false;
      const { token, ...userData } = data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      this.setUser(userData);
      this.notifySucceed(data.msg);
    }
  }
};
</script>
