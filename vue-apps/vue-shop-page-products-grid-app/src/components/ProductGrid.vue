<template>
  <div class="row">
    <div
      v-for="(item, index) in products"
      :key="index"
      class="col-lg-4 col-md-6 col-sm-6"
    >
      <product-card :product="item" />
    </div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";
import productsApi from "@/api/productApi";
export default {
  components: { ProductCard },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    await this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        this.products = await productsApi.getProducts(this.$axios);
      } catch (err) {
        console.log(err);
      }
    },
    async onProductFilter(category, color, size, min, max) {
      await this.getProducts();
      if (category) {
        this.products = this.products.filter((x) => x.category_id == category);
      }
      if (color) {
        this.products = this.products.filter((x) => x.color == color);
      }
      if (size) {
        switch (size) {
          case "Large":
            this.products = this.products.filter((x) => x.weight > 200);
            break;
          case "Medium":
            this.products = this.products.filter(
              (x) => x.weight > 100 && x.weight <= 200
            );
            break;
          case "Small":
            this.products = this.products.filter(
              (x) => x.weight > 10 && x.weight <= 100
            );
            break;
          case "Tiny":
            this.products = this.products.filter((x) => x.weight <= 10);
            break;
        }
      }
      if (min) {
        this.products = this.products.filter((x) => x.price >= min);
      }
      if (max) {
        this.products = this.products.filter((x) => x.price <= max);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
