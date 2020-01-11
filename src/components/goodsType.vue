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
        v-loading="loading"
        stripe
        border
        style="width: 100%">
        <el-table-column prop="type_name" label="商品类别名称"></el-table-column>
        <el-table-column prop="note" label="简介"></el-table-column>
        <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
        <el-table-column prop="gmt_modified" label="最后修改时间"></el-table-column>
        <el-table-column label="是否启用">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.is_active" @change="changeActive(scope.row)">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="editType(scope.row)">编辑</el-button>
              <el-button style="margin-left:15px;" type="text" @click="deleteType(scope.row)">删除</el-button>
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
      width="30%"
      :before-close="handleClose">
      <el-form label-width="120px">
        <el-form-item label="商品类别名称" required style="margin-bottom:15px">
          <el-input style="margin-left:20px;width:80%;" v-model="form.typeName"></el-input>
        </el-form-item>
        <el-form-item label="类别介绍" style="margin-bottom: 15px;">
          <el-input style="margin-left:20px;width:80%;" type="textarea" v-model="form.note" :rows="4" :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addType">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/css/global.css";
import { API } from "@/utils/api"
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
        id: "",
        typeName: "",
        note: "",
        oldTypeName: ""
      },
      loading: false
    }
  },
  mounted(){
    this.getTableData()
  },
  methods: {
    getTableData(param){
      this.loading = true
      this.axios.post(API.getTypeList,param).then(res=>{
        this.loading= false
        if(res.resultCode!=200){
          this.$message.error(res.resultMsg)
        }else{
          this.total = res.data.total
          this.tableData = res.data.list
        }
      }).catch(e=>{

      })
    },
    initForm(){
      this.title = "新增商品类别"
      this.form.id = ""
      this.form.typeName = ""
      this.form.note = ""
      this.form.oldTypeName = ""
    },
    editType(item){
      if(item==null){
        this.initForm()
        this.dialogVisible = true
      }else{
        this.dialogVisible = true
        this.form.id = item.id
        this.form.typeName = item.type_name
        this.form.oldTypeName = item.type_name
        this.form.note = item.note
        this.title = "编辑商品类别"
      }
    },
    //Xudeng添加编辑商品类别
    addType(){
      if(!!!this.form.typeName){
        this.$message.warning("商品类别名称不能为空！")
        return;
      }
      if(!!!this.form.id){
        this.axios.post(API.addGoodsType,{
          type_name: this.form.typeName,
          note: this.form.note,
        }).then(res=>{
          this.dialogVisible = false
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getTableData({pageNum: this.currentPage})
          }
        }).catch(e =>{

        })
      }else{
        let param = {
          id: this.form.id
        }
        if(!!this.form.note){
          param.note = this.form.note
        }
        if(this.form.typeName !== this.form.oldTypeName){
          param.type_name = this.form.typeName
        }
        this.axios.post(API.updateGoodsType,param).then(res=>{
          this.dialogVisible = false
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getTableData({pageNum: this.currentPage})
          }
        }).catch(e =>{

        })
      }
      
    },
    //分页
    handleCurrentChange(val){
      this.getTableData({pageNum: val})
    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    changeActive(item){
      let param = {
        id: item.id,
        is_active: parseInt(item.is_active)
      }
      if(param.is_active==1){
        this.$confirm("是否启用该商品类别？","提示",{
          confirmTextButton: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          this.axios.post(API.updateGoodsType,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_active = item.is_active==1?0:1
        })
      }else{
        this.$confirm("是否禁用该商品类别？","提示",{
          confirmTextButton: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
          this.axios.post(API.updateGoodsType,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_active = item.is_active==1?0:1
        })
      }
      
    },
    deleteType(item){
      this.$confirm("确定删除该商品类别？","提示",{
        confirmTextButton: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        this.axios.post(API.updateGoodsType,{
          id: item.id,
          is_delete: 1,
        }).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
            this.getTableData({pageNum: this.currentPage})
          }).catch(e=>{

          })
      }).catch(()=>{
        
      })
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