// import './assets/main.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue' // 引入所有图标，并命名为 Icons
import 'element-plus/dist/index.css'
import Breadcrumb from "./components/breadcrumb/Breadcrumb.vue";

const app = createApp(App)

// 通过遍历的方式注册所有 svg组件，会牺牲一点点性能
for (let i in Icons) {
    app.component(i, Icons[i])
}
app.use(ElementPlus)
app.use(router)
app.component("Breadcrumb", Breadcrumb)
app.mount('#app')
