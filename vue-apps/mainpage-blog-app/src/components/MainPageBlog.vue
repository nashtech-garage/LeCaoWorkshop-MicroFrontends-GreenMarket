/* eslint-disable */
<template>
  <section class="from-blog spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="section-title from-blog__title">
						<h2>From The Blog</h2>
					</div>
				</div>
			</div>
			<div class="row"> 
				<!-- <Carousel :itemsToShow="3" :autoplay="2000" :wrap-around="true">
					<Slide v-for="(item, index) in blogs" :key="index" class="col-lg-4 col-md-4 col-sm-6">
						<BlogCard :blog="item" />
					</Slide>
					<template #addons>
						<Pagination />
					</template>
				</Carousel> -->
				<div v-for="(item, index) in blogs" :key="index" class="col-lg-4 col-md-4 col-sm-6">
					<BlogCard :blog="item" />
				</div>
			</div>
		</div>
	</section>
</template>

<script>
/* eslint-disable */
import BlogCard from './BlogCard.vue';
import blogApi from '@/api/blogApi';
import { Carousel, Slide, Pagination } from 'vue3-carousel'
export default {
	components: { 
		BlogCard, 
		Slide,
		Carousel,
		Pagination,
	},
	data(){
	  return {
		blogs: [],
	  }
	},
	async created(){
	  await this.getBlogs();
	},
	methods:{
	  async getBlogs(){
		try{
			this.blogs = await blogApi.getBlogs(this.$axios);
		}catch(err){
		  console.log(err);
		}
	  },
	},
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
