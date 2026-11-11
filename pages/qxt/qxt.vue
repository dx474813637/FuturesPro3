<template>
	<view class="w box-border" :class="{w1: mode == 1, w2: mode == 2}" :style="{backgroundColor: analysisConfig.themeColor }"> 
		<NavBar :bgColor="bgColor"  title="" :backBtn="false" customColor="#fff" :titleStyle="`color: #fff`" placeholder ></NavBar>
		<view class="w-main u-p-t-40"> 
			<view class="text-white u-p-l-40 u-p-r-40 u-m-b-4 " style="font-size: 26px;">期货通</view>
			<!-- <view class="text-white u-p-l-40 u-p-r-40 u-m-b-10 text-thin u-font-13" >买卖周期股，就用周期掘金!</view> -->
			<view class="u-p-20" >
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
					<!-- <view class="u-flex u-flex-items-center u-flex-center  u-p-r-10" @click="gptHelpShow = true" >
						<view class="u-flex u-warning-light">
							<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
						</view>
						<view class="u-info u-font-14 text-white">指南</view>
					</view> -->
				</view>
				<view class="bg-white u-p-30 u-radius-15">
					<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10 u-p-l-12 u-p-r-12 u-radius-4  ">
						<view class="u-m-r-20">周期选择</view>
						<view class="u-flex-1 u-flex u-flex-items-center " style="position: relative;"> 
							<view class="loading-w u-flex u-flex-items-center u-flex-center" style="background-color: rgba(255,255,255,.5)" v-if="seasonConfig_loading">
								 <nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
							</view>
							<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1" @click="positionShow = true" >
								<view class="u-flex-1 u-font-13 u-p-5 text-nowrap u-text-right" >{{position_name}}</view>
								<up-icon name="arrow-down" size="18" color="#666"></up-icon> 
							</view>  
						</view>
					</view> 
					<view class="u-flex u-flex-between u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
						>
						<view class="u-m-r-20">期货商品</view>
						<view class="u-flex-1 u-flex u-flex-items-center " style="position: relative;" @click="menusShow = true"> 
							<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1" >
								<view class="u-flex-1 u-font-13 u-p-5 text-nowrap u-text-right" :class="{'u-info': !prod.dashboard_ppid}">{{prod.product || '点击选择商品'}}</view>
								<up-icon name="arrow-down" size="18" color="#666"></up-icon> 
							</view>  
						</view>
						<!-- <view class="u-flex u-flex-items-center u-flex-1" @click="menusShow = true"> 
							<view class="bg-white u-flex-1" >
								<up-input 
									v-model="prod.product" 
									inputAlign="right"
									:customStyle="{
										backgroundColor: '#fff', 
									}"
									readonly 
									placeholder="点击选择商品"
									suffixIcon="arrow-down"
								></up-input>
							</view>  
						</view> -->
					</view> 
					
					<view class=" u-m-t-30"> 
						<up-button 
							v-if="qhtVip"
							type="primary" 
							shape="circle"  
							:customStyle="{width: '70vw', fontSize: '17px', background:`linear-gradient(to top, #1678FF, #54a7ff )`}"
							@click="gotoAnalysisDetail"
						>搜 索</up-button> 
						<up-button 
							v-else
							type="primary" 
							shape="circle"  
							:customStyle="{width: '70vw', fontSize: '17px', background:`linear-gradient(to top, #1678FF, #54a7ff )`}"
							@click="gotoAnalysisDetail"
						>我要订阅</up-button> 
					</view> 
				</view>

			</view>
		
		</view>
		
	</view>
	<view class="content u-p-20" >  
		<!-- <view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;" v-if="rank_list.length > 0">
			<nut-collapse v-model="activeNames" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">{{rank_title}}</view> 
				    </template>
					<view>
						<view
							class="u-flex u-flex-items-center u-flex-between u-font-14 u-p-10 u-m-b-12 u-radius-6"
							v-for="item in rank_list"
							:key="item.id"
							:class="{
								'u-success-light-bg': item.amp.includes('-'),
								'u-error-light-bg': +item.amp.slice(0, -1) > 0, 
							}"
						>
							<view class="u-flex-1">{{item.category_name}}-{{item.name}}</view> 
							<view class="  u-flex-1 u-text-right" :class="{
									'u-success': item.amp.includes('-'),
									'u-error': +item.amp.slice(0, -1) > 0,
									'u-info': +item.amp.slice(0, -1) == 0
								}">{{item.priceB}}</view> 
							<view class="u-flex-1 u-text-right":class="{
									'u-success': item.amp.includes('-'),
									'u-error': +item.amp.slice(0, -1) > 0,
									'u-info': +item.amp.slice(0, -1) == 0
								}">{{item.amp}}</view>
						</view> 
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view> -->
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">{{infoConfig.qxt.hxyl.title}}</view> 
				    </template>
					<view>
						<u-parse :content="infoConfig.qxt.hxyl.content"></u-parse>
						<!-- <rich-text v-for="(item, index) in infoConfig.qxt.hxyl.content" :nodes="item" :key="index"> </rich-text> -->
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames2" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">{{infoConfig.qxt.jtff.title}}</view> 
				    </template>
					<view>
						<u-parse :content="infoConfig.qxt.jtff.content"></u-parse>
						<!-- <view v-for="(item, index) in infoConfig.qxt.jtff.content" :key="index">{{item}}</view> -->
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view> 
		<view class="u-text-center">
			<view class="u-warning u-font-14">
				期货通仅提供商品数据，不构成投资建议! 
			</view>
			<view class="u-warning u-font-14">
				市场有风险，投资需谨慎！
			</view> 
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	
	<MenusBar></MenusBar>
	<up-action-sheet 
		:show="positionShow"
	 	title="周期选择"
		safeAreaInsetBottom
	 	:actions="qxt_position_list"
		closeOnClickOverlay
		@close="positionShow = false"
		@select="(item) => { 
			position_type = item.value
		}"
	>
	</up-action-sheet>
	 
	 
	 <!-- 商品分类popup -->
	 <QxtPopup
	 	:show="menusShow"
	 	title="商品列表"   
	 	:onUpdateShow="handleChangeShow2"
		@confirm="menusConfirm"
	 ></QxtPopup>
	<!-- 使用指南popup -->
	<GptHotHelpPopup
		:show="gptHelpShow"
		title="条件选股指南"   
		:onUpdateShow="handleChangeShow"
	></GptHotHelpPopup>
