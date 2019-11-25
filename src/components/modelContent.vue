<template>
  <div>
    <div class="bg-color padding20X paddingX20">
      <el-form inline>
        <el-form-item>
          <span>模块</span>
          <el-select v-model="param.model" placeholder="请选择模块">
            <el-option
              v-for="(item,index) in models"
              :key="index"
              :label="item.part_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchByModel">搜索</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button @click="editModelContent(1)">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="marginX20">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="goods.goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="part.part_name" label="模块名称"></el-table-column>
        <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
        <el-table-column prop="gmt_modified" label="最后修改时间"></el-table-column>
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
          <el-select v-model="param.model" placeholder="请选择模块">
            <el-option
              v-for="(item,index) in modelsCopy"
              :key="index"
              :label="item.part_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品类别" style="margin-bottom:15px">
          <el-select v-model="param.type" placeholder="请选择商品类别" @change="selectType">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.type_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择商品" style="margin-bottom:15px">
          <el-select v-model="param.goods" placeholder="请选择商品">
            <el-option
              v-for="(item,index) in goodsList"
              :key="index"
              :label="item.goods_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAddContent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/css/global.css";
import { API } from "@/utils/api"
export default {
  name: "ModelContent",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      title: "添加模块内容",
      dialogVisible: false,
      models: [],
      modelsCopy: [],
      typeList: [],
      goodsList: [],
      tableData: [],
      param: {
        model: "",
        type: "",
        goods: "",
      },
      dateBetween: "",
    }
  },
  mounted(){
    this.getTypesList()
    this.getModels()
  },
  methods: {
    getModels(){
      this.axios.post(API.getPartList,{pageSize: 999}).then(res=>{
        if(res.resultCode==200){
          let models = res.data.list
          for(let i=0;i<models.length;i++){
            if(models[i].is_active==1){
              this.models.push(models[i])
            }
          }
          this.param.model = this.models[0].id
          this.getData({part_id: parseInt(this.param.model)})
          this.modelsCopy = [].concat(this.models)
        }else{
          this.$message.error(res.resultMsg)
        }
      }).catch(e =>{

      })
    },
    getTypesList(){
      this.axios.post(API.getTypeActiveList,{pageSize: 999}).then(res=>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.typeList = res.data.list
        }
      }).catch(e=>{

      })
    },
    getGoodsList(param){
      this.axios.post(API.getGoodsList,param).then(res=>{
        if(res.resultCode==200){
          this.goodsList = res.data.list
        }else{
          this.$message.error(res.resultMsg)
        }
      })
    },
    getData(param){
      this.axios.post(API.getPartDetailList,param).then(res=>{
        if(res.resultCode!=200){
          this.$message.error();
        }else{
          this.total = res.data.total
          this.tableData = res.data.list
        }
      }).catch(e=>{

      })
    },
    searchByModel(){
      this.getData({part_id: parseInt(this.param.model)})
    },
    selectType(val){
      this.param.type = val
      this.getGoodsList({type_id: this.param.type,pageSize: 999})
    },
    handleCurrentChange(val){
      this.getData({part_id: parseInt(this.param.model),pageNum: this.currentPage})
    },
    deleteModel(item){
      this.$confirm("确定删除该模块内容？","提示",{
        confirmTextButton: "确定",
        cancelTextButton: "取消",
        type: "warning"
      }).then(()=>{
        this.axios.post(API.deletePartDetail,{
          id: item.id
        }).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getData({part_id: parseInt(this.param.model),pageNum: this.currentPage})
          }
        }).catch(e=>{

        })
      }).catch(()=>{

      })
    },
    editModelContent(type){
      this.dialogVisible = true
      if(type==1){
        this.param.goods = ""
      }
    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    confirmAddContent(){
      let param = {
        part_id: parseInt(this.param.model),
        goods_id: parseInt(this.param.goods)
      }
      this.axios.post(API.addPartDetail,param).then(res=>{
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.$message.success(res.resultMsg)
          this.dialogVisible = false
          this.getData({part_id: parseInt(this.param.model),pageNum: this.currentPage})
        }
      }).catch(e=>{

      })
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>