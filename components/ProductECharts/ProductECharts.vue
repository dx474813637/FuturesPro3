<template>
	<view>
		<view  style="width: 100%; height: 300px;position: relative;" v-if="show">
			<l-echart ref="chartRef"></l-echart>
			<view class="customTooltips u-radius-6" :style="{ left: position[0] + 'px', top: position[1] + 'px' }"
				v-if="paramsRef.length && position.length && showTip">
				<!-- <view>这是个自定的tooltips</view> -->
				<view class="u-m-b-6 u-font-14">{{ paramsRef[0]['axisValue'] }}</view>
				<view v-for="item in paramsRef">
					<view class="u-flex  u-flex-between text-base u-font-14">
						<view class="u-flex u-flex-items-center" >
							<view class="u-radius-20 u-m-r-8" :style="{backgroundColor: item.color}" style="width: 8px; height: 8px;"></view>
							<view>{{ item.seriesName }}</view>
						</view>
						<view class="text-bold text-black u-m-l-10">{{ item.value }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup> 
	// https://ext.dcloud.net.cn/plugin?id=4899
	const props = defineProps({
		chartData: {
			type: Object,
			default: () => {
				return {}
			}
		},
		show: {
			type: Boolean,
			default: true
		}
	})
	const chartRef = ref(null)
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
		if (!props.chartData.data_data) return false
		let yname = Object.keys(props.chartData.data_data) 
		let ydata1 = Object.values(props.chartData.data_data[yname[0]])
		let ydata2 = Object.values(props.chartData.data_data[yname[1]])
		let xdata = props.chartData.date_data.split(',').map(date => date.replace(/'/g, ''))

		return {
			title: {
				left: 'center',
				top: 0,
				text: props.chartData.name + '价格走势',
				// subtext: props.chartData.spec,
			},
			grid: {
				height: '55%',
				top: 60,
			},
			color: ['#4C87FC', '#c641ff'],
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
					// console.log(paramsRef.value)
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
					start: 0,
					end: 100
				},
				{
					type: 'slider',
					start: 0,
					end: 100,
					bottom: 10
				}
			],
			xAxis: {
				type: 'category',
				axisLine: {
					lineStyle: {
						color: '#999999'
					}
				}, 
				boundaryGap: false,
				axisLabel: {
					color: '#666666'
				},
				data: xdata
			},
			yAxis: [{
					type: 'value',
					scale: true,
					axisTick: {
						show: false
					},
					name: `${yname[0]}(${props.chartData.unit})`,
					axisLine: {
						lineStyle: {
							color: '#999999'
						}
					},
					axisLabel: {
						color: '#666666'
					}
				},
				// {
				// 	type: 'value',
				// 	scale: true,
				// 	axisTick: {
				// 		show: false
				// 	},
				// 	name: yname[1],
				// 	axisLine: {
				// 		lineStyle: {
				// 			color: '#999999'
				// 		}
				// 	},
				// 	axisLabel: {
				// 		color: '#666666'
				// 	}
				// }
			],
			series: [{
					name: yname[0],
					type: 'line',
					yAxisIndex: 0,
					label: {
						show: true,
						// position: 'inside'
					},
					data: ydata1
				},
				// {
				// 	name: yname[1],
				// 	yAxisIndex: 1,
				// 	type: 'line',
				// 	label: {
				// 		show: true
				// 	},
				// 	data: ydata2
				// }
			]
		}

	})
	onMounted(() => {
		// console.log(props.chartData)
	})
	watch(
		() => optionRef.value,
		async (n, o) => { 
			if (!optionRef.value || ( JSON.stringify(n) === JSON.stringify(o))) return 
			await initChart()
		}, {
			deep: true
		}
	)
	watch(
		() => props.show,
		async (n, o) => { 
			if (n) {
				nextTick(async ()=> {
					await initChart() 
				})
				
			} 
		} 
	)
	// 初始化图表 
	const initChart = async () => {
		if (!chartRef.value) return

		try {
			const chart = await chartRef.value.init(echarts)
			chart.setOption(optionRef.value, true) 
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