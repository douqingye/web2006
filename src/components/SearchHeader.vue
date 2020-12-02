<template>
  <div class="head">
    <el-form ref="searchForm" :model="search" @submit.native.prevent>
      <el-form-item>
        <el-input
          v-model="search.content"
          @keyup.enter.native="onSubmitSearch"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitAdd">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: "ProductHead",
  data() {
    return {
      search: {
        content: "",
      },
    };
  },
  methods: {
    onSubmitSearch() {  
      //this.search.content回调函数，要传给父组件搜索页面的数据
         this.$parent.searchDataHandle(this.search.content)
    },
    onSubmitAdd() {
      //向父组件传递数据，参数查询页面时父组件
        this.$emit('onSubmitAdd',true) 
    },
  },
};
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1000px;
        }
    }
}
.head {
    margin-top: 20px;
    width: 100%;
}
</style>