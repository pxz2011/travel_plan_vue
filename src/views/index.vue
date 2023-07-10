<template>
  <div class="d2">
    <el-button
        class="btn1"
        type="primary" size="small" style="float:right"
        @click="logout">登出
    </el-button>
  </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export default {
  name: "index",
  methods: {
    list: function () {
      axios({
        method: 'get',
        url: 'http://localhost:8080/user/list',
        headers: {
          'token': localStorage.getItem("token")
        }
      }).then(function (res) {
        if (res.data.code === 1) {
          const msg = JSON.stringify(res.data.data)
          ElMessage.success(msg)
        } else {
          console.log(res.data.msg)
        }
      })
    },
    logout: function () {
      axios({
        method: 'post',
        url: 'http://localhost:8080/user/logout',
        headers: {
          'token': localStorage.getItem("token")
        }
      }).then(function (res) {
        if (res.data.code === 1) {
          ElMessage.success("登出成功!")
          localStorage.removeItem('token')
          router.push('/login')
        } else {
          ElMessage.error(res.data.msg)
        }
      })
    }
  }

}
</script>

<style scoped>
.d2 {
  min-width: 50%;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: flex-end;

}

.btn1 {
  position: relative;
  right: 5px;
  top: 5px;
}
</style>