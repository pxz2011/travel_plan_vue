import router from "@/router";
import axios from "axios";
import {ElMessage} from "element-plus";

export function goUserInfo() {
    router.push("/user")
}

export function del(id) {
    console.log("当前行id为:" + id);
    axios({
        method: 'delete',
        url: "http://localhost:8080/plan/" + id,
        headers: {
            'token': localStorage.getItem('token')
        }
    }).then(res => {
        if (res.data.code === 1) {
            localStorage.setItem('token', res.data.token);
            ElMessage.success("删除成功!")
            router.go(0)
        } else {
            ElMessage.error("删除失败," + res.data.msg)
        }
    })
}

export function handleSizeChange(val) {
    console.log("每页数量:" + val)
    this.pageSize = val
    this.loadPage(this.pageNum, this.pageSize, this.cond)
}

export function handleCurrentChange(val) {
    console.log("当前页:" + val)
    this.pageNum = val;
    this.loadPage(this.pageNum, this.pageSize, this.cond)

}

export function goAdd() {
    router.push("/add")
}

export function logout() {
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

export function loadPage(pageNum, pageSize, cond) {
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
        if (resp.data.code !== 0) {
            this.tableData = resp.data.data.records
            this.total = parseInt(resp.data.data.total)
            this.current = parseInt(resp.data.data.current)
            localStorage.setItem('token', resp.data.token);
            console.log(this.tableData)
        } else {
            ElMessage.error(resp.data.msg)
        }

    });
}