<template>
	<view class="wrap u-p-30 box-border" v-if="!erorr">  
		<view class="title u-m-b-20 u-font-19  ">{{al == 1 ? (list.title2 || list.title): list.title}}</view>
		<view class="text-l2 u-m-b-20">{{list.post_date}}</view>
		<view class="content">
			<up-image :src="list.img" width="100%" height="auto" mode="widthFix" v-if="list.img"></up-image>
			<view class="u-m-t-40 u-p-10 u-m-b-40 u-font-18" v-if="list.content">
				<up-parse :content="list.content"></up-parse> 
			</view>
		</view>
		<view class="content" >
			<up-image :src="list.img2" width="100%" height="auto" mode="widthFix" v-if="list.img2"></up-image>
			<view class="u-m-t-40 u-p-10 u-m-b-40 u-font-18" v-if="list.content2">
				<up-parse :content="list.content2"></up-parse> 
			</view>
		</view>
		<template v-if="list.kx_title&& list.kx_title.length > 0">
			<view class="title  u-m-t-30  " >
				<view class="u-font-15   u-p-20 u-radius-15  " style="background-color: #f8f8f8;">
					<view class="  text-base u-p-10">相关快讯</view>
					<view class="u-radius-5 bg-white u-p-15 u-m-t-12"
						v-for="(item, index) in list.kx_title"
						:key="item.id"
						@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id}, type: 'redirect'})"
					>
						<view>{{item.title}}</view>
					</view> 
				</view>
			</view>
		</template>
		<template v-if="list.spids">
			<view class="title  u-m-t-30  " >
				<view class="u-font-15   u-p-20 u-radius-15  " style="background-color: #f8f8f8;">
					<view class="  text-base u-p-10">相关周期股</view>
					<view class="u-flex u-flex-items-start u-flex-wrap">
						<view class="u-radius-5 bg-white u-p-15 u-m-t-12 u-m-r-20"
							v-for="(item, index) in list.stock_ppi_recommend"
							:key="item.id" >
						<!-- 	@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: list.kxids[index]}, type: 'redirect'})"
						> -->
							<view>{{item.stock}}({{item.stockcode}})</view>
						</view> 
						
					</view>
				</view>
			</view>
		</template>
			
		<!-- <view>{{list.kxids}}</view> -->
	</view> 
	<u-safe-bottom></u-safe-bottom>
	<!-- <MenusBar ></MenusBar> -->
	<!-- <up-overlay :show="overlayshow" @click="overlayshow = false">
		<view class="share-warp bg-white u-radius-10 u-p-20 u-p-l-30 u-p-r-30 u-flex u-flex-items-center u-font-14">
			<view>点击右上角“</view>
			<up-icon name="more-dot-fill"></up-icon>
			<view>”分享</view>
		</view>
	</up-overlay> -->
	<ShareBtn
		:shareData="shareData"
	></ShareBtn>
	<MenusBar></MenusBar>
</template>

<script setup> 
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js'  
	const user = userStore() 
	const {
		gpt, 
		gptVip,
		qht, 
		qhtVip, 
		subsVip,
		userInfo, 
		partner, 
		login, 
		subscription_loading, 
		partner_amount, 
		partner_amount2, 
		partner_amount_list, 
		partner_amount2_list
	} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()   
	const loading = ref(false) 
	const overlayshow = ref(false) 
	const id = ref('')
	const al = ref('')
	const list = ref({})
	const shareData = ref({})
	const erorr = ref(false)
	const img = ref('https://cft.100ppi.com/Public/huodong1.jpg')
	onLoad(async (options) => { 
		if(options.hasOwnProperty('id')) {
			id.value = options.id  
		} 
		if(options.hasOwnProperty('al')) {
			al.value = options.al  
		} 
		// if(!gptVip.value) {
		// 	await user.getUserSubscription()
		// }
		await getData()
	})   
	async function getData() { 
		if(loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try{
			const res = await $api.detail_chance({params: {id: id.value}})
			if(res.code == 1) { 
				list.value = res.list
				shareData.value = res
				// Com.setWebviewTitle(() => { 
				// 	Com.nativeGobackListener(1, () => { 
				// 		Com.setWebviewTitle(() => {}, {title: '周期掘金'})
				// 		Com.browserGoback()
				// 	})
				// }, {title: list.value.title})
				// if(list.value.type == '1' && !gptVip.value) {
				// 	erorr.vlaue = true
				// 	uni.showModal({
				// 		title: '提示',
				// 		content: '访问当前页面请先订阅',
				// 		success: function (res) {
				// 			if (res.confirm) { 
				// 				base.handleGoto({
				// 					url: '/pages/order/order',
				// 					params: {type: '3'}
				// 				}) 
				// 			} else if (res.cancel) {
				// 				console.log('用户点击取消');
				// 				uni.navigateBack()
				// 			}
				// 		}
				// 	})
				// }
			}
		} catch(e) {
			
		}
		loading.value = false
		
	}   
	function shareBtn() {
		overlayshow.value = true
	}
</script> 
<style lang="scss"> 
	page {
		background-color: #fff;
		min-height: 100vh;
		box-sizing: border-box;
		padding-bottom: 80px;
	}
</style>
<style lang="scss" scoped> 

	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx;  
	}
	.share-warp {
		position: fixed;
		top: 10px;
		right: 10px;
		&:after {
			content: '';
			position: absolute;
			right: 20px;
			bottom: 100%;
			width: 0;
			height: 0;
			border-top: 0;
			border-left: 6px solid transparent; 
			border-right: 6px solid transparent; 
			border-bottom: 6px solid #fff; 
		}
	}
</style>
