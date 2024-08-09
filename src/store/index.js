
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    userId: null,
    cartCount: parseInt(localStorage.getItem('cartCount')) || 0,
    loggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setCartCount(state, cartCount) {
      state.cartCount = cartCount;
      localStorage.setItem('cartCount', cartCount);
    },
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
      state.userId = null;
      state.cartCount = 0;
      localStorage.removeItem('cartCount');
    },
  },
  actions: {
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', credentials);
        
        if (response.status === 200) {
          const userDetails = response.data;
          localStorage.setItem('user', JSON.stringify(userDetails));
          localStorage.setItem('accessToken', userDetails.token);

          commit('setUser', userDetails);
          commit('setUserId', userDetails.id);
          commit('setLoggedIn', true);

          // Fetch cart count after login
          await dispatch('fetchCartCount', userDetails.id);

          return { success: true };
        } else {
          return { success: false, message: 'Invalid username or password' };
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Specific handling for invalid credentials
          return { success: false, message: 'Invalid credentials' };
        } else {
          // General error message for other cases
          return { success: false, message: 'An error occurred during login. Please try again later.' };
        }
      }
    },
    
    async fetchCartCount({ commit,  }, userId) {
      try {
        const response = await axios.get(`https://dummyjson.com/carts/${userId}`);
        const cartCount = response.data.totalQuantity;

        commit('setCartCount', cartCount);

      } catch (error) {
        console.error('Failed to fetch cart count:', error);
      }
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

    },
  },
  getters: {
    user: (state) => state.user,
    userId: (state) => state.userId,
    cartCount: (state) => state.cartCount,
    isLoggedIn: (state) => state.loggedIn,
  },
});

export default store;
