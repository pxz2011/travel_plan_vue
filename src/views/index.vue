<template>
  <el-button @click="this.list">123</el-button>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";
import qs from 'qs'
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
    }
  }

}
</script>

<style scoped>

</style>