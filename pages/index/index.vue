<template>
	<view class="page-w">
		<!-- 1. 顶部区域: Logo + 项目名称 -->
		<view class="header-section">
			<NavBar bgColor="transparent" title="" :backBtn="false" customColor="#212634"
				:titleStyle="`color: #212634`">
				<template #left>
					<view></view>
				</template>
			</NavBar>
		</view>

		<view class=" bg-white " v-if="homeData.ad">
			<image :src="homeData.ad" mode="widthFix" style="width: 100%; height: auto; display: block " />
		</view>
		<view class=" bg-white u-m-b-12 u-p-t-20 u-p-b-30">
			<view class="u-flex u-flex-items-center">
				<view class="u-flex-1 u-flex-column u-flex-items-center u-flex-center" v-for="item in navData"
					:key="item.id" @click="tabsClick(item)">
					<view class="u-m-b-8">
						<image :src="item.white_icon" mode="widthFix"
							style="width: 25px; height: 25px; display: block;  " />
					</view>
					<view class="text-l1 u-font-13">{{item.name}}</view>
				</view>
			</view>
		</view>


		<!-- 热点股票 -->
		<view class="case-section u-p-30 u-m-b-24 bg-white u-radius-16">
			<view class="u-flex u-flex-between u-flex-items-center u-m-b-16">
				<view class="u-font-16 text-l1 text-bold u-p-l-10" style="letter-spacing: 1px;">近期<text
						class="text-brand-red">热股</text></view> 
				<view class="u-text-center text-grey u-font-23 u-p-r-20 ">{{dateRange}}</view> 
			</view>
			<!-- <view class="section-header u-flex u-flex-between u-flex-items-center u-m-b-20">
				<view class="section-title text-l1 u-font-18  ">近期热股</view>
			</view> -->

			<view class="u-flex   u-flex-items-center u-p-6">
				<view class="item-stock u-border u-radius-8 u-flex-column u-flex-items-center u-p-t-20  "
					v-for="item in stockDetail" :key="item.id">
					<view class="text-l1  u-m-b-6 u-font-15 text-bold">{{item.stock}}</view>
					<view class="text-l3 u-m-b-12 u-font-14">{{item.pname}}</view>
					<view class="text-bold text-brand-red u-m-b-6 u-font-18">{{item.max_rate}}%</view>
					<view class="text-l3 u-m-b-12 u-font-12">最高涨幅</view>
					<view class="item-stock-bg u-p-t-10 u-p-b-10 u-font-13">{{item.max_date}}</view>
				</view>
			</view>
		</view>
		<!-- 3. 案例卡片布局 -->
		<view class="case-section u-m-b-24 bg-white u-radius-16" style="overflow: hidden">
			<!-- <view class="section-header u-flex u-flex-between u-flex-items-center u-m-b-20">
				<view class="section-title text-l1 u-font-18  ">快讯</view>
				<view class="section-more u-flex u-flex-items-center text-l3 u-font-13" @click="base.handleGoto('/pages/index/daily')">
					<text>更多案例</text>
					<nut-icon name="right" size="12" custom-color="#939AAA"></nut-icon>
				</view>
			</view> -->
			<view class="u-p-t-24 u-p-l-30 u-p-r-30">
				<up-tabs :list="lanmulist" :current="lanmuIndex" lineColor="#fff" lineHeight="0" :activeStyle="{
						backgroundColor: 'var(--func-rise)', 
						color: 'rgba(255,255,255, 1)',
						padding: '3px 18px',
						borderRadius: '16px',
						fontSize: '16px',
						boxSizing: 'border-box', 
						height: '28px', 
					}" :inactiveStyle="{
						color: 'var(--text-l1)', 
						backgroundColor: 'rgba(255,255,255, .6)',
						padding: '3px 18px',
						borderRadius: '16px',
						fontSize: '16px',
						boxSizing: 'border-box',
						height: '28px'
					}" itemStyle=" height: auto; padding: 5px 3px 5px 3px ; transition: all .3s" @click="lanmuEvent"></up-tabs>
			</view>
			<!-- 空状态 -->
			<view class="empty-case bg-white u-radius-8 u-p-30 u-text-center" v-if="loading">
				<view class="text-l3 u-font-14">加载中...</view>
			</view>
			<view v-else>
				<!-- 快讯 -->
				<template v-if="lanmuCurItems.type == 1">
					<view class="u-p-t-30 u-p-l-30 u-p-r-30">
						<nut-steps direction="vertical" progress-dot>
							<nut-step v-for="item in lanmuData" :key="item.id"
								@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id}})">
								<template #title>
									<!-- <view class="u-info u-font-14">{{item.pubDate}}</view> -->
									<view class="text-l2   u-font-12  ">{{item.edit_date}}</view>
								</template>
								<template #content>
									<view class="text-l1  u-m-b-6 u-font-15 u-line-2" style="line-height: 15px;">
										{{item.title}}</view>
									<view class="text-l2 u-m-b-24 u-font-14 u-p-t-10  u-line-3"
										style="line-height: 15px;">{{item.content}}</view>
								</template>
							</nut-step>
						</nut-steps>
					</view>
					<view>
						<view class=" u-border-top u-p-12   u-m-t-20"
							style="border-color: #f2f5f7!important; background: linear-gradient(to bottom, #fff, #f1f4f5); border-radius: 0 0 16px 16px; overflow: hidden;"
							@click="base.handleGoto({url: '/pages/index/daily'})">
							<view class="text-l3 u-font-14 u-text-center">更多快讯</view>
						</view>
					</view>
				</template>

				<!-- 发现/案例 -->
				<template v-if="lanmuCurItems.type == 2">
					<view class="case-list u-p-l-30 u-p-r-30 u-p-t-20" v-if="lanmuData.length > 0">
						<view class="case-card   u-p-t-6 u-p-b-6 u-m-b-12 u-border-bottom " v-for="item in lanmuData"
							:key="item.id"
							@click="base.handleGoto({url: '/pages/index/news_detail', params: {id: item.id, al: 1}})">
							<view>
								<view class="case-card-title text-l1 u-font-16 u-m-b-12  text-ellipsis-2 "
									style="word-break: break-all">
									{{item.title}}
								</view>
								<view class="u-flex u-flex-between u-flex-items-center">
									<view class="u-flex   u-flex-items-center">
										<view
											class="text-l3 u-font-12 u-radius-4 u-p-2 u-p-l-16 u-p-r-16 text-brand-blue u-m-r-12  "
											style="background-color: #F1F7FF;" v-if="item.pname"># {{item.pname}}</view>
										<view class="text-l2 u-font-12 u-p-6" v-if="item.type">
											<template v-if="item.type == 1">快讯</template>
											<template v-if="item.type == 2">发现</template>
										</view>
									</view>
									<view class="text-l3 u-font-12">{{ timeFrom(new Date(item.edit_date).getTime())  }}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view>
						<view class=" u-border-top u-p-12   u-m-t-20"
							style="border-color: #f2f5f7!important; background: linear-gradient(to bottom, #fff, #f1f4f5); border-radius: 0 0 16px 16px; overflow: hidden;"
							@click="base.handleGoto({url: '/pages/index/al'})">
							<view class="text-l3 u-font-14 u-text-center">更多发现</view>
						</view>
					</view>

				</template>
			</view>


		</view>

		<!-- 4.   -->
		<view class="news-section u-m-b-24">
			<view class="u-radius-20 bg-white u-m-b-12" style="overflow: hidden;">
				<nut-collapse v-model="activeNames">
					<nut-collapse-item :name="1" :border="false" icon="rect-down">
						<template #title>
							<view class="text-l1 u-font-16 text-bold " style="letter-spacing: 1px;">周期掘金<text
									class="text-brand-red">核心原理</text></view>
						</template>
						<view class="text-l2">
							<view class="u-m-b-12 u-font-15">
								商品价格影响上市公司利润预期，且商品价格往往领先于股票价格上涨，因此可以利用这一上涨“时间差”，挖掘潜力机会！
							</view>
						</view>
					</nut-collapse-item>
				</nut-collapse>
			</view>
			<view class="u-radius-16 bg-white u-m-b-12" style="overflow: hidden;">
				<nut-collapse v-model="activeNames2">
					<nut-collapse-item :name="1" :border="false" icon="rect-down">
						<template #title>
							<view class="text-l1 u-font-16 text-bold" style="letter-spacing: 1px;">如何<text
									class="text-brand-red">买</text></view>
						</template>
						<view class="text-l2">
							<view class="u-m-b-24 u-font-15">
								利用1个关键指标（n天+x%）,锁定商品周期股列表，再利用1个辅助指标（股价5档位置）<!-- 再利用2个辅助指标（股价5档位置与财报评级） -->，进行二次筛选，确定今日可关注股票。
							</view>
							<view class="u-m-b-12 ">
								<up-button type="primary" plain
									:customStyle="{borderColor: '#ffdcdc', backgroundColor: '#fff2f2', height: '30px',padding: '0 16px', borderRadius: '8px'}"
									 >1个关键指标(一次筛选)</up-button>
							</view>
							<view class="u-m-b-10">
								<image style="width: 100%; height: auto" mode="widthFix"
									src="https://gx.h5.100ppi.com/Public/gptguide/cz-11.png" />
							</view>
							<view class="u-m-b-24">在“热点选股”中利用“N天涨幅≥X%”条件筛选出对应商品的上市公司列表(盘子不宜过大)。</view>
							<view class="u-m-b-12 ">
								<up-button type="primary" plain
									:customStyle="{borderColor: '#ffdcdc', backgroundColor: '#fff2f2', height: '30px',padding: '0 16px', borderRadius: '8px'}"
									 >1个辅助指标(二次筛选)</up-button>
							</view>
							<view class="u-m-b-12 text-bold u-font-15">1、90天内的5档位置</view>
							<view class="u-m-b-10">
								<image style="width: 100%; height: auto" mode="widthFix"
									src="https://gx.h5.100ppi.com/Public/gptguide/cz-21.png" />
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
				<nut-collapse v-model="activeNames3">
					<nut-collapse-item :name="1" :border="false" icon="rect-down">
						<template #title>
							<view class="text-l1 u-font-16 text-bold" style="letter-spacing: 1px;">如何<text
									class="text-brand-red">卖</text></view>
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
		</view>

		<!-- <view class="bottom-bar">
			<view class="bottom-bar-inner u-p-20 u-p-l-30 u-p-r-30">
				<up-button type="error" :customStyle="{
						width: '100%',
						height: '48px',
						fontSize: '18px',
						fontWeight: '600',
						backgroundColor: 'var(--brand-red)',
						borderRadius: '8px',
						letterSpacing: '2px'
					}" @click="getUserTokenBtn">
					测试按钮获取usertoken16点16分
				</up-button>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view> -->
		<!-- 5. 底部悬浮固定栏 -->
		<!-- <view class="bottom-bar">
			<view class="bottom-bar-inner u-p-20 u-p-l-30 u-p-r-30">
				<up-button
					type="error"
					:customStyle="{
						width: '100%',
						height: '48px',
						fontSize: '18px',
						fontWeight: '600',
						backgroundColor: 'var(--brand-red)',
						borderRadius: '8px',
						letterSpacing: '2px'
					}"
					@click="handleSubscribe"
				>
					订 阅
				</up-button>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view> -->
		<view class="bg-white u-radius-16 u-p-30">
			<SafeInfo></SafeInfo>
		</view>
		<!-- 底部占位 (避免内容被底部栏遮挡) -->
		<view style="height: 100px;"></view>
	</view>
	<!-- <ToastPopup
		:show="toastShow"
		:info="ceshiinfo"
		title="ceshi"   
		:onUpdateShow="handleChangeShow2"
	></ToastPopup> -->
	<ShareBtn
		:shareData="shareData"
	></ShareBtn>
	<!-- <up-overlay :zIndex="50" :show="overlayShow" >
		<view class="warp">
			<view class="rect u-radius-10 u-p-12 box-border">
				<up-button type="error" shape="circle" @click="initDataAgin" throttleTime="1000">我已订阅，刷新页面</up-button>
			</view>
		</view>
	</up-overlay> -->
	<MenusBar></MenusBar>
