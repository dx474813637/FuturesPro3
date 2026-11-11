<template>
	<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
		<view class="tabs-w u-flex u-flex-items-center">
			<view 
				class="tabs-item u-m-l-20 u-m-r-20 u-font-16"
				v-for="item in tabslist"
				:key="item.value"
				:class="{
					active: item.value == tabValue
				}"
				@click="tabsEvent(item)"
			> 
				{{item.name}} 
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-center  u-p-r-10">
			<view class="u-flex u-warning-light">
				<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
			</view>
			<view class="u-info u-font-14 text-white">条件选股指南</view>
		</view>
	</view>
	<view class="bg-white u-p-30 u-radius-15">
		<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10 u-p-l-12 u-p-r-12 u-radius-4  ">
			<view class="u-m-r-20">日期</view>
			<view class="u-flex-1 u-flex u-flex-items-center ">
				<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4" style="border-color: #e6d9d9!important;">
					<up-icon name="calendar" size="18" color="#666"></up-icon> 
					<up-action-sheet-data
					 	v-model="date1"
					 	title="起始日期"
						safeAreaInsetBottom
					 	:options="date1List"
					>
					</up-action-sheet-data> 
				</view>
				<view class="u-p-5 u-m-l-10 u-m-r-10">至</view>
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
								borderColor: `#e6d9d9!important`,
							}
						}"
						@close="date2show = false" 
						@cancel="date2show = false" 
					></up-datetime-picker>
				</view>
			</view>
		</view>
		<view class="u-flex u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
			v-if="tabValue == 1">
			<view class="u-m-r-20">涨幅 ≥ </view>
			<view class="u-flex u-flex-items-center u-flex-1"> 
				<view class="bg-white u-flex-1" >
					<up-input 
						v-model="zf"
						inputAlign="right"
						:customStyle="{
							backgroundColor: '#fff',
							borderColor: `#e6d9d9!important`,
						}"
						></up-input>
				</view>
				<view class="u-m-l-10">%</view>
			</view>
		</view>
		<template v-if="tabValue == 2">
			<view class="u-flex u-flex-between u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
				>
				<view class="u-m-r-20">商品</view>
				<view class="u-flex u-flex-items-center u-flex-1"> 
					<view class="bg-white u-flex-1" >
						<up-input 
							v-model="prod" 
							inputAlign="right"
							:customStyle="{
								backgroundColor: '#fff',
								borderColor: `#e6d9d9!important`,
							}"
							></up-input>
					</view> 
				</view>
			</view>
		</template>
		
		<view class=" u-m-t-30"> 
			<up-button 
				type="error" 
				shape="circle"  
				:customStyle="{width: '70vw', fontSize: '17px', background:`linear-gradient(to top, #E62C3B, #ff5d68 )`}"
			>搜 索</up-button> 
		</view>
		<!-- <view class=" ">
			<up-button size="large" :color="themeColor" shape="circle" @click="submit">搜 索</up-button>
		</view> -->
	</view>
</template>

<script setup>
	const zf = ref('20')
	const date2show = ref(false) 
	const date2 = ref(Number(new Date()))
	const date1 = ref('2026-01-01')
	const date1List = ref([
		{
			name: '2026-01-01',
			value: '2026-01-01',
		}, 
		{
			name: '2025-10-01',
			value: '2025-10-01',
		}, 
		{
			name: '2025-07-01',
			value: '2025-07-01',
		}, 
		{
			name: '2025-04-01',
			value: '2025-04-01',
		}, 
	])
	 
	const tabslist = ref([
		{
			name: '按涨幅',
			value: '1'
		},
		{
			name: '按商品',
			value: '2'
		}
	])
	const tabValue = ref('1')  
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	
	function tabsEvent (obj) {  
		if(obj.disabled) {
			// nextTick(() => {
			// 	messageManager.showText('敬请期待'); 
				
			// })
			return
		}
		tabValue.value = obj.value
		// nextTick(() => {
		// 	swiperRef.value.to(obj.index)
		// })
	}
</script>

<style lang="scss" scoped>
	.tabs-w {
		.tabs-item {
			background-color: rgba(255,255,255,.4);
			color: #fff;
			border-radius: 6px;
			padding: 3px 20px; 
			position: relative;
			&::after {
				content: '';
				position: absolute;
				top: 100%;
				left: 50%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-bottom: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid #fff;
				display: none;
			}
			&.active {
				background-color: #fff;
				color: #E62C3A;
				&::after {
					display: block;
				}
				
			}
		}
	}
</style>