<template>
    <div>
      <CategoryList />
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import CategoryList from './CategoryList.vue'; // Adjust the path as necessary
  
  export default {
    components: {
      CategoryList
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles needed for your layout */
  </style>
  