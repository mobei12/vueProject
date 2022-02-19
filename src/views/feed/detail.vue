<template>
	<div class="detail">
		<h4>{{ state.title }}</h4>
		<div v-html="state.htmlContent" class="html-content"></div>
		<!-- <iframe :src="state.link" frameborder="0"></iframe> -->
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
	name: 'Detail',
	components: {},
	setup() {
		const route = useRoute()
		const state = reactive({
			link: route.query.link as string,
			title: route.query.title as string,
			htmlContent: ''
		})
		onMounted(() => {
			const htmlContent: string = sessionStorage.getItem(
				'htmlContent'
			) as string
			state.htmlContent = htmlContent
				.replace(
					/<img/g,
					'<img style="width:100%;height:auto" v-lazy="img"'
				)
				.replaceAll(
					/<iframe/g,
					'<iframe style="width:100%;height:auto"'
				)
		})
		return { state }
	}
})
</script>
<style lang="less" scoped>
.detail {
	color: #000;
	.html-content {
		p {
			::v-deep img {
				width: 100%;
			}
		}
	}
	iframe {
		width: 100%;
		height: 100%;
	}
}
</style>
