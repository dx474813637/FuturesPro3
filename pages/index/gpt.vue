<template>
	<view class="w  u-p-t-40"> 
		<!-- #ifdef MP-WEIXIN -->
		<up-status-bar></up-status-bar>
		<!-- #endif -->
		<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/index-topbj/home-top-logo.png" />
		<view class="u-m-20 u-p-20 u-radius-15  " style="background: linear-gradient(to bottom, #eefaff, #fff, #eefaff);"> 
			<view class="u-m-b-20 u-p-10 u-font-15">
				<view class="u-font-15" style="color: #3B4978">
					<view class="u-font-16 ">选择周期掘金的3个理由：</view>
					<view class=" u-radius-5 u-m-t-10">1、蓝筹股炒不动，题材股不敢炒，周期股风险低、收益稳、机会多</view>
					<view class=" u-radius-5 u-m-t-10">2、商品价格上涨往往领先于股票价格上涨，因此可以利用这个"时间差”，提前买入股票；</view>
					<view class=" u-radius-5 u-m-t-10">3、周期掘金包括500+个商品与1000+只股票，让选股更简单</view>
				</view>
			</view>
		<!-- <image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/rdxg-bg/home-ban.png" /> -->
			<view class="button-w text-nowrap u-flex-column u-flex-items-center u-flex-center u-m-b-20">
				<!-- <view class="u-m-b-20 u-font-15" style="color: #111;">蓝筹股炒不动，题材股不敢炒，周期股更稳健</view> -->
				<template v-if="gptVip">
					<view class="u-flex u-flex-items-center u-flex-center">
						<view class="u-radius-25 text-white u-p-12 u-m-r-14 u-p-l-60 u-p-r-60 u-text-center u-font-16 u-primary-bg" @click="base.handleGoto({url: '/pages/analysis/analysis', params: {mode:'1'}} )" >热点选股</view>
						<view class="u-radius-25 text-white u-p-12 u-m-l-14 u-p-l-60 u-p-r-60 u-text-center u-font-16 u-primary-bg" @click="base.handleGoto({url: '/pages/analysis/analysis', params: {mode:'2'}} )" >季报选股</view>
					</view>
				</template>
				<template v-else>
					<view class="u-flex u-flex-items-center u-flex-center">
						<view class="u-radius-25 text-white u-p-12 u-m-r-14 u-p-l-60 u-p-r-60 u-text-center u-font-16 u-primary-bg" @click="gotoGPT" >我要订阅</view>
						<view class="u-radius-25 text-white u-p-12 u-m-l-14 u-p-l-60 u-p-r-60 u-text-center u-font-16" style="background-color: #81a3ff;" @click="base.handleGoto({url: '/pages/index/hd/hd', params: {mode:'2'}} )" >参加活动免费试用</view>
					</view>
				</template>
			</view>
		</view>
		
	</view>
	<view class="content u-p-20" >
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">如何买？</view> 
				    </template>
					<view>
						<view class="u-m-b-20 u-font-15" style="color: #3B4978">
							利用1个关键指标（n天+x%）,锁定商品周期股列表，再利用2个辅助指标（股价5档位置与财报评级），进行二次筛选，确定今日可买入股票。
						</view>
						<view class="u-m-b-30 u-radius-20 u-p-10 u-p-l-30 u-p-r-30 u-primary u-font-15" style="border: 1rpx solid #007aff;display: inline-block;">1个关键指标(一次筛选)</view>
						<view class="u-m-b-10">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/gptguide/cz-1.png" />
						</view >
						<view class="u-m-b-30">在“热点选股”中利用“N天涨幅≥X%”条件筛选出对应商品的上市公司列表(盘子不宜过大)。</view>
						<view class="u-m-b-20 u-radius-20 u-p-10 u-p-l-30 u-p-r-30 u-primary u-font-15" style="border: 1rpx solid #007aff;display: inline-block;">2个辅助指标(二次筛选)</view> 
						<view class="u-m-b-30 text-bold u-font-15">1、90天内的5档位置</view>
						<view class="u-m-b-10">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/gptguide/cz-2.png" />
						</view>
						<view class="u-m-b-30 text-bold u-font-15">2、财报评级</view>
						<view class="u-m-b-10">
							<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/gptguide/cz-3.png" />
						</view>
						<view>建议股价5档位置指标(高位、中高位、中位、中低位、低位)作为重要考虑指标，财报评级作为次要考虑指标。</view>
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames2" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">如何卖？</view> 
				    </template>
					<view>
						<view class="u-m-b-10">无论盈亏，持仓满N天无条件卖出(持仓期限自己设定)。中途涨停且封单牢固，则可继续持有，享受连板收益。次日开盘后涨停，但10点前反复开板、封单快速减少，立即卖出。</view>
						<view>投资有风险，需结合自身情况理性决策，欢迎订阅周期掘金。</view> 
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view> 
		<view class="u-text-center u-p-t-30">
			<view class="u-info u-font-14">
				股票通仅提供商品价格数据，不构成投资建议! 
			</view>
			<view class="u-info u-font-14">
				市场有风险，投资需谨慎！
			</view> 
		</view>
	</view>
	<u-safe-bottom></u-safe-bottom>
	<MenusBar ></MenusBar>
</template>

<script setup>
	import {userStore } from '@/stores/user.js'  
	import {useCateStore, baseStore} from '@/stores/base.js' 
	const user = userStore() 
	const base = baseStore() 
	const $api = inject('$api')    
	const {gpt, qht, gptVip} = toRefs(user) 
	const activeNames = ref([1]);
	const activeNames2 = ref([1]);
	const activeNames3 = ref([]);
	 // const {
		// proxy
	 // } = getCurrentInstance();
	onLoad(async () => {
			// await user.getUserSubscription()
		nextTick(() => {
			// messageManager.showText('1这是一条来自全局组件的消息') 
			// proxy.$refs.globalToast.showText('12')
		})
		
	})   
	function gotoGPT() {
		// if(gptVip.value) {
		// 	base.handleGoto('/pages/analysis/analysis' )
		// 	return 
		// }
		uni.showModal({
			title: '提示',
			content: '是否订阅股票通',
			success: function (res) {
				if (res.confirm) { 
					base.handleGoto({
						url: '/pages/order/order',
						params: {type: '3'}
					}) 
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
		
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #D3E4FF;
		padding-bottom: 60px;
	}
</style>
<style lang="scss">
	.w {
		position: relative;
		background-image: url('https://cft.100ppi.com/Public/rdxg-bg/home-topbg.png');
		background-repeat: no-repeat;
		background-position: 0 0;
		background-size: 100% auto;
	} 
	.banner {
		position: relative;
		.button-w {
			// position: absolute;
			// left: 50%;
			// transform: translateX(-50%);
			// bottom: 25px;
		}
	}
</style>