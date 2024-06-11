import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

// Define your routes here
const routes = [
  { path: '/', component: App },
  { path: '/login', component: login } // Replace with your component
  // Add more routes for other components
];

const router = createRouter({
  history: createWebHistory(), // Use HTML5 History API for cleaner URLs
  routes,
});

createApp(App)
  .use(router) // Make router globally available
  .mount('#app')
