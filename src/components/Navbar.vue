<template>
    <nav :class="['navbar', { scrolled: scrolled }]">
      <div class="navbar-brand">
        <router-link to="/"><a class="nav-item" href="#">Shop Demo</a></router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link to="Category/"><a class="nav-item" >Home</a></router-link>
          <a class="nav-item" href="#">About</a>
          <a class="nav-item" href="#">Category</a>
          <router-link to="/category/Beauty" class="nav-item" >Beauty</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    props: {
      scrolled: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  