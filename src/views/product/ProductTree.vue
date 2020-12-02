<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      highlight-current
    >
    </el-tree>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ProductTree",
  data() {
    return {
      props: {
        //label 对应的是类目分类，类目分类里的变量时name
        label: "name",
        children: "children",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    //异步请求，第一次请求的是四条数据，然后再点击下面的子节点数据，点击的时候重新网络请求
    loadNode(node, resolve) {
    //   console.log(resolve);
      //默认取第一层数据
      if (node.level === 0) {
        api.getCategory().then((res) => {
        //   console.log(res.data); //取得第一类目的值
          if (res.data.status === 200) {
            return resolve(res.data.result); //resolve数据请求成功之后返回的方案proims
          } else {
            return resolve([]);
          }
        });
      }
      //代表要取第二层数据
      if (node.level >= 1) {
        api.getCategory({
            id:node.data.cid
        }).then((res) => {
        //   console.log(res.data); //取得第一类目的值
          if (res.data.status === 200) {
            return resolve(res.data.result); //resolve数据请求成功之后返回的方案proims
          } else {
            return resolve([]);
          }
        })
        //捕获一个catch,如果下级没有数据了，则捕获一个空的数据,要停下来
        .catch((error)=>{
            resolve ([])
        })
      }
    },
    //data里面有类目分类，点击确定的时候要把拿到的类目分类返回到add页面，
    handleNodeClick(data) {
     //子传父传递数据,在父级add页面接收
        this.$emit('treeData',data)
      }
  },
};
</script>

<style>
</style>