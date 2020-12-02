<template>
  <div>
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogEditorVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form
        label-width="70px"
        :label-position="labelPosition"
        :model="addForm"
        ref="ruleForm"
      >
        <el-form-item label="商品类目">
          <el-button
            class="category"
            type="primary"
            @click="dialogCategoryVisible = true"
            >类目选择</el-button
          >
         <span>{{ treeData.name }}</span>
          <el-dialog
            width="50%"
            title="类目选择"
            :visible.sync="dialogCategoryVisible"
            append-to-body
          >
           
            <!-- 接收自己Tree组建传来的类目数据,需要在数据里去获取 -->
            <ProductTree @treeData="getTreeData" />
            <span slot="footer" class="dialog-footer">
              <el-button @click="getCategoryDataHandle">确认</el-button>
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="addForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-button
            class="category"
            type="primary"
            @click="UploadVisible = true"
            >图片上传</el-button
          >
          <span>{{ uploadData.url }}</span>
          <el-dialog
            width="50%"
            title="图片上传"
            :visible.sync="UploadVisible"
            append-to-body
          >
            <!-- 接收updata组建传来的数据 -->
            <PrdouctUpload @upload="getUpload" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="商品描述">
          <ProductWangEditor @onEditor="getOnEditor" :editorData='editorContent'/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureSubmit">确定</el-button>
        <el-button type="primary" @click="dialogEditorVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import PrdouctUpload from "./PrdouctUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
import {mapMutations,mapState} from 'vuex'
export default {
  name: "ProductEgitor",
  components: {
    ProductWangEditor,
    PrdouctUpload,
    ProductTree,
  },
  computed:{
    ...mapState('editorModule',{
      editorContent:state=>state.editorContent
    })

  },
  data() {
    return {
      dialogEditorVisible: false,
      UploadVisible: false,
      dialogCategoryVisible: false,
      labelPosition: "left",
      addForm: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
      treeData: {},
      uploadData: {},
      OnEditor: "",
      currentId: 0,
    };
  },
  mounted() {
    //编辑事件
    this.$bus.$on("onedito", row => {
      this.dialogEditorVisible = true;
      this.currentId = row.id;
      api
        .getPreUpdateItem({
          id: row.id,
        })
        .then((res) => {
          this.getPreCategoryUpdate(res.data.result[0].cid)
          console.log(res.data.result[0]);     
            this.addForm = {
              name: res.data.result[0].title,
              sellPoint: res.data.result[0].sellPoint,
              price: res.data.result[0].price,
              num: res.data.result[0].num,
            },
            this.uploadData = {
              url: res.data.result[0].image,
            },
            this.editorData = res.data.result[0].descs;
             this.setEditorContent(this.editorData);
        });
    });
  },
  methods: {
    ...mapMutations('editorModule',['setEditorContent']),
    handleClose() {
      this.dialogEditorVisible = false;
    },
    //编辑产品信息事件
     sureSubmit() {
      api
        .getUpdateTbItem({
          id: this.currentId,
          title: this.addForm.name,
          cid: this.treeData.cid, //从产品类目里取得
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.OnEditor, //描述从富文本编辑器里取得
          image: this.uploadData.url,
        })
        .then((res) => {
          console.log(res.data);
          if(res.data.status===200){
              this.dialogEditorVisible=false
             this.$bus.$emit("ofRef", true);
          }else{
              this.$message.error('修改失败');
          }
        });
    },
    getUpload(data) {
      console.log(data);
      this.uploadData = data;
      this.UploadVisible = false;
    },
    getCategoryDataHandle() {
      this.dialogCategoryVisible = false;
    },
    //获取类目选择数据，接收子级传来的数据data
    getTreeData(data) {
      //接收成功之后,在data里面初始化数据，然后给data赋值，渲染在页面
      this.treeData = data;
    },
    getOnEditor(data) {
      this.OnEditor = data;
      //取得描述里的数据之后
      console.log(data);
    },
    //添加产品事件
   
    initForm() {
      (this.addForm = {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      }),
        (this.treeData = {}),
        (this.uploadData = {}),
        (this.OnEditor = "");
    },
    //修改类目旁边的分类,写一个函数，谁用谁调用
      getPreCategoryUpdate(cid) {
            console.log(cid);
            api.getPreCategory({
                cid,
            }).then((res) => {
                if (res.data.status === 200) {
                    this.treeData = {
                        name: res.data.result[0].name,
                        cid: res.data.result[0].cid,
                    };
                } else {
                    this.treeData = {
                        name: res.data.msg,
                    };
                }
            });
        },
  },
};
</script>

<style scoped lang="less">
.category {
  float: left;
  margin-right: 20px;
}
.upload-img {
  width: 400px;
  float: left;
}
</style>