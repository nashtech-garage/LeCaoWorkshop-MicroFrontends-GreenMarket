<template>
  <div class="product__discount">
    <div class="section-title product__discount__title">
      <h2>Sale Off</h2>
    </div>
    <div class="row">
      <Carousel :itemsToShow="3" :wrap-around="true">
        <Slide v-for="(product, index) in products" :key="index">
          <div class="col-lg-12">
            <div class="product__discount__item">
              <div
                class="product__discount__item__pic set-bg"
                :style="{
                  'background-image': 'url(' + product.main_Image_Url,
                }"
              >
                <div class="product__discount__percent">
                  -{{ product.discount }}%
                </div>
                <ul class="product__item__pic__hover">
                  <li>
                    <a href="#"><i class="fa fa-heart"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-retweet"></i></a>
                  </li>
                  <li>
                    <a href="#"><i class="fa fa-shopping-cart"></i></a>
                  </li>
                </ul>
              </div>
              <div class="product__discount__item__text">
                <span>{{ product.name }}</span>
                <h5>
                  <router-link :to="'/shop-detail?id=' + product.id">{{
                    product.name
                  }}</router-link>
                </h5>
                <div class="product__item__price">
                  ${{ product.price * (1 - product.discount / 100.0) }}
                  <span>${{ product.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>
<script>
import productsApi from "@/api/productApi";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
export default {
  props: {},
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    await this.getSaleOffProducts();
  },
  methods: {
    async getSaleOffProducts() {
      try {
        this.products = await productsApi.getSaleOffProducts(this.$axios);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    imgHostUrl() {
      return process.env.VUE_APP_COMMON_URL;
    },
  },
};
</script>
<style scoped>
.carousel {
  width: 100%;
}

:deep .carousel__pagination-button {
  height: 12px;
  width: 12px;
  border: 1px solid #b2b2b2;
  border-radius: 50%;
  margin-right: 12px;
}

:deep .carousel__pagination-button:after {
  content: unset;
}

:deep .carousel__pagination-button--active {
  height: 12px;
  width: 12px;
  border: 1px solid #b2b2b2;
  border-radius: 50%;
  margin-right: 12px;
  background: #707070;
  border-color: #6f6f6f;
}

.product {
  padding-top: 80px;
  padding-bottom: 80px;
}

.product__discount {
  padding-bottom: 50px;
}

.product__discount__title {
  text-align: left;
  margin-bottom: 65px;
}

.product__discount__title h2 {
  display: inline-block;
}

.product__discount__title h2:after {
  margin: 0;
  width: 100%;
}

.product__discount__item:hover
  .product__discount__item__pic
  .product__item__pic__hover {
  bottom: 20px;
}

.product__discount__item__pic {
  height: 270px;
  position: relative;
  overflow: hidden;
}

.product__discount__item__pic .product__discount__percent {
  height: 45px;
  width: 45px;
  background: #dd2222;
  border-radius: 50%;
  font-size: 14px;
  color: #ffffff;
  line-height: 45px;
  text-align: center;
  position: absolute;
  left: 15px;
  top: 15px;
}

.product__item__pic__hover {
  position: absolute;
  left: 0;
  bottom: -50px;
  width: 100%;
  text-align: center;
  -webkit-transition: all, 0.5s;
  -moz-transition: all, 0.5s;
  -ms-transition: all, 0.5s;
  -o-transition: all, 0.5s;
  transition: all, 0.5s;
}

.product__item__pic__hover li {
  list-style: none;
  display: inline-block;
  margin-right: 6px;
}

.product__item__pic__hover li:last-child {
  margin-right: 0;
}

.product__item__pic__hover li:hover a {
  background: #7fad39;
  border-color: #7fad39;
}

.product__item__pic__hover li:hover a i {
  color: #ffffff;
  transform: rotate(360deg);
}

.product__item__pic__hover li a {
  font-size: 16px;
  color: #1c1c1c;
  height: 40px;
  width: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ebebeb;
  background: #ffffff;
  display: block;
  border-radius: 50%;
  -webkit-transition: all, 0.5s;
  -moz-transition: all, 0.5s;
  -ms-transition: all, 0.5s;
  -o-transition: all, 0.5s;
  transition: all, 0.5s;
}

.product__item__pic__hover li a i {
  position: relative;
  transform: rotate(0);
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
}

.product__discount__item__text {
  text-align: center;
  padding-top: 20px;
}

.product__discount__item__text span {
  font-size: 14px;
  color: #b2b2b2;
  display: block;
  margin-bottom: 4px;
}

.product__discount__item__text h5 {
  margin-bottom: 6px;
}

.product__discount__item__text h5 a {
  color: #1c1c1c;
}

.product__discount__item__text .product__item__price {
  font-size: 18px;
  color: #1c1c1c;
  font-weight: 700;
}

.product__discount__item__text .product__item__price span {
  display: inline-block;
  font-weight: 400;
  text-decoration: line-through;
  margin-left: 10px;
}

.product__discount__slider .col-lg-4 {
  max-width: 100%;
}

.product__discount__slider.owl-carousel .owl-dots {
  text-align: center;
  margin-top: 30px;
}

.product__discount__slider.owl-carousel .owl-dots button {
  height: 12px;
  width: 12px;
  border: 1px solid #b2b2b2;
  border-radius: 50%;
  margin-right: 12px;
}

.product__discount__slider.owl-carousel .owl-dots button.active {
  background: #707070;
  border-color: #6f6f6f;
}

.product__discount__slider.owl-carousel .owl-dots button:last-child {
  margin-right: 0;
}

.carousel__viewport {
  min-width: 877px;
}
</style>
