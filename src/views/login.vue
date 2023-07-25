<template xmlns="http://www.w3.org/1999/html">
  <div class="container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input type="text" name="username" placeholder="用户名" class="input-item" v-model="uname">
        <input type="password" name="password" placeholder="密码" class="input-item" @keyup.enter="doSubmit"
               v-model="password">
        <el-button type="warning" @click="doSubmit">登录</el-button>
        <el-button type="primary" @click="doSignUp">注册</el-button>
      </div>
    </div>
    <!--      <el-form-item>-->
    <!--        <el-button type="primary" style="width: 50%;" @click="doSubmit();">登录</el-button>-->
    <!--        <br/>-->
    <!--        <el-button type="warning" style="width: 50%;" @click="doSignUp()">注册</el-button>-->

    <!--      </el-form-item>-->
  </div>
</template>

<script>
//导包
import axios from 'axios'
import {ElMessage} from 'element-plus'
import qs from 'qs'
import router from '@/router'

export default {
  name: "Login",
  data: function () {
    return {
      uname: "",
      password: "",

    }
  },
  methods: {
    doSubmit: function () {
      console.log("登录")
      const url = "http://localhost:8080/user/login";
      axios({
        method: 'post',
        url: url,
        data: {
          userName: this.uname,
          password: this.password
        },
      }).then(function (res) {
        if (res.data.code === 1) {
          console.log(res);
          ElMessage.success("登录成功!")
          router.push("/")
          localStorage.setItem('token', res.data.token);
        } else {
          console.log(res)
          ElMessage.error("登录失败!")
        }
      });
    },
    doSignUp: function () {
      console.log("去注册")
      window.location.replace("/reg")
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
  margin: 0 auto;
  width: 100%;
  margin-top: 40px;
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
————————————————
版权声明：本文为CSDN博主「good_good_study5」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/good_good_study5/article/details/128840921