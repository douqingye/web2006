<template>
  <div>
    <Nav />
    <div class="container-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Nav";
export default {
  name: "Layout",
  components: {
    Nav,
  },
};
</script>

<style scoped>
.container-view {
  width: 1200px;
  margin: 0 auto;
}
</style>