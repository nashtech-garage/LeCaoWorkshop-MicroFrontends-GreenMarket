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
                  <div class="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                      data-min="10" data-max="540">
                      <div class="ui-slider-range ui-corner-all ui-widget-header"></div>
                      <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
                      <span tabindex="0" class="ui-slider-handle ui-corner-all ui-state-default"></span>
                  </div>
                  <div class="range-slider">
                      <div class="price-input">
                          <input type="text" id="minamount">
                          <input type="text" id="maxamount">
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
                            <a href="#" class="latest-product__item">
                              <div class="latest-product__item__pic">
                                  <img :src="imgHostUrl + product.main_image_url" alt="">
                              </div>
                              <div class="latest-product__item__text">
                                  <h6>{{ product.name }}</h6>
                                  <span>${{ product.price }}</span>
                              </div>
                          </a>
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
  export default {
    components: {
		Carousel,
		Slide,
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
            console.log(this.latestProducts);
        }catch(err){
          console.log(err);
        }
      },
      onProductFilter(category, color, size) {
        this.$parent.onProductFilter(category, color, size);
      }
    },
    computed: {
        imgHostUrl() {
            return process.env.VUE_APP_COMMON_URL;
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
<style scoped>
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
</style>