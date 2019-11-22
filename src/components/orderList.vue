<template>
  <div>
    <div class="padding20X paddingX20">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="first">
          <div class="bg-color padding20X paddingX20">
            <el-form inline>
              <el-form-item>
                <el-input
                  placeholder="请输入订单编号"
                  v-model="param1.orderId"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="dateBetween1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchData(1)">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="marginX20">
            <el-table
              :data="tableData1"
              stripe
              border
              style="width: 100%">
              <el-table-column prop="order_id" label="订单编号"></el-table-column>
              <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
              <el-table-column prop="username" label="下单用户名"></el-table-column>
              <el-table-column prop="total_num" label="商品数量"></el-table-column>
              <el-table-column prop="total_price" label="商品总价"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_pay==null">未支付</span>
                  <span v-else>已支付</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_type==1">支付宝</span>
                  <span v-if="scope.row.pay_type==2">微信</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteOrder(scope.row,1)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1"
                :page-size="pageSize1"
                layout="total, prev, pager, next"
                :total="total1">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待付款" name="second">
          <div class="bg-color padding20X paddingX20">
            <el-form inline>
              <el-form-item>
                <el-input
                  placeholder="请输入订单编号"
                  v-model="param2.orderId"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="dateBetween2"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchData(2)">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="marginX20">
            <el-table
              :data="tableData2"
              stripe
              border
              style="width: 100%">
              <el-table-column prop="order_id" label="订单编号"></el-table-column>
              <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
              <el-table-column prop="username" label="下单用户名"></el-table-column>
              <el-table-column prop="total_num" label="商品数量"></el-table-column>
              <el-table-column prop="total_price" label="商品总价"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_pay==null">未支付</span>
                  <span v-else>已支付</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_type==1">支付宝</span>
                  <span v-if="scope.row.pay_type==2">微信</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteOrder(scope.row,2)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange2"
                :current-page.sync="currentPage2"
                :page-size="pageSize2"
                layout="total, prev, pager, next"
                :total="total2">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已付款" name="third">
          <div class="bg-color padding20X paddingX20">
            <el-form inline>
              <el-form-item>
                <el-input
                  placeholder="请输入订单编号"
                  v-model="param3.orderId"
                  clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-date-picker
                  v-model="dateBetween3"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchData(3)">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="marginX20">
            <el-table
              :data="tableData3"
              stripe
              border
              style="width: 100%">
              <el-table-column prop="order_id" label="订单编号"></el-table-column>
              <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
              <el-table-column prop="username" label="下单用户名"></el-table-column>
              <el-table-column prop="total_num" label="商品数量"></el-table-column>
              <el-table-column prop="total_price" label="商品总价"></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.is_pay==null">未支付</span>
                  <span v-else>已支付</span>
                </template>
              </el-table-column>
              <el-table-column label="支付方式">
                <template slot-scope="scope">
                  <span v-if="scope.row.pay_type==1">支付宝</span>
                  <span v-if="scope.row.pay_type==2">微信</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="deleteOrder(scope.row,3)">删除</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @current-change="handleCurrentChange3"
                :current-page.sync="currentPage3"
                :page-size="pageSize3"
                layout="total, prev, pager, next"
                :total="total3">
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import "@/css/global.css";
import {API} from "@/utils/api"
import Time from "@/utils/Time"
export default {
  name: "OrderList",
  data(){
    return {
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      pageSize1: 10,
      pageSize2: 10,
      pageSize3: 10,
      total1: 1,
      total2: 1,
      total3: 1,
      tableData1: [],
      tableData2: [],
      tableData3: [],
      activeName: "first",
      param1: {
        orderId: "",
        startTime: "",
        endTime: "",
      },
      param2: {
        orderId: "",
        startTime: "",
        endTime: "",
      },
      param3: {
        orderId: "",
        startTime: "",
        endTime: "",
      },
      dateBetween1: "",
      dateBetween2: "",
      dateBetween3: "",
    }
  },
  mounted(){
    this.getDate(1,{})
  },
  methods: {
    getDate(type,param){
      if(type==1){
        param.pageNum = this.currentPage1
      }else if(type==2){
        param.pageNum = this.currentPage2
      }else if(type==3){
        param.pageNum = this.currentPage3
      }
      this.axios.post(API.getOrderListAdmin,param).then(res=>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          if(type==1){
            this.total1 = res.data.total
            this.tableData1 = res.data.list
          }else if(type==2){
            this.total2 = res.data.total
            this.tableData2 = res.data.list
          }else if(type==3){
            this.total3 = res.data.total
            this.tableData3 = res.data.list
          }
          
        }
      }).catch(e=>{

      })
    },
    deleteOrder(order,type){
      this.$confirm("确定删除该订单？","提示",{
        confirmTextButton: "确定",
        cancelTextButton: "取消",
        type: "warning"
      }).then(()=>{
          this.axios.post(API.deleteOrder,{
            order_id: order.order_id
          }).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success("删除订单成功！");
              this.getDate(type,{})
            }
          }).catch(e=>{

          })
      }).catch(()=>{

      })
    },
    searchData(type){
      let param = {}
      if(type==1){
        param.is_pay = null
        if(!!this.param1.orderId)
          param.order_id = this.param1.orderId
        if(this.dateBetween1!=null&&this.dateBetween1.length==2){
          param.startTime = Time.transform(this.dateBetween1[0])
          param.endTime = Time.transform(this.dateBetween1[1])
        }
      }else if(type==2){
        param.is_pay = 0
        if(!!this.param2.orderId)
          param.order_id = this.param2.orderId
        if(this.dateBetween2!=null&&this.dateBetween2.length==2){
          param.startTime = Time.transform(this.dateBetween2[0])
          param.endTime = Time.transform(this.dateBetween2[1])
        }
      }else if(type==3){
        param.is_pay = 1
        if(!!this.param3.orderId)
          param.order_id = this.param3.orderId
        if(this.dateBetween3!=null&&this.dateBetween3.length==2){
          param.startTime = Time.transform(this.dateBetween3[0])
          param.endTime = Time.transform(this.dateBetween3[1])
        }
      }
      if(param.startTime == param.endTime &&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + ' 23:59:59'
      }
      this.getDate(type,param)
    },
    handleClick(tab, event) {
      if(this.activeName==='first'){
        this.getDate(1,{is_pay: null})
      }else if(this.activeName==='second'){
        this.getDate(2,{is_pay: 0})
      }else if(this.activeName==='third'){
        this.getDate(3,{is_pay: 1})
      }
    },
    handleCurrentChange1(val){
      let param = {pageNum: val}
      if(!!this.param1.orderId)
        param.order_id = this.param1.orderId
      if(this.dateBetween1!=null&&this.dateBetween1.length==2){
        param.startTime = Time.transform(this.dateBetween1[0])
        param.endTime = Time.transform(this.dateBetween1[1])
      }
      if(param.startTime == param.endTime &&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + ' 23:59:59'
      }
      this.getDate(1,param)
    },
    handleCurrentChange2(val){
      let param = {pageNum: val}
      if(!!this.param2.orderId)
        param.order_id = this.param2.orderId
      if(this.dateBetween2!=null&&this.dateBetween2.length==2){
        param.startTime = Time.transform(this.dateBetween2[0])
        param.endTime = Time.transform(this.dateBetween2[1])
      }
      if(param.startTime == param.endTime &&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + ' 23:59:59'
      }
      this.getDate(2,param)
    },
    handleCurrentChange3(val){
      let param = {pageNum: val}
      if(!!this.param3.orderId)
        param.order_id = this.param3.orderId
      if(this.dateBetween3!=null&&this.dateBetween3.length==2){
        param.startTime = Time.transform(this.dateBetween3[0])
        param.endTime = Time.transform(this.dateBetween3[1])
      }
      if(param.startTime == param.endTime &&!!param.startTime){
        param.endTime = param.endTime.split(" ")[0]
        param.endTime = param.endTime + ' 23:59:59'
      }
      this.getDate(3,param)
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>