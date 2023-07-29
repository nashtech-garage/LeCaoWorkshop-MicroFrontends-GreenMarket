<template>
    <div class="blog__item">
        <div class="blog__item__pic">
            <img :src="imgHostUrl + blog.images_url" alt="">
        </div>
        <div class="blog__item__text">
            <ul>
                <li><i class="fa fa-calendar-o"></i> {{ blog.created_date }}</li>
                <li><i class="fa fa-comment-o"></i> {{ blog.comments_count }}</li>
            </ul>
            <h5><a href="#">{{ blog.tittle }}</a></h5>
            <p>{{ blog.description_short }}</p>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'MainPageBlog',
    props: {
        blog: {
            required: true,
            type: Object
        }
    },
    computed: {
        imgHostUrl() {
            return process.env.VUE_APP_COMMON_URL;
        }
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
  