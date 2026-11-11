<template>
	<view>
		<view style="width: 100%; height: 320px;position: relative;">
			<l-echart ref="kchartRef"></l-echart>
			<view class="customTooltips u-radius-6" :style="{ left: position[0] + 'px', top: position[1] + 'px' }"
				v-if="paramsRef.length && position.length && showTip">
				<!-- <view>这是个自定的tooltips</view> -->
				<view class="u-m-b-6 u-font-14">{{ paramsRef[0]['axisValue'] }}</view>
				<view v-for="(item, index) in paramsRef[1].data">
					<view class="u-flex  u-flex-between text-base u-font-14" v-if="index != 0">
						<view class="u-flex u-flex-items-center" >
							<!-- <view class="u-radius-20 u-m-r-8" :style="{backgroundColor: item.color}" style="width: 8px; height: 8px;"></view> -->
							<view>
								<template v-if="index == 1">开盘</template>
								<template v-if="index == 2">收盘</template>
								<template v-if="index == 3">最低</template>
								<template v-if="index == 4">最高</template>
							</view>
						</view>
						<view class="text-black u-m-l-10">{{ item }}</view>
					</view>
				</view>
				<view>
					<view class="u-flex  u-flex-between text-base u-font-14" >
						<view class="u-flex u-flex-items-center" >
							<!-- <view class="u-radius-20 u-m-r-8" :style="{backgroundColor: item.color}" style="width: 8px; height: 8px;"></view> -->
							<view>价格走势</view>
						</view>
						<view class="text-black u-m-l-10">{{paramsRef[0].data}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		chartData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		prodInfo: {
			type: Object,
			default: () => {
				return {}
			}
		},
		show: {
			type: Boolean,
			default: false
		},
	})
	const kchartRef = ref(null)
	const chartInstance = ref(null)
	// 仅在小程序环境下引入 ECharts
	// #ifdef MP
	const echarts = require('../../pages/analysis/static/echarts.min.js') // 根据实际路径调整
	// #endif
	// #ifndef MP
	const echarts = null // H5 和 App 环境不需要手动引入
	// #endif

	const position = ref([])
	const paramsRef = ref([])
	const showTip = ref(false)

	const optionRef = computed(() => {
		if (!props.chartData.splitdata) return false
		// let yname = Object.keys(props.chartData.data_data) 
		let ydata = JSON.parse(('['+props.chartData.splitdata+']').replace(/'/g, '"')).map(item => item.slice(1)) 
		let ydata2 = JSON.parse(('['+props.chartData.pricedata+']').replace(/'/g, '"'))  
		let xdata = props.chartData.xdata.split(',').map(date => date.replace(/'/g, ''))
		// console.log(ydata, xdata)
		return {
			title: {
				left: 'center',
				top: 15,
				text: `${props.prodInfo.name}价格走势与${props.chartData.name}日K线图` ,
				textStyle: {
					fontSize: '15px'
				}
				// subtext: props.chartData.spec,
			},
			grid: {
				top: 70,
				height: '55%'
			},
			color: ['#5da3ff', '#c641ff'],
			tooltip: {
				trigger: 'axis',
				// shadowBlur: 0,
				textStyle: {
					textShadowBlur: 0,
				},
				renderMode: 'richText',
				position: (point, params, dom, rect, size) => {
					// 假设自定义的tooltips尺寸
					const box = [170, 170]
					// 偏移
					const offsetX = point[0] < size.viewSize[0] / 2 ? 20 : -box[0] - 20
					const offsetY = point[1] < size.viewSize[1] / 2 ? 20 : -box[1] - 20
					const x = point[0] + offsetX
					const y = point[1] + offsetY
					position.value = [x, y]
					paramsRef.value = params 
					// console.log(params)
				},
				formatter: (params, ticket, callback) => {},
			},
			// legend: {
			// 	data: yname,
			// 	bottom: '15%'
			// },
			dataZoom: [
				{
					type: 'inside',
					start: 80,
					end: 100
				},
				{
					type: 'slider',
					start: 80,
					end: 100,
					bottom: 20
				}
			],
			xAxis: {
				// type: 'category',
				// axisLine: {
				// 	lineStyle: {
				// 		color: '#999999'
				// 	}
				// },
				// axisLabel: {
				// 	color: '#666666'
				// },
				data: xdata, 
				boundaryGap: false,
			},
			yAxis: [
				{
					type: 'value',
					scale: true,
					axisTick: {
						show: false
					},
					name: `商品价格(${props.prodInfo.unit})`,
					axisLine: {
						lineStyle: {
							color: '#999999'
						}
					},
					axisLabel: {
						color: '#666666'
					}
				},{
					type: 'value',
					axisTick: {
						show: false
					},
					name: '股价(元)',
					axisLine: {
						lineStyle: {
							color: '#999999'
						}
					},
					axisLabel: {
						color: '#666666'
					},
					scale: true
				},
			],
			series: [
				{
					name: '',
					type: 'line',
					yAxisIndex: 0,
					label: {
						show: true,
						// position: 'inside'
					},
					data: ydata2
				},
				{
					name: '',
					type: 'candlestick',
					yAxisIndex: 1,
					label: {
						show: true,
						// position: 'inside'
					},
					data: ydata
				},
			]
		}

	})
	onMounted(() => {
		// console.log(props.chartData)
	})
	watch(
		() => optionRef.value,
		async (n, o) => { 
			if ( !optionRef.value ) return 
			await initChart()
		}, {
			deep: true
		}
	)
	watch(
		() => props.show,
		async (n, o) => { 
			if (!n) return 
			await initChart()
		} 
	)
	// 初始化图表 
	const initChart = async () => {
		if (!kchartRef.value) return

		try {
			const chart = await kchartRef.value.init(echarts)
			chart.setOption(optionRef.value)

			chart.on('showTip', (params) => {
				showTip.value = true
				// console.log('showTip::')
			})
			chart.on('hideTip', (params) => {
				setTimeout(() => {
					showTip.value = false
				}, 300)
			})
		} catch (error) {
			console.error('图表初始化失败:', error)
		}
	}
</script>

<style lang="scss" scoped>
	.customTooltips {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.9);
		box-shadow: 0 0 10px rgba(0,0,0,.1);
		padding: 20rpx;
		width: 140px;
		// height: auto;
	}
</style>