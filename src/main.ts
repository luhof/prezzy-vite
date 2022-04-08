import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()
import './index.css'
import store from './store'

createApp(App)
  .use(store)
  .use(vuetify)
  .mount('#app')
