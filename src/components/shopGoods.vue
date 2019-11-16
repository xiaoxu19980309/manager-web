<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <el-select v-model="param.type" placeholder="请选择类别">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.type_name"
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
              :label="item.type_name"
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
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="date" label="类别"></el-table-column>
        <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column label="是否特价">
          <template slot-scope="scope">
            <span v-if="scope.row.is_special==0">否</span>
            <span v-else>是</span>
          </template>
        </el-table-column>
        <el-table-column prop="goods_num" label="库存"></el-table-column>
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
      <el-form label-width="90px">
        <el-form-item label="商品名称" required style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" required style="margin-bottom:15px">
          <el-select style="margin-left:20px" v-model="form.type" placeholder="请选择类别">
            <el-option
              v-for="(item,index) in types"
              :key="index"
              :label="item.type_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" required style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" required style="margin-bottom:15px">
          <el-input style="margin-left:20px" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" style="margin-bottom:15px">
          <el-input type="textarea" style="margin-left:20px;width:75%" v-model="form.description" :rows="3" maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="是否特价" style="margin-bottom:15px">
          <el-radio-group style="margin-left:20px" v-model="form.isSpecial">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          
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
        <el-button type="primary" @click="addGoods()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/css/global.css";
import { API } from "@/utils/api"
export default {
  name: "shopGoods",
  data(){
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      title: "新增商品",
      dialogVisible: false,
      types: [],
      status: [],
      tableData: [],
      fileList: [],
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
        isSpecial: 0,
      }
    }
  },
  mounted(){
    this.getTable()
    this.getTypeList()
  },
  methods: {
    getTable(param){
      this.axios.post(API.getGoodsList,param).then(res =>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.total = res.data.total
          this.tableData = res.data.list
        }
      }).catch(e=>{

      })
    },
    //获取类别列表
    getTypeList(){
      this.axios.post(API.getTypeList,{
        pageSize: 999
      }).then(res =>{
        if(res.resultCode==200){
          this.types = res.data.list
        }else{
          this.$message.error(res.resultMsg)
        }
      }).catch(e=>{

      })
    },
    initForm(){
      this.form.goodName = ""
      this.form.type = ""
      this.form.price = ""
      this.form.number = ""
      this.form.isSpecial = 0
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
    checkNull(){
      if(!!!this.form.goodName||this.form.goodName.trim().length==0){
        this.$message.warning("商品名称不能为空!");
        return false;
      }
      if(!!!this.form.type){
        this.$message.warning("商品类别不能为空!");
        return false;
      }
      if(!!!this.form.price){
        this.$message.warning("商品价格不能为空!")
        return false;
      }
      if(isNaN(this.form.price)){
        this.$message.warning("商品价格只能为数字!")
        return false;
      }
      if(!!!this.form.number){
        this.$message.warning("商品库存不能为空!")
        return false;
      }
      if(isNaN(this.form.number)){
        this.$message.warning("商品库存只能为数字!")
        return false;
      }
      return true;
    },
    //新增商品
    addGoods(){
      if(!this.checkNull())
        return;
      let param = {
        goods_name: this.form.goodName,
        goods_price: parseFloat(this.form.price),
        goods_num: parseInt(this.form.number),
        type_id: parseInt(this.form.type)
      }
      if(!!this.form.description){
        param.description = this.form.description
      }
      this.axios.post(API.addGoods,param).then(res=>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.$message.success(res.resultMsg)
          this.getTable({pageNum: this.currentPage})
        }
      }).catch(e=>{

      })

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