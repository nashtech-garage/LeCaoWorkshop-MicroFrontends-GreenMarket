import { createRouter, createWebHistory } from "vue-router";
import MainPageBlog from '@/components/MainPageBlog.vue'
const routes = [
    { path: '/blog-detail', component: MainPageBlog },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;