<template>
	<div class="login-contenter">
		<h2>登录</h2>
		<label>账号: </label><input type="text" v-model="Account" /><br /><br />
		<label>密码: </label
		><input type="password" v-model="Password" /><br /><br />
		<button @click.prevent="handleLogin">登录</button>&nbsp;&nbsp;
		<button @click.prevent="handleRegister">注册</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Toast } from "vant";
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
				if (res.data && res.data.length > 0) {
					const { username, _id } = res.data[0];
					localStorage.setItem("username", username);
					localStorage.setItem("_id", _id);
					Toast.success({
						message: "登录成功",
						duration: 500,
						onClose: () => {
							router.push({ path: "/" });
						}
					});
				} else {
					Toast.fail("登录失败");
				}
			});
		};
		const handleRegister = async () => {
			const loginParams = {
				username: state.Account,
				password: state.Password
			};
			await UserService.resgister(loginParams).then(res => {
				if (res.data._id) {
					Toast.success(`${res.data.username}你注册成功了`);
				} else {
					Toast.fail(res.data.desc);
				}
			});
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
