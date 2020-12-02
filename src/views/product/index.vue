<template>
  <div>
    <PrdouctHead />
      <PrdouctList />
      <PrdouctPagination />
      <PrdouctAdd />
      <ProductEgitor />
  </div>
</template>

<script>
import PrdouctList from './ProductList'
import PrdouctPagination from './ProductPagination'
import PrdouctHead from './ProductHead'
import PrdouctAdd from './ProductAdd'
import ProductEgitor from './ProductEgitor'
export default {
  name:'index',
  components:{
    PrdouctList,
    PrdouctPagination,
    PrdouctHead,
    PrdouctAdd,
    ProductEgitor
  }

}
</script>

<style>

</style>