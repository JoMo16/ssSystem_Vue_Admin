<template>
  <div class="login">
    <div class="vertical">
      <div class="head">
        <h1>ssSystem后台管理系统</h1>
      </div>
      <div class="content">
        <el-form :model="ruleFrom" :rules="rules" ref="ruleFrom" label-width="100px">
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleFrom.name" placeholder="请输入账号信息"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入账号密码" v-model="ruleFrom.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleFrom')">立即登陆</el-button>
            <el-button @click="resetForm('ruleFrom')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer">
      <div id="jsi-flying-fish-container"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'loginPage',
  data(){
    return{
      ruleFrom:{
        name:'admin',
        password:'123',
      },
      rules:{
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const url = "http://localhost:8088/admin/login";
          const data = {"adminAccount":this.$data.ruleFrom.name,"adminPassword":this.$data.ruleFrom.password}
          axios({
            url,
            data: data,
            method: 'post' ,
            headers: {
              'Content-Type':'application/json'
            }
          }).then(res => {
              // console.log(res);
              // console.log(res.data);
            // console.log(res.data.codeMsg.code)
              if (res.data.flag == true){
                sessionStorage.setItem("token",res.data.data);
                this.$router.push("/admin/adminList")
              }else if (res.data.codeMsg.code == 40009){
                this.$message.warning(res.data.codeMsg.msg);
              }else if (res.data.codeMsg.code == 400092){
                this.$message.warning("登录失败");

              }else if (res.data.codeMsg.code == 40010){
                this.$message.warning(res.data.codeMsg.msg);
              }
              },error => {
                console.log('请求失败' + error);
                this.$message.error('网络请求失败，请稍后再试！');
            }
          )
        } else {
          this.$message.error('请输入正确的账号密码！');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$message('内容已重置');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-weight: lighter;
  font-size: 29px;
  text-align: center;
  margin-bottom: 10px;
}
.content{
  width: 36%;
  margin-left: 30%;
}
.login{
  width: 100%;
  height: 100%;
  /*position: relative;*/
}
.vertical{
  width: 100%;
  position: absolute;
  top: 40%;
  left: 0;
  transform: translate(0, -50%);
}
.footer{
  width:100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index:-3;
}
</style>
