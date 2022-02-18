<template>
	<div class="feed-container">
		<van-cell
			v-for="i in test"
			:key="i"
			title="单元格"
			is-link
			label="描述信息"
			@click="handleClick"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Cell } from 'vant'
export default defineComponent({
	name: 'Feed-container',
	components: {
		vanCell: Cell
	},
	setup() {
		let test: Ref<number> = ref(10)
		const router = useRouter()
		const handleClick = () => {
			router.push({
				path: 'detail'
			})
		}
		return { test, handleClick }
	}
})
</script>
<style lang="less">
.feed-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
