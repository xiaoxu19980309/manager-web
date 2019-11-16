<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-input
            placeholder="请输入用户名"
            v-model="param.username"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入手机号"
            v-model="param.phone"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectByAll">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="marginX20">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="交易笔数"> </el-table-column>
        <el-table-column prop="address" label="总交易金额"></el-table-column>
        <el-table-column label="是否加入黑名单">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.is_delete"  @change="addBlack(scope.row)">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="是否具有管理员权限">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.is_admin" @change="changePow(scope.row)">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import "@/css/global.css";
import {API} from "@/utils/api"
export default {
  name: "Usermanager",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      tableData: [],
      param: {
        username: "",
        phone: "",
      },
      dateBetween: "",
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(param){
      this.axios.post(API.getUserList,param).then(res=>{
        this.total = res.data.total
        this.tableData = res.data.list
      }).catch(e=>{
        this.$message.error("出错了！")
      })
    },
    selectByAll(){
      let param = {
        pageNum: this.currentPage
      }
      if(!!this.param.username)
        param.username = this.param.username
      if(!!this.param.phone)
        param.phone = this.param.phone
      
      this.getData(param)
    },
    addBlack(item){
      let param = {
        username: item.username,
        is_delete: parseInt(item.is_delete)
      }
      if(param.is_delete==1){
        this.$confirm("确定将该用户加入黑名单？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          this.axios.post(API.changeAdminStatus,param).then(res =>{
            if(res.resultCode==200){
              this.$message.success(res.resultMsg)
            }else{
              this.$message.error(res.resultMsg)
            }
          }).catch(e =>{
              
          })
        }).catch(()=>{
          item.is_delete = item.is_delete==1?0:1
        })
      }else{
        this.$confirm("确定取消该用户的黑名单？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          this.axios.post(API.changeAdminStatus,param).then(res =>{
            if(res.resultCode==200){
              this.$message.success(res.resultMsg)
            }else{
              this.$message.error(res.resultMsg)
            }
          }).catch(e =>{
              
          })
        }).catch(()=>{
          item.is_delete = item.is_delete==1?0:1
        })
      }
      
    },
    changePow(item){
      let param = {
        username: item.username,
        is_admin: parseInt(item.is_admin),
      }
      this.$confirm("确定修改该用户管理员权限？","提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(()=>{
        console.log(param)
        this.axios.post(API.changeAdminStatus,param).then(res =>{
          if(res.resultCode==200){
            this.$message.success(res.resultMsg)
          }else{
            this.$message.error(res.resultMsg)
          }
        }).catch(e =>{
            this.$message.error("出错了！")
        })
      }).catch(()=>{
        item.is_admin = item.is_admin==1?0:1
      })
      
    },
    handleCurrentChange(val){

    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>