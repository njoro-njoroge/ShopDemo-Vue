<template>
  <Navbar :scrolled="isScrolled" :isLoggedIn="isLoggedIn" @logout="handleLogout" />
  <main class="main-content">
    <CategoryList v-if="routesWithCategoryList.includes(route.name)" />
    <CartButton />
    <router-view></router-view>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import CategoryList from './components/CategoryList.vue';
import CartButton from './components/CartButton.vue';

const store = useStore();
const isScrolled = ref(false);
const route = useRoute();

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const routesWithCategoryList = ['Products', 'ProductCategory'];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleLogout = () => {
  store.commit('logout');
  localStorage.removeItem('user'); // Remove user from localStorage
  localStorage.removeItem('accessToken'); // Remove access token from localStorage
  store.commit('setLoggedIn', false); // Update the store
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

  const user = localStorage.getItem('user');
  if (user) {
    store.commit('setUser', JSON.parse(user));
    store.commit('setLoggedIn', true);
    // store.commit('setUserId',user.id);
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.main-content {
  padding-top: 60px;
}
router-link {
  text-decoration: none;
}
</style>
