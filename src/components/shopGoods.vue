<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-select v-model="param.type" placeholder="请选择类别">
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
          <el-select v-model="param.status" placeholder="请选择状态">
            <el-option
              v-for="(item,index) in status"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入商品名称"
            v-model="param.goodName"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button @click="editGoods()">新增商品</el-button>
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
      <el-form>
        <el-form-item label="商品名称" style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" style="margin-bottom:15px">
          <el-select style="margin-left:20px" v-model="form.type" placeholder="请选择类别">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.typename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="是否特价" style="margin-bottom:15px">
          <el-radio style="margin-left:20px" v-model="form.isSpecial" label="1">是</el-radio>
          <el-radio v-model="form.isSpecial" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="上传图片" style="margin-bottom:15px">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button style="margin-left:20px" size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,最多上传五张</div>
          </el-upload>
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
  name: "shopGoods",
  data(){
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      title: "新增商品",
      dialogVisible: false,
      types: [{
        id: "1",
        typename: "蔬菜",
      },{
        id: "1",
        typename: "蔬菜",
      }],
      status: [{
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
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      param: {
        type: "",
        status: "",
        goodName: "",
      },
      form: {
        goodName: "",
        type: "",
        price: "",
        number: "",
        isSpecial: 2
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
    editGoods(good){
      if(good==null){
        this.initForm()
        this.dialogVisible = true
      }else{
        this.dialogVisible = true
        this.title = "编辑商品"
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
</style>