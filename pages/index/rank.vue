<template>
	<view class="header bg-white">
		<NavBar bgColor="var(--brand-red)" title="热门商品" customColor="#fff" :titleStyle="`color: #fff`" placeholder>
		</NavBar>
	</view> 
	<view class="w-main">
		<view class="u-p-l-30 u-p-r-30 u-p-t-40 u-p-b-10" v-if="zd_list.length > 0">
			<!-- <view class="u-font-15 u-m-b-12 text-l1 text-bold u-p-l-10" style="font-style: italic;">最近一周<text class="text-error">领涨</text></view> -->
			<view class="  u-p-30 u-radius-16 bg-white  " style="border: 1rpx solid #d3ddec;">
				
				<view class="u-flex u-flex-items-end u-flex-between zd-card">
					<!-- rank2 -->
					<view class="  zd-card-item u-radius-8 u-flex-column u-flex-end u-flex-items-center" v-if="zd_list[1]"
						@click="base.handleGoto({
							url: '/pages/analysis/analysis_detail',
							params: {m: '2',sd: '1',pp: zd_list[1].ppid}
						})"
					> 
						<view class="u-m-b-20  u-font-15 u-line-1">{{zd_list[1].name}}</view>
						<view
							class="text-bold u-m-b-8"
							:class="{
								'text-brand-red': zd_list[1].rate >= 0,
								'text-success': zd_list[1].rate < 0,
							}"
						>{{zd_list[1].rate < 0? '-':'+' }}{{zd_list[1].rate}}%</view>
						<view class="text-base u-font-12 u-p-b-12">涨跌幅</view>
						<view class=" text-l3 u-font-12 bg-card u-text-center u-p-8 " style="width: 100%;">去看看</view>
					</view> 
					<!-- rank1 -->
					<view class="  zd-card-item u-radius-8 u-flex-column u-flex-end u-flex-items-center" v-if="zd_list[0]"
						@click="base.handleGoto({
							url: '/pages/analysis/analysis_detail',
							params: {m: '2',sd: '1',pp: zd_list[0].ppid}
						})"
					> 
						<view class="u-m-b-10 u-font-15 u-line-1" >{{zd_list[0].name}}</view>
						<view class="u-m-b-20 u-error-light-bg u-error u-font-12 u-p-4 u-p-l-20 u-p-r-20 u-radius-4 ">领涨TOP 1</view>
						<view
							class="text-bold u-m-b-8"
							:class="{
								'text-brand-red': zd_list[0].rate >= 0,
								'text-success': zd_list[0].rate < 0,
							}"
						>{{zd_list[0].rate < 0? '-':'+' }}{{zd_list[0].rate}}%</view>
						<view class="text-base u-font-12 u-p-b-12">涨跌幅</view>
						<view class=" text-l3 u-font-12 bg-card u-text-center u-p-8 " style="width: 100%;">去看看</view>
					</view> 
					<!-- rank3 -->
					<view class="  zd-card-item u-radius-8 u-flex-column u-flex-end u-flex-items-center" v-if="zd_list[2]"
						@click="base.handleGoto({
							url: '/pages/analysis/analysis_detail',
							params: {m: '2',sd: '1',pp: zd_list[2].ppid}
						})"
					> 
						<view class="u-m-b-20  u-font-15 u-line-1">{{zd_list[2].name}}</view>
						<view
							class="text-bold u-m-b-8"
							:class="{
								'text-brand-red': zd_list[2].rate >= 0,
								'text-success': zd_list[2].rate < 0,
							}"
						>{{zd_list[2].rate < 0? '-':'+' }}{{zd_list[2].rate}}%</view>
						<view class="text-base u-font-12 u-p-b-12">涨跌幅</view>
						<view class=" text-l3 u-font-12 bg-card u-text-center u-p-8 " style="width: 100%;">去看看</view>
					</view> 
					
					
					
				</view>
				<view class="u-m-t-20">
					<view
						v-for="(item, index) in zd_list.slice(3)"
						:key="item.id"
						class="u-flex u-flex-items-center u-flex-between u-p-10 u-p-b-20 u-p-t-20 u-border-bottom"
						style="border-color: var(--divider-color)!important;"
						@click="base.handleGoto({
							url: '/pages/analysis/analysis_detail',
							params: {m: '2',sd: '1',pp: item.ppid}
						})"
					>
						<view class="u-flex u-flex-items-center">
							<view class="u-font-13 text-l2 bg-card u-radius-20 u-text-center" style="width: 20px; height: 20px">{{index + 4}}</view>
							<view class="u-m-l-20 text-l1">{{item.name}}</view>
						</view>
						<view
							class="text-bold u-m-b-8"
							:class="{
								'text-brand-red': item.rate >= 0,
								'text-success': item.rate < 0,
							}">
							{{item.rate < 0? '-':'+' }}{{item.rate}}%
						</view>
					</view>
				</view>
			</view>
			<view class="u-text-center text-grey u-font-24 u-p-t-20 ">{{dateRange}}</view> 
			
		</view>
	</view>
	
	<!-- <template v-if="dataList.length == 0">
		<u-empty
			mode="data"
			:icon="empty"
		>
		</u-empty>
	</template>
	<template v-else>
		<u-loadmore
			:status="loadstatus"
		/>
	</template> -->
	<u-safe-bottom></u-safe-bottom>
	<ShareBtn
		:shareData="shareData"
	></ShareBtn>
	<MenusBar ></MenusBar>
</template>

<script setup>
	import { timeFrom }  from 'uview-plus';
	import useDataList from '@/composition/useDataList.js'
	import {
		userStore
	} from '@/stores/user.js'
	import {
		useCateStore,
		baseStore
	} from '@/stores/base.js'
	const user = userStore()
	const base = baseStore()
	const {
		themeColor
	} = toRefs(base)
	const $api = inject('$api')
	const keyword = ref('') 
	const top = ref(true)
	const zd_list = ref([]) 
	const shareData = ref({}) 
	const dateRange = ref('') 
	onLoad(async (options) => {
		getZdData()
	}) 
	
	async function getZdData() {
		const res = await $api.gpt_zd();
		if(res.code == 1) {
			let data = res.list.res
			zd_list.value = data.list
			shareData.value = res
			dateRange.value = `${data.sdate} ~ ${data.edate}`
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 120px; 
	}
</style>
<style lang="scss" scoped>
	.zd-card {
		width: 100%;
		.zd-card-item {
			flex: 0 0 31%;
			position: relative;
			height: 180px;
			overflow: hidden;
			width: 31%;
			background-position: bottom;
			background-repeat: no-repeat;
			background-size: 100% 180px;
			&:nth-of-type(1) {
				background-image: url('https://cft.100ppi.com/Public/zd_bg/zd_bg2.jpg');
			}
			&:nth-of-type(2) {
				background-image: url('https://cft.100ppi.com/Public/zd_bg/zd_bg1.jpg');
			}
			&:nth-of-type(3) {
				background-image: url('https://cft.100ppi.com/Public/zd_bg/zd_bg3.jpg');
			}
			
		}
	}
	.header {
		// background-image: url('https://view.cft.100ppi.com/Public/index-topbj/index-topbj.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0; 
	}

	.tabs-list {
		.tabs-item {
			border: 1rpx solid #eee;
			color: #666;
			transition: all .3s;

			&.active {
				color: #007aff;
				border: 1rpx solid #007aff;
				background-color: #fff;
			}
		}
	}

	.tabs-main {
		position: relative;
		min-height: 30vh;

		.tabs-main-list {
			position: relative;
			z-index: 10;
		}
	}
</style>