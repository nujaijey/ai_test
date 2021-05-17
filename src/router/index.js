import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Jenkins from '../components/Jenkins.vue'
import Task from '../components/Task.vue'
import Report from '../components/Report.vue'
import Testcase from '../components/Testcase.vue'




Vue.use(VueRouter)
// 避免同页进行跳转出现报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  
  {
    // '/'表示首页 将登陆页面作为首页
    path:'/',
    name: 'login',
    component: Login
  },{
    path:'/register',
    name:'register',
    component:Register
  },{
    path:'/jenkins',
    name:'jenkins',
    component:Jenkins
  },{
    path:'/task',
    name:'task',
    component:Task
  },{
    path:'/report',
    name:'report',
    component:Report
  },{
    path:'/testcase',
    name:'testcase',
    component:Testcase
  },
]

const router = new VueRouter({
  routes
})

export default router
