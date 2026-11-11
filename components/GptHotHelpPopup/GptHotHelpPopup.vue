<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<view class="  u-p-10"> 
						<text class="text-bold text-black">热点选股策略样例：</text>
						<text class="">5/5+中位/2.5</text>
					</view>
					<view class="text-base u-p-10">
						5/5，是指查询最近5天内且涨幅超过5％的周期股；
					</view>
					<view class="text-base u-p-10">
						中位/2.5，是指对上述查询结果列表，再按股价5档位置以及财报评级进行筛选。
					</view>
					<view class=" u-p-10 u-m-t-40"> 
						<text class="text-bold text-black">季报选股策略样例：</text>
						<text class="">季报开始日-当前日期/20％+中位/2.5</text>
					</view>
					<view class="text-base u-p-10">
						季报开始日-当前日/20％，是指查询周期内涨幅超过20％的周期股；
					</view>
					<view class="text-base u-p-10">
						中位/2.5，是指对上述查询结果列表，再按股价5档位置与财报评级进行筛选。
					</view>
					<view class=" u-p-10 u-m-t-40"> 
						<text class="text-bold text-black">用户可以根据上述指南，设定适合自己的选股策略。</text> 
					</view>
					<!-- <view class="u-flex u-flex-items-start u-m-b-20 u-font-30"
						v-for="(item, index) in list"
						:key="index"
					>
						<view class="u-info text-nowrap">{{item.name}}：</view>
						<view class="u-flex-1">{{item.value}}</view> 
					</view> -->
				</scroll-view> 
			</view>  
		</PopupNormal>
	</view>
</template>

<script setup> 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		list: {
			type: Array,
			default: () => {
				return []
			},
		}
	})   
	onMounted(async () => { 
	})  
	 
</script>

<style lang="scss" scoped>
	.list-w {
		height: 60vh;
		// background-color: #f2f2f2;
		position: relative;
		.load-bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 20;
			background-color: rgba(255,255,255,.6);
		}
		.list-item {
			position: relative;
			z-index: 10;
			height: 100%;
			&.item-left {
				flex: 0 0 35%;
				background-color: #f8f8f8;
			}
		}
	}
	.nav-item {
		color: #666; 
		&.active-nav {
			background-color: #f2f2f2;
			color: $u-primary; 
		}
	}
	.main-list {
		height: 100%;
		box-sizing: border-box;
	}
	.item-card { 
		background-color: #e8e8e8;
		box-sizing: border-box;  
		margin-bottom: 10px; 
		padding: 10px;
		color: #666;
		border-radius: 5px;
		border: 1rpx solid #e8e8e8;
		&.active {
			background-color: $u-primary-light;
			color: $u-primary;
			border-color: $u-primary;
		}
	}
</style>