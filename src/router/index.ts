import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
//引入在axios暴露出的clearPending函数
import { clearPending } from '@/js/api/http'
const routes: Array<RouteRecordRaw> = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/home/index.vue')
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('@/views/about/index.vue')
	},
	{
		path: '/exercise',
		name: 'Exercise',
		component: () =>
			import(
				/* webpackChunkName: "exercise"*/ '../views/exercise/index.vue'
			)
	},
	{
		path: '/feed',
		name: 'Feed',
		component: () =>
			import(/* webpackChunkName: "feed"*/ '../views/feed/index.vue'),
		children: [
			{
				path: '/detail',
				name: 'FeedDetail',
				component: () =>
					import(
						/* webpackChunkName: "detail" */ '../views/feed/detail.vue'
					)
			}
		]
	}
]
// todo 需要通过token去判断登录状态
const router = createRouter({
	history: createWebHistory('dist'),
	routes
})

router.beforeEach((to, from, next) => {
	//在跳转路由之前，先清除所有的请求
	clearPending()
	if (to.name !== 'Login' && !localStorage.getItem('token')) {
		next({ name: 'Login' })
	} else next()
})

export default router
