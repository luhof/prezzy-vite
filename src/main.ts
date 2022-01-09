import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import VTooltipPlugin from 'v-tooltip'
import 'v-tooltip/dist/v-tooltip.css'

createApp(App)
    .use(VTooltipPlugin)
    .mount('#app')
