<template>
	<van-nav-bar
		:left-arrow="showLeft"
		@click-left="onClickLeft"
		fixed
		:title="title"
	/>
	<router-view class="main-content" />
	<van-tabbar v-model="state.active" @change="onChange">
		<van-tabbar-item
			:name="item.name"
			:icon="item.icon"
			v-for="item in state.tabList"
			:key="item.name"
			>{{ item.title }}</van-tabbar-item
		>
	</van-tabbar>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, provide } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { Tabbar, TabbarItem, NavBar } from 'vant'
//import { mainStore } from '@/store/store.ts'
import { createStore } from '@/store/testStore'
const tabList = [
	{
		name: 'homePage',
		icon: 'wap-home',
		title: '主页'
	},
	{
		name: 'feedMain',
		icon: 'wap-nav',
		title: 'RSS'
	},
	{
		name: 'exercise',
		icon: 'friends',
		title: '动起来'
	},
	{
		name: 'about',
		icon: 'manager',
		title: '关于'
	}
]
export default defineComponent({
	name: 'Home',
	components: {
		vanTabbar: Tabbar,
		vanTabbarItem: TabbarItem,
		vanNavBar: NavBar
	},
	computed: {
		showNav() {
			return this.$route.path !== '/login'
		}
	},
	setup() {
		const router = useRouter()
		/*状态缓存 */
		const { stateStore, increment, editLeft } = createStore()
		provide('increment', increment)
		provide('editLeft', editLeft)
		const state = reactive({
			active: 'home',
			tabList
		})
		/**
		 * @description 返回按钮
		 */
		const onClickLeft = () => {
			router.back()
		}

		const loginOut = () => {
			localStorage.clear()
			router.push('/login')
		}
		/**
		 * @description 切换tab
		 * @param {string} name
		 */
		const onChange = (name: string) => {
			increment(tabList.filter(item => item.name === name)[0].title)
			editLeft(false)
			router.push({
				path: `/${name}`
			})
		}

		onBeforeRouteUpdate(to => {
			if (to.meta?.title) {
				increment(to.meta.title as string)
				editLeft(false)
			}
		})
		onMounted(() => {
			if (!localStorage.getItem('token')) {
				router.push({
					path: '/login'
				})
			}
		})
		return {
			loginOut,
			onChange,
			onClickLeft,
			...toRefs(stateStore),
			state
		}
	}
})
</script>
<style lang="less" scoped>
.main-content {
	position: absolute;
	top: 50px;
	left: 0%;
	width: 100%;
	background-color: #fff;
}
</style>
