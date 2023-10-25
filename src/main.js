import { createApp } from 'vue'
import {createPinia} from 'pinia';
import './views/FormValidators.js'
import './style.css'
import './index.css'
import App from './App.vue'
import router from './router'





import '@fortawesome/fontawesome-free/js/all'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

