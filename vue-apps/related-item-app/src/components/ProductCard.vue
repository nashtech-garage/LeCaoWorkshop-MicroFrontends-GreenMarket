<template>
  <div class="product__item">
    <div
      class="product__item__pic set-bg abc"
      :style="{ 'background-image': 'url(' + product.main_image_url + ')' }"
    >
      <ul class="product__item__pic__hover">
        <li>
          <a href="#"><i class="fa fa-heart"></i></a>
        </li>
        <li>
          <a href="#"><i class="fa fa-retweet"></i></a>
        </li>
        <li>
          <a href="#" @click.prevent="addProductToShoppingCart(product)"
            ><i class="fa fa-shopping-cart"></i
          ></a>
        </li>
      </ul>
    </div>
    <div class="product__item__text">
      <h6>
        <router-link :to="'/shop-detail?id=' + product.id">
          {{ product.name }}
        </router-link>
      </h6>
      <h5>$ {{ product.price }}</h5>
    </div>
  </div>
</template>
<script>
import addProductToShoppingCart from "@/services/common-functions";
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
  computed: {},
  methods: {
    addProductToShoppingCart,
  },
};
</script>
<style>
.product__item {
  margin-bottom: 50px;
}

.product__item:hover .product__item__pic .product__item__pic__hover {
  bottom: 20px;
}

.product__item__pic {
  height: 270px;
  position: relative;
  overflow: hidden;
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
  margin-bottom: unset;
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

.product__item__text {
  text-align: center;
  padding-top: 15px;
}

.product__item__text h6 {
  margin-bottom: 10px;
}

.product__item__text h6 a {
  color: #252525;
  text-decoration: none;
}

.product__item__text h6 a:hover {
  color: #252525;
  text-decoration: none;
}

.product__item__text h5 {
  color: #252525;
  font-weight: 700;
}
</style>
