<template>
  <div class="container">
    <div class="content-main">
      <p><b>User 1</b> username = evelyng <br/> password = evelyngpass</p>
      <p><b>User 2</b> username = jacksone <br/> password = jacksonepass</p>
      <p><b>User 3</b> username = emilys <br/> password = emilyspass</p>
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
// import axios from 'axios';

export default {
  name: 'LoginComponent',
  setup() {
    const errorMsg = ref('');
    const username = ref('jamesd');
    const password = ref('jamesdpass');
    const isLoading = ref(false);
    const router = useRouter();
    const store = useStore();

    const handleLogin = async () => {
      isLoading.value = true;
      errorMsg.value = '';

      if (!username.value || !password.value) {
        errorMsg.value = 'Both username and password are required';
        isLoading.value = false;
        return;
      }

      try {
        // Dispatch login action
        const result = await store.dispatch('login', { username: username.value, password: password.value });

        if (result.success) {
          router.push({ name: 'Profile' });
        } else {
          errorMsg.value = result.message || 'Invalid username or password';
        }
      } catch (error) {
        errorMsg.value = 'An error occurred during login. Please try again laterhh bhbh .';
        console.error('Login failed:', error);
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
/* Add your styles here */
.alert {
  color: red;
}
</style>
