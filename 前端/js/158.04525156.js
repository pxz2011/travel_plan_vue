"use strict";(self["webpackChunktravel_plan"]=self["webpackChunktravel_plan"]||[]).push([[158],{7158:function(e,t,o){o.r(t),o.d(t,{default:function(){return y}});var s=o(3396),a=o(9242);const n=e=>((0,s.dD)("data-v-41bebb87"),e=e(),(0,s.Cn)(),e),l={class:"container"},i={class:"login-wrapper"},r=n((()=>(0,s._)("div",{class:"header"},"修改个人信息(按需修改)",-1))),d={class:"form-wrapper"};function u(e,t,o,n,u,p){const m=(0,s.up)("el-button");return(0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",i,[r,(0,s._)("div",d,[(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>this.oldPassword=e),class:"input-item",name:"password",placeholder:"老密码",type:"password",onKeyup:t[1]||(t[1]=(0,a.D2)(((...e)=>this.doSubmit&&this.doSubmit(...e)),["enter"]))},null,544),[[a.nr,this.oldPassword]]),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[2]||(t[2]=e=>this.newPassword=e),class:"input-item",name:"password",placeholder:"新密码",type:"password",onKeyup:t[3]||(t[3]=(0,a.D2)(((...e)=>this.doSubmit&&this.doSubmit(...e)),["enter"]))},null,544),[[a.nr,this.newPassword]]),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[4]||(t[4]=e=>this.phoneNum=e),class:"input-item",name:"phoneNum",placeholder:"手机号",type:"text",onKeyup:t[5]||(t[5]=(0,a.D2)(((...e)=>this.doSubmit&&this.doSubmit(...e)),["enter"]))},null,544),[[a.nr,this.phoneNum]]),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":t[6]||(t[6]=e=>this.email=e),class:"input-item",name:"email",placeholder:"邮箱号",type:"text",onKeyup:t[7]||(t[7]=(0,a.D2)(((...e)=>this.doSubmit&&this.doSubmit(...e)),["enter"]))},null,544),[[a.nr,this.email]]),(0,s.Wm)(m,{type:"warning",onClick:this.doSubmit},{default:(0,s.w5)((()=>[(0,s.Uk)("修改")])),_:1},8,["onClick"]),(0,s.Wm)(m,{type:"danger",onClick:this.doWriteOff},{default:(0,s.w5)((()=>[(0,s.Uk)("注销账户")])),_:1},8,["onClick"])])])])}o(7658);var p=o(4161),m=o(6e3),h=o(7178),c=o(1120),w={name:"user",data:function(){return{userName:"",oldPassword:"",newPassword:"",email:"",phoneNum:""}},methods:{doWriteOff(){m.T.confirm("该操作会永久删除该账户,是否继续?","Warning",{confirmButtonText:"OK",cancelButtonText:"算了吧~",type:"warning"}).then((()=>{(0,p.Z)({method:"delete",url:"http://localhost:8080/user/del",headers:{token:localStorage.getItem("token")}}).then((e=>{1===e.data.code?(h.z8.success("删除用户成功!"),localStorage.removeItem("token"),c.Z.push("/login")):(0,h.z8)({type:"success",message:"删除用户失败!"})}))})).catch((()=>{(0,h.z8)({type:"info",message:"取消删除!"})}))},doSubmit(){let e={userName:this.userName,password:this.newPassword,email:this.email,phoneNum:this.phoneNum};console.log(e),(0,p.Z)({method:"post",url:"http://localhost:8080/user/modifyUserInfo?oldPassword="+this.oldPassword,headers:{token:localStorage.getItem("token")},data:e}).then((e=>{1===e.data.code?(h.z8.success("修改用户信息成功!"),localStorage.setItem("token",e.data.data),c.Z.push("/")):h.z8.error("修改用户信息失败!")}))}}},b=o(89);const f=(0,b.Z)(w,[["render",u],["__scopeId","data-v-41bebb87"]]);var y=f}}]);
//# sourceMappingURL=158.04525156.js.map