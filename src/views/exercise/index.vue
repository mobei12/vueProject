<template>
	<div class="exercise" :style="{ background: tempColor }">
		<div class="set " v-if="state === '1'">
			<div class="set-item">
				<Field
					v-model.number="exerciseTime"
					type="digit"
					label="运动时间(分)"
				/>
			</div>
			<div class="set-item">
				<Checkbox
					v-model="needRest"
					label-position="left"
					shape="square"
					>需要休息♨️:</Checkbox
				>
			</div>
			<template v-if="needRest">
				<div class="set-item">
					<Field
						v-model.number="restNumber"
						type="digit"
						label="休息次数(次):"
					/>
				</div>
				<div class="set-item">
					<Field
						v-model.number="restTime"
						type="digit"
						label="单次休息(秒):"
					/>
				</div>
			</template>
			<div class="exerciseIng-item">
				<Button type="primary" @click="confirmSet">设置完成</Button>
			</div>
		</div>
		<div class="exerciseIng " v-else-if="state === '2'">
			<div class="detail">本次运动{{ exerciseTime * 60 }}秒</div>
			<div class="exercise-detail">
				还要运动{{ exerciseNumber }}次每次{{ partExerciseTime }}秒
			</div>
			<div v-if="needRest" class="rest">
				还有{{ restNumber }}次休息{{ restTime }}秒的机会
			</div>
			<div class="countdown">{{ countdown }}</div>
			<div class="exerciseIng-item" v-if="!exerciseIng">
				<Button type="primary" @click="start">开始</Button>
			</div>
		</div>
		<div class="exerciseSuccess" v-else-if="state === '3'">
			运动完成✅<br />不错哦⛽️
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { Toast, Button, Field, Checkbox } from 'vant'
import { ExerciseRecord } from '@/js/api/exerciseRecord'
export default defineComponent({
	components: { Button, Field, Checkbox },
	setup() {
		const state = reactive({
			state: '1', //0开始状态,1设置状态,2运动窗口,3锻炼完成
			needRest: false, //是否需要休息
			exerciseTime: 1, //运动时间
			partExerciseTime: 0, //单次运动时间
			exerciseNumber: 1, //运动次数
			restNumber: 1, //休息次数
			restTime: 5, //每次休息时间
			countdown: 0, //读秒
			restIng: false, //正在休息
			tempColor: '#fff',
			number_of_times: 0, //存运动次数
			number_of_breaks: 0, //存休息次数
			exerciseIng: false //
		})
		let timer: number
		let audio = new Audio()
		const ready = require('../../static/file/ready.mp3')
		const success = require('../../static/file/success.mp3')
		const rest = require('../../static/file/rest.mp3')
		const start = function() {
			state.tempColor = '#fff'
			state.exerciseIng = true
			state.countdown = state.partExerciseTime
			state.exerciseNumber = state.exerciseNumber - 1
			audio.src = ready
			audio.play()
			setTimeout(() => {
				Interval()
			}, 4000)
		}
		const confirmSet = function() {
			if (state.exerciseTime <= 0) {
				Toast.fail('运动时间不能为空')
				return
			}
			if (
				(state.needRest && state.restTime <= 0) ||
				(state.needRest && state.restNumber <= 0)
			) {
				Toast.fail('要休息就要有休息时间')
				return
			}
			let partExerciseTime = state.exerciseTime * 60
			if (state.needRest && state.restNumber > 0) {
				partExerciseTime = Math.round(
					(state.exerciseTime * 60) / (state.restNumber + 1)
				)
				state.exerciseNumber = state.restNumber + 1
				state.number_of_breaks = state.restNumber
				state.number_of_times = state.restNumber + 1
			}
			state.partExerciseTime = partExerciseTime
			state.state = '2'
		}
		const Interval = function() {
			timer = window.setInterval(() => {
				state.countdown = state.countdown - 1
				if (state.countdown <= 5) {
					if (state.restIng) {
						if (state.countdown === 4) {
							audio.src = ready
							audio.play()
						}
						if (state.countdown % 2 === 0) {
							// 偶数
							state.tempColor = '#000'
						} else {
							// 奇数
							state.tempColor = '#44cef6'
						}
					} else {
						if (state.countdown === 2 && state.exerciseNumber > 0) {
							audio.src = rest
							audio.play()
						}
						if (state.countdown % 2 === 0) {
							state.tempColor = '#fff'
						} else {
							state.tempColor = '#000'
						}
					}
				}
				if (state.countdown === 0) {
					if (state.needRest) {
						if (state.restIng) {
							state.exerciseNumber = state.exerciseNumber - 1
							state.restIng = false
							state.countdown = state.partExerciseTime
							state.tempColor = '#000'
						} else {
							if (state.restNumber > 0) {
								state.restNumber = state.restNumber - 1
								state.restIng = true
								state.countdown = state.restTime
								state.tempColor = '#44cef6'
							} else {
								state.tempColor = '#eacd76'
								state.state = '3'
								audio.src = success
								audio.play()
								upLoadData()
								window.clearInterval(timer)
							}
						}
					} else {
						state.state = '3'
						state.tempColor = '#eacd76'
						audio.src = success
						audio.play()
						upLoadData()
						window.clearInterval(timer)
					}
				}
			}, 1000)
		}
		const upLoadData = async () => {
			const reqData = {
				duration: state.exerciseTime * 60, //运动用时,秒
				number_of_times: state.number_of_times, //运动分的次数
				number_of_breaks: state.number_of_breaks, //休息的次数
				single_time: state.restTime, //单次休息的时间s秒
				exercise_type: 'jumpRope' //单次休息的时间s秒
			}
			await ExerciseRecord.save(reqData).then(res => {
				console.log(res)
			})
		}
		return {
			...toRefs(state),
			start,
			confirmSet
		}
	}
})
</script>

<style lang="less" scoped>
.exercise {
	text-align: center;
	font-size: 1.2em;
	position: relative;
	text-align: center;
	.set {
		width: 100%;
		top: 20%;
		position: relative;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		.set-item {
			display: flex;
			--van-checkbox-label-color: #ff;
			flex-direction: column;
			gap: 2rem;
		}
	}
	.exerciseIng {
		display: flex;
		width: 100%;
		top: 20%;
		position: relative;
		flex-direction: column;
		font-size: 2rem;
		font-weight: bold;
		.detail {
			color: #0aa344;
		}
		.exercise-detail {
			color: #f20c00;
		}
	}
	.rest {
		color: #3eede7;
	}
	.countdown {
		color: #f20c00;
		font-size: 11rem;
		font-weight: 700;
	}
}
.exerciseSuccess {
	font-size: 3rem;
	width: 100%;
	top: 20%;
	position: relative;
}
</style>
