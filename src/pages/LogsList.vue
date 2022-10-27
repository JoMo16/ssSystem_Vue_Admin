<template>
  <div class="logsList">
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
          prop="logInfo"
          label="日志信息"
          width="1100px"
      >
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="时间"
          width="240">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogsList",
  data() {
    return {
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getLogsList();
  },
  methods: {
    getLogsList(){
      const url = "http://localhost:8088/admin/logs";
      const token = sessionStorage.getItem("token")
      axios({
        url,
        method:'post',
        data:{
          "pageNumber":"1",
          "pageDataNumber":10,
        },
        headers:{
          token
        }
      }).then((res)=>{
        console.log(res);
        this.tableData = res.data.data.records;
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style scoped>

</style>