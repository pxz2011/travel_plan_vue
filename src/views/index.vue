<template>
  <div class="d2">
    <el-button
        class="btn1"
        type="primary" size="small" style="float:right"
        @click="logout">登出
    </el-button>
  </div>
  <el-pagination v-model:currentPage="currentPage" :page-sizes="[5,10,15,20]"
                 layout=" prev, pager, next, jumper,total, sizes," :total="400" @size-change="handlerSizeChange"
                 @current-change="handleCurrentChange"/>
  <el-table :data="this.tableData" style="width: 100%" max-height="250">
    <el-table-column fixed prop="time" label="时间" width="150"/>
    <el-table-column prop="thing" label="计划" width="120"/>
    <el-table-column prop="place" label="地点" width="120"/>
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddItem"
  >Add Item
  </el-button
  >

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
      tableData: []
    }
  },
  mounted() {
    this.loadPage(this.pageNum,this.pageSize)
  },
  methods: {
    handlerSizeChange: function (val) {
      console.log("每页数量:$val")
      this.pageSize = val
      this.loadPage(this.pageNum, this.pageSize)
    },
    handleCurrentChange: function (val) {
      console.log(val)
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
    loadPage(pageNum, pageSize) {
      let url = 'http://localhost:8080/plan/page';
      axios.get(url, {
        params: {
          // pageNum:this.pageNum,
          // pageSize:this.pageSize
          pageNum,
          pageSize
        },
        headers: {
          'token': localStorage.getItem('token')
        }
      }).then(resp => {
        console.log(resp)
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
</style>