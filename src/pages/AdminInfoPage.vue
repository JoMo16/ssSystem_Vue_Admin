<template>
  <div class="adminInfo">
    <el-row>
      <el-button type="primary" @click="showDialogFormVisible">新增管理员</el-button>
    </el-row>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="aid"
          label="id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="adminAccount"
          label="管理员账号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="adminPassword"
          label="管理员密码"
          width="200">
      </el-table-column>
      <el-table-column
          prop="adminLevel"
          label="权限等级"
          width="160">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          label="编辑">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleCreate(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="primary" @click="deleteAdmin(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增管理员" :visible.sync="dialogFormVisible2" width="550px">
      <el-form
          label-position="left"
          style="width: 400px; margin-left:50px;">

        <label for="formDataAccount">管理员账号</label>
        <el-input id="formDataAccount" class="inputForm" v-model="newAdminInfo.adminAccount"></el-input>
        <br>
        <label for="formDataPassword">管理员密码</label>
        <el-input id="formDataPassword" class="inputForm" v-model="newAdminInfo.adminPassword"></el-input>
        <br>
        <label for="formDataAdminLevel">管理员权限等级</label>
        <el-input id="formDataAdminLevel" class="inputForm" v-model="newAdminInfo.adminLevel"></el-input>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewAdmin">确定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="编辑管理员" :visible.sync="dialogFormVisible" width="550px">
      <el-form
          label-position="left"
          style="width: 400px; margin-left:50px;">

        <label for="formDataUid">管理员id</label>
        <el-input id="formDataUid" class="inputForm" v-model="formData.aid" :disabled="true"></el-input>
        <br>
        <label for="formDataAccount">管理员账号</label>
        <el-input id="formDataAccount" class="inputForm" v-model="formData.adminAccount" :disabled="true"></el-input>
        <br>
        <label for="formDataPassword">管理员密码</label>
        <el-input id="formDataPassword" class="inputForm" v-model="formData.adminPassword"></el-input>
        <label for="formDataAdminLevel">管理员权限等级</label>
        <el-input id="formDataAdminLevel" class="inputForm" v-model="formData.adminLevel" :disabled="true"></el-input>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateAdminAccount">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "adminInfoPage",
  data() {
    return {
      tableData:[],
      dialogFormVisible:false,
      dialogFormVisible2:false,
      formData:[],
      newAdminInfo:{
        adminAccount:null,
        adminPassword:null,
        adminLevel:null
      },
    }
  },
  created() {
    this.getAdminList();
  },
  methods: {
    getAdminList(){
      const url = "http://localhost:8088/admin/getAdminList";
      axios({
        url,
        method: 'post',
        data:{
          "pageNumber":"1",
          "pageDataNumber":"12"
        },
      }).then(res =>{
        if (res.data.flag){
          this.tableData = res.data.data.records;
        }else {
          this.$message.error("查询失败")
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showDialogFormVisible(){
      this.dialogFormVisible2 = true;
    },
    // 删除管理员账号
    deleteAdmin(index, row){
      // console.log(row)
      // console.log(index)

      const token = sessionStorage.getItem("token")
      axios({
        url:"http://localhost:8088/admin/deleteAdmin",
        method: "post",
        data:{
          aid:row.aid
        },
        headers:{
          token
        }
      }).then((res)=>{
        console.log(res)
      })
    },
    //弹出窗口
    handleCreate(index, row){
      this.formData = row;
      this.dialogFormVisible = true;
    },

    updateAdminAccount(){
      axios({
        url:"http://localhost:8088/admin/update",
        method:'post',
        headers: {
          token:sessionStorage.getItem("token"),
        },
        data: {
          aid:this.formData.aid,
          adminAccount:this.formData.adminAccount,
          adminPassword:this.formData.adminPassword,
          adminLevel:this.formData.adminLevel
        }
      }).then((res) =>{
        // console.log(res)
        if (res.data.flag){
          this.$message.success("更改成功")
          setTimeout(()=>{
            this.dialogFormVisible = false;
            this.getAdminList();
          },500)
        }else{
          this.$message.error("更新失败")
        }
      })
    },
    addNewAdmin(){
      axios({
        method: "post",
        url: "http://localhost:8088/admin/create",
        data:{
          "adminAccount":this.newAdminInfo.adminAccount,
          "adminPassword":this.newAdminInfo.adminPassword,
          "adminLevel":this.newAdminInfo.adminLevel
        },
        headers:{
          "token":sessionStorage.getItem("token")
        }
      }).then((res)=>{
        // console.log(res)
        if (res.data.flag){
          this.$message.success("创建成功")
          setTimeout(()=>{
            this.getAdminList();
            this.dialogFormVisible2 = false;
          })
        }
      })
    }

  },


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