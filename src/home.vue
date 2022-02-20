<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
	name: 'Home',
	setup() {
		const router = useRouter()

		onMounted(() => {
			router.push({ path: '/home' })
		})
	}
})
</script>

<style lang="scss"></style>
