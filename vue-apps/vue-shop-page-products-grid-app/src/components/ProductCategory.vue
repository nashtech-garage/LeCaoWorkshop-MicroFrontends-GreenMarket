<template>
  <div class="col-lg-3 col-md-5">
    <div class="sidebar">
      <div class="sidebar__item">
        <h4>Department</h4>
        <ul>
          <li
            v-for="(item, index) in categories"
            :key="index"
            @click="categorySelected = item.id"
          >
            <a href="#">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="sidebar__item">
        <h4>Price</h4>
        <div class="price-range-wrap">
          <vue-slider
            v-model="priceRange"
            :step="1"
            :min="priceMin"
            :max="priceMax"
            :tooltips="false"
            @update="onPriceUpdate"
          ></vue-slider>
          <div class="range-slider">
            <div class="price-input">
              <input type="text" id="minamount" v-model="priceMinDisplay" />
              <input type="text" id="maxamount" v-model="priceMaxDisplay" />
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar__item sidebar__item__color--option">
        <h4>Colors</h4>
        <div
          v-for="(color, index) in colors"
          :class="
            'sidebar__item__color sidebar__item__color--' + color.toLowerCase()
          "
          :key="index"
          @click="colorSelected = color"
        >
          <label :for="color.toLowerCase()">
            {{ color }}
            <input type="radio" :id="color.toLowerCase()" />
          </label>
        </div>
      </div>
      <div class="sidebar__item">
        <h4>Popular Size</h4>
        <div
          class="sidebar__item__size"
          v-for="(size, index) in sizes"
          :key="index"
          @click="sizeSelected = size"
        >
          <label :for="size.toLowerCase()">
            {{ size }}
            <input type="radio" :id="size.toLowerCase()" />
          </label>
        </div>
      </div>
      <div class="sidebar__item">
        <div class="latest-product__text">
          <h4>Latest Products</h4>
          <div class="latest-product__slider">
            <Carousel :itemsToShow="1" :autoplay="2000" :wrap-around="true">
              <Slide v-for="(product, index) in latestProducts" :key="index">
                <router-link
                  :to="'/shop-detail?id=' + product.id"
                  class="latest-product__item"
                >
                  <div class="latest-product__item__pic">
                    <img :src="product.main_image_url" alt="" />
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
import productsApi from "@/api/productApi";
import { Carousel, Slide } from "vue3-carousel";
import VueSlider from "@vueform/slider";
export default {
  components: {
    Carousel,
    Slide,
    VueSlider,
  },
  data() {
    return {
      categories: [],
      categorySelected: null,
      products: [],
      latestProducts: [],
      sizes: ["Large", "Medium", "Small", "Tiny"],
      sizeSelected: null,
      colors: ["White", "Gray", "Red", "Black", "Blue", "Green"],
      colorSelected: null,
      priceRange: [10, 540],
      priceMin: 10,
      priceMax: 540,
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.categories = await productsApi.getProductCategories(this.$axios);
        this.products = await productsApi.getProducts(this.$axios);
        this.latestProducts = this.products.filter((x) => x.is_latest == true);
      } catch (err) {
        console.log(err);
      }
    },
    onProductFilter(category, color, size) {
      let params = {
        id: category,
        color: color,
        size: size,
        min: this.priceRange[0],
        max: this.priceRange[1],
      };
      this.$router.push({ name: "shops", params: params });
    },
    onPriceChange() {
      this.onProductFilter(
        this.categorySelected,
        this.colorSelected,
        this.sizeSelected
      );
    },
    onPriceUpdate() {
      this.onProductFilter(
        this.categorySelected,
        this.colorSelected,
        this.sizeSelected
      );
    },
  },
  computed: {
    priceMinDisplay() {
      return `$${this.priceRange[0]}`;
    },
    priceMaxDisplay() {
      return `$${this.priceRange[1]}`;
    },
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar__item {
  margin-bottom: 35px;
}

.sidebar__item.sidebar__item__color--option {
  overflow: hidden;
}

.sidebar__item h4 {
  color: #1c1c1c;
  font-weight: 700;
  margin-bottom: 25px;
}

.sidebar__item ul li {
  list-style: none;
}

.sidebar__item ul li a {
  font-size: 16px;
  color: #1c1c1c;
  line-height: 39px;
  display: block;
}

.sidebar__item .latest-product__text {
  position: relative;
}

.sidebar__item .latest-product__text h4 {
  margin-bottom: 45px;
}

.sidebar__item .latest-product__text .owl-carousel .owl-nav {
  right: 0;
}

.price-range-wrap .range-slider {
  margin-top: 20px;
}

.price-range-wrap .range-slider .price-input {
  position: relative;
}

.price-range-wrap .range-slider .price-input:after {
  position: absolute;
  left: 38px;
  top: 13px;
  height: 1px;
  width: 5px;
  background: #dd2222;
  content: "";
}

.price-range-wrap .range-slider .price-input input {
  font-size: 16px;
  color: #dd2222;
  font-weight: 700;
  max-width: 20%;
  border: none;
  display: inline-block;
}

.price-range-wrap .price-range {
  border-radius: 0;
}

.price-range-wrap .price-range.ui-widget-content {
  border: none;
  background: #ebebeb;
  height: 5px;
}

.price-range-wrap .price-range.ui-widget-content .ui-slider-handle {
  height: 13px;
  width: 13px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  -webkit-box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
}

.price-range-wrap .price-range .ui-slider-range {
  background: #dd2222;
  border-radius: 0;
}

.price-range-wrap
  .price-range
  .ui-slider-range.ui-corner-all.ui-widget-header:last-child {
  background: #dd2222;
}

.sidebar__item__color {
  float: left;
  width: 40%;
}

.sidebar__item__color.sidebar__item__color--white label:after {
  border: 2px solid #333333;
  background: transparent;
}

.sidebar__item__color.sidebar__item__color--gray label:after {
  background: #e9a625;
}

.sidebar__item__color.sidebar__item__color--red label:after {
  background: #d62d2d;
}

.sidebar__item__color.sidebar__item__color--black label:after {
  background: #252525;
}

.sidebar__item__color.sidebar__item__color--blue label:after {
  background: #249bc8;
}

.sidebar__item__color.sidebar__item__color--green label:after {
  background: #3cc032;
}

.sidebar__item__color label {
  font-size: 16px;
  color: #333333;
  position: relative;
  padding-left: 32px;
  cursor: pointer;
}

.sidebar__item__color label input {
  position: absolute;
  visibility: hidden;
}

.sidebar__item__color label:after {
  position: absolute;
  left: 0;
  top: 5px;
  height: 14px;
  width: 14px;
  background: #222;
  content: "";
  border-radius: 50%;
}

.sidebar__item__size {
  display: inline-block;
  margin-right: 16px;
  margin-bottom: 10px;
}

.sidebar__item__size label {
  font-size: 12px;
  color: #6f6f6f;
  display: inline-block;
  padding: 8px 25px 6px;
  background: #f5f5f5;
  cursor: pointer;
  margin-bottom: 0;
}

.sidebar__item__size label input {
  position: absolute;
  visibility: hidden;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>
