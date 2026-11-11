<template>
	<view class="fixedMenus" >
		<view class="share-btn  uni-shadow-sm bg-white   u-flex-column u-flex-center u-flex-items-center"
			@click="shareEvent"
		>
			<up-icon name="share" size="25" :color="themeColor"></up-icon>
			<view class="u-font-12 text-base">分享</view> 
		</view>
	</view>
</template>

<script setup> 
	const attrs = useAttrs()
	const $api = inject('$api')
	import { baseStore } from '@/stores/base'
	const base = baseStore();
	const { themeColor } = toRefs(base)
	import { userStore } from '@/stores/user'
	const user = userStore();
	const { user_info } = toRefs(user)
	 
	const props = defineProps({  
		shareData: {
			type: Object,
			default: () => {
				return {}
			},
		}
	})   
	onMounted(async () => { 
	})  
	function shareEvent() {
		console.log(props.shareData)
		base.appShare(props.shareData)
	}
</script>


<style lang="scss" scoped>
	.fixedMenus {
		position: fixed;
		right: 20px;
		bottom: 120px;
		z-index: 10;
		.share-btn {
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}
	}
</style>