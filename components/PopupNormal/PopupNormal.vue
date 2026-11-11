<template>
	<view>
		<u-popup :bgColor="$attrs.bgColor" :show="$attrs.show" @close="close" @open="open">
			<view class="wrapper">
				<view class="wrapper-header  u-p-20 "> 
					<slot name="header">
						<view class="u-flex u-flex-between u-flex-items-center">
							<view class="item"></view>
							<view class="u-text-center">
								{{attrs.title}}
							</view>  
							<view class="item u-font-28 text-brand-red" @click="close">关闭</view> 
						</view>
					</slot> 
				</view>
				<view class="wrapper-main" :style="{backgroundColor: $attrs.bgColor}">
					<slot></slot> 
				</view>
				<view class="wrapper-footer">
					<slot name="footer"></slot>  
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup> 
	onMounted(() => {
		// console.log(attrs)
	}) 
	const emits = defineEmits(['open'])
	const attrs = useAttrs() 
	function close () {
		attrs.onUpdateShow(false)
	}
		 
	function open () {
		emits('open')
	}
		 	 
</script>
<style lang="scss">
	page {
		::v-deep {
			.u-popup__content {
				border-radius: 15px 15px 0 0!important;
			}
			.u-safe-bottom {
				background-color: #fff!important;
			}
		}
	} 
</style>
<style lang="scss" scoped>
	.wrapper-main { 
		background-color: #f8f8f8;
	}
</style>