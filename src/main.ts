import { createApp } from 'vue'
// 状态管理器
import { createPinia } from 'pinia'
import App from './App.vue'
// vue router
import router from './router'
import './assets/main.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
