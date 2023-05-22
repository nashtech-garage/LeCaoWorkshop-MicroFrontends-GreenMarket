<template>
  <section class="related-product">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="section-title related__product__title">
                    <h2>Related Product</h2>
                </div>
            </div>
        </div>
        <product-grid />
    </div>
  </section>
</template>

<script>
import ProductGrid from './components/ProductGrid.vue';
export default {
  components: {
    ProductGrid
  }
}
</script>

<style>
</style>
