<template>
	<view>
		<PopupNormal v-bind="$attrs">
			<view class="list-w bg-white u-p-20 box-border">
				<scroll-view scroll-y style="height: 100%;" >
					<view class="u-primary-light-bg u-radius-20 u-m-b-30" style="overflow: hidden;">
						<view class="u-flex u-flex-items-center u-flex-center  ">
							<view class="u-flex-1 u-text-center u-p-20 u-font-18 text-bold" :style="{
									borderRadius: index == 1?  '0 20px': '20px 0'
								}" style="font-style: italic;" v-for="(item, index) in tabslist" :key="index" :class="{
									'u-primary-dark-bg': tabValue != index,
									'u-primary-light': tabValue != index,
									'u-primary': tabValue == index
								}" @click="tabsEvent(index)">
								{{item.name}}
							</view>
						</view> 
						<view class="u-primary-light-bg">
							<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-20 u-radius-4 u-m-b-10">
								<view class="u-m-r-30">日期</view>
								<view class="u-flex-1 u-flex u-flex-items-center ">
									<view>
										<up-datetime-picker 
											hasInput 
											:show="date1show" 
											v-model="date1" 
											mode="date"
											title="起始日期" 
											placeholder ="起始日期"
											closeOnClickOverlay
											:inputProps="{
												prefixIcon: 'calendar',
												inputAlign: 'center',
												customStyle: {
													backgroundColor: '#fff',
													borderColor: `#bbe2e5!important`,
												}
											}"
											@close="date1show = false" 
											@cancel="date1show = false" 
										></up-datetime-picker>
									</view>
									<view class="u-p-5 u-m-l-20 u-m-r-20">至</view>
									<view>
										<up-datetime-picker 
											hasInput 
											:show="date2show" 
											v-model="date2" 
											mode="date"
											title="截止日期"
											placeholder ="截止日期"
											closeOnClickOverlay
											:inputProps="{
												prefixIcon: 'calendar',
												inputAlign: 'center',
												customStyle: {
													backgroundColor: '#fff',
													borderColor: `#bbe2e5!important`,
												}
											}"
											@close="date2show = false" 
											@cancel="date2show = false" 
										></up-datetime-picker>
									</view>
								</view>
							</view>
							<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-20 u-radius-4 u-m-b-10"
								v-if="tabValue == 0">
								<view class="u-m-r-30">涨幅</view>
								<view class="u-flex u-flex-items-center">
									<view class="u-m-r-10">≥</view>
									<view class="bg-white" style="width: 120px;">
										<up-input 
											v-model="zf" 
											:customStyle="{
												backgroundColor: '#fff',
												borderColor: `#bbe2e5!important`,
											}"
											></up-input>
									</view>
									<view class="u-m-l-10">%</view>
								</view>
							</view>
							<template v-if="tabValue == 1">
								<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-20 u-radius-4 u-m-b-10"
									>
									<view class="u-m-r-30">商品</view>
									<view class="u-flex u-flex-items-center u-flex-1"> 
										<view class="bg-white u-flex-1" >
											<up-input 
												v-model="prod" 
												inputAlign="right"
												:customStyle="{
													backgroundColor: '#fff',
													borderColor: `#bbe2e5!important`,
												}"
												></up-input>
										</view> 
									</view>
								</view>
							</template>
							
							<view class="u-p-20">
								<up-button size="large" :color="themeColor" shape="circle" @click="submit">搜 索</up-button>
							</view>
						</view>
					</view>
					<template v-if="tabValue == 1">
						<view class=" u-p-l-40 u-p-r-40">
							<nut-divider >
								<view class=" u-primary u-font-18">季度热点商品（点击快速检索）</view>
							</nut-divider>
						</view>
						<view class="tabs-w u-flex u-flex-items-start  box-border u-p-20 u-m-b-10 " > 
							<view class="u-flex-1 box-border item u-flex u-flex-items-start u-flex-wrap   " >
								<view v-for="item in prodlist" class="zise-tags u-m-r-10 u-m-b-10" :key="item.value">{{item.name}}</view>
							</view>
							
						</view>
					</template>
					<view class=" u-p-l-40 u-p-r-40">
						<nut-divider >
							<view class=" u-primary u-font-18">热点选股策略样例</view>
						</nut-divider>
					</view>
					<view class="u-primary-light-bg u-radius-20 u-p-25 text-base" >
						<view class="text-black u-text-center u-m-b-10">5/5+中位/2.5</view>
						<view>5/5，是指查询最近5天内且涨幅超过5％的周期股；</view>
						<view>中位/2.5，是指对上述查询结果列表，再按股价5档位置以及财报评级进行筛选。</view>
					</view>
					<view class=" u-p-l-40 u-p-r-40">
						<nut-divider >
							<view class=" u-primary u-font-18">季报选股策略样例</view>
						</nut-divider>
					</view>
					<view class="u-primary-light-bg u-radius-20 u-p-25 text-base" >
						<view class="text-black u-text-center u-m-b-10">季报开始日-当前日期/20％+中位/2.5</view>
						<view>季报开始日-当前日/20％，是指查询周期内涨幅超过20％的周期股；</view>
						<view>中位/2.5，是指对上述查询结果列表，再按股价5档位置与财报评级进行筛选。</view>
					</view>
					<view class="u-p-20 u-error u-text-center u-font-14">用户可以根据上述指南，设定适合自己的选股策略。</view>
					
				</scroll-view>
				
			</view>
		</PopupNormal>
		
	</view>
</template>

<script setup>
	const attrs = useAttrs()
	const $api = inject('$api')
	import {
		baseStore
	} from '@/stores/base'
	const base = baseStore();
	const {
		themeColor
	} = toRefs(base)
	import {
		userStore
	} from '@/stores/user'
	const user = userStore();
	const {
		user_info
	} = toRefs(user)


	const props = defineProps({
		list: {
			type: Array,
			default: () => {
				return []
			},
		},
		mode: {
			type: String,
			default: '0'
		}
	})
	const emits = defineEmits(['submit'])
	const date1show = ref(false)
	const date2show = ref(false)
	const date1 = ref(Number(new Date('2026-01-01')))
	const date2 = ref(Number(new Date()))
	const tabValue = ref(0)
	const tabslist = ref([{
			name: '按涨幅',
		},
		{
			name: '按商品',
		},
	])
	
	const prodValue = ref('5') 
	const prodlist = ref([
		{
			name: '氧化镨',
			value: '5'
		}, 
		{
			name: '氧化钕',
			value: '10'
		}, 
		{
			name: '金属镨',
			value: '20'
		}, 
		{
			name: '镨钕合金',
			value: '30'
		}, 
		{
			name: '氢氧化锂(工业级)',
			value: '60'
		}, 
		{
			name: '金属钕',
			value: '90'
		},  
	])
	const zf = ref('20')
	const prod = ref('甲醇')
	onMounted(async () => {})

	function submit() {
		emits('submit', 1)
	}

	function tabsEvent(index) {
		tabValue.value = index
		// nextTick(() => {
		// 	swiperRef.value.to(obj.index)
		// })
	}
</script>

<style lang="scss" scoped>
	.zise-tags {
		white-space: nowrap;
		// background-color: #dae8ff;
		background-color: #ece0ff; 
		border-radius: 6px;
		padding: 4px 10px; 
		color: #544cc3;
		// color: #4c81c3;
		// font-size: 14px; 
		box-sizing: border-box;
		text-align: center;
	}
	.list-w {
		height: 600px; 
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