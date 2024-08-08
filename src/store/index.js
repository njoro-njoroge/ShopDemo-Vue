import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    loggedIn: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
    logout(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
  actions: {
    logout({ commit }) {
      // Perform logout logic (e.g., clearing tokens)
      commit('logout');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');

    },
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    user: state => state.user,
  },
});

export default store;
