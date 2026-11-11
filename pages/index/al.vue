<template>
	<view class="header bg-white">
		<NavBar bgColor="var(--brand-red)" :title="title" customColor="#fff" :titleStyle="`color: #fff`" placeholder>
		</NavBar>
	</view> 
	<view class="u-p-30">
		<view class="bg-white u-p-24 u-radius-16">
			<view
				class="case-card   u-p-t-6 u-p-b-6 u-m-b-12 u-border-bottom "
				v-for="item in dataList"
				:key="item.id" 
				@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id, al: 1}})" 
			> 
				<view > 
					<view class="case-card-title text-l1 u-font-16 u-m-b-12  text-ellipsis-2 " style="word-break: break-all">
						{{item.title}} 
					</view>  
					<view class="u-flex u-flex-between u-flex-items-center">
						<view class="u-flex   u-flex-items-center">
							<view class="text-l3 u-font-12 u-radius-4 u-p-2 u-p-l-16 u-p-r-16 text-brand-blue u-m-r-12  " style="background-color: #F1F7FF;" v-if="item.pname"># {{item.pname}}</view>
							<view class="text-l2 u-font-12 u-p-6" >发现</view>
						</view>
						<view class="text-l3 u-font-12">{{ timeFrom(new Date(item.edit_date).getTime())  }}</view>
					</view>
				</view>  
			</view>		  
			
		</view>
	</view>
	
	<template v-if="dataList.length == 0">
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
	</template>
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
		themeColor,
		empty
	} = toRefs(base)
	const $api = inject('$api')
	const keyword = ref('') 
	const top = ref(true)
	const dataList2 = ref([])
	const shareData = ref({})
	const bgColor = computed(() => {
		if (top.value) return 'transparent'
		return '#d4e5ff'
	})
	const title = computed(() => { 
		return '发现列表'
	})
	const options = computed(() => {
		return {
			params: { 
				type: 2
			},
			api: 'list_chance_recommend_zx',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list.res.pw_rec_list]
					shareData.value = res
					// let list = changeList(res.list.res.pw_rec_list)
					// dataList2.value = [...dataList2.value, ...list ] 
					// tuan.value = res.tuan
					// kg.value = res.kg
					
					if (dataList.value.length >= res.list.res.pw_rec_total) {
						loadstatus.value = 'nomore'
					} else {
						loadstatus.value = 'loadmore'
					}
				}
			}
		}
	})
	 
	const {
		dataList,
		curP,
		loadstatus,
		params,
		getDataList,
		initDataList,
	} = useDataList(options)

	onLoad(async (options) => {
		initDataList()  
	})
	onPageScroll((e) => {
		handleScroll(e)
	}) 
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	}
	// function changeList(data) {
	// 	let key = 'pubDate'
	// 	if (!Array.isArray(data) || data.length === 0) return []
		
	// 	const result = []
	// 	let lastMonth = null
		
	// 	// 处理每个数据项
	// 	data.forEach((item, index) => {
	// 		const postDate = item[key]
			
	// 		if (!postDate) {
	// 			result.push(item)
	// 			return
	// 		}
	// 		// 解析日期，处理年份格式（如 '026' -> '2026'）
	// 		const dateParts = postDate.split(' ')[0].split('-')
	// 		let year = dateParts[0]
	// 		const month = dateParts[1]
	// 		const days = dateParts[2]
			
			
	// 		// 修复年份格式
	// 		if (year.length === 3 && year.startsWith('0')) {
	// 			year = '2' + year
	// 		} else if (year.length === 2) {
	// 			year = '20' + year
	// 		}
			
	// 		const currentMonth = `${year}-${month}`
	// 		const stitle = `${year}年${month}月`
	// 		let isHave = dataList2.value.some(ele => ele.stitle == stitle)
	// 		// 第一个数据项或月份不同时，插入年月标题
	// 		if ((index === 0 || currentMonth !== lastMonth) && !isHave) {
	// 			result.push({ stitle })
	// 			lastMonth = currentMonth
	// 		}
			
	// 		result.push({...item, days})
	// 	})
		
	// 	return result
	// }
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 120px; 
	}
</style>
<style lang="scss" scoped>
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