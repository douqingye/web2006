<template>
  <div>
      <!-- 封装table的表头组件，二次封装 -->
       <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
         <slot></slot>
       </el-table>
  </div>
</template>

<script>
export default {
    name:'index',
    // 通过props向外传递数据
    props:{
        tableData:{
            type:Array,
            default:function(){
                return []
            }
        }
    }

}
</script>

<style>

</style>