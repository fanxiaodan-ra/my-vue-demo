import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '../layout/index.vue'
import store from '@/store'
Vue.use(VueRouter)

// 路由配置规则
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/role/index.vue')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/AllocMenu.vue'),
        props: true
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-resource' */ '@/views/role/AllocResource.vue'),
        props: true
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue') // 路由懒加载，没有懒加载，打包时会把所有路由打包到一个chunk中，懒加载则会把组件单独分成一个模块，只有访问才回加载资源
      },
      {
        path: '/advert/create',
        name: 'advert-create',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/create.vue') // 路由懒加载，没有懒加载，打包时会把所有路由打包到一个chunk中，懒加载则会把组件单独分成一个模块，只有访问才回加载资源
      },
      {
        path: '/advert/:id/edit',
        name: 'advert-edit',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/edit.vue'), // 路由懒加载，没有懒加载，打包时会把所有路由打包到一个chunk中，懒加载则会把组件单独分成一个模块，只有访问才回加载资源
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'advert' */'@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */'@/views/menu/Create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */'@/views/menu/Edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/category.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/create.vue')
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/edit.vue'),
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/section.vue'),
        props: true
      },
      {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/video.vue'),
        props: true
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'course' */'@/views/ad-space/index.vue')
      },
      {
        path: '/advert-space/create',
        name: 'advert-space-create',
        component: () => import(/* webpackChunkName: 'course' */'@/views/ad-space/create.vue')
      },
      {
        path: '/advert-space/:id/edit',
        name: 'advert-space-edit',
        component: () => import(/* webpackChunkName: 'course' */'@/views/ad-space/edit.vue'),
        props: true
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫：任何页面的访问都要经过这里
// to: 要去哪里的路由
// from: 从哪里来的路由信息
// next: 通行的标志
router.beforeEach((to, from, next) => {
  // if (to.path !== '/login') {}  不够灵活
  // to.matched 是一个数组（匹配到的路由记录）
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.user) {
      next({
        name: 'login',
        query: { // 通过url传递查询字符串参数
          redirect: to.fullPath // 把登录成功需要返回的页面告诉登录页面
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
