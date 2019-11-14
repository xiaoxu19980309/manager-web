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
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="marginX20">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="date"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="交易笔数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="总交易金额">
        </el-table-column>
        <el-table-column label="是否加入黑名单">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.status" label="1">是</el-radio>
            <el-radio v-model="scope.row.status" label="2">否</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="是否具有管理员权限">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.status" label="1">是</el-radio>
            <el-radio v-model="scope.row.status" label="2">否</el-radio>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
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
        
      }).catch(e=>{

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