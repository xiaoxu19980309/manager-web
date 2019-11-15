<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-button @click="editType()">新增商品类别</el-button>
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
              <el-button type="text" @click="editGoods(scope.row)">编辑</el-button>
              <span>|</span>
              <el-button type="text">下架</el-button>
            </div>
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
      width="40%"
      :before-close="handleClose">
      <el-form label-width="100px">
        <el-form-item label="商品类别名称"  style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.typeName"></el-input>
        </el-form-item>
        <el-form-item label="类别介绍" style="margin-bottom: 15px;">
          <el-input style="margin-left:20px" type="textarea" v-model="form.note" :rows="4" :maxlength="200"></el-input>
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
  name: "goodsType",
  data(){
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      title: "新增商品类别",
      dialogVisible: false,
      types: [],
      status: [],
      tableData: [],
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      param: {
        typeName: "",
      },
      form: {
        typeName: "",
        note: "",
      }
    }
  },
  mounted(){

  },
  methods: {
    initForm(){
      this.form.goodName = ""
      this.form.type = ""
      this.form.price = ""
      this.form.number = ""
      this.form.isSpecial = 2
    },
    editType(good){
      if(good==null){
        this.initForm()
        this.dialogVisible = true
      }else{
        this.dialogVisible = true
        this.title = "编辑商品类别"
      }
    },
    //分页
    handleCurrentChange(val){

    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
.el-form-item{
  text-align: left;
}
</style>