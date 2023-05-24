<template>
  <div class="container">
    <div class="row">
      <product-category></product-category>
      <div class="col-lg-9 col-md-7">
        <product-sale-off></product-sale-off>
        <product-filter-bar></product-filter-bar>
        <product-grid ref="productGrid"></product-grid>
      </div>
    </div>
  </div>
</template>

<script>
import ProductGrid from '@/components/ProductGrid.vue'
import ProductCategory from '@/components/ProductCategory.vue'
import ProductSaleOff from './components/ProductSaleOff.vue'
import ProductFilterBar from './components/ProductFilterBar.vue'
export default {
  name: 'App',
  components: {ProductGrid, ProductCategory, ProductSaleOff, ProductFilterBar},
  methods: {
    onProductFilter(category, color, size) {
      console.log(category);
      this.$refs.productGrid.onProductFilter(category, color, size);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
