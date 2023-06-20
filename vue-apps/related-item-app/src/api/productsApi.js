export default {
    getProducts: function(axios) {
      let url = "/data/data.json";
<<<<<<< HEAD
      return axios.get(url);
=======
      return axios.$get(url);
>>>>>>> features/breadcrumb-app
    },
}