<template>
    <div class="col-lg-3 col-md-5">
      <div class="sidebar">
          <div class="sidebar__item">
              <h4>Department</h4>
              <ul>
                  <li v-for="(item, index) in categories" :key="index" @click="categorySelected = item.id"><a href="#">{{ item.name }}</a></li>
              </ul>
          </div>
          <div class="sidebar__item">
              <h4>Price</h4>
              <div class="price-range-wrap">
                <vue-slider v-model="priceRange" :step="1" :min="priceMin" :max="priceMax" :tooltips="false" @update="onPriceUpdate"></vue-slider>
                <div class="range-slider">
                  <div class="price-input">
                    <input type="text" id="minamount" v-model="priceMinDisplay">
                    <input type="text" id="maxamount" v-model="priceMaxDisplay">
                  </div>
                </div>
                
              </div>
          </div>
          <div class="sidebar__item sidebar__item__color--option">
              <h4>Colors</h4>
              <div v-for="(color, index) in colors" :class="'sidebar__item__color sidebar__item__color--' + color.toLowerCase()"  :key="index" @click="colorSelected = color">
                  <label :for="color.toLowerCase()">
                      {{ color }}
                      <input type="radio" :id="color.toLowerCase()">
                  </label>
              </div>
          </div>
          <div class="sidebar__item">
              <h4>Popular Size</h4>
              <div class="sidebar__item__size" v-for="(size, index) in sizes" :key="index" @click="sizeSelected = size"> 
                  <label :for="size.toLowerCase()">
                      {{ size }}
                      <input type="radio" :id="size.toLowerCase()">
                  </label>
              </div>
          </div>
          <div class="sidebar__item">
              <div class="latest-product__text">
                  <h4>Latest Products</h4>
                  <div class="latest-product__slider">
                    <Carousel :itemsToShow="1" :autoplay="2000" :wrap-around="true">
                        <Slide v-for="(product, index) in latestProducts" :key="index">
                            <router-link :to="'/shop-details?id=' + product.id" class="latest-product__item">
                              <div class="latest-product__item__pic">
                                  <img :src="imgHostUrl + product.main_image_url" alt="">
                              </div>
                              <div class="latest-product__item__text">
                                  <h6>{{ product.name }}</h6>
                                  <span>${{ product.price }}</span>
                              </div>
                          </router-link>
                        </Slide>
                    </Carousel>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
  
<script>
  import productsApi from '@/api/productApi';
  import { Carousel, Slide } from 'vue3-carousel'
  import VueSlider from '@vueform/slider'
  export default {
    components: {
      Carousel,
      Slide,
      VueSlider
    },
    data(){
      return {
        categories: [],
        categorySelected: null,
        products: [],
        latestProducts: [],
        sizes: ['Large', 'Medium', 'Small', 'Tiny'],
        sizeSelected: null,
        colors: ['White', 'Gray', 'Red', 'Black', 'Blue', 'Green'],
        colorSelected: null,
        priceRange: [10, 540],
        priceMin: 10,
        priceMax: 540,
        
      }
    },
    async created(){
      await this.fetchData();
    },
    methods:{
      async fetchData(){
        try{
            this.categories = await productsApi.getProductCategories(this.$axios);
            this.products = await productsApi.getProducts(this.$axios);
            this.latestProducts = this.products.filter(x => x.is_latest == true);
        }catch(err){
          console.log(err);
        }
      },
      onProductFilter(category, color, size) {
        let params = {id: category, color: color, size: size, min: this.priceRange[0], max: this.priceRange[1]};
        this.$router.push({name: 'shops', params: params});
      },
      onPriceChange() {
        this.onProductFilter(this.categorySelected, this.colorSelected, this.sizeSelected);
      },
      onPriceUpdate() {
        this.onProductFilter(this.categorySelected, this.colorSelected, this.sizeSelected);
      }
    },
    computed: {
        imgHostUrl() {
            return process.env.VUE_APP_COMMON_URL;
        },
        priceMinDisplay() {
          return `$${this.priceRange[0]}`
        },
        priceMaxDisplay() {
          return `$${this.priceRange[1]}`
        }
    },
    watch: {
        categorySelected(newValue) {
            this.onProductFilter(newValue, this.colorSelected, this.sizeSelected);
        },
        sizeSelected(newValue) {
            this.onProductFilter(this.categorySelected, this.colorSelected, newValue);
        },
        colorSelected(newValue) {
            this.onProductFilter(this.categorySelected, newValue, this.sizeSelected);
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  a {
    color: #42b983;
  }
</style> -->
<style src="@vueform/slider/themes/default.css"></style>