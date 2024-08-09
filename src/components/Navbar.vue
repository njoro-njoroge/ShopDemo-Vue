<template>
    <nav :class="['navbar', { scrolled: scrolled }]">
      <div class="navbar-brand">
        <router-link to="/"><a class="nav-item" href="#">ShopDemo</a></router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/"><a class="nav-item" >Home</a></router-link>
          <a class="nav-item" href="/About">About</a>
          <a class="nav-item" href="/Categories">All category</a>
    
          <a class="nav-item" href="/profile"v-if="isLoggedIn" >Profile</a>
          <a class="nav-item" href=""  @click.prevent="logout" v-if="isLoggedIn">Logout</a>
          <a class="nav-item" href="/login" v-else="isLoggedIn">Login</a>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import {useStore} from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const props = defineProps({
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    scrolled: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['logout']);
  
  const logout = () => {
    store.dispatch('logout').then(() => {
      router.push('/');
    });
  };
  </script>
  
  <style scoped>
  
  </style>
  