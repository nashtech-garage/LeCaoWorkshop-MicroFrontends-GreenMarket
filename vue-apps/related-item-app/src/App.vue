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
      <router-view />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
.related-product {
  padding-bottom: 30px;
}

.related__product__title {
  margin-bottom: 70px;
}
</style>
