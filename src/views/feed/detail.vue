<template>
	<div class="detail">
		详情页面
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
	name: 'Detail',
	components: {},
	setup() {
		onMounted(() => {
			console.log('detail mounted')
		})
		return {}
	}
})
</script>
<style lang="less" scoped>
.detail {
	font-size: 20px;
	color: #000;
}
</style>
