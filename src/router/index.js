import { createRouter, createWebHistory } from 'vue-router';
import Products from '@/components/Products.vue';
import ProductCategory from '@/components/ProductCategory.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import Profile from '@/components/Profile.vue';
import Categories from '@/components/Categories.vue';
import About from '@/components/About.vue';
import store from '@/store';

const routes = [
  {
    path: '/',
    name: 'Products',
    component: Products
  },
  {
    path: '/ProductCategory/:categoryName', // Added leading slash
    name: 'ProductCategory',
    component: ProductCategory,
    props: true
  },
  {
    path:'/productDetails/:productId',
    name:'ProductDetails',
    component: ProductDetails,
    props:true
  },
  {
    path:'/about',
    name:'About',
    component: About,
  },
  {
    path:'/cart/',
    name:'Cart',
    component:Cart,
  },
  {
    path:'/categories',
    name:'Categories',
    component:Categories,
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile,
    meta: { requiresAuth: true },  // Protect this route
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to check authentication before each route
router.beforeEach((to, _, next) => {
  const isLoggedIn = store.getters.isLoggedIn; 

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // If route requires auth and user is not logged in
    next({ name: 'Login' }); // Redirect to the login page
  } else {
    next(); // Proceed to the route
  }
});

export default router;
