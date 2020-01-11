<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item label="商品类别">
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
        <el-form-item label="状态">
          <el-select v-model="param.status" placeholder="请选择状态">
            <el-option
              v-for="(item,index) in status"
              :key="index"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            placeholder="请输入商品名称"
            v-model="param.goodName"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectByAll">搜索</el-button>
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
        <el-table-column prop="typeName" label="类别"></el-table-column>
        <el-table-column prop="goods_price" label="单价（元）"></el-table-column>
        <el-table-column prop="goods_num" label="库存（件）"></el-table-column>
        <el-table-column prop="has_sold" label="已售（件）"></el-table-column>
        <el-table-column prop="name" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.is_delete!=1>0">
              <span v-if="scope.row.goods_num>0">有货</span>
              <span v-else>缺货</span>
            </span>
            <span v-else>下架</span>
          </template>
        </el-table-column>
        <el-table-column label="是否特价">
          <template slot-scope="scope">
            <el-radio-group style="margin-left:20px" v-model="scope.row.is_special" @change="changeSpecial(scope.row)">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="gmt_modified" label="最后修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="editGoods(scope.row)">编辑</el-button>
              <span>|</span>
              <el-button v-if="scope.row.is_delete==0" type="text" @click="deleteGoods(scope.row)">下架</el-button>
              <el-button v-else type="text" @click="deleteGoods(scope.row)">上架</el-button>
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
          <el-input style="margin-left:20px" v-model="form.goodName" maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" required style="margin-bottom:15px">
          <el-select style="margin-left:20px" v-model="form.type" placeholder="请选择类别">
            <el-option
              v-for="(item,index) in types_copy"
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
            :on-remove="handleRemove"
            :on-change="handleChange"
            :http-request="handleSubmit"
            :before-upload="beforeAvatarUpload"
            multiple
            :limit="5"
            :on-exceed="handleExceed"
            :file-list="fileList"
            list-type="picture">
            <el-button style="margin-left:20px" size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB,最多上传五张</div>
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
      types_copy: [],
      status: [{
        id: "0",
        label: "全部"
      },{
        id: "1",
        label: "有货"
      },{
        id: "2",
        label: "缺货",
      },{
        id: "3",
        label: "下架"
      }],
      tableData: [],
      fileList: [],
      urlList: [],
      param: {
        type: 0,
        status: "0",
        goodName: "",
      },
      form: {
        id: "",
        goodName: "",
        type: "",
        price: "",
        number: "",
        isSpecial: 0,
        description: "",
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
    //搜索
    selectByAll(){
      let param = {
        pageNum: this.currentPage,
        type_id: this.param.type,
        status: this.param.status,
      }
      if(!!this.param.goodName){
        param.goods_name = this.param.goodName
      }
      this.getTable(param)
    },
    //获取类别列表
    getTypeList(){
      this.axios.post(API.getTypeActiveList,{
        pageSize: 999
      }).then(res =>{
        if(res.resultCode==200){
          this.types = res.data.list
          this.types_copy = [].concat(this.types)
          this.types.splice(0,0,{id: 0,type_name: "全部"})
        }else{
          this.$message.error(res.resultMsg)
        }
      }).catch(e=>{

      })
    },
    initForm(){
      this.title = "新增商品"
      this.form.goodName = ""
      this.form.type = ""
      this.form.id = ""
      this.form.price = ""
      this.form.number = ""
      this.form.description = ""
      this.form.isSpecial = 0
      this.fileList = []
      this.urlList = []
    },
    editGoods(good){
      if(good==null){
        this.initForm()
        this.dialogVisible = true
      }else{
        this.dialogVisible = true
        this.form.id = good.id
        this.form.goodName = good.goods_name
        this.form.type = good.type_id
        this.form.price = good.goods_price
        this.form.number = good.goods_num
        this.form.isSpecial = good.is_special
        this.form.description = good.description
        this.fileList = []
        this.urlList = []
        if(!!good.main_pic){
          let name = good.main_pic.substr(good.main_pic.lastIndexOf("\\")+1)
          let url = "http://localhost:8082/file/"+name
          this.fileList.push({url: url});
          this.urlList.push(good.main_pic)
        }
        if(!!good.sub_pic){
          let arr = JSON.parse(good.sub_pic)
          for(let i=0;i<arr.length;i++){
            let name = arr[i].substr(arr[i].lastIndexOf("\\")+1)
            let url = "http://localhost:8082/file/"+name
            this.fileList.push({url: url})
            this.urlList.push(arr[i]);
          }
        }
        this.title = "编辑商品"
      }
    },
    //下架或上架
    deleteGoods(item){
      let param = {
        id: item.id,
        is_delete: item.is_delete==0?1:0
      }
      if(item.is_delete==0){
        this.$confirm("是否将该商品下架？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
            this.axios.post(API.updateGoods,param).then(res=>{
              if(res.resultCode!=200){
                this.$message.error(res.resultMsg)
              }else{
                this.$message.success("下架成功！")
                this.getTable({pageNum: this.currentPage,status: this.param.status,type_id: this.param.type})
              }
            }).catch(e=>{
            })
        }).catch(()=>{
        })
      }else{
        this.$confirm("是否将该商品上架？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
            this.axios.post(API.updateGoods,param).then(res=>{
              if(res.resultCode!=200){
                this.$message.error(res.resultMsg)
              }else{
                this.$message.success("上架成功！")
                this.getTable({pageNum: this.currentPage,status: this.param.status,type_id: this.param.type})
              }
            }).catch(e=>{
            })
        }).catch(()=>{
        })
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
        type_id: parseInt(this.form.type),
        main_pic: "",
        sub_pic: [],
      }
      if(!!this.form.description){
        param.description = this.form.description
      }
      for(let i=0;i<this.urlList.length;i++){
        if(i==0){
          param.main_pic = this.urlList[i]
        }else{
          param.sub_pic = param.sub_pic.concat(this.urlList[i])
        }
      }
      param.sub_pic = JSON.stringify(param.sub_pic)
      if(!!!this.form.id){
        this.axios.post(API.addGoods,param).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.dialogVisible = false
            this.$message.success(res.resultMsg)
            this.getTable({pageNum: this.currentPage,status: this.param.status,type_id: this.param.type})
          }
        }).catch(e=>{

        })
      }else{
        param.id = this.form.id
        this.axios.post(API.updateGoods,param).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.dialogVisible = false
            this.$message.success(res.resultMsg)
            this.getTable({pageNum: this.currentPage,status: this.param.status,type_id: this.param.type})
          }
        }).catch(e=>{

        })
      }
      

    },
    //修改商品是否特价
    changeSpecial(item){
      let param = {
        id: item.id,
        is_special: parseInt(item.is_special)
      }
      if(item.is_special){
        this.$confirm("是否将该商品设置为特价？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
          this.axios.post(API.updateGoods,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_special = item.is_special==1?0:1
        })
      }else{
        this.$confirm("是否取消该商品特价？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
          this.axios.post(API.updateGoods,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_special = item.is_special==1?0:1
        })
      }
    },
    //分页
    handleCurrentChange(val){
      let param = {
        pageNum: val,
        type_id: parseInt(this.param.type),
        status: parseInt(this.param.status)
      }
      this.getTable(param)
    },
    //文件上传
    handleSubmit(files){
      let file = new FormData()
      file.append("file",files.file)
      let _this = this
      this.axios.post(API.uploadFile,file,{
        headers:{'Content-Type':'multipart/form-data'}
      }).then(res=>{
        if(res.resultCode!=200){
          _this.$message.error(res.resultMsg)
        }else{
          _this.$message.success(res.resultMsg)
          _this.urlList.push(res.data)
        }
      }).catch(e=>{

      })
    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    handleChange(file,fileList){
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      if(this.fileList.length==1){
        this.fileList.splice(0,1);
        this.urlList.splice(0,1)
      }else{
        for(let i=0;i<this.fileList.length;i++){
          if(file.url == this.fileList[i].url){
            this.fileList.splice(i,1);
            this.urlList.splice(i,1)
          }
        }
      }
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多上传 5 张图片`);
    },
    beforeAvatarUpload(file){
      const isPic = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLimit = file.size/1024/1024 <2
      if(!isPic){
        this.$message.error("上传文件只能是jpg或png格式！");
      }
      if(!isLimit){
        this.$message.error("上传图片大小不能超过 2MB！");
      }
      return isPic&&isLimit;
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>