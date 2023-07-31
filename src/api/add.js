import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

export function doSubmit(formInline) {
    if (formInline.time != null && formInline.place != null && formInline.thing != null && formInline.thing !== "" && formInline.place !== "" && formInline.time !== "") {
        axios({
            url: 'http://localhost:8080/plan/save',
            data: {
                'thing': formInline.thing,
                'time': formInline.time,
                'place': formInline.place,
                'remark': formInline.remark
            },
            headers: {
                'token': localStorage.getItem('token')
            },
            method: 'put'
        }).then(res => {
            console.log(res)
            if (res.data.code === 1) {
                ElMessage.success("添加成功!")
                localStorage.setItem('token', res.data.token);
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

export function goContinue(formInline) {
    formInline.isContinue = 1
    doSubmit(formInline)

}