<template>
  <div class="content-main">
    <div class="spinner-container" v-if="isLoading">
      <div class="spinner"></div>
    </div>
    
    <div class="shownItem">
      
      <h1 class="category-title"> {{ categoryName}}: {{ totalProducts }}</h1>
      <p>Showing {{ totalItemsShown }} / {{ totalProducts }}</p>
    </div>
    <div class="product-list">
     <router-link v-for="x in data" 
     :key="x.id"
     :to="{ name: 'ProductDetails', params: { productId: x.id } }"
     >
      <div class="product-item">
        <div class="imgContainer">
          <div v-if="loadingImages[x.id]" class="ImgSpinner"></div>
          <img 
            v-show="!loadingImages[x.id]"
            :src="x.thumbnail"
            alt="Product image"
            @load="imageLoaded(x.id)"
            @error="imageLoaded(x.id)"
          />
        </div>
        <h4>{{ x.title }}</h4>
        <p class="price">Price: {{ x.price }}</p>
        <p><small>{{ x.stock }} items in stock</small></p>
        <p class="rating">Rating: {{ x.rating }}</p>
      </div>
     </router-link>
    </div>
  
    
    <div class="shownItem">
      <p>Showing {{ totalItemsShown }} / {{ totalProducts }}</p>
    </div>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span v-for="page in pageNumbers" :key="page">
        <button @click="changePage(page)" :class="{ active: page === currentPage }">{{ page }}</button>
      </span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>


<script>
import {ref,computed,onMounted,watch} from 'vue';
import axios from 'axios';

export default {
  name: 'Category',
  props: ['categoryName'],

  setup(props) {
  const data = ref([]);
  const isLoading = ref(false);
  const totalProducts = ref(0);
  const currentPage= ref(1);
  const itemsPerPage=ref(20);
  const loadingImages = ref({});

  const totalPages = computed(()=>{
    return Math.ceil(totalProducts.value / itemsPerPage.value);
  });

  const pageNumbers = computed(() => {
      return Array.from({ length: totalPages.value }, (_, index) => index + 1);
    });

    const totalItemsShown = computed(() => {
      const skip = (currentPage.value - 1) * itemsPerPage.value;
      return Math.min(skip + data.value.length, totalProducts.value);
    });

    const fetchData = async()=>{
      isLoading.value=true;
      const skip = (currentPage.value -1) * itemsPerPage.value;
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${props.categoryName}?limit=${itemsPerPage.value}&skip=${skip}`);
        data.value=response.data.products;
        totalProducts.value = response.data.total;

        // Initialize loading state for images
        data.value.forEach((product) => {
          loadingImages.value[product.id] = true;
        });

      } catch (error) {
        console.log("Error", error);
      }finally{
        isLoading.value=false;
      }
    };

    const imageLoaded = (id) =>{
      loadingImages.value[id]=false;
    };

    const changePage = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages.value) {
        currentPage.value = pageNumber;
        fetchData();
        scrollToTop();
      }
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    onMounted(() =>{
      fetchData();
    });

     // Watch for changes to categoryName and fetch data again
     watch(() => props.categoryName, () => {
      currentPage.value = 1;  // Reset to the first page
      fetchData();
    });
    

    return {
      data,
      isLoading,
      currentPage,
      itemsPerPage,
      loadingImages,
      totalPages,
      pageNumbers,
      totalItemsShown,
      totalProducts,
      fetchData,
      imageLoaded,
      changePage,
      scrollToTop,
      formatPrice

    };
}
}
</script>

<style >
.category-title::first-letter{
  text-transform: uppercase;
}

</style>
