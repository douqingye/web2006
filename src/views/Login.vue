<template>
  <div class="login-container">
    <!-- stretch标签的宽度是否自动撑开 -->
    <el-tabs
      v-model="activeName"
      type="border-card"
      class="login-tabs"
      stretch
      @tab-click="handleClick"
    >
      <el-tab-pane label="用户登录" name="login">
        <!-- name匹配的是登录高亮还是注册高亮，ref获取表单里的内容 -->
        <el-form
          ref="loginForm"
          :model="user"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username"> </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户注册" name="second">
        <el-form
          ref="loginForm"
          :model="user"
          status-icon
          :rules="rules"
          class="login-form"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username"> </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="surePassword">
            <el-input type="password" v-model="user.surePassword"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormReg('loginForm')">
              注册
            </el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api";
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    //参考官网  //验证规则定义
    var validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      }
      if (value.length <= 3) {
        callback(new Error("长度不够"));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateSurePassword = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      }
      callback();
    };

    return {
      activeName: "login", //默认显示的type
      user: "",
      pass: "",
      user: {
        //动态的数据
        username: "",
        password: "",
        surePassword: "",
        email: "",
      },
      //rules里的属性和prop里的属性相对应，validateUsername是自己写的验证，根据这个规则需要在data重新定义
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }], //验证规则
        password: [{ validator: validatePassword, trigger: "blur" }], //验证规则
        surePassword: [{ validator: validateSurePassword, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    handleClick() {},
    //登录按钮
    submitForm() {
      api
        .getLogin({
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          console.log(jwt(res.data));
          if (res.status == 200) {
            this.setUser({
              username: jwt(res.data).username,
              token: res.data,
            });
            //存到本地
            localStorage.setItem("ego", res.data);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          this.$message({
            message: error.data.errors,
            type: "error",
          });
        });
    },
    //注册按钮
    submitFormReg() {
      api
        .getRegister({
          username: this.user.username,
          password: this.user.password,
          email: this.user.email,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          } 
        })
         .catch((error) => {
          this.$message({
            message: error.data.errors,
            type: "error",
          });
        });
    },
  },
};
</script>

<style scoped lang='less'>
.login-container {
  width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  .login-form {
    padding: 40px 40px;
  }
  h3 {
    margin-top: 20px;
  }
  .login-tabs {
    border-radius: 5px;
  }
}
</style>