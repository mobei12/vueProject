<template>
	<div class="login-container">
		<div class="title">登录</div>
		<div class="form-container">
			<Field v-model="Account" @keyup.enter="handleLogin" label="账号" />
			<Field
				v-model="Password"
				type="password"
				@keyup.enter="handleLogin"
				label="密码"
			/>
			<Field
				v-model="myName"
				@keyup.enter="handleRegister"
				label="我叫啥"
			/>
			<Button size="small" type="primary" @click.prevent="handleLogin"
				>登录</Button
			>&nbsp;&nbsp;
			<Button size="small" type="primary" @click.prevent="handleRegister">
				注册
			</Button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Toast, Button, Field } from 'vant'
import { useRouter } from 'vue-router'
import { UserService } from '@/js/api/user'
export default defineComponent({
	components: { Button, Field },
	setup() {
		const state = reactive({
			Account: '', //账户
			Password: '', //密码
			myName: '' //密码
		})
		const router = useRouter()
		const handleLogin = async () => {
			if (
				state.Account === '' ||
				state.Password === '' ||
				state.Account.length === 0
			) {
				Toast.fail('用户名密码都不知道,闷怂')
				return
			}
			const loginParams = {
				username: state.Account,
				password: state.Password
			}
			await UserService.login(loginParams).then(res => {
				const { code, message } = res.data
				if (code === 200) {
					if (res.data.user && res.data.token) {
						localStorage.setItem('username', res.data.user.username)
						localStorage.setItem('token', res.data.token)
						Toast.success({
							message: '登录成功咧,瓜怂',
							duration: 500,
							onClose: () => {
								router.push({ path: '/homePage' })
							}
						})
					} else {
						Toast.fail(message)
					}
				} else {
					Toast.fail('报错咧')
				}
			})
		}
		const handleRegister = async () => {
			if (state.myName !== '大爷') {
				Toast.fail('不知道我叫啥,你注册个der')
				return
			}
			if (state.Account === '' || !state.Password) {
				Toast.fail('用户名密码都没有,搞咩啊')
				return
			}
			const loginParams = {
				username: state.Account,
				password: state.Password
			}
			await UserService.resgister(loginParams).then(res => {
				if (res.data._id) {
					Toast.success(`${res.data.username}你注册成功了,牛逼哦`)
				} else {
					Toast.fail(res.data.desc)
				}
			})
		}
		return {
			...toRefs(state),
			handleLogin,
			handleRegister
		}
	}
})
</script>

<style lang="less" scoped>
.login-container {
	height: 100% !important;
	padding-top: 2rem;
	box-sizing: border-box;
	text-align: center;
	background-color: #fff;
	.title {
		font-size: 2rem;
		font-weight: bold;
	}
	.form-container {
		padding: 0 2%;
		.van-cell {
			margin-bottom: 1rem;
		}
	}
}
</style>
