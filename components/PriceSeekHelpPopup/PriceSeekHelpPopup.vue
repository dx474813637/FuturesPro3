<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">一、基于上市公司最新财报，分别评析5个维度的指标(满分都是5分)：</text> 
					</view>
					<view class="text-l2 u-p-10">
						1、成长性
					</view> 
					<view class="text-l2 u-p-10">
						2、盈利质量
					</view> 
					<view class="text-l2 u-p-10">
						3、财务风险
					</view> 
					<view class="text-l2 u-p-10">
						4、行业景气度
					</view> 
					<view class="text-l2 u-p-10">
						5、估值水平
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-black">二、根据以下各维度的经验权重，计算加权平均分：</text> 
					</view>
					<view class="text-l2 u-p-10">
						成长性  30%
					</view> 
					<view class="text-l2 u-p-10">
						盈利质量  20%
					</view> 
					<view class="text-l2 u-p-10">
						财务风险  25%
					</view> 
					<view class="text-l2 u-p-10">
						行业景气度  15%
					</view> 
					<view class="text-l2 u-p-10">
						估值水平  10%
					</view> 
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