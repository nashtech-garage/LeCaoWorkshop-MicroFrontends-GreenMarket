<template>
  <div class="row">
    <div v-for="(item, index) in products" :key="index" class="col-lg-3 col-md-4 col-sm-6">
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
      products: [
        {
          "id": 1,
          "name": "Vetgetable’s Package",
          "price": 100.0,
          "image": 'http://localhost:5000/img/product/product-1.jpg'
        },
        {
          "id": 2,
          "name": "Vetgetable’s Package",
          "price": 32.0,
          "image": 'http://localhost:5000/img/product/product-2.jpg'
        },
        {
          "id": 3,
          "name": "Vetgetable’s Package",
          "price": 21.0,
          "image": 'http://localhost:5000/img/product/product-3.jpg'
        },
        {
          "id": 4,
          "name": "Vetgetable’s Package",
          "price": 21.0,
          "image": 'http://localhost:5000/img/product/product-4.jpg'
        }
      ]
    }
  },
  methods:{
    async getRelatedProduct(){
      try{
        const data = await productsApi.getProducts(this.$axios)
        console.log(data)
      }catch(err){
        console.log(err)
      }
    }
  },
  async mounted(){
    await this.getRelatedProduct()
  }
}
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
