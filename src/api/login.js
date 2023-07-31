import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export function doSubmit(userName, password) {
    console.log("登录")
    const url = "http://localhost:8080/user/login";
    axios({
        method: 'post',
        url: url,
        data: {
            "userName": userName,
            "password": password
        },
    }).then(function (res) {
        if (res.data.code === 1) {
            console.log(res);
            ElMessage.success("登录成功!")
            router.push("/")
            localStorage.setItem('token', res.data.token);
        } else {
            console.log(res)
            ElMessage.error("登录失败!")
        }
    });
}

export function doSignUp() {
    console.log("去注册")
    router.push("/reg")
}