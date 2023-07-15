<template>
  <el-pagination
      background
      class="paginationClass"
      v-model:total="this.total"
      v-model:page-size='this.pageSize'
      v-model:current-page="this.pageNum"
      :page-sizes="[5,10,15]"
      @size-change="handlerSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
  />
  <el-form-item prop="email-code" :inline="true">
    <el-input
        ref="authCode"
        tabindex="2"
        style="width:100px"
        class="input-with-select"
        @keyup.enter.native="loadPage(this.pageNum,this.pageSize,this.cond)"
        v-model="this.cond"
    >

    </el-input>
    <el-button @click="loadPage(this.pageNum,this.pageSize,this.cond)" type="primary" :disabled="isDisabled">查询</el-button>
  </el-form-item>
  <div class="d2">
    <el-button
        class="btn1"
        type="primary" size="small" style="float:right"
        @click="logout">登出
    </el-button>

  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="time" label="time" width="180"/>
    <el-table-column prop="thing" label="thing" width="180"/>
    <el-table-column prop="place" label="place"/>
  </el-table>
</template>
<script lang="js">
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "../router/index";

export default {
  name: "index",

  data: function () {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      tableData:[{

      }],
      cond:""//查询条件
    }
  },
  created: function () {
    this.loadPage(this.pageNum, this.pageSize)
    console.log(this.tableData)
  },
  // mounted() {
  //   this.timer = null;
  //   clearInterval(this.timer)
  //   this.timer = setInterval(() => {
  //     this.loadPage(this.pageNum,this.pageSize)
  //   }, 5000)
  // },
  methods: {
    handlerSizeChange: function (val) {
      console.log("每页数量:" + val)
      this.pageSize = val
      this.loadPage(this.pageNum, this.pageSize)
    },
    handleCurrentChange: function (val) {
      console.log("当前页:" + val)
      this.pageNum = val;
      this.loadPage(this.pageNum, this.pageSize)

    },
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
    },
    loadPage(pageNum, pageSize,cond) {
      let url = 'http://localhost:8080/plan/page';
      axios.get(url, {
        params: {
          // pageNum:this.pageNum,
          // pageSize:this.pageSize
          pageNum,
          pageSize,
          cond
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(resp => {
        console.log(resp)
        this.tableData = resp.data.data.records
        this.total = resp.data.data.total
        console.log(this.tableData)
      });
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


.paginationClass {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
}
</style>