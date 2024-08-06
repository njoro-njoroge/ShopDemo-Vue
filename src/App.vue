<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import CategoryList from './components/CategoryList.vue';

const isScrolled = ref(false);

const handleScroll = () => {
  if (window.scrollY > 50) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <Navbar :scrolled="isScrolled" />
  <main class="main-content">
    <CategoryList/>
    <router-view></router-view>
  </main>
</template>

<style scoped>
.main-content {
  padding-top: 60px;
}
router-link {
  text-decoration: none;
}
</style>
