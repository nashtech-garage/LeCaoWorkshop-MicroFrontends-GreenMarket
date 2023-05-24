<template>
    <div class="product__discount">
		<div class="section-title product__discount__title">
			<h2>Sale Off</h2>
		</div>
		<div class="row">
			<Carousel :itemsToShow="3" :autoplay="2000" :wrap-around="true">
				<Slide v-for="(product, index) in products" :key="index">
					<div class="col-lg-4">
						<div class="product__discount__item">
							<div class="product__discount__item__pic set-bg"
								:style="{'background-image': 'url(' + imgHostUrl + product.main_image_url}">
								<div class="product__discount__percent">-{{ product.discount }}%</div>
								<ul class="product__item__pic__hover">
									<li><a href="#"><i class="fa fa-heart"></i></a></li>
									<li><a href="#"><i class="fa fa-retweet"></i></a></li>
									<li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
								</ul>
							</div>
							<div class="product__discount__item__text">
								<span>{{product.name}}</span>
								<h5><a href="#">Raisin’n’nuts</a></h5>
								<div class="product__item__price">{{ product.price * (1 - product.discount / 100.0) }} <span>{{ product.price }}</span></div>
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
import productsApi from '@/api/productApi';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
export default ({
    props: {
    },
	components: {
		Carousel,
		Slide,
		Pagination,
	},
	data(){
      return {
        products: []
      }
    },
	async created(){
      await this.getSaleOffProducts();
    },
    methods:{
      async getSaleOffProducts(){
        try{
            this.products = await productsApi.getSaleOffProducts(this.$axios);
        }catch(err){
          console.log(err);
        }
      },
    },
    computed: {
        imgHostUrl() {
            return process.env.VUE_APP_COMMON_URL;
        }
    }
})
</script>
<style>
</style>