import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/elegant-icons.css";
import "../assets/css/nice-select.css";
import "../assets/css/jquery-ui.min.css";
import "../assets/css/owl.carousel.min.css";
import "../assets/css/slicknav.min.css";
import "../assets/css/style.css";

import "../assets/js/jquery-3.3.1.min.js";
import "../assets/js/bootstrap.min.js";
import "../assets/js/jquery.nice-select.min.js";
import "../assets/js/jquery-ui.min.js";
import "../assets/js/jquery.slicknav.js";
// import "../assets/js/mixitup.min.js";
import "../assets/js/owl.carousel.min.js";
import "../assets/js/main.js";

import "../assets/img/language.png";
import "../assets/img/logo.png";
import "../assets/img/payment-item.png";
import "../assets/img/hero/banner.jpg";

import "../assets/img/categories/cat-1.jpg";
import "../assets/img/categories/cat-2.jpg";
import "../assets/img/categories/cat-3.jpg";
import "../assets/img/categories/cat-4.jpg";
import "../assets/img/categories/cat-5.jpg";

import "../assets/img/featured/feature-1.jpg";
import "../assets/img/featured/feature-2.jpg";
import "../assets/img/featured/feature-3.jpg";
import "../assets/img/featured/feature-4.jpg";
import "../assets/img/featured/feature-5.jpg";
import "../assets/img/featured/feature-6.jpg";
import "../assets/img/featured/feature-7.jpg";
import "../assets/img/featured/feature-8.jpg";

import "../assets/img/banner/banner-1.jpg";
import "../assets/img/banner/banner-2.jpg";

import "../assets/img/latest-product/lp-1.jpg";
import "../assets/img/latest-product/lp-2.jpg";
import "../assets/img/latest-product/lp-3.jpg";

import "../assets/img/blog/blog-1.jpg";
import "../assets/img/blog/blog-2.jpg";
import "../assets/img/blog/blog-3.jpg";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
