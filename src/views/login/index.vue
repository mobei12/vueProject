<template>
	<div class="login-container">
		<h2>登录</h2>
		<div class="form-container">
			<Field v-model="Account" @keyup.enter="handleLogin" label="账号" />
			<Field v-model="Password" @keyup.enter="handleLogin" label="密码" />
			<Button round block type="primary" @click.prevent="handleLogin"
				>登录</Button
			>&nbsp;&nbsp;
			<Button round block type="primary" @click.prevent="handleRegister">
				注册
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Toast, Button, Field } from "vant";
import { useRouter } from "vue-router";
import { UserService } from "../../js/api/user";
export default defineComponent({
	components: { Button, Field },
	setup() {
		const state = reactive({
			Account: "", //账户
			Password: "" //密码
		});
		const router = useRouter();
		const handleLogin = async () => {
			if (
				state.Account === "" ||
				state.Password === "" ||
				state.Account.length === 0
			) {
				Toast.fail("用户名密码不能为空");
				return;
			}
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
			if (state.Account === "" || !state.Password) {
				Toast.fail("用户名密码不能为空");
				return;
			}
			const loginParams = {
				username: state.Account,
				password: state.Password
			};
			await UserService.resgister(loginParams).then(res => {
				if (res.data._id && res.data._id !== null) {
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
.login-container {
	.form-container {
		padding: 0 2vh;
		margin-top: 20vh;
	}
}
</style>
