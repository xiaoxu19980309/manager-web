<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-date-picker
            v-model="dateBetween"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入商品名称"
            v-model="param.goodsName"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchStatic()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="marginX20">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
        <el-table-column prop="goods.goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="goods.goods_num" label="库存(件)"></el-table-column>
        <el-table-column prop="total_number" label="总销量(件)"></el-table-column>
        <el-table-column prop="total_price" label="总金额（元）"></el-table-column>
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
import {API} from "@/utils/api";
import Time from "@/utils/Time"
export default {
  name: "Statistic",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      tableData: [],
      param: {
        goodsName: "",
      },
      dateBetween: [],
    }
  },
  beforeMount(){
    let end = new Date()
    let endTime = end.getTime()
    let startTime = endTime-1000*60*60*24*30
    this.dateBetween = [startTime,endTime]
  },
  mounted(){
    let param = {}
    if(this.dateBetween!=null&&this.dateBetween.length==2){
        param = {
          startTime: Time.transform(this.dateBetween[0]),
          endTime: Time.transform(this.dateBetween[1])
        }
    }
    this.getData(param)
  },
  methods: {
    getData(param){
      this.axios.post(API.getStatics,param).then(res=>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.total = res.data.total
          this.tableData = res.data.list
        }
      }).catch(e=>{

      })
    },
    searchStatic(){
      let param = {pageNum: this.currentPage}
      if(!!this.param.goodsName){
        param.goods_name = this.param.goodsName
      }
      if(this.dateBetween!=null&&this.dateBetween.length==2){
        param.startTime = Time.transform(this.dateBetween[0])
        param.endTime = Time.transform(this.dateBetween[1])
      }
      if(param.startTime == param.endTime&&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + " 23:59:59"
      }
      this.getData(param)
    },
    handleCurrentChange(val){
      let param = {pageNum: this.currentPage}
      if(!!this.param.goodsName){
        param.goods_name = this.param.goodsName
      }
      if(this.dateBetween!=null&&this.dateBetween.length==2){
        param.startTime = Time.transform(this.dateBetween[0])
        param.endTime = Time.transform(this.dateBetween[1])
      }
      if(param.startTime == param.endTime&&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + " 23:59:59"
      }
      this.getData(param)
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>