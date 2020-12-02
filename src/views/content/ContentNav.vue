<template>
  <!-- :expand-on-click-node="false"控制点开方式，只有点箭头才可以点开，点其他的没效果 -->
  <div>
    <el-tree
      highlight-current
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent"
    ></el-tree>
    <!-- 子导航添加对话框,before-close关闭前的回调 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogAddNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- :model="navForm"用来读取数据 -->
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名字" prop="pass">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddNavHandle">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog
      title="修改导航"
      :visible.sync="dialogUpdateNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名字">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdateNavHandle">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ContentNav",
  //和app页面的provide相对应
  inject: ["reload"],
  data() {
    return {
      dialogAddNavVisible: false,
      dialogUpdateNavVisible: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      navContent: {},
      navForm: {
        name: "",
      },
    };
  },
  methods: {
    http(level, resolve) {
      api.selectContentCategoryByParentId(level).then((res) => {
        if (res.data.status === 200) {
          // console.log(res.data.result);
          return resolve(res.data.result);
        } else {
          return resolve([]);
        }
      });
    },
    //返回数据
    loadNode(node, resolve) {
      // console.log(node);
      //第一次访问
      if (node.level === 0) {
        // this.http(1,resolve)
        this.http({ id: 1 }, resolve);
      }
      //非第一次访问
      if (node.level >= 1) {
        this.http({ id: node.data.pid }, resolve);
      }
    },
    //渲染的其中一中方案
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data)}
            >
              增加子导航
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    append(node, data) {
      console.log(data);
      this.dialogAddNavVisible = true;
      this.navContent = data;
    },
    update(node, data) {
      this.navContent=data;
      this.dialogUpdateNavVisible=true
    },
    remove(node, data) {
      console.log(data);
      api
        .deleteContentCategoryById({
          pid: data.pid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.reload();
          }
        });
    },

    handleNodeClick(node) {
      //把取得的node里的pid传给info页面
      // console.log(node);
      this.$bus.$emit('contentInfo',node)

    },
    sureAddNavHandle() {
      api
        .insertContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.dialogAddNavVisible = false;
            //让整个页面刷新
            this.reload();
          }
        });
    },
    sureUpdateNavHandle() {
       api.updateContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
       }).then(res=>{
         if(res.data.status===200){
           this.reload();

         }
         
       })
    },
    //关闭前的回调
    handleClose() {},
  },
};
</script>

<style>
</style>