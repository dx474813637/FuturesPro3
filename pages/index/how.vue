<template>
	<view class="wrap u-p-30 box-border" v-if="!erorr">  
		<view class="title u-m-b-20 u-font-19 u-text-center ">{{al == 1 ? (list.title2 || list.title): list.title}}</view>
		<view class="text-l2 u-m-b-20">{{list.post_date}}</view> 
		<view class="content" >
			<!-- <up-image :src="list.img2" width="100%" height="auto" mode="widthFix" v-if="list.img2"></up-image> -->
			<view class="u-m-t-40 u-p-10 u-m-b-40 u-font-18" v-if="list.info">
				<up-parse :content="list.info"></up-parse> 
			</view>
		</view>
		 
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
	const erorr = ref(false)
	const shareData = ref({})
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
			const res = await $api.about5()
			if(res.code == 1) { 
				list.value = res.list 
				shareData.value = res
				// Com.setWebviewTitle(() => { 
				// 	Com.nativeGobackListener(1, () => { 
				// 		Com.setWebviewTitle(() => {}, {title: '周期掘金'})
				// 		Com.browserGoback()
				// 	})
				// }, {title: list.value.title})
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
