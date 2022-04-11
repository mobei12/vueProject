<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
	name: 'Main',
	setup() {
		const router = useRouter()
		onMounted(() => {
			console.log('router', router)
			router.push({ path: '/homePage' })
		})
	}
})
</script>

<style lang="scss"></style>
