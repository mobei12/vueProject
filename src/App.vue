<template>
  <div id="nav" v-if="showNav">
    <router-link to="/home">主页</router-link>
    <router-link to="/exercise">动起来</router-link>
    <router-link to="/about">关于你</router-link>
    <van-button size="small" type="primary" @click.prevent="loginOut"
      >退出登录</van-button
    >
  </div>
  <router-view class="main-content" />
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { Button } from "vant";
export default defineComponent({
  name: "app",
  components: {
    vanButton: Button,
  },
  computed: {
    showNav() {
      return this.$route.path !== "/login";
    },
  },
  methods: {
    loginOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  setup() {
    const state = reactive({});
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f4f4f4;
  background-color: #1c1c1c;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  #nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.5rem;
    padding: 20px 0;
    height: 82px;

    a {
      font-weight: bold;
      color: #fff;
      flex: 1;

      &.router-link-exact-active {
        font-size: 1.8rem;
        color: #42b983;
        -webkit-box-reflect: below -10px linear-gradient(transparent 30%, rgba(0, 0, 0, 0.35));
      }
    }
    button {
      flex: 1;
    }
  }
  .main-content {
    flex: 1;
  }
}
</style>
