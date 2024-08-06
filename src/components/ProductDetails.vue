<template>
    <div class="product-page">
      <nav class="breadcrumb">
        <router-link to="/">Home</router-link> >
        <router-link v-if="product.category" :to="{ name: 'Category', params: { categoryName:  product.category } }">
            {{product.category }}
        </router-link> >
        {{ product.title }}
      </nav>
      <div class="product-main card">
        <div class="product-images card">
          <img :src="product.thumbnail" alt="Product Thumbnail" class="thumbnail" />
          <div class="images ">
            <img v-for="(image, index) in product.images" :key="index" :src="image" alt="Product Image" class="image card" />
          </div>
        </div>
        <div class="product-details">
          <h1>{{ product.title }}</h1>
          <p class="category">{{ product.category }}</p>
          <p class="price">Price: ${{ product.price }}</p>
          <p class="discount">Discount: {{ product.discountPercentage }}%</p>
          <p class="rating">Rating: {{ product.rating }} / 5</p>
          <p class="stock">Stock: {{ product.stock }}</p>
          <p class="availability">Availability: {{ product.availabilityStatus }}</p>
          <p class="tags">Tags: <span v-for="(tag, index) in product.tags" :key="index">{{ tag }}</span></p>
          <p v-if="product.brand" class="brand">Brand: {{ product.brand }}</p>
          <p class="sku">SKU: {{ product.sku }}</p>
          <p  v-if="product.dimensions" class="dimensions">Dimensions: {{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm</p>
          <p class="weight">Weight: {{ product.weight }} kg</p>
          <p class="warranty">Warranty: {{ product.warrantyInformation }}</p>
          <p class="shipping">Shipping: {{ product.shippingInformation }}</p>
          <p class="return-policy">Return Policy: {{ product.returnPolicy }}</p>
          <p class="min-order">Minimum Order Quantity: {{ product.minimumOrderQuantity }}</p>
         
          <div class="meta" v-if="product.meta">
            <p>Created At: {{ formatDate(product.meta.createdAt) }}</p>
            <p>Updated At: {{ formatDate(product.meta.updatedAt) }}</p> 
            <img :src="product.meta.qrCode" alt="QR Code" class="qr-code" /> 
          </div>
        </div>
      </div>
      <div class="product-description card ">
        <h2>Description</h2>
        <p>{{ product.description }}</p>
      </div>
      <div class="product-reviews card">
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
  import axios from 'axios';
  
  export default {
    name: 'ProductDetails',
    props: ['productId'],
    data() {
      return {
        product: {},
        isLoading: true,
      };
    },
    methods: {
      async fetchProductDetails() {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${this.productId}`);
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product details:', error);
        } finally {
          this.isLoading = false;
        }
      },
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
    },
    mounted() {
      this.fetchProductDetails();
    },
  };
  </script>
  
  <style scoped>
  .product-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .breadcrumb {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #666;
  }
  
  .breadcrumb a {
    color: #0066c0;
    text-decoration: none;
  }
  
  .breadcrumb a:hover {
    text-decoration: underline;
  }
  
  .product-main {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px;
  }
  
  .product-images {
    flex: 1;
    margin-right: 20px;
  }
  
  .card {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
    overflow: hidden;
  }
  
  .thumbnail {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  
  .images {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  
  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin: 5px;
    border-radius: 10px;
    transition: transform 0.3s;
  }
  
  .image:hover {
    transform: scale(1.1);
  }
  
  .product-details {
    flex: 2;
    text-align: left;
  }
  
  .product-details h1 {
    font-size: 2em;
    margin-bottom: 10px;
  }
  
  .product-details p {
    margin: 5px 0;
  }
  .price{
    font-size: 26px;
  }
  
  .product-description {
    width: 100%;
    max-width: 1200px;
    margin-bottom: 20px;
  }
  
  .product-description h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .product-reviews {
    width: 100%;
    max-width: 1200px;
  }
  
  .product-reviews h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .review {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .review p {
    margin: 5px 0;
  }
  
  .meta {
    margin-top: 20px;
    border-top: 1px solid #ccc;
    padding: 10px 0;
  }
  
  .meta .qr-code {
    width: 100px;
    height: 100px;
  }
  
  @media (max-width: 768px) {
    .product-main {
      flex-direction: column;
      align-items: center;
    }
    
    .product-images {
      width: 100%;
      margin-right: 0;
    }
    
    .product-details {
      width: 100%;
      margin-top: 20px;
      text-align: center;
    }
    
    .product-details p {
      text-align: center;
    }
  }
  </style>
  