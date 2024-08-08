<template>
  <div class="spinner-container" v-if="isLoading">
    <div class="spinner"></div>
  </div>
  <div class="product-page" v-if="!isLoading">
    <nav class="breadcrumb">
      <router-link to="/">Home</router-link> >
      <router-link v-if="product.category" :to="{ name: 'ProductCategory', params: { categoryName:  product.category } }">
        {{ product.category }}
      </router-link> >
      {{ product.title }}
    </nav>
    <div class="product-main product-card">
      <div class="product-images product-card">
        <img :src="product.thumbnail" alt="Product Thumbnail" class="thumbnail" />
        <div class="images">
          <img 
            v-for="(image, index) in product.images" 
            :key="index" 
            :src="image" 
            alt="Product Image" 
            class="image product-card"
            @click="product.thumbnail = image" />
        </div>
      </div>
      <div class="product-details">
        <h1>{{ product.title }}</h1>
        <p class="category"><b>Category: </b>{{ product.category }}</p>
        <p class="price"><b>Price:</b> ${{ product.price }}</p>
        <p class="discount"><b>Discount:</b> {{ product.discountPercentage }}%</p>
        <p class="rating"><b>Rating:</b> {{ product.rating }} / 5</p>
        <p class="stock"><b>Stock:</b> {{ product.stock }}</p>
        <p class="availability"><b>Availability:</b> {{ product.availabilityStatus }}</p>
        <p class="tags"><b>Tags:</b> <span v-for="(tag, index) in product.tags" :key="index">{{ tag }}</span></p>
        <p v-if="product.brand" class="brand"><b>Brand:</b> {{ product.brand }}</p>
        <p class="sku"><b>SKU:</b> {{ product.sku }}</p>
        <p v-if="product.dimensions" class="dimensions"><b>Dimensions:</b> {{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm</p>
        <p class="weight"><b>Weight:</b> {{ product.weight }} kg</p>
        <p class="warranty"><b>Warranty:</b> {{ product.warrantyInformation }}</p>
        <p class="shipping"><b>Shipping:</b> {{ product.shippingInformation }}</p>
        <p class="return-policy"><b>Return Policy:</b> {{ product.returnPolicy }}</p>
        <p class="min-order"><b>Minimum Order Quantity:</b> {{ product.minimumOrderQuantity }}</p>
        <div class="meta" v-if="product.meta">
          <p>Created At: {{ formatDate(product.meta.createdAt) }}</p>
          <p>Updated At: {{ formatDate(product.meta.updatedAt) }}</p>
          <img :src="product.meta.qrCode" alt="QR Code" class="qr-code" />
        </div>
      </div>
    </div>
    <div class="product-description product-card">
      <h2>Description</h2>
      <p>{{ product.description }}</p>
    </div>
    <div class="product-reviews product-card">
      <h2>Reviews</h2>
      <div v-for="(review, index) in product.reviews" :key="index" class="review">
        <p class="reviewer"><b>{{ review.reviewerName }}</b></p>
        <p class="review-rating">Rating: {{ review.rating }} / 5</p>
        <p class="review-comment">Comment: {{ review.comment }}</p>
        <p class="review-date">Date: {{ formatDate(review.date) }}</p>
        <p class="reviewer-email">Email: {{ review.reviewerEmail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'ProductDetails',
  props: ['productId'],
  setup(props) {
    const product = ref({});
    const isLoading = ref(true);

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${props.productId}`);
        product.value = response.data;
      } catch (error) {
        console.log('Error', error);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      fetchData();
    });

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      product,
      isLoading,
      formatDate,
    };
  },
};
</script>

<style scoped>

</style>
