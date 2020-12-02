<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
      :cell-style='cellStyle'  
       @selection-change="handleSelectionChange">
       ref="multipleTable"
    >
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="id" label="商品id"></el-table-column>
      <el-table-column prop="title" label="商品名称"></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="image"
        label="商品图片"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="sellPoint"
        label="商品卖点"
      ></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="num" label="商品数量"></el-table-column>

      <el-table-column show-overflow-tooltip prop="descs" label="商品描述">
        <template slot-scope="scope">
          <div v-html="scope.row.descs"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">全部选择</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "ProductList",
  data() {
    return {
      tableData: [],
      multipleSelection: [
        
      ]
    };
  },
  mounted() {
    this.http(1);
    this.$bus.$on("page", (val) => {
      this.http(val);
    }); //eventbus接收分页组件里传来的数据
    this.$bus.$on("searchData", (data) => {
      this.tableData = data;
    }),
      this.$bus.$on("ofRef", (data) => {
        this.http(1);
      });
  },
  //封装网络请求
  methods: {
    http(page) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      api
        .getSelectTbItemAllByPage({
          page,
        })
        .then((res) => {
            loading.close();
          // console.log(res.data);
          this.tableData = res.data;
        });
    },
    //编辑事件
    handleEdit(index,row) {
      this.$bus.$emit('onedito',row)
    },
    //删除事件
    handleDelete(index, row) {
      // console.log(row);
      api
        .getDeleteItemById({
          id: row.id,
        })
        .then((res) => {
          // console.log(res.data);询问用户是否删除
          if (res.data.status === 200) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1)   //删除成功之后刷新页面
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除",
                });
              });
          } 

        });
    },
     cellStyle({row, column, rowIndex, columnIndex}){
          //  console.log(row);
           if(row.num<=10){
             return{
               color:'red'
             }
           }
           if(row.price<=100){
             return{
               color:'green'
             }

           }
         },
          toggleSelection(rows) {
            console.log(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
};
</script>

<style scoped>
.all {
  float: left;
  margin-top: 10px;
}
</style>