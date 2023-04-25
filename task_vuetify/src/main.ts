/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import router from "@/router/index"


// Add router to app

const pinia = createPinia()

const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.use(router)

app.mount('#app')
