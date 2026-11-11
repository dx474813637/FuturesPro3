<template>
	<view class="w box-border " :class="{w1: mode == 1, w2: mode == 2}" :style="{backgroundColor: '#E3EDFE' }"> 
		 
		 <NavBar bgColor="transparent"  title="" customColor="#212634" :titleStyle="`color: #212634`" :fixed="false" placeholder ></NavBar>
		<view class="w-main  ">
			<!-- <view class="u-p-l-30 u-p-r-30 u-p-t-40 u-p-b-10" v-if="false">
				<view class="u-font-16 u-m-b-12 text-l1 text-bold u-p-l-10" style="font-style: italic;">一周<text class="text-error">领涨</text></view>
				<view class="  u-p-30 u-radius-16 bg-white  " style="border: 1rpx solid #d3ddec;">
					
					<view class="u-flex u-flex-items-end u-flex-between zd-card"> 
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
				</view>
				
			</view> -->
			<!-- <view class="u-flex u-flex-end u-p-t-10 ">
				<view class="">
					<view 
						class="bg-white u-p-4 u-p-l-20 u-p-r-20 u-font-14 text-thin" 
						style="border-radius: 4px 0 0 4px;"
						@click="changeMode"
					>
						{{mode == '1' ? '季报选股' : '热点选股'}}
					</view>
				</view>
			</view> -->
			
			<view class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20">
				<up-subsection 
					:list="btnlist" 
					mode="button" 
					:current="btncurrent" 
					fontSize="18"
					:bold="false"
					activeColor="#FF3A3B"
					inactiveColor="#999293"
					:customStyle="{height: '50px', borderRadius: '8px', padding: '4px'}"
					bgColor="#dbe5f3"
					@change="btnChange"
				></up-subsection>
			</view>
			<template v-if="mode == '1'">
				<!-- <view class="text-l1 u-text-center u-p-t-20 u-m-b-12" style="font-size: 26px;">热点选股</view> -->
				<view class="u-text-center text-l3 text-thin u-m-b-12" >{{riqi}}</view>
				<!-- 热点选股搜索框 -->
				<view class="u-p-20 u-p-l-30 u-p-r-30">
					<view class="bg-white u-p-20  u-p-l-30 u-p-r-30  u-radius-16">
						<view class="u-text-center text-l2 u-font-17">热点商品搜索</view>
						<view class="u-flex u-flex-items-center u-flex-center u-m-t-20 u-m-b-20">
							<view class="u-flex u-flex-items-center u-m-r-20 u-flex-1" style="flex: 0 0 40%">
								<view class="text-nowrap text-base">天数：</view>
								<view class="u-flex u-flex-items-center u-border bg-white u-p-12 u-radius-8 u-flex-1" @click="byShow = true">
									<view class="u-flex-1 u-font-13 u-p-5" >{{byName}}</view>
									<up-icon name="arrow-down-fill" size="12" color="#999"></up-icon> 
								</view>
							</view>
							<view class="u-flex u-flex-items-center u-flex-1" style="flex: 0 0 40%">
								<view class="text-nowrap text-base">涨幅 ≥ </view>
								<view class="u-flex u-flex-items-center u-m-l-20 ">
									<view class="u-border u-p-12 u-radius-8 bg-white">
										<up-input
											v-model="zf1"
											placeholder="涨幅" 
											border="none"
											clearable
										  ></up-input> 
									</view>
									  <view class="u-m-l-10">％</view>
								</view>
							</view>
						</view>
						<view class=""> 
							<up-button 
								type="error"  
								:customStyle="{width: '70vw', borderRadius: '8px', fontSize: '16px', backgroundColor: 'var(--brand-red)' }"
								@click="gotoAnalysisDetail"
							>搜 索</up-button> 
						</view>
						<view class="u-flex u-flex-items-center u-flex-center u-p-t-20">
							<view class="u-flex u-flex-items-center" @click="gptHelpShow = true">
								<view class="u-flex u-warning">
									<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
								</view>
								<view class="text-l3 u-font-14">条件选股指南</view> 
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-if="mode == '2'"> 
			
				<!-- <view class="text-l1 u-p-l-40 u-p-r-40 u-m-b-4 " style="font-size: 26px;">季报选股</view> -->
				<!-- <view class="text-l2 u-p-l-40 u-p-r-40 u-m-b-12   u-font-13" >买卖周期股，就用周期掘金!</view> -->
				<view class="u-p-20 u-p-l-30 u-p-r-30" >
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
						<view class=" u-flex u-flex-items-center u-flex-center  u-p-r-10" @click="gptHelpShow = true" v-if="tabValue == '1'">
							<view class="u-flex text-orange ">
								<nut-icon name="xuzhi" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
							</view>
							<view class="u-info u-font-14 text-l3">条件选股指南</view>
						</view>
					</view>
					<view class="bg-white  u-p-20  u-p-l-30 u-p-r-30 u-radius-15">
						<view class="u-flex u-flex-between u-flex-items-center u-flex-1 u-p-10 u-p-l-12 u-p-r-12 u-radius-4  ">
							<view class="u-m-r-20">日期</view>
							<view class="u-flex-1 u-flex u-flex-items-center " style="position: relative;"> 
								<view class="loading-w u-flex u-flex-items-center u-flex-center " style="background-color: rgba(255,255,255,.5)" v-if="seasonConfig_loading">
									 <nut-icon name="loading" size="20" custom-color="#007aff"></nut-icon>
								</view>
								<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1 bg-white" @click="sdateShow = true" >
									<up-icon name="calendar" size="18" color="#666"></up-icon> 
									<view class="u-flex-1 u-font-13 u-p-5 text-nowrap" >{{sdate}}</view>
								</view> 
								<view class="u-p-5 u-m-l-10 u-m-r-10">至</view>
								<view class="u-flex u-flex-items-center u-border u-p-12 u-radius-4 u-flex-1 bg-white" @click="edateShow = true" >
									<up-icon name="calendar" size="18" color="#666"></up-icon> 
									<view class="u-flex-1 u-font-13 u-p-5 text-nowrap" >{{edateString}}</view>
								</view> 
							</view>
						</view>
						<view class="u-flex u-flex-items-center u-flex-1  u-p-10 u-p-l-12 u-p-r-12 u-radius-4  "
							v-if="tabValue == 1">
							<view class="u-m-r-20">涨幅 ≥ </view>
							<view class="u-flex u-flex-items-center u-flex-1"> 
								<view class="bg-white u-flex-1" >
									<up-input 
										v-model="zf2"
										inputAlign="right"
										:customStyle="{
											backgroundColor: '#fff', 
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
								<view class="u-flex u-flex-items-center u-flex-1" @click="menusShow = true"> 
									<view class="bg-white u-flex-1" >
										<up-input 
											v-model="prod.name" 
											inputAlign="right"
											:customStyle="{
												backgroundColor: '#fff', 
											}"
											readonly 
											placeholder="点击选择商品"
											suffixIcon="arrow-down"
										></up-input>
									</view>  
								</view>
							</view>
						</template>
						
						<view class=" u-m-t-12"> 
							<up-button 
								type="error"  
								:customStyle="{width: '70vw', borderRadius: '8px', fontSize: '16px', backgroundColor: 'var(--brand-red)' }"
								@click="gotoAnalysisDetail"
							>搜 索</up-button> 
						</view> 
					</view>

				</view>
			</template>
		</view>
		
	</view>
	<view class="content u-p-20 u-p-l-30 u-p-r-30" > 
		<view class="u-radius-20 bg-white u-m-b-12" style="overflow: hidden;">
			<nut-collapse v-model="activeNames" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-l1 u-font-16">周期掘金核心原理：</view> 
				    </template>
					<view class="text-l2">
						<view class="u-m-b-12 u-font-15" >
							商品价格影响上市公司利润预期，且商品价格往往领先于股票价格上涨，因此可以利用这一上涨“时间差”，挖掘潜力机会！
						</view> 
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-16 bg-white u-m-b-12" style="overflow: hidden;">
			<nut-collapse v-model="activeNames2" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-l1 u-font-16">如何买？</view> 
				    </template>
					<view class="text-l2">
						<view class="u-m-b-24 u-font-15" >
							利用1个关键指标（n天+x%）,锁定商品周期股列表，再利用1个辅助指标（股价5档位置）<!-- 再利用2个辅助指标（股价5档位置与财报评级） -->，进行二次筛选，确定今日可关注股票。
						</view>
						<view class="u-m-b-12 " >
							<up-button type="primary" plain 
								:customStyle="{borderColor: '#ffdcdc', backgroundColor: '#fff2f2', height: '30px',padding: '0 16px', borderRadius: '8px'}"  
							>1个关键指标(一次筛选)</up-button> 
						</view>
						<view class="u-m-b-10">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://gx.h5.100ppi.com/Public/gptguide/cz-11.png" />
						</view >
						<view class="u-m-b-24">在“热点选股”中利用“N天涨幅≥X%”条件筛选出对应商品的上市公司列表(盘子不宜过大)。</view>
						<view class="u-m-b-12 " >
							<up-button type="primary" plain 
								:customStyle="{borderColor: '#ffdcdc', backgroundColor: '#fff2f2', height: '30px',padding: '0 16px', borderRadius: '8px'}"  
							>1个辅助指标(二次筛选)</up-button> 
						</view> 
						<view class="u-m-b-12 text-bold u-font-15">1、90天内的5档位置</view>
						<view class="u-m-b-10">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://gx.h5.100ppi.com/Public/gptguide/cz-21.png" />
						</view>
						<!-- <view class="u-m-b-12 text-bold u-font-15">2、财报评级</view>
						<view class="u-m-b-12">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://gx.h5.100ppi.com/Public/gptguide/cz-31.png" />
						</view>
						<view>建议股价5档位置指标(高位、中高位、中位、中低位、低位)作为重要考虑指标，财报评级作为次要考虑指标。</view> -->
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-12" style="overflow: hidden;">
			<nut-collapse v-model="activeNames3" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-l1 u-font-16">如何卖？</view> 
				    </template>
					<view class="text-l2">
						<view class="u-m-b-12">1、设置持仓周期n天即买入n天后，不管盈亏卖出</view>
						<view class="u-m-b-12">2、累计涨幅达到x%卖出</view>
						<view class="u-m-b-12">3、遇第1个涨停后，次日10点左右，如果没有第2个涨停，则卖出，如果涨停，继续按此规则进入下一个交易日....</view>
						<view class="">上述参数由用户自己设定。</view>
					</view> 
			    </nut-collapse-item> 
			</nut-collapse>
		</view> 
		<!-- <view class="u-radius-16 bg-white u-m-b-12" style="overflow: hidden;">
			<nut-collapse v-model="activeNames4" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">Priceseek的评分维度</view> 
				    </template>
					<view style="color: #6E75A3;">
						<view class="  ">
							<text class="text-bold  " style="color: #548DD4;">一、基于上市公司最新财报，分别评析5个维度的指标(满分都是5分)：</text> 
						</view>
						<view class=" ">
							1、成长性
						</view> 
						<view class=" ">
							2、盈利质量
						</view> 
						<view class=" ">
							3、财务风险
						</view> 
						<view class=" ">
							4、行业景气度
						</view> 
						<view class=" ">
							5、估值水平
						</view> 
						<view class="  u-m-t-20"> 
							<text class="text-bold  " style="color: #548DD4;">二、根据以下各维度的经验权重，计算加权平均分：</text> 
						</view>
						<view class=" ">
							成长性  30%
						</view> 
						<view class=" ">
							盈利质量  20%
						</view> 
						<view class=" ">
							财务风险  25%
						</view> 
						<view class=" ">
							行业景气度  15%
						</view> 
						<view class=" ">
							估值水平  10%
						</view> 
					</view> 
			    </nut-collapse-item> 
			</nut-collapse>
		</view> -->
		<view class=" ">
			<SafeInfo></SafeInfo>
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	 
	<up-action-sheet 
		:show="byShow"
	 	title="天数"
		safeAreaInsetBottom
	 	:actions="byList"
		closeOnClickOverlay
		@close="byShow = false"
		@select="(item) => { 
			by = item.value
		}"
	>
	</up-action-sheet>
	<up-action-sheet 
		:show="sdateShow"
	 	title="起始日期"
		safeAreaInsetBottom
	 	:actions="seasonConfig_sdate"
		closeOnClickOverlay
		@close="sdateShow = false"
		@select="(item) => { 
			sdate = item.value
		}"
	>
	</up-action-sheet>
	<up-datetime-picker  
		:show="edateShow" 
		v-model="edate" 
		mode="date"
		title="截止日期"
		:maxDate="Number(new Date()) - 60*60*24*1000"
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
		@confirm="(item) => { 
			edate = item.value
			edateShow = false
		}" 
		@close="edateShow = false" 
		@cancel="edateShow = false" 
	></up-datetime-picker> 
	 
	 <!-- 商品分类popup -->
	 <MenusPopup
	 	:show="menusShow"
	 	title="商品分类"   
	 	:onUpdateShow="handleChangeShow2"
		@confirm="menusConfirm"
	 ></MenusPopup>
	<!-- 使用指南popup -->
	<GptHotHelpPopup
		:show="gptHelpShow"
		title="条件选股指南"   
		:onUpdateShow="handleChangeShow"
	></GptHotHelpPopup>
	<ShareBtn
		:shareData="shareData"
	></ShareBtn>
	<MenusBar></MenusBar>
