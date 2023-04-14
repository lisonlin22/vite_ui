import { createApp } from 'vue'
// 状态管理器
import { createPinia } from 'pinia'
import App from './App.vue'
// vue router
import router from './router'
import './assets/main.css'

// 检查权限
import { HasRemove, HasDisable } from './perms/index' // 检查权限

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(HasRemove)
app.use(HasDisable)
app.mount('#app')
