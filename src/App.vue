<template>
  <div>
    <!-- 控制整个页面刷新 -->
    <router-view v-if="isRouterActive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isRouterActive: true, //控制整个页面是否显示，默认是显示
    };
  },
  components: {},
  //祖先组件可以直接向子孙组件传递数据，传递层很深,和inject是成对
  provide() {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload() {
      //让咱们整个值显示再隐藏
      this.isRouterActive = false;
      //确保dom元素百分之百更新，
      this.$nextTick(() => {
        this.isRouterActive = true;
      });
    },
  },
};
</script>

<style>
</style>
