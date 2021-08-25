<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/me.jpg" />
		<HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "../components/HelloWorld.vue"; // @ is an alias to /src

@Options({
	components: {
		HelloWorld
	}
})
export default class Home extends Vue {}
</script>
<style lang="less">
.home {
	img {
		width: 80vw;
	}
}
</style>
