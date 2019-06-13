import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入vuex的store
import store from "./store";

//导入组件
import Login from './pages/Login.vue'
import Admin from './pages/Admin.vue'
import GoodList from './pages/goods-list.vue'
import CategoryList from './pages/category-list.vue'
import GoodsAdd from './pages/goods-add.vue'
import GoodsEdit from './pages/goods-edit.vue'

// 注册插件 注册路由
Vue.use(ElementUI);
Vue.use(VueRouter);

//配置路由
const routes = [
  {path:'/login',component:Login,meta:"登录页面"},
  {path:'*',redirect:'/admin/goods-list',meta:"商品管理"},
  {path:'/admin',meta:"后台管理",component:Admin,children:[
    {path:'goods-list',component:GoodList,meta:"商品管理"},
    {path:'category-list',component:CategoryList,meta:"栏目管理"},
    {path:'goods-add',component:GoodsAdd,meta:"添加商品"},
    {path:'goods-edit/:id',component:GoodsEdit,meta:"编辑商品"}
  ]},
];

//路由实例
var router = new VueRouter({
  routes
})
  router.beforeEach((to,from,next)=>{
        axios({
          method:'GET',
          url:'http://localhost:8899/admin/account/islogin',
          withCredentials: true
    }).then(res=>{
      const {code} = res.data;
      if(to.path==="/login"){
            if(code=="logined"){
              next("/admin/goods-list");
            }else{
              next();
            }    
      }else{
          if(code==="logined"){
            next();
          }else{
            next("/login");
          }
      }
    })
  })
  

Vue.config.productionTip = false

Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')//绑定控制区域
