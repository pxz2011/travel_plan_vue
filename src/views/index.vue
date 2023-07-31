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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
      <div class="d2">
        <el-button
            class="btn1"
            type="danger" size="small" style="float:right"
            @click="logout">登出
        </el-button>

      </div>
      <div class="d2">
        <el-button
            class="btn1"
            size="small" style="float:right" type="warning"
            @click="goUserInfo">用户信息
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
import {del, goAdd, goUserInfo, handleCurrentChange, handleSizeChange, loadPage, logout} from "@/api";
export default {
  name: "index",

  data: function () {
    return {
      pageNum: 1,
      pageSize: 5,
      tableData: [{}],
      total: 0,
      cond: "",//查询条件
      current: 0
    }
  },
  mounted: function () {
    this.loadPage(this.pageNum, this.pageSize, this.cond)
    console.log(this.tableData)
  },
  methods: {
    handleSizeChange,
    loadPage,
    handleCurrentChange,
    logout,
    goUserInfo,
    del,
    goAdd

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