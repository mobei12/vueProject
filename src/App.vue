<template>
	<div id="nav" v-if="showNav">
		<router-link to="/home">主页</router-link> |
		<router-link to="/exercise">动起来</router-link> |
		<router-link to="/about">关于你</router-link> |
		<van-button size="small" type="primary" @click.prevent="loginOut"
			>退出登录</van-button
		>
	</div>
	<router-view />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Button } from "vant";
export default defineComponent({
	name: "app",
	components: {
		vanButton: Button
	},
	data() {
		return {};
	},
	computed: {
		showNav() {
			return this.$route.path !== "/login";
		}
	},
	methods: {
		loginOut() {
			localStorage.clear();
			this.$router.push("/login");
		}
	},
	mounted() {
		if (!localStorage.getItem("_id")) {
			this.$router.push("/login");
		}
	},
	setup() {
		const state = reactive({});
		return {
			...toRefs(state)
		};
	}
});
</script>
<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	position: relative;
}

#nav {
	padding: 30px 0;
	position: absolute;
	z-index: 10;
	display: flex;
	justify-content: space-around;
	align-content: center;
	align-items: center;
	left: 50%;
	transform: translateX(-50%);
	gap: 0.5rem;
	width: 70%;
	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
