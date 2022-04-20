import { createApp } from 'vue';
import { Lazyload } from 'vant';
import App from './app.vue';
import router from './router/index';
const app = createApp(App);

app.use(router);
app.use(Lazyload, {
	lazyComponent: true
});
app.mount('#app');
