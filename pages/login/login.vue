<template>
	<view class="wrap ">
		<NavBar bgColor="transparent" title="周期掘金" titleStyle="color: #3B4978" customColor="#3B4978" placeholder ></NavBar>
		<!-- <view class="top"></view> -->
		<view class="content">
			<view class="title u-p-t-80">欢迎登录</view>
			<up-form 
				labelPosition="top"
				:model="form" 
				:rules="rules"
				ref="uForm"  
				errorType="toast"
			>
				<up-form-item prop="login" >
					<up-input shape="circle" size="large"
						v-model="form.login" 
						prefixIcon="account-fill"
						border="none"
						clearable 
						fontSize="17px"
						:placeholder="`请输入${logintype == 1? '手机' :'账号/手机'}`" 
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					/>
				</up-form-item>

				<template v-if="logintype == 2">
					<up-form-item prop="passwd" >
						<up-input 
							shape="circle"  
							border="none"
							:password="passwordType"
							clearable
							prefixIcon="lock-fill"
							prefixIconStyle="color: #929cb5"
							placeholderStyle="color: #AFB1B5"
							v-model="form.passwd" 
							placeholder="请输入密码" 
							fontSize="17px"
							:customStyle="{padding: '15px', background: '#F6F6F6'}"
						>
							<template slot="suffix">
								<up-icon 
									@click="passwordType = !passwordType"
									:name=" passwordType ? 'eye-off' : 'eye-fill'"
									:color=" passwordType ? '#AFB1B5' : '#007aff'"
									></up-icon>	
							</template>
						</up-input>
					</up-form-item>
				</template>
			</up-form>
			<!--  #ifdef  APP-PLUS -->
			<view class="u-flex u-flex-items-center u-p-l-20">
				<up-checkbox-group 
					v-model="agree"
					placement="row"
					@change="agreeChange"
					>
					<up-checkbox shape="circle" name="agree"></up-checkbox>
				</up-checkbox-group>
				<view class="hint u-flex-1 u-p-l-5 text-base">
					已同意
					<text @click="base.handleGoto('/pages/index/app_about')" class="u-primary">《服务协议》及《隐私政策》</text>
				</view>
			</view>
			<!--  #endif -->
			<!-- <view class="tips" v-if="logintype == 1">未注册的手机号验证后将自动注册</view> -->
			<view class="u-m-t-30">
				<up-button type="primary" :ripple="true" @click="submit" shape="circle"  :customStyle="{height: '50px'}">
					{{ logintype == 2 ? '登录' : '获取短信验证码'}}</up-button> 
			</view>


			<view class="alternative u-flex-center">
				<view class="password" @click="changeLoginType">{{ logintype == 1 ? '账号密码登录' : '手机验证码登录'}}</view>
				<!-- <view class="issue" @click="base.handleGoto({url:'/pages/login/register'})">注册账号</view> -->
				<!-- <view v-if="logintype == 2">
					<up-text type="warning" decoration="underline" text="忘记密码？" @click="base.handleGoto('/pages/login/resetPwd')"></up-text>
				</view> -->
			</view> 
			<view class="title u-p-t-80  ">
				<view class="u-font-15">
					<view class="u-font-16 ">选择周期掘金的3个理由：</view>
					<view class=" u-radius-5 u-m-t-20">1、蓝筹股炒不动，题材股不敢炒，周期股风险低、收益稳、机会多</view>
					<view class=" u-radius-5 u-m-t-20">2、商品价格上涨往往领先于股票价格上涨，因此可以利用这个"时间差”，提前买入股票；</view>
					<view class=" u-radius-5 u-m-t-20">3、周期掘金包括500+个商品与1000+只股票，让选股更简单</view>
				</view>
			</view>
			
			 
		</view> 
		<!-- <view class="u-p-l-10 u-p-r-10">
			<up-parse :content="denglu_info[logintype == 1? 'info1' : 'info2']"></up-parse>
		</view> -->
		<!-- <view class="buttom safe-area-inset-bottom ">
			<view class="u-flex u-flex-items-center  u-p-20 u-p-l-40">
				<up-checkbox-group 
					v-model="agree"
					placement="row"
					@change="agreeChange"
					>
					<up-checkbox name="agree"></up-checkbox>
				</up-checkbox-group>
				<view class="hint u-flex-1 u-p-l-5">
					已同意
					<text @click="base.handleGoto('/pages/login/xieyi')" class="link">《服务协议》及《隐私政策》</text>
				</view>
			</view>
			<up-safe-bottom></up-safe-bottom>
		</view> -->
		
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
		login: '',
		passwd: '',
	})
	const agree = ref([])
	const passwordType = ref(true)
	const uid = ref('')
	const denglu_info = ref({})
	const rules = computed(() => {
		if(logintype.value == 2) {
			return {
				login: [{
					required: true,
					message: '请输入账号/手机号',
					trigger: ['blur', 'change']
				}, ],
				passwd: [{
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				}, ],
			}
		}
		else if(logintype.value == 1) {
			return {
				login: [{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					},
					{
						validator: (rule, value, callback) => {
							console.log(uni.$u.test.mobile(value))
							return uni.$u.test.mobile(value)
						},
						message: '请输入正确的11位手机号',
						trigger: ['blur', 'change']
					},
				],
			}
		}
		return {}
	})
	
	onLoad((options) => {
		if(options.hasOwnProperty('type')) {
			logintype.value = options.type
		}
		if(options.hasOwnProperty('uid')) {
			uid.value = options.uid
		}
		// const res = await $api.denglu_info()
		// if(res.code == 1) {
		// 	denglu_info.value = res.list
		// }
	})
	onReady(() => { 
		handleSetRules()
	})
	function handleSetRules() { 
		uForm.value.setRules(rules.value)
	} 
	function submit() {
		// #ifdef APP-PLUS
		if(agree.value.length == 0) {
			uni.showToast({
				title: '请先阅读并勾选《服务协议》及《隐私政策》',
				icon: 'none'
			})
			return
		}
		// #endif 
		uForm.value.validate().then(valid => {
			if (valid) {
				// console.log('验证通过');
				if (logintype.value == 1) {
					getCode()
				} else {
					getLogin()
				}
			} else {
				// console.log('验证失败');
			}
		}).catch(errors => {
			// uni.$u.toast('请检查表单内容')
		});
	} 
	function getCode() {
		uni.navigateTo({
			url: `/pages/login/code?login=${form.value.login}&uid=${uid.value}`
		})
	} 
	async function getLogin() {
		uni.showLoading({
			title: '登录信息验证中...'
		})
		// await uni.$u.sleep(1800)
		let res = await $api.login({
			params: {...form.value, cate: logintype.value == 2? 1:0, uid: uid.value}
		})
		if(res.code == 1) {
			// uni.setStorageSync('login', res.data.back.login)
			// // uni.setStorageSync('mobile', res.data.back.mobile)
			// // uni.setStorageSync('token', res.data.back.token)
			// user.setLogin(1)
			// await wode()
			await menusstore.getMenusData() 
			await user.getUserSubscription()
			naviBack()
			 
		}
		
	} 
	function naviBack() {
		if(uni.getStorageSync('prePage')) {
			uni.redirectTo({
				url: uni.getStorageSync('prePage'),
				success() {
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					uni.removeStorageSync('prePage')
				}
			})
		}else {
			uni.reLaunch({
				url: '/pages/my/my',
				success() {
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
				}
			})
		}
	} 
	function changeLoginType() {
		logintype.value == 1 ? logintype.value = 2 : logintype.value = 1
		form.value.login = ""
		// this.$set(this.form, "login", "")
		uForm.value.clearValidate()
		handleSetRules()
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
				font-size: 50rpx;
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
