import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

//need to get rid of this crappy typeless plugin
import FloatingVue from 'floating-vue'
import 'v-tooltip/dist/v-tooltip.css'

createApp(App)
    .use(FloatingVue)
    .mount('#app')
