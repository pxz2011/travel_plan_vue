<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">Register</div>
      <div class="form-wrapper">
        <input type="text" name="username" placeholder="账户" class="input-item" v-model="this.userName">
        <input type="password" name="password" placeholder="密码" class="input-item" v-model="this.password">
        <input type="text" name="phoneNum" placeholder="手机号" class="input-item" v-model="this.phoneNum">
        <input type="text" name="email" placeholder="邮箱号" class="input-item" v-model="this.email">
        <input type="password" name="repassword" placeholder="再次确认密码" class="input-item" v-model="this.cPassword">
        <el-button type="warning" @click="this.doSubmit">注册</el-button>
        <el-button type="primary" @click="this.toLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "register",
  data: function () {
    return {
      userName: "",
      password: "",
      cPassword: "",
      email: "",
      phoneNum: "",
    }
  },
  methods: {
    toLogin: function () {
      router.push("/login")
    },
    doSubmit: function () {
      console.log("注册")
      if (this.email === "" && this.userName === "" && this.password === "" && this.cPassword === "" && this.phoneNum === "") {
        ElMessage.error("请输入全部信息!")
        return;
      }
      //判断两个密码是否相同:
      if (this.password !== this.cPassword) {
        ElMessage.error("两次密码不一样!")
      } else {
        axios({
          method: "post",
          url: "http://localhost:8080/user/reg",
          data: {
            userName: this.userName,
            password: this.password,
            email: this.email,
            phoneNum: this.phoneNum,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          if (res.data.code === 1) {
            console.log(res);
            ElMessage.success("注册成功!")
            router.push("/")
            localStorage.setItem('token', res.data.token);
          } else {
            ElMessage.error("注册失败," + res.data.msg)
          }
        })
      }

    }
  }
}
</script>

<style scoped>
html {
  height: 100%;
}

body {
  height: 100%;
}

.container {
  /* margin-top: 5%; */
  height: 980px;
  width: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item:placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
  margin: 0 auto;
}

.msg {
  text-align: center;
  line-height: 88px;
}

a {
  text-decoration-line: none;
  color: #abc1ee;
}

</style>