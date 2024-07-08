<template>
  <div id="register">
    <el-dialog title="User Registration" width="300px" center :visible.sync="isRegister">
      <el-form
        :model="RegisterUser"
        :rules="rules"
        status-icon
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input
            prefix-icon="el-icon-user-solid"
            placeholder="Username"
            v-model="RegisterUser.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="Password"
            v-model="RegisterUser.pass"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPass">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            placeholder="Repeat Password"
            v-model="RegisterUser.confirmPass"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" type="primary" @click="Register" style="width:100%;">Register</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MyRegister",
  props: ["register"],
  data() {
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please provide a username."));
      }
      this.$axios
        .post("/api/user/check", {
          userName: this.RegisterUser.name
        })
        .then(res => {
          if (res.data.code == "001") {
            return callback();
          } else {
            return callback(new Error(res.data.msg));
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Please provide a password."));
      }
      const passwordRule = /^\w{5,40}$/;
      if (passwordRule.test(value)) {
        return callback();
      } else {
        return callback(new Error("Password must be 5-40 characters long."));
      }
    };
    let validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Please repeat your password."));
      }
      if (this.RegisterUser.pass != "" && value === this.RegisterUser.pass) {
        return callback();
      } else {
        return callback(new Error("Passwords do not match."));
      }
    };
    return {
      isRegister: false,
      RegisterUser: {
        name: "",
        pass: "",
        confirmPass: "",
        phone: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        confirmPass: [{ validator: validateConfirmPass, trigger: "blur" }]
      }
    };
  },
  watch: {
    register: function(val) {
      if (val) {
        this.isRegister = val;
      }
    },
    isRegister: function(val) {
      if (!val) {
        this.$refs["ruleForm"].resetFields();
        this.$emit("fromChild", val);
      }
    }
  },
  methods: {
    Register() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/user/register", {
              userName: this.RegisterUser.name,
              password: this.RegisterUser.pass,
              userPhonenumber: this.RegisterUser.phone
            })
            .then(res => {
              if (res.data.code === "001") {
                this.isRegister = false;
                this.notifySucceed(res.data.msg);
              } else {
                this.notifyError(res.data.msg);
              }
            })
            .catch(err => {
              return Promise.reject(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
