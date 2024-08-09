<template>
    <router-link
     class="floating-cart-button"
     to="/cart">
      <img src="@/assets/cart.png" alt="Cart" class="cart-icon" />
      <span class="cart-count">{{ cartCount }}</span>
    </router-link>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'FloatingCartButton',
    setup() {
      const store = useStore();
      const cartCount = computed(() => store.getters.cartCount);
  
      console.log("Cart items:", cartCount.value);
  
      return {
        cartCount,
      };
    },
  };
  </script>
  
  <style scoped>
  .floating-cart-button {
    position: fixed;
    bottom: 2rem;
    right: 1rem;
    width: 60px;
    height: 60px;
    border: 1px solid #040101;
    background-color: whitesmoke; 
    color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .floating-cart-button:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(244, 3, 3, 0.5);
  }
  
  .cart-icon {
    width: 30px;
    height: 30px;
    z-index: -1;
  }
  
  .cart-count {
    background-color: #fff;
    color: #ff5722;
    border-radius: 50%;
    border: 1px solid #040101;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: bold;
    margin-top: -2rem;
    margin-left: -0.1rem;
  }
  </style>
  