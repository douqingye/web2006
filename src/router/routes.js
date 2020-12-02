import Layout from '../views/Layout.vue'
import product from '../views/product'

const routes = [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
            path:'/',
            name:'product',
            component:product,
            meta:{
              isLogin:true
            }
          },
        {
          path:'/content',
          name:'content',
          component:()=>import('../views/content'),
          meta:{
            isLogin:true
          }
        },
        {
          path:'/params',
          name:'params',
          component:()=>import('../views/params'),
          meta:{
            isLogin:true
          }
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/ucenter',
      name:'Ucenter',
      component:()=>import('../views/Ucenter.vue'),
      meta:{
        isLogin:true
      }
    }
  ]
  export default routes