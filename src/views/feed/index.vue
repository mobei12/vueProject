<template>
	<div class="feed-container">
		<div
			class="item"
			v-for="(item, i) in feeds"
			:key="i"
			@click.prevent="handleClick(item)"
		>
			<img :src="item.icon" alt="图标" />
			<div class="content">
				<div class="title">
					<span>{{ item.title }}</span>
					<span class="time">2019-01-01</span>
				</div>
				<div class="desc">
					<span>描述</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import {} from 'vant'
export default defineComponent({
	name: 'Feed-container',
	components: {},
	setup() {
		const feeds = [
			{
				id: 1,
				title: '阮一峰的网络日志',
				url: 'http://www.ruanyifeng.com/blog/atom.xml',
				icon: 'http://www.ruanyifeng.com/favicon.ico'
			},
			{
				id: 2,
				title: '张鑫旭-鑫空间-鑫生活',
				url: 'https://www.zhangxinxu.com/wordpress/feed/',
				icon: 'https://www.zhangxinxu.com/favicon.ico'
			},
			{
				id: 3,
				title: '知乎每日精选',
				url: 'http://www.zhihu.com/rss',
				icon: 'http://www.zhihu.com/favicon.ico'
			},
			{
				id: 4,
				title: '抽屉热榜',
				url: 'http://dig.chouti.com/feed.xml',
				icon: 'http://www.chouti.com/favicon.ico'
			} /* 
			{
				id: 5,
				title: 'alloyteam',
				url: 'http://www.alloyteam.com/feed',
				icon: 'http://www.alloyteam.com/favicon.ico'
			}, */,
			{
				id: 6,
				title: 'ifanr',
				url: 'https://www.ifanr.com/feed',
				icon: 'http://www.ifanr.com/favicon.ico'
			},
			{
				id: 7,
				title: 'sspai',
				url: 'https://sspai.com/feed',
				icon: 'https://cdn.sspai.com/sspai/assets/img/favicon/icon.ico'
			}
		]
		const router = useRouter()
		type Item = {
			id: number
			title: string
			url: string
			icon: string
		}
		const handleClick = (item: Item): void => {
			router.push({
				path: '/feedItem',
				query: item
			})
		}
		return { feeds, handleClick }
	}
})
</script>
<style lang="less">
@grayColor: #999;
.feed-container {
	.item {
		position: relative;
		display: flex;
		padding: 10px;
		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-right: 10px;
		}
		.content {
			flex: 1;
			line-height: 25px;
			.title {
				.time {
					color: @grayColor;
					float: right;
					font-size: 10px;
				}
			}
			.desc {
				font-size: 12px;
				color: @grayColor;
			}
		}
		&:not(:last-child)::after {
			content: '';
			position: absolute;
			left: 70px;
			right: 0;
			bottom: 0;
			height: 1px;
			background: #e3e3e3;
		}
	}
}
</style>
