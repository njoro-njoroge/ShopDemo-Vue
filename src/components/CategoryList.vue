<template>
  <div>
    <div class="category-list">
      <div class="spinner-container" v-if="isLoading">
        <div class="spinner"></div>
      </div>
     
      <router-link
        v-for="(category, index ) in data"
        :key="index"
        :to="{ name: 'ProductCategory', params: { categoryName: category.slug } }"
        class="category-name"
      >
        {{ category.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'CategoryList',
  setup() {
    const data = ref([]);
    const isLoading = ref(false);
     
    const fetchData = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(`https://dummyjson.com/products/categories`);
        data.value = response.data;
      } catch (error) {
        console.log("Error", error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      isLoading
    };
  },
};
</script>


<style scoped>

</style>