</template>

<script setup>
	import {
		baseStore,
		useCateStore
	} from '@/stores/base.js'
	import { 
		userStore
	} from '@/stores/user.js'
	import {
		timeFrom
	} from 'uview-plus';
	const $api = inject('$api')
	const base = baseStore()
	const user = userStore()
	const cate = useCateStore()
	const {
		limitToken,
		user_token_app
	} = toRefs(user)
	const {
		ad,
		infoConfig,
		name
	} = toRefs(cate)
	const top = ref(true)
	const bgColor = computed(() => top.value ? 'transparent' : '#FF3A3B')
	const loading = ref(false)
	const title = computed(() => {
		if (top.value) return ''
		return name.vlaue
	})
	const overlayShow = computed(() => limitToken.value != 1)
	const lanmulist = ref([{
			name: '发现',
			api: 'list_chance_recommend_zx',
			params: {
				type: 2
			},
			type: 2,
		},
		{
			name: '快讯',
			api: 'list_chance_recommend_zx',
			params: {
				type: 1
			},
			type: 1,
		}
	])
	const lanmuIndex = ref(0)
	const lanmuCurItems = computed(() => lanmulist.value[lanmuIndex.value])
	const lanmuCurItemsApi = computed(() => lanmuCurItems.value.api)
	const lanmuCurItemsParams = computed(() => lanmuCurItems.value.params)
	const caseList = ref([])
	const lanmuData = ref([])
	const activeNames = ref([1]);
	const activeNames2 = ref([]);
	const activeNames3 = ref([]);
	const stockDetail = ref([])
	const homeData = ref({})
	const navData = ref([])
	const pname = ref('')
	const toastShow = ref(false)
	const ceshiinfo = ref('')
	const shareData = ref({})
	
	const dateRange = ref('')
	onLoad(async () => {  
		Com.rightTopBtn('3', '关闭', function() {
			Com.nativeGoback()
		});
		Com.gobackRefreshPage(true, () => {
			if(!user_token_app.value) {
				initDataAgin()
			} 
		})
		// Com.nativeGobackListener(0)
		// menusstore.getMenusData($http)
		await initData()
		// $api.gx_check_auth({params: {usertoken: '1427903918739713024'}})
	}) 
	watch(
		() => lanmuIndex.value,
		async (n) => {
			lanmuData.value = []
			await fetchData()
		}
	)
	onPageScroll((e) => {
		top.value = e.scrollTop <= 50
	})

	async function initDataAgin() {
		uni.showLoading()
		user.checkUserToken().then(async res => {
			limitToken.value = res.list
			await initData()
		}).catch(e => {
			console.log(e)
			uni.hideLoading()
		})
	}
	async function initData() {
		await Promise.all([
			getHomeShareData(),
			getHomeData(),
			getHotStockData(),
			fetchData(true)
		])
	}
	async function getHomeShareData() {
		try {
			const res = await $api.home()
			if (res.code === 1 ) {
				shareData.value = res
			}
		} catch (e) {
			console.error('getHomeShareData error:', e)
		}
	}
	async function getHomeData() {
		try {
			const res = await $api.memu()
			if (res.code === 1 && res.list) {
				homeData.value = res.list
				navData.value = res.memu
			}
		} catch (e) {
			console.error('getHotStockData error:', e)
		}
	}
	async function getHotStockData() {
		try {
			const res = await $api.list_chance_recommend_zx2()
			if (res.code === 1 && res.list) {
				let data = res.list.res
				stockDetail.value = data.stock_ppi_recommend.slice(0, 3)
				dateRange.value = `${data.sdate} ~ ${data.edate}`
				// pname.value = data.pname
			}
		} catch (e) {
			console.error('getHotStockData error:', e)
		}
	}

	async function fetchData(initflag = false) {
		if (loading.value) return false
		loading.value = true
		try {
			const res = await $api[lanmuCurItemsApi.value]({
				params: {
					...lanmuCurItemsParams.value
				}
			})
			if (res.code === 1 && res.list) {
				lanmuData.value = res.list.res.pw_rec_list.slice(0, 6)
			}

		} catch (e) {
			console.error('fetchData error:', e)
		}
		loading.value = false
	}

	function lanmuEvent(obj) {
		lanmuIndex.value = obj.index
	}
	function handleCaseClick(item) {
		if (item.id) {
			base.handleGoto({
				url: '/pages/index/news_detail',
				params: {
					id: item.id
				}
			})
		}
	}

	function tabsClick(item) {
		// console.log(item)
		if (item.type == 2) {
			uni.redirectTo({
				url: item.url
			})
		} else if (item.type == 3) {
			uni.navigateTo({
				url: item.url
			})
		} else if (item.type == 4) {
			uni.navigateToMiniProgram({
				appId: item.url,
				success(res) {
					// 打开成功
				},
				complete(res1) {
					console.log(res1);
				}
			});
		} else {
			uni.reLaunch({
				url: item.url
			})
		}
	}

	function handleNewsClick(item) {
		if (item.id) {
			base.handleGoto({
				url: '/pages/index/news_detail',
				params: {
					id: item.id
				}
			})
		}
	}

	function handleSubscribe() {
		base.handleGoto({
			url: '/pages/analysis/analysis'
		})
	}

	function handleChangeShow2(data) {
		toastShow.value = data
	}
	// function getUserTokenBtn() {  
	// 	var random = '_' + (Math.random() + '').split('.')[1];
	// 	var callbackName = 'setUserToken' + random;
	// 	$js['setUserToken' + random] = function(p) { 
	// 		window.alert(p.token)
	// 		// var c = typeof(callback)
	// 		// if (typeof callback === 'function') {
	// 		// 	callback(p);
	// 		// }
	// 	};  
	// 	onCallNative('DataService', 'getUserToken', {}, callbackName);
	// 	// window.alert(callbackName)
	// }
	// function callback(config) {
	// 	window.alert(config)
	// }
