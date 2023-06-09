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
        <div
          v-for="(item, index) in blogs"
          :key="index"
          class="col-lg-4 col-md-4 col-sm-6"
        >
          <BlogCard :blog="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import BlogCard from "./BlogCard.vue";
import blogApi from "@/api/blogApi";
export default {
  components: {
    BlogCard,
  },
  data() {
    return {
      blogs: [],
    };
  },
  async created() {
    await this.getBlogs();
  },
  methods: {
    async getBlogs() {
      try {
        this.blogs = await blogApi.getBlogs(this.$axios);
        if (this.blogs.length > 3) {
          this.blogs = this.blogs.slice(0, 3);
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.from-blog {
  padding-top: 50px;
  padding-bottom: 50px;
}

.from-blog .blog__item {
  margin-bottom: 30px;
}

.from-blog__title {
  margin-bottom: 70px;
}
/*h3 {
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
}*/
</style>
