<template>
  <div id="app">
    <el-container>
      <el-header v-show="isLogin">
        <img src="./assets/logo.png" class="header-img" alt="">
        <h1>青竹管理系统</h1>
        <el-button class="button" type="text" @click="lgout()">退出</el-button>
      </el-header>
      <el-container>
        <el-aside v-show="isLogin" width="200px">
           <el-menu
            :default-active="chooseIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect">
            <el-menu-item index="1">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-menu"></i>
              <span slot="title">商品类别管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-user"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-document-copy"></i>
              <span slot="title">首页模块管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-document"></i>
              <span slot="title">模块内容管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data(){
    return {
      isLogin: false,
      chooseIndex: "1",
    }
  },
  mounted(){
    this.isLogin = sessionStorage.getItem("token")?true:false
    let active = location.href.split('#')[1]
    let _this = this
    switch(active){
      case "/shopGoods": _this.chooseIndex = "1";
                      break;
      case "/orderList": _this.chooseIndex = "2";
                      break;
      case "/statistic": _this.chooseIndex = "3";
                      break;
      case "/userManager": _this.chooseIndex = "4";
                      break;
      case "/modelManager": _this.chooseIndex = "5";
                      break;
      case "/modelContent": _this.chooseIndex = "6";
                      break;
      case "/goodsType": _this.chooseIndex = "7";
                      break;
    }
  },
  updated(){
    this.isLogin = sessionStorage.getItem("token")?true:false
  },
  methods: {
      lgout(){
        sessionStorage.removeItem("token")
        this.$router.push({path: "/"})
      },
      handleSelect(key){
        let _this = this
        switch(key){
          case "1": _this.$router.push({path:"/shopGoods"});
                  break;
          case "2": 
                  _this.$router.push({path:"/orderList"});
                  break;
          case "3":
                  _this.$router.push({path: "/statistic"})
                  break;
          case "4":
                  _this.$router.push({path: "/userManager"})
                  break;
          case "5":
                  _this.$router.push({path: "/modelManager"})
                  break;
          case "6":
                  _this.$router.push({path: "/modelContent"})
                  break;
          case "7":
                  _this.$router.push({path: '/goodsType'})
                  break;
          // default: this.$router.push({path:"/shopGoods"});
        }
      },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* height: 100vh; */
  /* overflow: hidden; */
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style>
  .el-header{
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
  }
  .el-header .header-img{
    width: 60px;
  }
  .el-header h1{
    margin: 0 25px;
  }
  .el-header .button{
    font-size: 18px;
  }
  .el-container{
    /* height: 100vh; */
    /* overflow: hidden; */
  }
  .el-aside {
    min-height: 100vh;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  .el-menu{
    background-color: #E9EEF3;
  }
  .el-main {
    color: #333;
    text-align: center;
    overflow: hidden;
    /* height: 100vh; */
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
</style>