</script>

<style lang="scss">
	page {
		background-color: var(--bg-page);
		padding-bottom: 0;

		::v-deep {
			.nut-steps-vertical.nut-steps-dot .nut-step-icon {
				width: 4px !important;
				height: 4px !important;
				position: relative;
				background-color: #46659e !important;

				&::after {
					content: '';
					position: absolute !important;
					width: 200%;
					height: 200%;
					border-radius: 30px;
					background-color: rgb(47 86 158 / 15%) !important;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
				}
			}

			.nut-steps-vertical .nut-step-line {
				background: #eee !important;
				height: calc(100% - 10px) !important;
				top: 10px !important;
			}

			// .nut-step {
			// 	background-color: #fff!important;
			// 	padding: 0 20px;
			// }
			// .nut-step-title {
			// 	margin: 0!important;
			// }
			.nut-step-main {
				padding-right: 0 !important;
			}

		}
	}
</style>

<style lang="scss" scoped>
	.item-stock {
		flex: 0 0 31%;
		width: 31%;
		overflow: hidden;

		&:nth-of-type(1) {
			background: linear-gradient(to bottom, #FEF8EC, #FFFEFC);
			border-color: #FFAA01 !important;

			.item-stock-bg {
				background: linear-gradient(to right, #FFF3D3, #FFEFCD);
				width: 100%;
				color: #B37800;
				text-align: center;
			}
		}

		&:nth-of-type(2) {
			background: linear-gradient(to bottom, #F2F6FF, #FDFEFF);
			border-color: #C6D3E3 !important;
			margin-left: 2%;
			margin-right: 2%;

			.item-stock-bg {
				background: linear-gradient(to right, #F8F9FB, #F2F6F9);
				width: 100%;
				color: #566270;
				text-align: center;
			}

		}

		&:nth-of-type(3) {
			background: linear-gradient(to bottom, #FEF6F3, #FFFEFC);
			border-color: #DDA081 !important;

			.item-stock-bg {
				background: linear-gradient(to right, #FDF5F2, #F8EDE7);
				width: 100%;
				color: #AD7254;
				text-align: center;
			}

		}
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 240px;
		height: auto;
		background-color: #fff;
	}
	.page-w {
		position: relative;
		min-height: 100vh;
		background-color: $bg-page;
		// background: linear-gradient(
		// 	to bottom,
		// 	var(--bg-compliance) 0%,
		// 	var(--bg-page) 280px,
		// 	var(--bg-page) 100%
		// );
	}

	// ---- 1. 顶部区域 ----
	.header-section {
		position: relative;
		z-index: 10;
	}

	.header-content {
		position: relative;
	}

	.header-logo {
		width: 100%;
	}

	.header-tagline {
		opacity: 0.8;
		letter-spacing: 1px;
	}

	// ---- 2. 广告图 ----
	.ad-section {
		position: relative;
		z-index: 5;
	}

	.ad-image {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	// ---- 3 & 4. 区块标题 ----
	.section-header {
		.section-title {
			position: relative;
			padding-left: 12px;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 4px;
				height: 18px;
				background: var(--brand-red);
				border-radius: 2px;
			}
		}
	}

	// ---- 3. 案例卡片 ----
	.case-card {
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		border-color: var(--divider-color) !important;

		&:active {
			transform: scale(0.98);
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		}

		&:last-child {
			border-bottom: none;
		}
	}

	.case-card-title {
		line-height: 1.2;
	}

	.case-card-desc {
		line-height: 1.5;
	}

	.case-card-arrow {
		flex-shrink: 0;
		padding-top: 4px;
	}

	.case-tag {
		display: inline-block;
		padding: 2px 10px;
		font-size: 11px;
		border-radius: 4px;
	}

	// ---- 4. 资讯列表 ----
	.news-item {
		position: relative;
		transition: background-color 0.15s ease;

		// 关键：让flex子项可收缩，标题省略号才能生效
		>view:first-child {
			overflow: hidden;
			min-width: 0;
		}

		&:active {
			background-color: var(--bg-card);
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 16px;
			right: 16px;
			height: 1px;
			background-color: #F0F0F0;
		}

		&--last::after {
			display: none;
		}
	}

	.news-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.news-arrow {
		flex-shrink: 0;
	}

	// ---- 5. 底部悬浮栏 ----
	.bottom-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		// background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 60%, rgba(255,255,255,0) 100%);
		background-color: #fff;
	}

	.bottom-bar-inner {
		position: relative;
	}
</style>