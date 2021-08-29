<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/me.jpg" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	components: {}
})
export default class Home extends Vue {}
</script>
<style lang="less">
.home {
	padding-top: 20vh;
	img {
		width: 80vw;
	}
}
</style>
