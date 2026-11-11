<template>
	<view class="wrap u-p-40">  
		<u-parse :content="info.info"></u-parse>
	</view>
	<MenusBar></MenusBar>
	<up-loading-page :loading="loading"></up-loading-page>
</template>

<script setup>
	const $api = inject('$api')
	import {
		userStore
	} from '@/stores/user.js'
	import {
		baseStore,
		menusStore
	} from '@/stores/base.js'
	const user = userStore()
	const {
		login
	} = toRefs(user)
	const menusstore = menusStore()
	const base = baseStore()
	const loading = ref(false)
	const info = ref('')
	onLoad(async () => { 
		await getData()
	})
	async function getData() {
		if (loading.value) return;
		loading.value = true
		// await uni.$u.sleep(1800)
		try {
			const res = await $api.about2()
			if (res.code == 1) {
				info.value = res.list
				// Com.setWebviewTitle(() => {}, {title: info.value.title})
				// uni.setNavigationBarTitle({
				// 	title: info.value.title
				// })
			}
		} catch (e) {

		}
		loading.value = false

	}
</script>
<style lang="scss" scoped>
	.wrap {
		// height: 100vh;
		background: #fff;
		font-size: 28rpx;
	}
</style>