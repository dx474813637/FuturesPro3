<template>
	<view class="u-p-20 u-primary-light-bg u-radius-20  " style="box-shadow: 0 0 5px rgba(89, 147, 255, 0.3);">
		<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10  u-radius-4 ">
			<view class="text-base">90天股价位置</view>
			<view class="u-flex-1 u-flex u-flex-items-center u-flex-end">
				 <view class="u-m-r-10">≤</view>
				 <view class="bg-white u-flex u-flex-items-center u-flex-end u-p-10 u-p-l-30 u-radius-6 box-border" style="width: 150px;"> 
					 <up-action-sheet-data
					 	v-model="terms_position"
					 	title="90天股价位置"
						safeAreaInsetBottom
					 	:options="[
					 		{
					 			name: '低位',
					 			value: 1,
					 		},
					 		{
					 			name: '中地位',
					 			value: 2,
					 		},
					 		{
					 			name: '中位',
					 			value: 3,
					 		},
					 		{
					 			name: '中高位',
					 			value: 4,
					 		},
					 		{
					 			name: '高位',
					 			value: 5,
					 		},
					 	]"
					>
					</up-action-sheet-data>
					<up-icon name="arrow-down-fill" size="12" color="#999"></up-icon> 
				 </view>
			</view>
		</view>
		<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10  u-radius-4 ">
			<view class="text-base">PriceSeek评分</view>
			<view class="u-flex-1 u-flex u-flex-items-center u-flex-end">
				 <view class="u-m-r-10">≥</view>
				 <view class="bg-white u-flex u-flex-items-center u-flex-end u-p-10 u-p-l-30 u-radius-6 box-border xx" style="width: 150px;"> 
					 <up-action-sheet-data
					 	v-model="terms_score"
					 	title="PriceSeek评分"
						safeAreaInsetBottom
					 	:options="[
					 		{
					 			name: '1',
					 			value: 1,
					 		},
					 		{
					 			name: '1.5',
					 			value: 1.5,
					 		},
					 		{
					 			name: '2',
					 			value: 2,
					 		},
					 		{
					 			name: '2.5',
					 			value: 2.5,
					 		},
					 		{
					 			name: '3',
					 			value: 3,
					 		},
					 		{
					 			name: '3.5',
					 			value: 3.5,
					 		},
					 		{
					 			name: '4',
					 			value: 4,
					 		}, 
					 	]"
					>
					</up-action-sheet-data>
					<up-icon name="arrow-down-fill" size="12" color="#999"></up-icon> 
				 </view>
			</view>
		</view>
		
		<vie class="u-p-l-20 u-p-r-20 u-p-t-20 box-border u-flex">
			<up-button  
				shape="circle"
				type="primary"
				@click="base.handleGoto('/pages/subscribe/gpt/analysis')"
			>股票筛选</up-button>
		</vie> 
			<view class="u-text-center u-font-13 u-info u-m-t-10">
				可再按股价五档位置及财报评分选股
			</view>
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
		},
		mode: {
			type: String,
			default: '0'
		}
	})   
	const terms_score = ref('')
	const terms_position = ref('')
	const emits = defineEmits([ 'submit'])
	const tabslist = ref([
		{
			name: '近5天',
			checked: false,
			value: '5'
		}, 
		{
			name: '近10天',
			checked: false,
			value: '10'
		}, 
		{
			name: '近20天',
			checked: false,
			value: '20'
		}, 
		{
			name: '近30天',
			checked: false,
			value: '30'
		}, 
		{
			name: '近60天',
			checked: false,
			value: '60'
		}, 
		{
			name: '近90天',
			checked: false,
			value: '90'
		},  
	])
	const zf = ref('5')
	onMounted(async () => {  
	})  
	function radioClick(name) {
		tabslist.value.map((item, index) => {
			item.checked = item.value === name ? true : false
		})
	} 
	function submit() { 
		emits('submit', 1)  
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 250px;
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
	.xx {
		::v-deep {
			.u-action-sheet-data__trigger__cover {
				z-index: 100;
			}
		}
	}
</style>