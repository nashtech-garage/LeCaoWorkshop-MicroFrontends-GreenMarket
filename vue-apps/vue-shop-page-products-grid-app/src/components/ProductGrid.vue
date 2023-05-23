<template>
    <div class="row">
        <div v-for="(item, index) in products" :key="index" class="col-lg-3 col-md-4 col-sm-6">
            <product-card :product="item" />
        </div>
    </div>
</template>
  
<script>
  import ProductCard from './ProductCard.vue';
  import productsApi from '@/api/productApi';
  export default {
    
    components: { ProductCard },
    data(){
      return {
        products: []
      }
    },
    async created(){
      await this.getProducts();
    },
    methods:{
      async getProducts(){
        try{
            this.products = await productsApi.getProducts(this.$axios);
        }catch(err){
          console.log(err);
        }
      },
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