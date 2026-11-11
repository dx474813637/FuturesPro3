<template>
	<view>
		<PopupNormal v-bind="$attrs" @open="open">
			<template #header>
				<view class="header" >
					<view class="title-bar u-p-20 u-flex u-flex-between u-flex-items-center u-font-30">
						<view class="item u-flex-1">
							<text class="u-info" @click="$attrs.onUpdateShow(false)">取消</text>
						</view>
						<view class="item u-flex-1 u-text-center">
							<text class="u-font-34">{{$attrs.title}}</text>
						</view>
						<view class="item u-flex-1 u-text-right">
							<text class="u-primary" @click="refresh" >刷新数据</text>
						</view>
					</view>
					<view class="u-flex u-flex-items-center"  v-if="!cate_loading"> 
						<view class="u-flex u-flex-items-center u-p-10 u-p-r-30"
							style="color: #999"
							@click="changeAllHide" 
						>
							<nut-icon :name="allHide? 'piliangshouqi':'piliangzhankai'" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
						</view>
						<view class="search-bar u-flex-1">
							<u-search 
								placeholder="导航关键字" 
								v-model="keyword"
								:showAction="false"
								bgColor="#f8f8f8"
							></u-search>
						</view>
					</view>
					
				</view>
			</template>
			<view class="list-w   u-p-20 box-border"> 
				<scroll-view scroll-y style="height: 100%;" >
					<template v-if="cate_loading">
						<view class="load-w u-flex u-flex-items-center u-flex-center" >
							<up-loading-icon mode="circle" size="36" text="获取最新数据中..." vertical ></up-loading-icon>
						</view>
					</template>
					<template v-else>
						<template v-if="keyword">
							<template v-if="searchRes.length > 0">
								<view class="searchRes-content u-p-20 u-flex u-flex-wrap u-flex-items-center">
									<view class="card-label u-line-1 u-m-b-12 normal_white bg-white"
										v-for="(ele, i) in searchRes"
										:key="ele.id"
										:class="{  
											'active_white': ele.active, 
											'disabled_white': ele.disabled, 
										}"
										@click="selectLabel(ele)"
									>
										<text>{{ele.name.slice(0, ele.pp[0])}}</text>
										<text class="u-error">{{ele.name.slice(ele.pp[0], ele.pp[0]+ele.pp[1])}}</text>
										<text>{{ele.name.slice(ele.pp[0]+ele.pp[1])}}</text>
										<text class="u-p-l-20 text-base" v-if="isMyProduct">{{ele.attributes | filterAttributes}}</text>
									</view>
								</view>
							</template>
							<template v-else>
								<u-empty
									marginTop="40"
									mode="data"
									:icon="empty"
									text="搜索无匹配项，可置空搜索栏列表查看"
								></u-empty>
							</template>
						</template>
						<template v-else>
							<view
								v-for="(item, index) in menusList"
								:key="item.id">
								<view class="item-card u-p-10 u-p-l-20 u-p-r-20 bg-white u-m-b-20 u-radius-10">
									<view class="card-title u-flex u-flex-items-center u-p-10 u-font-30"
										@click="handleChangeShow(item)"
										:style="{
											color: ''
										}"
									>
										<i class="custom-icon u-font-28"
											:class="{
												'custom-icon-jiahao1': !item.show,
												'custom-icon-jianhao': item.show
											}"
										></i>
										<text class="u-p-l-10">{{item.name}}</text>
										<text class="u-p-l-10":style="{
											color: ''
										}">({{item.children.length}})</text>	
										<!-- <view class="u-m-l-20" v-if="item.num> 0">
											<u-badge :bgColor="themeConfig.badgeBg" max="99" :value="item.num"></u-badge>
										</view> -->
										
									</view>
									<view class="card-content u-p-10 u-flex u-flex-wrap u-flex-items-center" 
										v-if="item.show"
										:style="{
											backgroundColor: '',
										}"
									>
										<view class="card-label u-line-1 u-m-b-12 normal_white"
											v-for="(ele, i) in item.children"
											:key="ele.id"
											:class="{ 
												'active_white': ele.active, 
												'disabled_white': ele.disabled,
											}"
											@click="selectLabel(ele)"
										>
											{{ele.name}}
										</view>
									</view>
								</view>
							</view>
						</template>
					</template>
				</scroll-view>
			</view>
			<!-- <template #footer>
				<view class="u-p-20">
					<up-button :color="themeColor" shape="circle" @click="confirmEvent">确 定</up-button>
				</view>
			</template> -->
		</PopupNormal>
	</view>
