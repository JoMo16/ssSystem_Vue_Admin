//引入vuex和vue组件
import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
// 一级路由页面
import loginPage from "@/components/LoginPage";
import HomePage from "@/components/HomePage";
//二级路由页面
import adminInfoPage from "@/pages/AdminInfoPage";
import goodsList from "@/pages/GoodsList";
import tradeHistory from "@/pages/TradeHistory";
import userList from "@/pages/UserList";
import logsList from "@/pages/LogsList";

export default new VueRouter({
    routes:[
        {
            path:'/',
            component: loginPage
        },
        {
            path:"/admin",
            component:HomePage,
            children:[
                {
                    path: 'adminList',
                    component: adminInfoPage
                },
                {
                    path:"goodsList",
                    component: goodsList
                },
                {
                    path: 'logsList',
                    component: logsList
                },
                {
                    path: "tradeHistory",
                    component: tradeHistory
                },
                {
                    path: "userList",
                    component: userList
                },
            ]
        }

    ]

})