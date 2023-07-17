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
      <el-button type="primary" @click="onSubmit">添加</el-button>
      <el-button type="warning" @click="goContinue()">继续添加</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="js" setup>

import {reactive} from 'vue'
import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

const formInline = reactive({
  thing: '',
  place: "",
  time: '',
  isContinue: 0,
  remark: ""
})
const onSubmit = () => {
  console.log('isContinue='+formInline.isContinue)
  if (formInline.time != null && formInline.place != null && formInline.thing != null && formInline.thing !== "" && formInline.place !== "" && formInline.time !== "" ) {
    axios({
      url: 'http://localhost:8080/plan/save',
      data: {
        'thing': formInline.thing,
        'time': formInline.time,
        'place': formInline.place,
        'remark':formInline.remark
      },
      headers: {
        'token': localStorage.getItem('token')
      },
      method: 'put'
    }).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        ElMessage.success("添加成功!")
        if (formInline.isContinue === 0) {
          router.push("/")
        } else {
          router.go(0)

        }
      } else {
        ElMessage.error(res.data.msg)
      }
    })
  } else {
    ElMessage.error("清输入全部信息!")
  }
}
const goContinue = () => {
  formInline.isContinue = 1

  onSubmit()

}

</script>
<style>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}
</style>
