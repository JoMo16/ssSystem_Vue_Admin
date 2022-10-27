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
          prop="lid"
          label="id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="gid"
          label="商品id"
          width="150">
      </el-table-column>
      <el-table-column
          prop="uid"
          label="用户id"
          width="150px"
      >
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>



    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserList",
  data(){
    return {
      tableData:[],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      const url = "http://localhost:8088/admin/tradeHistory"
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
      }),error => {
        console.log('请求失败' + error);
        this.$message.error('网络请求失败，请稍后再试！');
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>