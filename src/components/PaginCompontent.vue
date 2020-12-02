<template>
  <div>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "ProductPagination",
  data() {
    return {
  
    };
  },
  //接收父级换来的总页数数据
  props:{
   total:{
       type:[String,Number],
       default:0
   }
  },
  methods: {
    handleCurrentChange(val) {
      this.$bus.$emit("page", val); //把数据挂在eventbus身上传递给productlist页面，更该页面信息
    },
  },
};
</script>

<style>
.pagination-container {
  margin-top: 40px;
}
</style>