<template>
  <div>
    <el-row>
      <el-button type="primary" @click="showAddGoodsForm">添加商品</el-button>
    </el-row>
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
          prop="gid"
          label="id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="goodName"
          label="商品名称"
          width="250">
      </el-table-column>
      <el-table-column
          prop="goodPrice"
          label="价格"
          width="100px"
      >
      </el-table-column>
      <el-table-column
          prop="goodDescription"
          label="描述">
      </el-table-column>
      <el-table-column
          label="操作">
<!--        eslint-disable-next-line vue/no-unused-vars-->
        <template slot-scope="scope">
<!--          <el-button type="primary" icon="el-icon-edit"></el-button>-->
<!--          <el-button type="primary" @click="deleteGoods(scope.$index, scope.row)" icon="el-icon-delete"></el-button>-->
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="添加商品" :visible.sync="dialogFormVisible2" width="550px">
      <el-form
          label-position="left"
          style="width: 400px; margin-left:50px;">

        <label for="formDataAccount">商品名称</label>
        <el-input id="formDataAccount" class="inputForm" v-model="goodsInfo.goodName"></el-input>
        <br>
        <label for="formDataPassword">商品价格</label>
        <el-input id="formDataPassword" class="inputForm" v-model="goodsInfo.goodPrice"></el-input>
        <br>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="goodsInfo.goodDescription"></el-input>
        </el-form-item>
        <br>
        <el-upload
            class="upload-demo"
            drag
            ref="upload"
            action="http://localhost:8088/admin/receveImg"
            multiple
            :file-list="fileList"
            :auto-upload=true
            accept=".jpg">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg</div>
        </el-upload>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="addNewGoods">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GoodsList",
  data(){
    return {
      tableData:[],
      dialogFormVisible2:false,
      goodsInfo:{
        goodDescription:null,
        goodPrice:null,
        goodName:null,
      },
      fileList:[

      ]
      // autoUpload:false,
    }
  },
  created() {
    this.getGoodsList()
  },
  methods:{
    getGoodsList(){
      const url = "http://localhost:8088/admin/goodsInfo"
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
        },

      }).then((res) =>{
        console.log(res)
        this.tableData = res.data.data.records;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showAddGoodsForm(){
      this.dialogFormVisible2 = true;
    },

    // eslint-disable-next-line no-unused-vars
    addNewGoods(){
      axios({
        method: "post",
        url:"http://localhost:8088/admin/uploadGoods",
        data:{
          goodName:this.goodsInfo.goodName,
          goodPrice:this.goodsInfo.goodPrice,
          goodDescription:this.goodsInfo.goodDescription
        },
        headers:{
          token:sessionStorage.getItem("token")
        }
      }).then((res)=>{
        if(res.data.flag == true){
          this.$message.success("添加成功");
          setTimeout(()=>{
            this.dialogFormVisible2 = false;
            this.getGoodsList();
          },200)
        }
      })
    }

  }
}
</script>

<style scoped>

</style>