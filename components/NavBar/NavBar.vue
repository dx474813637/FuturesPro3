<template>
	<view>
		<!-- <up-navbar 
			leftText="返回" 
			:title="$attrs.title" 
			:title="$attrs.title" 
			:safeAreaInsetTop="$attrs.safeAreaInsetTop || false" 
			:bgColor="$attrs.bgColor || '#fff'"
			:fixed="$attrs.fixed || true"
		> --> 
		<up-navbar 
			v-bind="$attrs"
			:title="$attrs.title" 
		>
			<template #left>
				<slot name="left">
					<view class="u-nav-slot u-flex" :style="{color: $attrs.customColor}"> 
						<template v-if="backBtnShow">
							<nut-icon name="rect-left" @click="goBack"></nut-icon>
							<up-line direction="column" :hairline="false" length="20" margin="0 12px"></up-line> 
						</template> 
						<nut-icon name="home" @click="base.handleGoto({url:'/pages/index/index', type: 'reLaunch'})"></nut-icon> 
					</view> 
				</slot>
			</template>
			<template #center>
				<slot></slot>
			</template>
			<template #right>
				<slot name="right"></slot>
			</template>
			
		</up-navbar>
	</view>
</template>

<script setup>
	import { computed } from 'vue'
	import { baseStore } from '@/stores/base.js'
	const base = baseStore()  
	const props = defineProps({
		backBtn: {
			type: Boolean,
			default: true
		}
	})
	const backBtnShow = computed(() => {
		// 获取当前页面栈数量
		// const pages = uni.$u.pages()
		// const pages = getCurrentPages()
		// 如果页面栈数量大于1，则显示返回按钮，否则不显示  
		return (getCurrentPages().length > 1) && props.backBtn
	})
	function goBack() {
		// uni.navigateBack()
		Com.browserGoback()
	} 
</script>

<style lang="scss" scoped>
</style>