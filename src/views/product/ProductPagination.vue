<template>
  <div>
    <el-pagination layout="prev, pager, next" :total="total"  @current-change="handleCurrentChange"> </el-pagination>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: "ProductPagination",
  data(){
      return{
          total:0

      }
  },
  mounted(){
    api.getTotal({

    }).then((res)=>{
        // console.log(res.data.result[0]['count(*)']);
        this.total=res.data.result[0]['count(*)']
    })

    },
    methods:{
        handleCurrentChange(val){
            this.$bus.$emit('page',val)   //把数据挂在eventbus身上传递给productlist页面，更该页面信息

        }
    }
  }
</script>

<style>
.pagination-container{
    margin-top: 40px;
}
</style>