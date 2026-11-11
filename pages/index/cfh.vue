<template>
	<view class="header bg-white">
		<NavBar :bgColor="bgColor" :title="title" customColor="#000" :titleStyle="`color: ${themeColor}`" placeholder>
		</NavBar>
		<view class="    u-p-b-10" style="position: relative;">
			<image class="" style=" height: 70px" mode="heightFix" src="https://cft.100ppi.com/Public/index-logo.png" />
			<!-- <up-image src="https://cft.100ppi.com/Public/index-topbj/cfhlogo.png" width="100%" height="auto" mode="widthFix"></up-image> -->
			<view class=" box-border bg-primary text-white u-radius-8 u-font-15 u-p-l-20 u-p-r-20"
				style="position: absolute; right: 20px; top: 20px; height: 30px; line-height: 30px;"
				@click="handleChangeShow(true)">
				{{origin.name}}
			</view>
		</view>
	</view>
	<view class="u-p-20 u-m-20 bg-white u-radius-15" v-if="info.info">
		<u-parse :content="info.info"></u-parse>
	</view>
	<PopupNormal :show="show" :title="origin.name" :onUpdateShow="handleChangeShow">
		<view class="list-w bg-white">
			<scroll-view class="main-list  u-p-30" scroll-y> 
				<!--  #ifdef  APP-PLUS -->
				<image v-if="origin.img" :src="origin.img" mode="widthFix" style="width: 100%; height: auto;"
					@longpress="base.handleLongPress(origin.img)" />
				<!--  #endif -->
				<!--  #ifdef  H5 || MP-WEIXIN -->
				<image v-if="origin.img" :src="origin.img" mode="widthFix" show-menu-by-longpress
					style="width: 100%; height: auto;" />
				<!--  #endif -->
			</scroll-view>
		</view>
	</PopupNormal>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar></MenusBar>
</template>

<script setup>
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
	const origin = ref({})
	const info = ref('')
	const top = ref(true)
	const bgColor = computed(() => {
		if (top.value) return 'transparent'
		return '#d4e5ff'
	})
	const show = ref(false)
	const title = computed(() => {
		if (top.value) return ''
		return info.value.title || '股票通'
	})
	onLoad(async (options) => {
		// initDataList() 
		getData()
	})
	onPageScroll((e) => {
		handleScroll(e)
	})

	function handleChangeShow(data) {
		show.value = data
	}
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	}
	async function getData() {
		const res = await $api.about5()
		if (res.code == 1) {
			uni.setNavigationBarTitle({
				title: res.list.title
			})
			info.value = res.list
			origin.value = res.list
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
	.header {
		background-image: url('https://cft.100ppi.com/Public/index-topbj/index-topbj.png');
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
			background-color: rgba(255, 255, 255, .6);
		}
 
	}
 

	.main-list {
		height: 100%;
		box-sizing: border-box;
	}
 
</style>