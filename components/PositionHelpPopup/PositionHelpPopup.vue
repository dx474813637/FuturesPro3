<template>
	<view>
		<PopupNormal v-bind="$attrs" > 
			<view class="list-w bg-white">   
				<scroll-view class="main-list  u-p-30" scroll-y >
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">以90天或3年为周期，取周期内的最大值和最小值。</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">极差=最大值-最小值</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">档距=极差/5</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">低位：[最小值  ,  最小值+档距)</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">中低位：[最小值+档距  ,  最小值+档距*2)</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">中位：[最小值+档距*2  ,  最小值+档距*3)</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">中高位：[最小值+档距*3  ,  最小值+档距*4)</text> 
					</view> 
					<view class="  u-p-10"> 
						<text class="text-bold text-l1">高位：[最小值+档距*4  ,  最大值]</text> 
					</view> 
					<!-- <view class="text-l2 u-p-10">
						估值水平  10%
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