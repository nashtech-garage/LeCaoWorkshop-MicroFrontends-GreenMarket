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
    <router-view />
  </div>
</template>

<script>
import ProductGrid from "@/components/ProductGrid.vue";
import ProductCategory from "@/components/ProductCategory.vue";
import ProductSaleOff from "./components/ProductSaleOff.vue";
import ProductFilterBar from "./components/ProductFilterBar.vue";
export default {
  name: "App",
  components: {
    ProductGrid,
    ProductCategory,
    ProductSaleOff,
    ProductFilterBar,
  },
  data() {
    return {
      categoryId: null,
      colorId: null,
      sizeId: null,
      min: null,
      max: null,
    };
  },
  created() {
    this.onShopEnter();
  },
  methods: {
    onProductFilter(category, color, size, min, max) {
      this.$refs.productGrid.onProductFilter(category, color, size, min, max);
    },
    onShopEnter() {
      this.categoryId = null;
      this.colorId = null;
      this.sizeId = null;
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("id") && urlParams.get("id")) {
        this.categoryId = urlParams.get("id");
      }
      if (urlParams.has("color") && urlParams.get("color")) {
        this.colorId = urlParams.get("color");
      }
      if (urlParams.has("size") && urlParams.get("size")) {
        this.sizeId = urlParams.get("size");
      }
      if (urlParams.has("min") && urlParams.get("min")) {
        this.min = urlParams.get("min");
      }
      if (urlParams.has("max") && urlParams.get("max")) {
        this.max = urlParams.get("max");
      }
      this.onProductFilter(
        this.categoryId,
        this.colorId,
        this.sizeId,
        this.min,
        this.max
      );
    },
  },
  watch: {
    $route(to, from) {
      this.onShopEnter();
    },
  },
};
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
