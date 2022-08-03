<template>
	<div class="about">
		<h3>
			你是<span :style="{ color: '#1CACF4' }">{{ state.name }}</span>
		</h3>
		<h5 v-if="state.number">
			你运动了一共<span :style="{ color: '#4CFC0C', fontSize: '3rem' }">{{
				state.number
			}}</span
			>次
		</h5>
		<h5>
			你运动了一共<span :style="{ color: '#4CFC0C', fontSize: '3rem' }">{{
				state.exerciseTime
			}}</span
			>秒
		</h5>
		<h4>
			上一次运动是
			<span
				v-for="(item, i) in state.lastExercise"
				:style="{ color: 'red', fontSize: '2rem' }"
				:key="i"
			>
				{{ item }}
			</span>
		</h4>
		<!-- todo 上一次运动多少,本周、本月运动多少,大概多少卡 -->
	</div>
</template>
<script lang="ts">
import {defineComponent, onMounted, reactive, ref, Ref} from 'vue'
import moment from 'moment'
import {ExerciseRecord} from '@/js/api/exerciseRecord'

moment.locale('zh-cn')
export default defineComponent({
	components: {},
	setup() {
		const state = reactive({
			name: '',
			number: 0,
			exerciseTime: 0,
			lastExercise: {
				fromNow: '',
				date: '',
				time: ''
			}
		})
		let test: Ref<number> = ref(120)
		const getExerciseRecord = async () => {
			await ExerciseRecord.find().then(res => {
				let dataLength: number = res.data.length
				state.number = dataLength
				if (dataLength > 0) {
					state.exerciseTime = res.data.reduce(
						(a: number, b: { duration: number }) => {
							return a + b.duration
						},
						0
					)
					state.lastExercise = {
						fromNow: moment(
							res.data[dataLength - 1].ctime
						).fromNow() as string,
						date: moment(res.data[dataLength - 1].ctime).format(
							'LLLL'
						) as string,
						time:
							'运动了' + res.data[dataLength - 1].duration + '秒'
					}
				}
			})
		}
		onMounted(() => {
			state.name = String(localStorage.getItem('username'))
			getExerciseRecord()
		})
		return {
			state,
			test
		}
	}
})
</script>
<style lang="less">
.about {
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	* {
		margin: 0;
	}
}
</style>
