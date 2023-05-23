import { createRouter, createWebHistory } from "vue-router";
import ProductGrid from '@/components/ProductGrid.vue'
const routes = [
    { path: '/detail-page', component: ProductGrid },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;