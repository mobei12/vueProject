<template>
	<div class="login-contenter">
		<h2>登陆</h2>
		<label>账号: </label><input type="text" v-model="Account" /><br /><br />
		<label>密码: </label
		><input type="text" v-model="Password" /><br /><br />
		<button @click.prevent="handleLogin">登临</button>&nbsp;&nbsp;
		<button @click.prevent="handleRegister">注册</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "../../js/api/user";
export default defineComponent({
	setup() {
		const state = reactive({
			Account: "漠北", //账户
			Password: "123321" //密码
		});
		const router = useRouter();
		const handleLogin = async () => {
			const loginParams = {
				username: state.Account,
				password: state.Password
			};
			await UserService.login(loginParams).then(res => {
				console.log(res);
				if (res.data) {
					const { username, _id } = res.data[0];
					localStorage.setItem("username", username);
					localStorage.setItem("_id", _id);
					router.push({ path: "/" });
				} else {
					alert("登陆失败");
				}
			});
		};
		const handleRegister = async () => {
			const loginParams = {
				username: state.Account,
				password: state.Password
			};
			const res = await UserService.resgister(loginParams);
			console.log(res);
		};
		return {
			...toRefs(state),
			handleLogin,
			handleRegister
		};
	}
});
</script>

<style lang="less" scoped>
.login-contenter {
	form {
		margin-top: 40%;
	}
}
</style>
