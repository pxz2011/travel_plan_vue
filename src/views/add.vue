<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="干哈子:">
      <el-input v-model="formInline.thing" placeholder="Activity" clearable/>
    </el-form-item>
    <el-form-item label="时间:">
      <el-date-picker
          v-model="formInline.time"
          type="date"
          placeholder="Pick a date"
          clearable
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="地点:">
      <el-input v-model="formInline.place" placeholder="Place" clearable/>
    </el-form-item>
    <el-form-item label="备注:">
      <el-input v-model="formInline.remark" placeholder="备注" clearable/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="doSubmit(formInline)">添加</el-button>
      <el-button type="warning" @click="goContinue(formInline)">继续添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js" setup>

import {reactive} from 'vue'
import {doSubmit, goContinue} from "@/api/add"

const formInline = reactive({
  thing: '',
  place: "",
  time: '',
  isContinue: 0,
  remark: ""
})


</script>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
