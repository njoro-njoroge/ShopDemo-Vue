<template>
    <div class="container">
      <div class="content-main">
        <h3>Login</h3>
        <div class="card">
            <div class="login-error alert" v-if="errorMsg"><small>{{ errorMsg }}</small></div>
          <form @submit.prevent="handleLogin" autocomplete="off">
            <label for="username">Username</label>
            <input class="input" type="text" id="username" v-model="username" />
            <label for="password">Password</label>
            <input class="input" type="password" id="password" v-model="password" />
            <button class="button" type="submit" :disabled="isLoading">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useStore} from 'vuex';
  
  export default {
    name: "LoginComponent",
    name: "LoginComponent",
  setup() {
    const errorMsg = ref('');
    const username = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const router = useRouter();
    const store = useStore();

    const handleLogin = async () => {
      isLoading.value = true;
      errorMsg.value = '';

      if (!username.value || !password.value) {
        errorMsg.value = "Both username and password are required";
        isLoading.value = false;
        return;
      }

      try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username: username.value,
          password: password.value
        });

        if (response.status === 200) {
          const userDetails = response.data;
          localStorage.setItem('user', JSON.stringify(userDetails));
          localStorage.setItem('accessToken', userDetails.token);
          
          store.commit('setUser', userDetails);  // Commit user data to Vuex store
          store.commit('setLoggedIn', true);    // Commit login status to Vuex store
          
          router.push({ name: 'Profile' });
        } else {
          errorMsg.value = 'Invalid username or password';
        }
      } catch (error) {
        errorMsg.value = error.response?.status === 400 ? 'Invalid username or password' : 'An error occurred during login. Please try again later.';
        console.error('Error', error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      password,
      isLoading,
      handleLogin,
      errorMsg,
    };
  }
};
  </script>
  
  

  
  
  <style scoped>

</style>

  