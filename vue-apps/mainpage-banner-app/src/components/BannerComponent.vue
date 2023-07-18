<template>
    <div class="banner">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img :src="imgHostUrl('img/banner/banner-1.jpg')" alt="banner1" />
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="banner__pic">
                <img :src="imgHostUrl('img/banner/banner-2.jpg')" alt="banner2" />
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
  
  <script>
  export default {
    name: 'BannerComponent',
    data() {
    },
  computed: {
    imgHostUrl(path) {
      return process.env.VUE_APP_COMMON_URL + path;
    },
  },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>
  