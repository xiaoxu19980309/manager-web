<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <span>模块</span>
          <el-select v-model="param.type" placeholder="请选择模块">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="editModelContent(1)">添加</el-button>
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
          prop="name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="模块名称">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="date"
          label="最后修改时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteModel(scope.row)">删除</el-button>
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
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
      <el-form label-width="120px">
        <el-form-item label="选择模块" style="margin-bottom:15px">
          <el-select v-model="param.type" placeholder="请选择模块">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品类别" style="margin-bottom:15px">
          <el-select v-model="param.type" placeholder="请选择商品类别">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" style="margin-bottom:15px">
          <el-select v-model="param.type" placeholder="请选择商品">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/css/global.css";
export default {
  name: "ModelContent",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      title: "添加模块内容",
      dialogVisible: false,
      types: [{
        id: "1",
        typename: "蔬菜",
      },{
        id: "1",
        typename: "蔬菜",
      }],
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

  },
  methods: {
    handleCurrentChange(val){

    },
    deleteModel(){

    },
    editModelContent(type){
      this.dialogVisible = true
      if(type==1){

      }
    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },

  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>