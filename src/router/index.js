import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ShopGoods from "@/components/ShopGoods"
import OrderList from "@/components/OrderList"
import Statistic from "@/components/Statistic"
import UserManager from "@/components/userManager"
import ModelManager from "@/components/modelManager"
import ModelContent from "@/components/modelContent"
import GoodsType from "@/components/goodsType"

Vue.use(Router)
const vm = new Vue()

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { title: "后台管理系统" }
    },
    {
      path: '/shopGoods',
      name: "ShopGoods",
      component: ShopGoods,
      meta: { isLogin:true }
    },
    {
      path: '/goodsType',
      name: "GoodsType",
      component: GoodsType,
      meta: { isLogin:true }
    },
    {
      path: "/orderList",
      name: "OrderList",
      component: OrderList,
      meta: { isLogin:true }
    },
    {
      path: "/statistic",
      name: "Statistic",
      component: Statistic,
      meta: { isLogin:true }
    },
    {
      path: "/userManager",
      name: "UserManager",
      component: UserManager,
      meta: { isLogin:true }
    },
    {
      path: "/modelManager",
      name: "ModelManager",
      component: ModelManager,
      meta: { isLogin:true }
    },
    {
      path: "/modelContent",
      name: "ModelContent",
      component: ModelContent,
      meta: { isLogin:true }
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    window.location.reload();
  })
}

router.beforeEach((to, from, next) => {
    if(to.matched.some(res=>res.meta.isLogin)){//判断是否需要登录
      if (sessionStorage.getItem("token")) {
          next();
      }else{
          vm.$message.error("登录过期！请重新登录")
          next({
              path:"/",
          });
      }
    }else{
        next()
    }
})


export default router