import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import "@popperjs/core";
import "bootstrap";

import './style.css';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');