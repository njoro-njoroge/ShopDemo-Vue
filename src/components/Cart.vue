<template>
    <div class="cart">
      <h1>Shopping Cart</h1>
      <div v-if="isLoading" class="spinner"></div>
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else>
        <div v-if="data.length === 0" class="empty-cart">
          Your cart is empty.
        </div>

        <div v-else>
          <div v-for="product in data" :key="product.id" class="cart-item card">
            <img :src="product.thumbnail" alt="Product Thumbnail" class="thumbnail" />
            <div class="details">
              <h2>{{ product.title }}</h2>
              <p class="price">Price: ${{ formatPrice(product.price) }}</p>
              <p class="quantity">Quantity: {{ product.quantity }}</p>
              <p class="total">Total: ${{ formatPrice(product.total) }}</p>
              <p class="discount">Discount: {{ product.discountPercentage }}%</p>
              <p class="discounted-total">Discounted Total: ${{ formatPrice(product.discountedTotal) }}</p>
            </div>
          </div>
          <div class="cart-summary card">
            <h2>Cart Summary</h2>
            <p>Total Products: {{ totalProducts }}</p>
            <p>Total Quantity: {{ totalQuantity }}</p>
            <p class="price">Total: ${{ formatPrice(total) }}</p>
            <p>Discounted Total: ${{ formatPrice(discountedTotal) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, watch, computed } from 'vue';
  import axios from 'axios';
  import { useStore } from 'vuex';
  
  export default {
    name: 'Cart',
    
    setup() {
      const data = ref([]);
      const isLoading = ref(true);
      const total = ref(0);
      const discountedTotal = ref(0);
      const totalProducts = ref(0);
      const totalQuantity = ref(0);
  
      const store = useStore();
    
      const userId = computed(() => store.getters.userId); 
      console.log("User id ",userId.value);
    /*
      if userId is null or user not logged in assign a 
      default value to fetched cart items from the endPoint
      this is for development. remove during production to fetche the actual userId
       */
       const actualUserId = computed(() => userId.value == null ? 11 : userId.value);
  
      const fetchData = async () => {
        isLoading.value = true;
        try {
          const response = await axios.get(`https://dummyjson.com/carts/${actualUserId.value}`);
          const cart = response.data;
          data.value = cart.products;
          total.value = cart.total;
          discountedTotal.value = cart.discountedTotal;
          totalProducts.value = cart.totalProducts;
          totalQuantity.value = cart.totalQuantity;
          store.commit('setCartCount',cart.totalQuantity);
        } catch (error) {
          console.error("Error", error);
        } finally {
          isLoading.value = false;
        }
      };
  
      const formatPrice = (value) => {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };
  
      onMounted(() => {
        fetchData();
      });
  
      // Watch for changes in userId and fetch data when it changes
      watch(
        () => actualUserId.value, // Watch the value of userId
        () => {
          fetchData();
        }
      );
  
      return {
        data,
        isLoading,
        total,
        discountedTotal,
        totalProducts,
        totalQuantity,
        formatPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  .loading {
    font-size: 1.5em;
    color: #666;
  }
  
  .empty-cart {
    font-size: 1.5em;
    color: #666;
    text-align: center;
    margin-top: 20px;
  }
  
  .cart-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    max-width: 800px;
    min-width: 500px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  .thumbnail {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }
  
  .details {
    flex: 1;
  }
  
  .details h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .details p {
    margin: 5px 0;
  }
  
  .cart-summary {
    width: 100%;
    max-width: 800px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  .cart-summary h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
  
  .cart-summary p {
    margin: 5px 0;
  }
  
  @media (max-width: 768px) {
    .cart-item {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .thumbnail {
      width: 100%;
      height: auto;
      margin-bottom: 10px;
    }
    
    .details {
      text-align: center;
    }
  }
  </style>
  