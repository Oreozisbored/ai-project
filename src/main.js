import { createApp } from 'vue'
import App from './App.vue'
import Login from './Login.vue'
import { createRouter, createWebHistory } from 'vue-router';

// Define your routes here
const routes = [
  { path: '/', component: App },
  { path: '/login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app')
