import {ElMessage} from "element-plus";
import axios from "axios";
import router from "@/router";

export function doSubmit(email, userName, password, cPassword, phoneNum) {
    console.log("注册")
    if (email === "" && userName === "" && password === "" && cPassword === "" && phoneNum === "") {
        ElMessage.error("请输入全部信息!")
        return;
    }
    //判断两个密码是否相同:
    if (password !== cPassword) {
        ElMessage.error("两次密码不一样!")
    } else {
        axios({
            method: "post",
            url: "http://localhost:8080/user/reg",
            data: {
                "userName": userName,
                "password": password,
                "email": email,
                "phoneNum": phoneNum,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            if (res.data.code === 1) {
                console.log(res);
                ElMessage.success("注册成功!")
                router.push("/")
                localStorage.setItem('token', res.data.token);
            } else {
                ElMessage.error("注册失败," + res.data.msg)
            }
        })
    }
}