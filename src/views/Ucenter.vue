<template>
  <div class="u-center">
    <div><p>个人中心</p></div>
    <el-button type="text" @click="dialogVisible = true">查看合同</el-button>
    <el-dialog
      title="合同样本"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div class="parent">
        <el-button @click="$refs.pdf.print()">打印</el-button>
        <pdf
          ref="pdf"
          :src="src"
          :page="currentPage"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        ></pdf>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="numPages"
        @current-change="changePage"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pdf from "vue-pdf";
//初始化pdf
var loadingTask = pdf.createLoadingTask("./sxt.pdf");
export default {
  name: "Ucenter",
  data() {
    return {
      dialogVisible: false,
      numPages: 1,
      currentPage: 1,
      src: loadingTask,
    };
  },
  components: {
    pdf,
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    changePage(page) {
      this.currentPage = page;
    },
    loadPdfHandler() {
      console.log("PDF加载完成");
    },
  },
};
</script>

<style>
</style>