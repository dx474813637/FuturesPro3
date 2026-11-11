<template>
	<view class="tabbar-w u-p-t-20 ">
		<view class="tabbar bg-white" style="box-shadow: `0 0 10rpx rgba(90,90,90,.4)`" >  
			<view class="u-flex u-flex-around" style="height: 60px;">
				<view class="item u-flex-column u-flex-center u-flex-items-center"
					style="height: 60px; color: #666;"
					v-for="(item, index) in menusByMode"
					:key="item.name"
					:class="{
						'text-primary': menusActive == index
					}"
					@click="tabsClick(index)"
				> 
					<template v-if="item.icon">
						<nut-icon :name="item.icon"></nut-icon>
					</template>
					<!-- <template v-if="menusActive == index">
						<image
							class="u-page__item__slot-icon" 
							:src="item.white_icon_2  || item.icon"
						></image>
					</template>
					<template v-else>
						<image
							class="u-page__item__slot-icon" 
							:src="item.white_icon_1  || item.icon"
						></image> 
					</template> -->
					<view class="u-font-28 u-m-t-5">
						{{item.name}}
					</view>	
				</view>
			</view>
			<u-safe-bottom></u-safe-bottom>
		</view>
		
	</view>
	 
</template>
<script setup>  
	import {
		menusStore,
		baseStore
	} from '@/stores/base';
	import { storeToRefs } from 'pinia' 
	const base = baseStore()
	const menusstore = menusStore()
	const { menus, menus_51xp, menusActive  } = storeToRefs(menusstore);
	// const menusRef  = computed(() => menus.menus);
	// const menusActiveRef = computed(() => menus.menusActive); 
	const $api = inject('$api')  
	const $http = inject('$http')
	
	const props = defineProps({
		mode: {
			type: String,
			default: ''
		}
	})
	const menusByMode = computed(() => {  
		return menus.value
	}) 
	onMounted(() => {  
		// menusstore.getMenusData($http) 
		let routeObj = getCurrentPages()[getCurrentPages().length - 1]
		// console.log(routeObj)
		menusstore.saveCurPage({
			route: uni.$u.page(),
			options: routeObj.options
		}) 
		// console.log(menusActive)
	})
	
	function tabsClick(index) {
		const item = menusByMode.value[index]
		// console.log(item)
		if(item.type == 2 ){
			uni.redirectTo({
				url: item.url
			})
		}
		else if(item.type == 3 ){
			uni.navigateTo({
				url: item.url
			})
		}
		else if (item.type == 4) {
			uni.navigateToMiniProgram({
				appId: item.url,
				success(res) {
					// 打开成功
				},
				complete(res1) {
					console.log(res1);
				}
			});
		}
		else {
			console.log(2)
			uni.reLaunch({
				url: item.url
			})
		}
	}
	
</script>

<style lang="scss">
	.tabbar {
		::v-deep {
			.u-tabbar-item__icon {
				width: auto!important;
			} 
		} 
	}
	.u-tabbar-item__text {
		font-size: 15px!important;
	}
</style>
<style scoped lang="scss">
	.tabbar-w {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0; 
		z-index: 40; 
	}
	.tabbar {
		border-top: 1rpx solid #eee;
	}
	.u-page__item__slot-icon {
	    width: 17px;
	    height: 17px;
	}
	.u-tabbar-item__text {
		font-size: 15px 
	}
</style>
