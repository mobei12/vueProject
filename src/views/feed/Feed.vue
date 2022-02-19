<template>
	<div class="feeds">
		<h4>{{ title }}</h4>
		<div class="feed-list">
			<div
				class="feed-item"
				v-for="feed in state.dataList"
				:key="feed.id"
				@click="handleClick(feed)"
			>
				<div class="title">
					<span>{{ feed.title }}</span>
				</div>
				<div class="desc">
					<span>{{ feed.author || title }}</span>
					<span class="time">{{ feed.pubDate }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import moment from 'moment'
moment.locale('zh-cn')
import { useRoute, useRouter } from 'vue-router'
import { Rss } from '@/js/api/rss.ts'
import {} from 'vant'
export default defineComponent({
	name: 'Feeds',
	components: {},
	setup() {
		const route = useRoute()
		const router = useRouter()
		const state = reactive({
			dataList: Array<any>()
		})
		const { title } = route.query
		/**
		 * @description vue-router 路由跳转到详情,配置页面缓存
		 * @param {string} htmlContent
		 * @param {string} link
		 */
		const handleClick = (feed: any): void => {
			sessionStorage.setItem('htmlContent', feed.content)
			router.push({
				path: '/detail',
				query: {
					link: feed.link,
					title: feed.title
				}
			})
		}
		/**
		 * @description 获取数据
		 */
		const getList = async (): Promise<any> => {
			const url: string = route.query.url as string
			const res = await Rss.getList(url)
			state.dataList = res.data.items.map((item: any) => {
				return {
					title: item.title,
					author: item.author,
					pubDate: moment(item.pubDate).format('LLLL'),
					content: item['content:encoded'] || item.content,
					link: item.link
				}
			})
		}
		onMounted(async () => {
			getList()
		})
		return { title, handleClick, state }
	}
})
</script>
<style lang="less" scoped>
@grayColor: #999;

.feeds {
	color: #000;
	padding-left: 10px;
	.feed-list {
		.feed-item {
			font-size: 14px;
			position: relative;
			padding: 10px 10px 10px 0px;
			line-height: 20px;
			.desc {
				font-size: 12px;
				color: @grayColor;
				.time {
					color: @grayColor;
					float: right;
					font-size: 10px;
				}
			}
			&:not(:last-child)::after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				height: 1px;
				background: #e3e3e3;
			}
		}
	}
}
</style>
