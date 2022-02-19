<template>
	<van-nav-bar fixed :title="state.title" />
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
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
const tabList = [
	{
		name: 'home',
		icon: 'wap-home',
		title: '主页'
	},
	{
		name: 'feed',
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
import { Tabbar, TabbarItem, NavBar } from 'vant'
export default defineComponent({
	name: 'app',
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
		const state = reactive({
			title: '主页',
			active: 'home',
			tabList
		})
		const loginOut = () => {
			localStorage.clear()
			router.push('/login')
		}

		const onChange = (name: string) => {
			state.title = tabList.filter(item => item.name === name)[0].title
			router.push({
				path: `/${name}`
			})
		}
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
