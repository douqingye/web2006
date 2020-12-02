<template>
  <div>
    <el-dialog
      title="添加商品"
      :visible.sync="dialogVisible"
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
          <ProductWangEditor @onEditor="getOnEditor" />
        </el-form-item>
         <div v-for="(item,index) in treeDataEditor" :key="index">
                <h3>{{ item.value }}</h3>
                <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                    <el-form-item label-width="130px" :label="childItem.childValue">
                        <el-input v-model="childItem.value" type="text"></el-input>
                    </el-form-item>
                </div>
            </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
 <el-button type="primary" @click="sureSubmit">确定</el-button>
      <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
     
    </el-dialog>
  </div>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import PrdouctUpload from "./PrdouctUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
export default {
  name: "ProductAdd",
  components: {
    ProductWangEditor,
    PrdouctUpload,
    ProductTree,
  },
  data() {
    return {
      dialogVisible: false,
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
      treeDataEditor:[]
    };
  },
  mounted() {
    this.$bus.$on("alertAdd", (flag) => {
      this.dialogVisible = flag;
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    getUpload(data) {
      console.log(data);
      this.uploadData = data;
      this.UploadVisible = false;
    },
    //确认的点击事件
    getCategoryDataHandle() {
       api.paramsItem({
        cid:this.treeData.cid
      }).then(res=>{
        console.log(res.data);
         if(res.data.status ===200){
        this.treeDataEditor=JSON.parse(res.data.result[0].paramData)
        this.dialogCategoryVisible = false;
      }else{
         this.$message('请选择分类');
      }
      })
      
    },
    //获取类目选择数据，接收子级传来的数据data
    getTreeData(data) {
    
      // console.log(this.treeData);
      //接收成功之后,在data里面初始化数据，然后给data赋值，渲染在页面
      this.treeData = data;

    },
    getOnEditor(data) {
      this.OnEditor = data;
      //取得描述里的数据之后
      console.log(data);
    },
    //添加产品事件
    sureSubmit() {
      api
        .getInsertTbItem({
          title: this.addForm.name,
          cid: this.treeData.cid, //从产品类目里取得
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.OnEditor.desc, //描述从富文本编辑器里取得
          image: this.uploadData.url,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            //成功之后，网络需要重新请求刷新页面，需要传一个数据给List页面，让其在页面渲染
            this.$bus.$emit("ofRef", true);
            this.dialogVisible = false;
            this.initForm();
          } else {
              this.$message.error('添加失败');
          }
        });
    },
    initForm() {
      (this.addForm = {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      }),
        (this.treeData = {}),
        (this.uploadData = {}),
        (this.OnEditor='')
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