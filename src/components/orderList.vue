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
                  v-model="param.orderId"
                  clearable>
                </el-input>
              </el-form-item>
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
                <el-button type="primary">搜索</el-button>
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
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="date"
                label="类别">
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否特价">
              </el-table-column>
              <el-table-column
                prop="address"
                label="销售统计">
              </el-table-column>
              <el-table-column
                prop="address"
                label="库存">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="editGoods(scope.row.id)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text">下架</el-button>
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
                  v-model="param.orderId"
                  clearable>
                </el-input>
              </el-form-item>
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
                <el-button type="primary">搜索</el-button>
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
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="date"
                label="类别">
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否特价">
              </el-table-column>
              <el-table-column
                prop="address"
                label="销售统计">
              </el-table-column>
              <el-table-column
                prop="address"
                label="库存">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="editGoods(scope.row.id)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text">下架</el-button>
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
        <el-tab-pane label="已付款" name="fourth">
          <div class="bg-color padding20X paddingX20">
            <el-form inline>
              <el-form-item>
                <el-input
                  placeholder="请输入订单编号"
                  v-model="param.orderId"
                  clearable>
                </el-input>
              </el-form-item>
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
                <el-button type="primary">搜索</el-button>
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
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="date"
                label="类别">
              </el-table-column>
              <el-table-column
                prop="date"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="name"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="address"
                label="是否特价">
              </el-table-column>
              <el-table-column
                prop="address"
                label="销售统计">
              </el-table-column>
              <el-table-column
                prop="address"
                label="库存">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="text" @click="editGoods(scope.row.id)">编辑</el-button>
                    <span>|</span>
                    <el-button type="text">下架</el-button>
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
export default {
  name: "OrderList",
  data(){
    return {
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      pageSize1: 1,
      pageSize2: 1,
      pageSize3: 1,
      total1: 1,
      total2: 1,
      total3: 1,
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
      activeName: "first",
      param: {
        orderId: "",
        startTime: "",
        endTime: "",
      },
      dateBetween: "",
    }
  },
  mounted(){

  },
  methods: {
    editGoods(id){
      
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCurrentChange1(val){

    },
    handleCurrentChange2(val){

    },
    handleCurrentChange3(val){

    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>