<template>
	<view class="header bg-white">
		<NavBar bgColor="var(--brand-red)" title="快讯" customColor="#fff" :titleStyle="`color: #fff`" placeholder>
		</NavBar>
	</view> 
	<view class=" "> 
		<view class=" "> 
			<nut-steps direction="vertical"  >
				<view
					v-for="item in dataList2"
					:key="item.id || item.stitle"
					:class="{
						'ww': item.stitle
					}"
				>
					<template v-if="item.id">
						<nut-step  @click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id}})" >
							<template #icon>
								<view>
									<view class="text-base text-nowrap u-font-15">{{item.days}}日</view>
									<!-- <view class="text-nowrap u-font-14 u-info-light-bg u-primary   u-p-l-12 u-p-r-12 u-radius-4">
										<template v-if="item.type == '1'">快讯</template>
										<template v-else-if="item.type == '2'">案例</template>
									</view> -->
								</view>
							</template> 
							<template #title>
								<!-- <view class="u-info u-font-14">{{item.pubDate}}</view> -->
								<view class="text-black u-p-t-4 u-font-15 ">{{item.title}}</view>
							</template>
							<template #content>
								<view class="u-m-b-30 u-font-16 u-p-t-10 text-base">{{item.content}}</view> 
							</template>
						</nut-step>
					</template>
					<template v-else>  
						<nut-step>
							<template #icon>
								<view class="text-base text-nowrap u-p-l-80 u-m-l-40 u-p-t-10 u-font-19 ">{{item.stitle}}</view>
							</template> 
						</nut-step> 
					</template>
				</view> 
				
			</nut-steps>
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
		themeColor,
		empty
	} = toRefs(base)
	const shareData = ref({})
	const $api = inject('$api')
	const keyword = ref('') 
	const top = ref(true)
	const dataList2 = ref([])
	const bgColor = computed(() => {
		if (top.value) return 'transparent'
		return '#d4e5ff'
	})
	const title = computed(() => {
		if (top.value) return ''
		return '快讯列表'
	})
	const options = computed(() => {
		return {
			params: { 
				type: 1
			},
			api: 'list_chance_recommend_zx',
			getDataCallBack: (res) => {
				if (res.code == 1) {
					dataList.value = [...dataList.value, ...res.list.res.pw_rec_list]
					let list = changeList(res.list.res.pw_rec_list)
					dataList2.value = [...dataList2.value, ...list ] 
					shareData.value = res
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
	function changeList(data) {
		let key = 'pubDate'
		if (!Array.isArray(data) || data.length === 0) return []
		
		const result = []
		let lastMonth = null
		
		// 处理每个数据项
		data.forEach((item, index) => {
			const postDate = item[key]
			
			if (!postDate) {
				result.push(item)
				return
			}
			// 解析日期，处理年份格式（如 '026' -> '2026'）
			const dateParts = postDate.split(' ')[0].split('-')
			let year = dateParts[0]
			const month = dateParts[1]
			const days = dateParts[2]
			
			
			// 修复年份格式
			if (year.length === 3 && year.startsWith('0')) {
				year = '2' + year
			} else if (year.length === 2) {
				year = '20' + year
			}
			
			const currentMonth = `${year}-${month}`
			const stitle = `${year}年${month}月`
			let isHave = dataList2.value.some(ele => ele.stitle == stitle)
			// 第一个数据项或月份不同时，插入年月标题
			if ((index === 0 || currentMonth !== lastMonth) && !isHave) {
				result.push({ stitle })
				lastMonth = currentMonth
			}
			
			result.push({...item, days})
		})
		
		return result
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F3F8;
		padding-bottom: 120px;
		::v-deep {
			.nut-step.nut-step-wait .nut-step-icon.is-icon {
				background-color: transparent!important;
				border: 0!important;
				align-items: start;
			}
			.nut-steps-vertical .nut-step-line {
				background: #eee!important;
				top: 20px!important;
				height: 90%!important;
			}
			.nut-step {
				background-color: #fff!important;
				padding: 0 20px;
			}
			.nut-step-title {
				margin: 0!important;
			}
			.nut-step-main {
				padding-right: 0!important;
			}
			
		}
		.ww {
			position: sticky;
			top: 44px;
			z-index: 20;
			transform: translateZ(0);
        	will-change: position;
			::v-deep {  
				.nut-step {
					background-color: #ebf1fc!important;
					padding: 0 20px;
				}
				
			}
		}
	}
</style>
<style lang="scss" scoped>
	.header {
		background-image: url('https://view.cft.100ppi.com/Public/index-topbj/index-topbj.png');
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