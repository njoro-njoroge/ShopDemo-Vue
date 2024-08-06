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
import axios from 'axios';

export default {
  name: 'Category',
  props: ['categoryName'],
  data() {
    return {
      data: [],
      isLoading: false,
      totalProducts: 0,
      currentPage: 1,
      itemsPerPage: 20,
      loadingImages: {},
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalProducts / this.itemsPerPage);
    },
    pageNumbers() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    totalItemsShown() {
      const skip = (this.currentPage - 1) * this.itemsPerPage;
      return Math.min(skip + this.data.length, this.totalProducts);
    }
  },
  watch: {
    categoryName: {
      handler(newVal, oldVal) {
        this.fetchData();
      },
      immediate: true
    }
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      const skip = (this.currentPage - 1) * this.itemsPerPage;
      try {
        const response = await axios.get(`https://dummyjson.com/products/category/${this.categoryName}?limit=${this.itemsPerPage}&skip=${skip}`);        this.data = response.data.products;
        this.totalProducts = response.data.total;

        // Initialize loading state for images
        this.data.forEach((product) => {
          this.$set(this.loadingImages, product.id, true);
        });
      } catch (error) {
        console.log('ERROR FETCHING DATA', error);
      } finally {
        this.isLoading = false;
      }
    },
    imageLoaded(id) {
      this.$set(this.loadingImages, id, false);
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
        this.fetchData();
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style >
.category-title::first-letter{
  text-transform: uppercase;
}

</style>
