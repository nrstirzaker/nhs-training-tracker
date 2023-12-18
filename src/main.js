import {createApp} from 'vue'
import App from './App.vue'


import {createPinia} from 'pinia';
import './views/form-validators.ts'
import './style.css'
import './index.css'

import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
})


import '@fortawesome/fontawesome-free/js/all'


const app = createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .mount('#app')
await app.init();

