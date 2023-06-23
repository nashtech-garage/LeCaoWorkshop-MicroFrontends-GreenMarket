<template>
  <div class="row">
    <div v-for="(item, index) in relatedProducts" :key="index" class="col-lg-3 col-md-4 col-sm-6">
      <product-card :product="item" />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
import productsApi from '@/api/productsApi';
export default {

  components: { ProductCard },

  data(){
    return {
      relatedProducts: []
    }
  },
  async created(){
    this.$watch(
      () => this.$route.query,
      async () => {
        // react to route changes...
        await this.getRelatedProduct()
      }
    )
    await this.getRelatedProduct()
  },
  methods:{
    async getRelatedProduct(){
      const productId = this.$route.query.id
      try{
        const {data} = await productsApi.getProducts(this.$axios)
        const { products } = data.data

        const product = this.getProductById(productId, products)
        this.relatedProducts = this.getProductsByCategoryId(product.category_id, products, productId)
      }catch(err){
        console.log(err)
      }
    },
    getProductById(id, data){
      const product = data.filter(x => x.id == id)
      if(!product || product.length === 0){
        throw new TypeError("Product not found", id)
      }
      return product[0]
    },
    getProductsByCategoryId(categoryId, data, id){
      const products = data.filter(x => x.category_id == categoryId && x.id != id)
      return products.slice(0, 4);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
