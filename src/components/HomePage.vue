<template>
  <el-container>
    <el-aside width="17%">
      <h2>WelCome</h2>
      <el-menu default-active="" :router="true" :unique-opened="true">

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i><span>信息管理</span>
          </template>

          <el-menu-item-group>
            <el-menu-item index="/admin/adminList">管理员信息</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/admin/logsList">日志管理</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/admin/goodsList">商品管理</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item index="/admin/userList">用户管理</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <el-menu-item  index="/admin/tradeHistory">交易记录</el-menu-item>
          </el-menu-item-group>


        </el-submenu>

        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">帮助文档</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <el-container>
      <el-header height="80px">
        ssSystem后台管理系统
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.el-aside{
  padding-left: 20px;
}
h2{
  text-align: center;
  line-height: 80px;
}
.el-header{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #410303;
  /*background-color: #ececec;*/
  background-color: rgba(151, 229, 229, 0.38);
  font-weight: lighter;
  font-size: 25px;
  font-family: 宋体;
}
.el-menu{
  margin: 1px 0px 10px 0px;
  uniqueOpened:'true'
}
.el-container{
  height: 100%;
}
</style>