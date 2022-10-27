<template>
  <div>
  <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
    <el-table-column
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column
        prop="uid"
        label="id"
        width="120">
    </el-table-column>
    <el-table-column
        prop="userAccount"
        label="用户账号"
        width="250">
    </el-table-column>
    <el-table-column
        prop="userPassword"
        label="用户密码"
        width="100px"
    >
    </el-table-column>
    <el-table-column
        prop="createTime"
        label="创建时间">
    </el-table-column>

    <el-table-column
        prop="userAccountStatus"
        label="账号状态"
    >
    </el-table-column>

    <el-table-column
        label="编辑">
      <template slot-scope="scope">
        <el-button type="primary" @click="handleCreate(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
        <el-button type="primary" @click="deleteUser(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>

  </el-table>

    <el-dialog :visible.sync="dialogFormVisible" width="550px">
      <el-form
          label-position="left"
          style="width: 400px; margin-left:50px; margin-right: 50px">

        <label for="formDataUid">用户id</label>
        <el-input id="formDataUid" class="inputForm" v-model="formData.uid" :disabled="true"></el-input>
        <br>
        <label for="formDataAccount">用户账号</label>
        <el-input id="formDataAccount" class="inputForm" v-model="formData.userAccount"></el-input>
        <br>
        <label for="formDataPassword">用户密码</label>
        <el-input id="formDataPassword" class="inputForm" v-model="formData.userPassword"></el-input>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserInfo">确定</el-button>
      </div>
    </el-dialog>

</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserList",
  data(){
    return {
      tableData:[],
      dialogFormVisible: false,
      formData:[]
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    //获取用户列表
    getUserList(){
      const url = "http://localhost:8088/admin/allUser"
      const token = sessionStorage.getItem("token")
      axios({
        url,
        method:"post",
        data:{
          "pageNumber":"1",
          "pageDataNumber":"10"
        },
        headers:{
          token
        }
      }).then((res) =>{
        console.log(res)
        this.tableData = res.data.data.records;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除用户
    deleteUser(index, row){
      console.log(row.uid)
      const token = sessionStorage.getItem("token")
      axios({
        url:"http://localhost:8088/admin/deleteUser",
        method: "post",
        data:{
          uid:row.uid
        },
        headers:{
          token
        }
      }).then((res)=>{
        console.log(res)
      });
    },
    // 开启弹出窗表单
    handleCreate(index, row){
      this.formData = row;
      this.dialogFormVisible = true;
    },
    //更新用户信息
    updateUserInfo(){
      const token = sessionStorage.getItem("token");
      axios({
        url:"http://localhost:8088/admin/updateUserAccount",
        method: "post",
        data: {
          uid:this.formData.uid,
          userAccount:this.formData.userAccount,
          userPassword:this.formData.userPassword,
        },
        headers: {
          token
        }
      }).then((res)=>{
        // console.log(res)
        if (res.data.flag == true){
          setTimeout(()=>{
            this.dialogFormVisible = false;
            this.getUserList();
          },200)
        }else {
          this.$message.error(res.data.codeMsg.msg)
        }
      })
    },
  }
}
</script>

<style scoped>
.inputForm{
  margin-bottom: 10px;
}
label{
  font-size: 20px;
}
</style>