import { createRouter, createWebHistory } from "vue-router";
import DetailPageBlog from '@/components/DetailPageBlog.vue'
const routes = [
    { path: '/blog-detail', component: DetailPageBlog },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;