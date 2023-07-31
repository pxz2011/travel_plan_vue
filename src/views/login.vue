<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <div class="login-wrapper">
      <div class="header">登录</div>
      <div class="form-wrapper">
        <input type="text" name="username" placeholder="用户名" class="input-item" v-model="uname">
        <input class="input-item" name="password" placeholder="密码" type="password"
               @keyup.enter="doSubmit(this.uname,this.password)"
               v-model="password">
        <el-button type="warning" @click="doSubmit(this.uname,this.password)">登录</el-button>
        <el-button type="primary" @click="doSignUp">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//导包
import {doSignUp, doSubmit} from "@/api/login";
export default {
  name: "Login",
  data: function () {
    return {
      uname: "",
      password: "",

    }
  },
  methods: {
    doSignUp,
    doSubmit,
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

.input-item::placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin: 40px auto 0;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
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