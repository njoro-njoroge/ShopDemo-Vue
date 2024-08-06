import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/Products.vue';
import Category from '@/components/Category.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import Cart from '@/components/Cart.vue';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/category/:categoryName', // Added leading slash
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path:'/productDetails/:productId',
    name:'ProductDetails',
    component: ProductDetails,
    props:true
  },
  {
    path:'/cart/:userId',
    name:'Cart',
    component:Cart,
    props:true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