</template>

<script setup> 
	import { timeFormat } from 'uview-plus';
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const $api = inject('$api')  
	const user = userStore() 
	const cate = useCateStore() 
	const {seasonConfig_sdate, seasonConfig_loading, infoConfig, name} = toRefs(cate) 
	const base = baseStore() 
	const {themeColor, analysisModeList} = toRefs(base) 
	const top = ref(true)
	const bgColor = computed(() => {
		if(top.value) return 'transparent'
		return analysisConfig.value.themeColor
	})
	const btnlist = ref([
		{
			name: '热点选股'
		},
		{
			name: '季报选股'
		},
	]);  
	const prod = ref({})
	const menusShow = ref(false)
	const gptHelpShow = ref(false)
	const activeNames = ref([1]);
	const activeNames2 = ref([]);
	const activeNames3 = ref([]);
	const activeNames4 = ref([]);
	const mode = ref('1')
	const btncurrent = computed(() => {
		if(mode.value == '1') return 0
		return 1
	})
	const riqi = ref('')
	const zf1 = ref('5')
	const byShow = ref(false)
	const by = ref('5') 
	const byName = computed(() => byList.value.filter(ele => ele.value == by.value)[0].name)
	const byList = ref([
		{
			name: '5天',
			value: '5',
		}, 
		{
			name: '10天',
			value: '10',
		}, 
		{
			name: '20天',
			value: '20',
		}, 
		{
			name: '30天',
			value: '30',
		}, 
		{
			name: '60天',
			value: '60',
		}, 
		{
			name: '90天',
			value: '90',
		}, 
	])
	
	const zf2 = ref('20')
	const sdate = ref('')
	const sdateShow = ref(false) 
	
	const zd_list = ref([])
	
	const edateShow = ref(false)
	const edate = ref(Number(new Date()) - 60*60*24*1000)
	const edateString = computed(() => timeFormat(edate.value, 'yyyy-mm-dd')) 
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
	const shareData = ref({})  
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const routeParams = computed(() => {
		if(mode.value == '1') {
			return {
				m: mode.value,
				by: by.value,
				zf: zf1.value,
			}
		} 
		let obj = {
			m: mode.value,   
			sd: sdate.value,
			ed: edateString.value,
		} 
		if(tabValue.value == '1') obj.zf = zf2.value
		else {
			obj.pp = prod.value.id
			obj.cg = prod.value.pid
		}
		return obj
	})  
	const analysisConfig = computed(() => analysisModeList.value.filter(ele => ele.value == mode.value)[0] )
	onLoad(async (options) => {
		if(options.hasOwnProperty('mode')) {
			mode.value = options.mode || '1'
		}
		// 初始化riqi值
		riqi.value = getYesterdayDate()
		getZdData()
		const res = await cate.getSeasonConfigData()
		shareData.value = res
		sdate.value = seasonConfig_sdate.value[0].value
		 
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
	async function getZdData() {
		const res = await $api.gpt_zd();
		if(res.code == 1) {
			zd_list.value = res.list.res.list
		}
	}
	// 计算前一天的日期，格式为YYYY-MM-DD
	function getYesterdayDate() {
		const date = new Date()
		date.setDate(date.getDate() - 1)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}
	function btnChange(index) {
		if(index == 1) mode.value = '2'
		else  mode.value = '1' 
	}
	function changeMode() {
		if(mode.value == '1') mode.value = '2'
		else mode.value = '1'
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
		base.handleGoto({
			url: '/pages/analysis/analysis_detail',
			params: {
				...routeParams.value
			}
		})
	}
	function menusConfirm(data) {
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
		border-top: 10px solid var(--bg-blue-tint-1);
	}
	&.w2::after {
		border-top: 10px solid var(--bg-blue-tint-1);
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
			background-color: #f8f8f8;
			color: #aaa;
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
				color: var(--brand-red);
				&::after {
					display: block;
				}
				
			}
		}
	}
</style>