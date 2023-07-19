<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">修改个人信息(按需修改)</div>
      <div class="form-wrapper">
        <input v-model="this.oldPassword" class="input-item" name="password" placeholder="老密码" type="password"
               @keyup.enter="this.doSubmit">
        <input v-model="this.newPassword" class="input-item" name="password" placeholder="新密码" type="password"
               @keyup.enter="this.doSubmit">
        <input v-model="this.phoneNum" class="input-item" name="phoneNum" placeholder="手机号" type="text"
               @keyup.enter="this.doSubmit">
        <input v-model="this.email" class="input-item" name="email" placeholder="邮箱号" type="text"
               @keyup.enter="this.doSubmit">

        <el-button type="warning" @click="this.doSubmit">修改</el-button>
        <el-button type="danger" @click="this.doWriteOff">注销账户</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";

export default {
  name: "user",
  data: function () {
    return {
      userName: "",
      oldPassword: "",
      newPassword: "",
      email: "",
      phoneNum: "",
    }
  },
  methods: {
    doWriteOff() {
      ElMessageBox.confirm(
          '该操作会永久删除该账户,是否继续?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: '算了吧~',
            type: 'warning',
          }
      )
          .then(() => {
            axios({
              method: "delete",
              url: "http://localhost:8080/user/del",
              headers: {
                "token": localStorage.getItem('token')
              }
            }).then(res => {
              if (res.data.code === 1) {
                ElMessage.success("删除用户成功!")
                localStorage.removeItem("token")
                router.push("/login")
              } else {
                ElMessage({
                  type: "success",
                  message: "删除用户失败!"
                })
              }
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消删除!',
            })
          })
    },
    doSubmit() {
      let user = {
        userName: this.userName,
        password: this.newPassword,
        email: this.email,
        phoneNum: this.phoneNum
      }
      console.log(user)
      axios({
        method: "post",
        url: "http://localhost:8080/user/modifyUserInfo?oldPassword=" + this.oldPassword,
        headers: {
          token: localStorage.getItem("token")
        },
        data: user,
      }).then(res => {
        if (res.data.code === 1) {
          ElMessage.success("修改用户信息成功!");
          localStorage.setItem("token", res.data.data)
          router.push("/")
        } else {
          ElMessage.error("修改用户信息失败!")
        }
      })
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
  font-size: 20px;
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