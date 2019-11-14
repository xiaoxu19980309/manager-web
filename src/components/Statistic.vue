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
            v-model="param.shopName"
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
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="date"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="date"
          label="库存">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总收入">
        </el-table-column>
        <el-table-column
          prop="address"
          label="总销量">
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
export default {
  name: "Statistic",
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
        type: "",
        status: "",
        shopName: "",
      },
      dateBetween: "",
    }
  },
  mounted(){

  },
  methods: {
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