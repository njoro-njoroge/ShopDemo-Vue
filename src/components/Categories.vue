<template>
    <div>
      <div class="spinner-container" v-if="isLoading">
        <div class="spinner"></div>
      </div>
      <div v-if="!isLoading">
        <div v-if="data.length > 0" class="category-grid">
          <router-link class="category-card"
           v-for="category in data" :key="category"
           :to="{ name:'ProductCategory', params: { categoryName:category }}">
            <p class="category-title">{{ category }}</p>
          </router-link>
        </div>
        <div v-else class="no-data">
          <p>No categories found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
      const data = ref([]);
      const errorMsg = ref('');
      const isLoading = ref(true);
  
      const fetchData = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/products/category-list');
          data.value = response.data;
        } catch (error) {
          errorMsg.value = 'Failed to load categories';
        } finally {
          isLoading.value = false;
        }
      };
  
      onMounted(() => {
        fetchData();
      });
  
      return {
        data,
        errorMsg,
        isLoading,
      };
    },
  };
  </script>
  
  <style scoped>
 
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .category-card {
    background-color: #f8f9fa;
    border: 1px solid #473537;
    border-radius: 50px;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  
  .category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(244, 3, 3, 0.5);
  }
  
  .category-title {
    font-size: 18px;
    font-weight: bold;
    color: #343a40;
    margin: 0;
  }
  
  .category-title::first-letter {
    text-transform: uppercase;
  }
  
  /* No Data Message */
  .no-data {
    text-align: center;
    padding: 20px;
    color: #6c757d;
  }
  
  .no-data p {
    margin: 0;
    font-size: 16px;
  }
  </style>
  