</template>

<script setup> 
	import { timeFormat } from 'uview-plus';
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const $api = inject('$api')  
	const user = userStore() 
	const cate = useCateStore() 
	const {gpt, qht, gptVip, qhtVip} = toRefs(user) 
	const {seasonConfig_sdate, seasonConfig_loading, qxt_position_list , infoConfig} = toRefs(cate) 
	const base = baseStore() 
	const {themeColor, analysisModeList} = toRefs(base) 
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return analysisConfig.value.themeColor
	})
	const position_type = ref('sixty_day_position')
	const position_name = computed(() => qxt_position_list.value.filter(ele => ele.value == position_type.value)[0].name)
	const positionShow = ref(false)
	
	const loading_rank = ref(false)
	const rank_list = ref([])
	const rank_cover = ref([])
	const rank_title = ref('')
	
	const prod = ref({})
	const menusShow = ref(false)
	const gptHelpShow = ref(false)
	
	const activeNames = ref([1]);
	const activeNames2 = ref([]);
	const activeNames3 = ref([]);
	const mode = ref('1')  
	 
	const tabslist = ref([
		{
			name: '基差指标',
			value: '2', 
		},
		{
			name: '价格指标',
			value: '1', 
		},
	])
	const tabValue = ref('2')  
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const routeParams = computed(() => {
		return {
			m: tabValue.value,
			position: position_type.value,
			ppid: prod.value.dashboard_ppid, 
		}
	})  
	const analysisConfig = computed(() => analysisModeList.value.filter(ele => ele.value == mode.value)[0] )
	onLoad(async (options) => {
		if(options.hasOwnProperty('mode')) {
			tabValue.value = options.mode || '1'
		}
		if(options.hasOwnProperty('position')) {
			position_type.value = options.position || '10'
		}
		// 初始化riqi值
		// riqi.value = getYesterdayDate()
		// await cate.getSeasonConfigData()
		// sdate.value = seasonConfig_sdate.value[0].value
		// getRankData()
		// $api.intelligence()
	})
	onPageScroll((e) => {
		// console.log(e)
		if(e.scrollTop <= 50) {
			top.value = true 
		}
		else {
			top.value = false
		}
		
	}) 
	async function getRankData() { 
		if(loading_rank.value) return;
		loading_rank.value = true
		try{
			const res = await $api.top_hs()
			if(res.code == 1) {
				rank_list.value = res.list.res.list.slice(0, 5)
				rank_cover.value = res.list.res.list_cover
				rank_title.value = res.list.res.title
			}
		} catch(e) {
			
		}
		loading_rank.value = false
	}   
	function onChange(value , name , status ) {
	  // value：v-model 绑定值
	  // name：当前操作 collapse-item 的 name
	  // status：开启状态
	}
	
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
	function handleChangeShow(data) {
		gptHelpShow.value = data
	}
	function handleChangeShow2(data) {
		menusShow.value = data
	}
	
	function gotoAnalysisDetail() {
		if(!qhtVip.value) { 
			uni.showModal({
				title: '提示',
				content: '是否订阅期货通',
				success: function (res) {
					if (res.confirm) { 
						base.handleGoto({
							url: '/pages/order/order',
							params: {type: '2'}
						}) 
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			return
		}
		if(!routeParams.value.ppid){
			uni.showToast({
				title: '请先选择商品',
				icon: 'error'
			})
			return
		}
		base.handleGoto({
			url: '/pages/qxt/qxt_detail',
			params: {
				...routeParams.value
			}
		})
	}
	function menusConfirm(data) {
		console.log(data)
		handleChangeShow2(false)
		prod.value = data
	}
</script>

<style lang="scss" >
	page {
		background-color: #f8f8f8;
		padding-bottom: 60px;
	}
</style>
<style lang="scss" scoped>
.w {  
	position: relative;
	z-index: 1;
	padding-bottom: 10px;
	margin-bottom: 12px;
	&::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100%;
		border-bottom: 0; 
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
	}
	&.w1::after {
		border-top: 10px solid #1678FF;
	}
	&.w2::after {
		border-top: 10px solid #1678FF;
	}
	.w-main {
		position: relative; 
		z-index: 10;
	}
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 70%;
		z-index: 1;
	}
	.bg-img { 
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%; 
		overflow: hidden;
	}
}

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
				color: #1678FF;
				&::after {
					display: block;
				}
				
			}
		}
	}
</style>