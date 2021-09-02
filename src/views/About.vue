<template>
	<div class="about">
		<h1>
			你是<span :style="{ color: '#1CACF4' }">{{ name }}</span>
		</h1>
		<h4 v-if="number">
			你运动了一共<span :style="{ color: '#4CFC0C', fontSize: '3rem' }">{{
				number
			}}</span
			>次
		</h4>
		<h4>
			你运动了一共<span :style="{ color: '#4CFC0C', fontSize: '3rem' }">{{
				exerciseTime
			}}</span
			>秒
		</h4>
		<!-- todo 上一次运动多少,本周、本月运动多少,大概多少卡 -->
	</div>
</template>
<script lang="ts">
import { ExerciseRecord } from "../js/api/exerciseRecord";
import { defineComponent } from "vue";
export default defineComponent({
	components: {},
	data() {
		return {
			name: "",
			number: null,
			exerciseTime: 0
		};
	},
	mounted() {
		this.name = String(localStorage.getItem("username"));
		this.getExerciseRecord();
	},
	methods: {
		getExerciseRecord: function() {
			ExerciseRecord.find().then(res => {
				this.number = res.data.length;
				if (res.data.length > 0) {
					let exerciseTime: number = 0;
					res.data.forEach((element: { duration: number }) => {
						exerciseTime += element.duration;
					});
					this.exerciseTime = exerciseTime;
				}
			});
		}
	}
});
</script>
<style lang="less">
.about {
	display: flex;
	flex-direction: column;
	justify-content: center;
	* {
		margin: 0;
	}
}
</style>
