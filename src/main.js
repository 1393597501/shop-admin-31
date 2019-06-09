import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入组件
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'

// 注册插件 注册路由
Vue.use(ElementUI);
Vue.use(VueRouter);

//配置路由
const routes = [
  {path:'/login',component:Login},
  {path:'/',component:Admin}
];

//路由实例
var router = new VueRouter({
  routes
})

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')//绑定控制区域
