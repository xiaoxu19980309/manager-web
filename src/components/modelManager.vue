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
        <el-table-column prop="part_name" label="模块名称">
        </el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.is_active" @change="changeActive(scope.row)">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="gmt_create" label="创建时间"></el-table-column>
        <el-table-column prop="gmt_modified" label="最后修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editModel(scope.row)">编辑</el-button>
            <span>|</span>
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
          <el-radio-group v-model="form.show">
            <el-radio style="margin-left:20px" :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAddPart()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import "@/css/global.css";
import { API } from "@/utils/api"
export default {
  name: "ModelManager",
  data(){
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      title: "新增模块",
      dialogVisible: false,
      tableData: [],
      param: {
        username: "",
        phone: "",
      },
      form: {
        id: "",
        modelName: "",
        show: 2,
      },
      dateBetween: "",
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(param){
      this.axios.post(API.getPartList).then(res=>{
        if(res.resultCode==200){
          this.total = res.data.total
          this.tableData = res.data.list
        }else{
          this.$message.error("获取模块列表失败！");
        }
      }).catch(e=>{
      })
    },
    initForm(){
      this.form.modelName = ""
      this.form.show = 0
      this.form.id = ""
    },
    handleCurrentChange(val){
      this.getData({pageNum: val})
    },
    deleteModel(item){
      this.$confirm("确定删除该模块？","提示",{
        confirmTextButton: "确定",
        cancelTextButton: "取消",
        type: "warning"
      }).then(()=>{
        this.axios.post(API.deletePart,{id: item.id}).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getData({pageNum: this.currentPage})
          }
        }).catch(e=>{

        })
      }).catch(()=>{

      })
    },
    //关闭弹窗
    handleClose(){
      this.dialogVisible = false
    },
    editModel(item){
      this.dialogVisible = true
      this.initForm()
      if(item!=null){
        this.form.id = item.id
        this.form.modelName = item.part_name
        this.form.is_active = item.is_active
      }
    },
    changeActive(item){
      let param = {
        id: item.id,
        is_active: item.is_active
      }
      if(item.is_active){
        this.$confirm("是否将该模块设置为显示？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
          this.axios.post(API.updatePart,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_active = item.is_active?0:1
        })
      }else{
        this.$confirm("是否将该模块设置为隐藏？","提示",{
          confirmTextButton: "确定",
          cancelTextButton: "取消",
          type: "warning"
        }).then(()=>{
          this.axios.post(API.updatePart,param).then(res=>{
            if(res.resultCode!=200){
              this.$message.error(res.resultMsg)
            }else{
              this.$message.success(res.resultMsg)
            }
          }).catch(e=>{

          })
        }).catch(()=>{
          item.is_active = item.is_active?0:1
        })
      }
    },
    confirmAddPart(){
      this.dialogVisible = false
      if(!!!this.form.id){
        this.axios.post(API.addPart,{
          part_name: this.form.modelName,
          is_active: this.form.show
        }).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getData({pageNum: this.currentPage})
          }
        }).catch(e=>{

        })
      }else{
        this.axios.post(API.updatePart,{
          id: this.form.id,
          part_name: this.form.modelName,
          is_active: this.form.show
        }).then(res=>{
          if(res.resultCode!=200){
            this.$message.error(res.resultMsg)
          }else{
            this.$message.success(res.resultMsg)
            this.getData({pageNum: this.currentPage})
          }
        }).catch(e=>{

        })
      }
    }
  }
}
</script>
<style scoped>
.el-form{
  text-align: left;
}
</style>