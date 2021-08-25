import { createRouter, createWebHistory } from "vue-router";
//引入在axios暴露出的clearPending函数
import { clearPending } from "../js/api/http";
const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home.vue")
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/login/index.vue")
	},
	{
		path: "/about",
		name: "About",
		component: () => import("@/views/About.vue")
	},
	{
		path: "/exercise",
		name: "Exercise",
		component: () =>
			import(
				/* webpackChunkName: "exercise"*/ "../views/exercise/index.vue"
			)
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	//在跳转路由之前，先清除所有的请求
	clearPending();
	next();
});

export default router;
