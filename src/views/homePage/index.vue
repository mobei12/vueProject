<template>
    <div class="home">
        <h3>你动不动,肥肉都在那里</h3>
        <h3>你减不减肥,都一样会死</h3>
        <h3>不想做一件事,总会有N多个理由</h3>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
	components: {}
})
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h3 {
    font-size: 0.5rem
  }
}
</style>
