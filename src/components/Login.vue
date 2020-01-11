<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username" style="margin-bottom: 20px;">
        <el-input type="text" placeholder="请输入账号" v-model="form.username" style="width: 100%;"/>
      </el-form-item>
      <el-form-item label="密码" prop="password" style="margin-bottom: 20px;">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"  style="width: 100%;"/>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Button } from 'element-ui';
import { API } from "@/utils/api"
export default {
  name: 'Login',
  components: {
    Button
  },
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      dialogVisible: false
    }
  },
  beforeMount(){
    sessionStorage.removeItem("token")
  },
  mounted() {
    
  },
  methods: {
    onSubmit(formName) {
        // 为表单绑定验证功能
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post(API.adminLogin,{
              username: this.form.username,
              password: this.form.password,
            }).then(res =>{
              loading.close();
              if(res.resultCode!=200){
                this.$message.info(res.resultMsg);
              }else{
                sessionStorage.setItem("token",res.data.token)
                this.$router.push({
                  path: '/shopGoods'
                })
              }
            }).catch(e =>{
              loading.close();
            })
          } else {
            this.dialogVisible = true;
            return false;
          }
        });
    },
    handleClose(){
      this.dialogVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    line-height: 50px;
    margin: 100px auto 0;
    padding: 35px 55px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    /* margin: 0 auto 40px auto; */
    color: #303133;
  }
</style>
