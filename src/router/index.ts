import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
//引入在axios暴露出的clearPending函数
import { clearPending } from '@/js/api/http';
const routes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/homeCenter',
		name: 'HomeCenter',
		redirect: '/homePage',
		component: () => import('@/views/Home.vue'),
		children: [
			{
				path: '/homePage',
				name: 'HomePage',
				meta: {
					title: '主页',
					needBackLeft: false
				},
				component: () =>
					import(
						/* webpackChunkName: "exercise"*/ '@/views/homePage/index.vue'
					)
			},
			{
				path: '/exercise',
				name: 'Exercise',
				meta: {
					title: '动起来',
					needBackLeft: false
				},
				component: () =>
					import(
						/* webpackChunkName: "exercise"*/ '@/views/exercise/index.vue'
					)
			},
			{
				path: '/feedMain',
				name: 'feedMain',
				meta: {
					title: 'RSS',
					needBackLeft: false
				},
				component: () =>
					import(
						/* webpackChunkName: "feed"*/ '@/views/feed/index.vue'
					)
			},
			{
				path: '/feedDetail',
				name: 'FeedDetail',
				component: () =>
					import(
						/* webpackChunkName: "detail" */ '@/views/feed/detail.vue'
					)
			},
			{
				path: '/feedItem',
				name: 'FeedItem',
				component: () =>
					import(
						/* webpackChunkName: "feed"*/ '@/views/feed/Feed.vue'
					)
			},
			{
				path: '/about',
				name: 'About',
				meta: {
					title: '关于',
					needBackLeft: false
				},
				component: () => import('@/views/about/index.vue')
			}
		]
	}
];
// todo 需要通过token去判断登录状态
const router = createRouter({
	history: createWebHistory('dist'),
	
	routes
});

router.beforeEach((to, from, next) => {
	//在跳转路由之前，先清除所有的请求

	clearPending();
	if (to.name !== 'Login' && !localStorage.getItem('token')) {
		next({ name: 'Login' });
	} else next();
});

export default router;
