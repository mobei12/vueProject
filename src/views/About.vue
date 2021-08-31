<template>
	<div class="about">
		<h1>
			你是<span :style="{ color: '#1CACF4' }">{{ name }}</span>
		</h1>
		<h2 v-if="number">
			你运动了一共<span :style="{ color: '#4CFC0C', fontSize: '3rem' }">{{
				number
			}}</span
			>次
		</h2>
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
			number: null
		};
	},
	mounted() {
		this.name = String(localStorage.getItem("username"));
		this.getExerciseRecord();
	},
	methods: {
		getExerciseRecord: function() {
			const reqData = {
				user_id: String(localStorage.getItem("_id")) //用户id
			};
			ExerciseRecord.find(reqData).then(res => {
				this.number = res.data.length;
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
}
</style>
