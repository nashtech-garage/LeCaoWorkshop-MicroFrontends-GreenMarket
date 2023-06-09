import { createRouter, createWebHistory } from "vue-router";
import ProductGrid from '@/components/ProductGrid.vue'
const routes = [
    { name: 'shops', path: '/shops?id=:id?&size=:size?&color=:color?&min=:min?&max=:max?', component: ProductGrid, props: true },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

export default router;