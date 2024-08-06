<template>
  <div>
    <div class="category-list">
      <div class="spinner-container" v-if="isLoading">
        <div class="spinner"></div>
      </div>
     
      <router-link
        v-for="(category, index) in data"
        :key="category.slug"
        :to="{ name: 'Category', params: { categoryName: category.slug } }"
        class="category-name"
      >
        {{ category.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  methods: {
    async fetched() {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        this.data =response.data;
        console.log('Fetched categories:', this.data); // Add this line for debugging
      } catch (error) {
        console.log('ERROR', error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetched();
  },

};
</script>

<style scoped>


.category-list {
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  gap: 10px;
  margin: 20px;
  padding: 10px;
  background-color: whitesmoke;
  border-radius: 10px;
  position: relative;
}

.category-name {
  flex: 0 0 auto;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;
}

.category-name:hover {
  background-color: #b95e29;
}

.spinner-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.spinner {
  border: 3px solid #b30606;
  border-top: 3px solid #020405;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
