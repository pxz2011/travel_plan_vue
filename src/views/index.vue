<template>
  <el-card class="el-card">
    <el-form-item prop="condition" :inline="true">
      <el-input
          tabindex="2"
          style="width:100px"
          class="input-with-select"
          v-model="this.cond"
          @keyup.enter.native="loadPage(this.pageNum,this.pageSize,this.cond)"
      >
      </el-input>
      <el-button @click="loadPage(this.pageNum,this.pageSize,this.cond)" type="primary">查询
      </el-button>
      <el-pagination
          class="el-pagination"
          style="margin-left: 100px;"
          background
          layout="prev, pager, next,sizes,jumper"
          :total="total"
          :page-size="pageSize"
          :page-sizes="[5,10,15]"
          :current-page="current"
          @size-change="handlerSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
      <div class="d2">
        <el-button
            class="btn1"
            type="danger" size="small" style="float:right"
            @click="logout">登出
        </el-button>

      </div>
    </el-form-item>


  </el-card>


  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="time" label="时间" width="180"/>
    <el-table-column prop="thing" label="事件" width="180"/>
    <el-table-column prop="place" label="地点" width="180"/>
    <el-table-column prop="remark" label="备注"></el-table-column>
    <el-table-column fixed="right" label="选项" width="120">
      <template #default="scope">
        <el-button
            link
            type="danger"
            size="small"
            @click.prevent="del(scope.row.id)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="goAdd">Add Item</el-button>

</template>
<script>
import {reactive} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "../router/index";


export default {
  name: "index",

  data: function () {
    return {
      pageNum: 1,
      pageSize: 5,
      tableData: [{}],
      total: 0,
      cond: "",//查询条件
      current:0
    }
  },
  mounted: function () {
    this.loadPage(this.pageNum, this.pageSize, this.cond)
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
    del: function (id) {
      console.log("当前行id为:" + id);
      axios({
        method: 'delete',
        url: "http://localhost:8080/plan/" + id,
        headers:{
          'token':localStorage.getItem('token')
        }
      }).then(res => {
        if (res.data.code === 1) {
          ElMessage.success("删除成功!")
          router.go(0)
        } else {
          ElMessage.error("删除失败,"+res.data.msg)
        }
      })
    },
    handlerSizeChange: function (val) {
      console.log("每页数量:" + val)
      this.pageSize = val
      this.loadPage(this.pageNum, this.pageSize, this.cond)
    },
    handleCurrentChange: function (val) {
      console.log("当前页:" + val)
      this.pageNum = val;
      this.loadPage(this.pageNum, this.pageSize, this.cond)

    },
    goAdd: function () {
      router.push("/add")
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
    loadPage(pageNum, pageSize, cond) {
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
        if (resp.data.code !== 0){
          this.tableData = resp.data.data.records
          this.total = parseInt(resp.data.data.total)
          this.current = parseInt(resp.data.data.current)
          console.log(this.tableData)
        }
        else{
          ElMessage.error(resp.data.msg)
        }

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
  text-align: right;

}

.btn1 {
  position: relative;
  right: 0;
  top: 5px;
  float: right;
}


.paginationClass {
  position: fixed;
  bottom: 0;
  height: 40px;
  width: 100%;
  text-align: center;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.el-pagination {
  justify-content: center;
}

.el-card {
  min-width: 100%;
  height: 100%;
  margin-left: 0;
  transition: all .5s;
}
</style>