import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Make sure this path is correct

const app = createApp(App);
app.use(router);
app.mount('#app');

