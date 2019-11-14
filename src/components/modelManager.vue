<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-button type="primary" @click="editModel()">添加模块</el-button>
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
          label="模块名称">
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.status" label="1">是</el-radio>
            <el-radio v-model="scope.row.status" label="2">否</el-radio>
          </template>
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
      <el-form>
        <el-form-item label="模块名称" style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.modelName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" style="margin-bottom:15px">
          <el-radio style="margin-left:20px" v-model="form.show" label="1">是</el-radio>
          <el-radio v-model="form.show" label="2">否</el-radio>
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
  name: "ModelManager",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      title: "新增模块",
      dialogVisible: false,
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
      form: {
        modelName: "",
        show: 2,
      },
      dateBetween: "",
    }
  },
  mounted(){

  },
  methods: {
    initForm(){
      this.form.modelName = ""
      this.form.show = 2
    },
    handleCurrentChange(val){

    },
    deleteModel(){

    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    editModel(){
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>

</style>