<template>
	<div class="exercise" :style="{ background: tempColor }">
		<h2
			class="start double-center"
			v-if="state === '0'"
			@click="state = '1'"
		>
			开始
		</h2>
		<div class="set double-center " v-else-if="state === '1'">
			<h2 class="title">设置界面</h2>
			<div class="set-item">
				<span>运动💪:</span>
				<input type="number" v-model.number="exerciseTime" />
				<span>分</span>
			</div>
			<div class="set-item">
				<span>需要休息♨️:</span
				><input type="checkbox" v-model="needRest" />
			</div>
			<template v-if="needRest">
				<div class="set-item">
					<span>休息次数:</span>
					<input type="number" v-model.number="restNumber" />
					<span>次</span>
				</div>
				<div class="set-item">
					<span>单次休息⌛️:</span>
					<input type="number" v-model.number="restTime" />
					<span>秒</span>
				</div>
			</template>
			<button class="" @click="confirmSet('2')">确认</button>
		</div>
		<div class="exerciseIng double-center" v-else-if="state === '2'">
			<h2 class="title">运动界面</h2>
			<h3 class="detail">本次运动{{ exerciseTime * 60 }}秒</h3>
			<h3 class="exercise-detail">
				还要运动{{ exerciseNumber }}次每次{{ partExerciseTime }}秒
			</h3>
			<h3 v-if="needRest" class="rest">
				还有{{ restNumber }}次休息{{ restTime }}秒的机会
			</h3>
			<div class="countdown">{{ countdown }}</div>
			<div class="exerciseIng-item" v-if="!exerciseIng">
				<button
					style="background: linear-gradient(315deg,#498ff2 0,#4965f2 100%)"
					@click="start()"
				>
					开始
				</button>
			</div>
		</div>
		<div class="exerciseSuccess double-center" v-else-if="state === '3'">
			运动完成✅,不错哦⛽️
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Toast } from "vant";
export default defineComponent({
	setup() {
		const state = reactive({
			state: "1", //0开始状态,1设置状态,2运动窗口,3锻炼完成
			needRest: false, //是否需要休息
			exerciseTime: 0, //运动时间
			partExerciseTime: 0, //单次运动时间
			exerciseNumber: 1, //运动次数
			restNumber: 0, //休息次数
			restTime: 0, //每次休息时间
			countdown: 0, //读秒
			restIng: false, //正在休息
			tempColor: "#fff",
			exerciseIng: false //
		});
		let timer: number;
		let audio = new Audio();
		let ready = require("../../static/file/ready.mp3");
		let success = require("../../static/file/success.mp3");
		const start = function() {
			state.tempColor = "#000";
			state.exerciseIng = true;
			state.countdown = state.partExerciseTime;
			state.exerciseNumber = state.exerciseNumber - 1;
			audio.src = ready;
			audio.play();
			setTimeout(() => {
				Interval();
			}, 4000);
		};
		const confirmSet = function() {
			if (state.exerciseTime <= 0) {
				Toast.fail("运动时间不能为空");
				return;
			}
			if (
				(state.needRest && state.restTime <= 0) ||
				(state.needRest && state.restNumber <= 0)
			) {
				Toast.fail("要休息就要有休息时间");
				return;
			}
			let partExerciseTime = state.exerciseTime * 60;
			if (state.needRest && state.restNumber > 0) {
				partExerciseTime = Math.round(
					(state.exerciseTime * 60) / (state.restNumber + 1)
				);
				state.exerciseNumber = state.restNumber + 1;
			}
			state.partExerciseTime = partExerciseTime;
			state.state = "2";
		};
		const Interval = function() {
			timer = window.setInterval(() => {
				state.countdown = state.countdown - 1;
				if (state.countdown <= 5) {
					if (state.restIng) {
						if (state.countdown === 4) {
							audio.src = ready;
							audio.play();
						}
						if (state.countdown % 2 === 0) {
							// 偶数
							state.tempColor = "rgb(68 206 246 / 50%)";
						} else {
							// 奇数
							state.tempColor = "#44cef6";
						}
					} else {
						if (state.countdown % 2 === 0) {
							state.tempColor = "rgba(0,0,0,0.5)";
						} else {
							state.tempColor = "#000";
						}
					}
				}
				if (state.countdown === 0) {
					if (state.needRest) {
						if (state.restIng) {
							state.exerciseNumber = state.exerciseNumber - 1;
							state.restIng = false;
							state.countdown = state.partExerciseTime;
							state.tempColor = "#000";
						} else {
							if (state.restNumber > 0) {
								state.restNumber = state.restNumber - 1;
								state.restIng = true;
								state.countdown = state.restTime;
								state.tempColor = "#44cef6";
							} else {
								state.tempColor = "#eacd76";
								state.state = "3";
								audio.src = success;
								audio.play();
								window.clearInterval(timer);
							}
						}
					} else {
						state.state = "3";
						state.tempColor = "#eacd76";
						audio.src = success;
						audio.play();
						window.clearInterval(timer);
					}
				}
			}, 1000);
		};
		return {
			...toRefs(state),
			start,
			confirmSet,
			Interval
		};
	}
});
</script>

<style lang="less" scoped>
.exercise {
	text-align: center;
	font-size: 1.2em;
	left: 0;
	top: 0;
	position: relative;
	height: 100vh;
	.double-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateY(-50%) translateX(-50%);
		box-shadow: rgba(0, 0, 0, 50%) 0px 0px 8px;
	}
	.start {
		font-size: 2rem;
		font-weight: 500;
	}
	.set {
		width: 80vw;
		height: 80vw;
		border: 3px solid darkcyan;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		padding-top: 10%;
		button {
			position: absolute;
			bottom: 10%;
			left: 50%;
			background: linear-gradient(315deg, #498ff2 0, #4965f2 100%);
			transform: translateX(-50%);
			border-radius: 5px;
			padding: 5px 20px;
			color: #fff;
			border: none;
			font-weight: 500;
			font-size: 1rem;
		}
		.title {
			position: absolute;
			top: -25%;
			left: 50%;
			transform: translateX(-50%);
		}
		.set-item {
			display: grid;
			grid-template-columns: 2fr 2fr 1fr;
			grid-template-rows: 1fr;
			text-align: left;
			padding: 0 5px;
			align-items: center;
			input {
				border-radius: 5px;
				border: 1px solid;
				padding: 5px;
				width: 5rem;
			}
			input[type="checkbox"] {
				height: 1.5em;
				width: 1.5rem;
			}
			span:last-child {
				text-align: right;
				font-weight: 500;
			}
		}
	}
	.exerciseIng {
		width: 80vw;
		height: 90vw;
		border: 3px solid darkcyan;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		padding-top: 10%;
		.title {
			position: absolute;
			top: -25%;
			left: 50%;
			transform: translateX(-50%);
		}
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
	.exerciseIng-item {
		button {
			color: #fff;
			background: #ff4d4f;
			border: none;
			border-radius: 5px;
			padding: 5px 20px;
			background: linear-gradient(135deg, #fa2c19 0, #fa6419 100%);
			border: 1px solid transparent;
		}
	}
}
.exerciseSuccess {
	font-size: 3rem;
}
</style>
