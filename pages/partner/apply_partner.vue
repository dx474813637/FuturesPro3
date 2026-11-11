<template>
	<view class="wrap ">
		<NavBar bgColor="transparent" title="合伙人申请" titleStyle="color: #3B4978" customColor="#3B4978" placeholder ></NavBar>
		<!-- <view class="top"></view> -->
		<view class="content">
			<view class="title u-p-t-80">周期掘金合伙人是指获得生意社授权销售股票通与期货通产品的机构或个人</view>
			
			<up-form 
				labelPosition="top"
				:model="form"  
				ref="uForm"  
				errorType="toast"
			>
				<up-form-item prop="code" >
					<up-input shape="circle" size="large"
						v-model="form.name2" 
						prefixIcon="account-fill"
						border="none"
						clearable 
						inputAlign="center"
						fontSize="17px"
						placeholder="请输入我的姓名" 
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					/>
				</up-form-item>
				<!-- <up-form-item prop="code" >
					<up-input shape="circle" size="large"
						v-model="form.code" 
						prefixIcon="account-fill"
						border="none"
						clearable 
						fontSize="17px"
						placeholder="请输入推荐人id（非必填）" 
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					/>
				</up-form-item>

				<up-form-item prop="name" >
					<up-input shape="circle" size="large"
						v-model="form.name" 
						prefixIcon="account-fill"
						border="none"
						clearable 
						fontSize="17px"
						placeholder="请输入推荐人姓名（非必填）" 
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					/>
				</up-form-item> -->
			</up-form>
			<view class="u-m-t-40">
				<up-button type="primary" :ripple="true" @click="submit" shape="circle"  :customStyle="{height: '50px'}" size="large">
					申请成为合伙人</up-button> 
			</view>
			<view class="u-flex u-p-10 u-p-t-30 u-p-b-30 u-radius-20 bg-white text-base u-m-t-40">
				<view class="u-flex-1 u-text-center ">
					<view class="text-bold" style="color: #3B4978">股票通</view>
					<view class="u-m-b-20 u-m-t-20">399元/年</view>
					<view>帮你赚<text class="u-font-40 text-bold u-error u-p-l-10 u-p-r-4">99</text>元/年</view>
				</view>
				<view class="u-flex-1 u-text-center">
					<view class="text-bold" style="color: #3B4978">期货通</view>
					<view class="u-m-b-20 u-m-t-20">1999元/年</view>
					<view>帮你赚<text class="u-font-40 text-bold u-error u-p-l-10 u-p-r-4">599</text>元/年</view>
				</view>
			</view>
 
		</view> 
		
	</view>
</template>

<script setup> 
	const $api = inject('$api') 
	import {userStore } from '@/stores/user.js'  
	import { baseStore, menusStore } from '@/stores/base.js'
	const user = userStore() 
	const menusstore = menusStore()
	const base = baseStore() 
	const logintype = ref(2)
	const uForm = ref(null)
	const form = ref({
		code: '', 
		name: '', 
		name2: '', 
	}) 
	onLoad(() => {
		// const res = await $api.denglu_info()
		// if(res.code == 1) {
		// 	denglu_info.value = res.list
		// }
	})
	onReady(() => {  
	}) 
	async function submit() {
		uni.showLoading()
		// await uni.$u.sleep(1800)
		let res = await $api.apply_partner({
			params: {...form.value}
		}) 
		if(res.code == 1) { 
			messageManager.showSuccess(res.msg) 
		}
		
	}   
</script> 
<style lang="scss" scoped>
	.u-border-bottom {
		border-bottom: 1rpx solid #e7e7e7;
	}

	.login-box {
		display: none;

		&.tel,
		&.pw {
			display: block;
		}
	}

	.inputRow {
		margin-bottom: 30rpx;
	}

	.wrap {
		height: 100vh;
		background: linear-gradient(-45deg, #C1CDF6, #E7ECFA, #E7ECFA, #C1CDF6);
		font-size: 28rpx; 
		.content {
			width: 600rpx;
			margin: 0 auto;

			.title {
				color: #3B4978;
				text-align: left;
				font-size: 16px;
				font-weight: 500;
				margin-bottom: 50rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: #ffaa00;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $uni-color-warning;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: #666;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;

			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: #666;
					font-size: 28rpx;
				}
			}

			.hint {
				// padding: 20rpx 40rpx;
				font-size: 28rpx;
				color: #333;

				.link {
					color: #007aff;
				}
			}
		}
	}
</style>
