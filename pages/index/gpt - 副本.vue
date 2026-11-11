<template>
	<view class="w  u-p-t-40"> 
		<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/index-topbj/home-top-logo.png" />
		<view class="u-p-l-10 u-p-r-10 banner"> 
		<image style="width: 100%; height: auto" mode="widthFix" src="https://cft.100ppi.com/Public/rdxg-bg/home-ban.png" /> 
			<view class="button-w text-nowrap u-flex-column u-flex-items-center u-flex-center">
				<view class="u-m-b-20 u-font-15" style="color: #111;">蓝筹股炒不动，题材股不敢炒，周期股更稳健</view>
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
						<view class="text-black u-font-16">核心原理</view> 
				    </template>
					<view>
						商品价格影响上市公司利润预期，且商品价格上涨时间 T+n(n=5/10/20/30天)领先于股票价格上涨时间，
						因此关注商品价格，挖掘潜力机会。
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames2" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">选股方法</view> 
				    </template>
					<view>
						<view>1.热点选股：利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的周期股投资机会。</view>
						<view>2.季报选股：利用季报周期内商品价格上涨幅度，提前于季报与年报，发现周期股买入信号。</view>
					</view>
			    </nut-collapse-item> 
			</nut-collapse>
		</view>
		<view class="u-radius-20 bg-white u-m-b-20" style="overflow: hidden;">
			<nut-collapse v-model="activeNames3" >
			    <nut-collapse-item :name="1" :border="false"> 
					<template #title>
						<view class="text-black u-font-16">投资策略</view> 
				    </template>
					<view>
						投资者利用"1个关键指标+2个辅助指标"规则进行选股投资，1个关键指标是指商品价格周期涨幅(如5/5，即5天涨幅超5%)，2个辅助指标是指股价90天内的5档位置与财报评级。
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
	const activeNames2 = ref([]);
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
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 25px;
		}
	}
</style>