</template>

<script setup> 
	import { debounce, deepClone  } from 'uview-plus';
	const attrs = useAttrs()
	const $api = inject('$api') 
	import {
		baseStore,
		useCateStore
	} from '@/stores/base'
	const base = baseStore();
	const {
		themeColor,
		empty
	} = toRefs(base)
	const cate = useCateStore();
	const {
		cate_origin, cate_loading
	} = toRefs(cate)
	import {
		userStore
	} from '@/stores/user'
	const user = userStore();
	const {
		user_info
	} = toRefs(user)

	const theme = 'white'
	const props = defineProps({})
	const keyword = ref('')
	const searchRes = ref([])
	const menusList = ref([])
	const allHide = computed( ()=> !menusList.value.some(ele => ele.show))
	onMounted(async () => {
		// await refresh()
	})
	watch(
		() => keyword.value,
		(n) => {
			debounce(searchMenus, 500)
		}
	)
	watch(
		() => cate_origin.value,
		(n) => {
			initMenusStatus()
			// console.log(menusList.value)
			// menusList.value = deepClone(n);
		},
		{
			deep: true,
			immediate: true,
		}
	)
	const emits = defineEmits(['confirm'])
	function confirmEvent(data) {
		emits('confirm', data)
	}
	
	async function refresh() {
		if(cate_loading.value) return 
		await getData()  
	} 
	async function open() { 
		// console.log(1)
		keyword.value = ''
		if(cate_origin.value.length != 0) return
		await getData()
	} 
	async function getData() {
		cate_loading.value = true
		await cate.getCateData()
		cate_loading.value = false; 
	}
	function searchMenus() {
		searchRes.value = []
		let k = keyword.value.toUpperCase()
		let str = ''
		 
		menusList.value.forEach(ele => {
			ele.children.forEach(item => {
				str = item.name.toUpperCase()
				let i = str.indexOf(k)
				if(i > -1) {
					item.pp = [i, k.length]
					searchRes.value.push(item)
				}
			})
			return ele
		})
		
	}
	function changeAllHide() {
		let flag = allHide.value
		menusList.value = menusList.value.map(ele => {
			ele.show = flag
			return ele
		})
	}
	function selectLabel(data) {
		confirmEvent(data)
	}
	function initMenusStatus() { 
		let arr = uni.$u.deepClone(cate_origin.value);
		// console.log(arr)
		arr.forEach(ele => {
			ele.show = true;
			ele.num = 0
			if(ele.children.length == 0) {
				ele.show = false
			} else { 
				ele.children.forEach(item => { 
					item.active = false
					item.disabled = false
				})
			}
			
		})
		menusList.value = arr
	}
	function handleChangeShow(item) {
		let i
		menusList.value.some((ele, index) => {
			if(ele.id == item.id) {
				i = index
			}
			return ele.id == item.id
		})
		menusList.value[i].show = !item.show
	}
</script>

<style lang="scss" scoped>
	.list-w {
		height: 500px;
		background-color: #f8f8f8;
		position: relative;
		.item-card {
			width: 100%;
			box-sizing: border-box;
			.card-title {
				color: #666;
			}
		}
		.card-content {
			// background-color: #fff;
			border-radius: 10rpx;
			width: 100%;
			box-sizing: border-box;
			
		}
		.card-label {
			flex: 0 0 30%;
			margin-right: 4%;
			height: 30px;
			line-height: 30px;
			transition: all .3s;
			font-size: 14px;
			text-align: center;
			border-radius: 8rpx;
			position: relative;
			border: 1rpx solid #eee;
			&.rows {
				flex: 0 0 100%;
				margin-right: 0;
				text-align: left;
			}
			&.normal_white {
				border-color: #eee;
				color: #666;
			}
			&.normal_dark {
				border-color: #3a3352;
				color: #c8cfff;
			}
			&.active_white {
				border-color: #98c9ff;
				color: #007aff;
				background-color: #e6f2ff;
			}
			&.disabled_white {
				border-color: #c373ff !important;
				color: #7d3df7 !important;
				background-color: #ead9f7 !important;
			}
			&.active_dark {
				border-color: #025688;
				color: #00ffff;
				// background-color: #e6f2ff;
			}
			&.disabled_dark {
				border-color: #503f17 !important;
				color: #f7823d !important;
				// background-color: #ead9f7 !important;
			}
			&:nth-of-type(3n) {
				margin-right: 0;
			}
		}
	}
	.load-w {
		width: 100%;
		height: 100%;
	}
</style>