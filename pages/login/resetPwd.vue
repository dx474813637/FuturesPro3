<template>
	<view class="wrap">
		<NavBar bgColor="transparent" title="周期掘金" titleStyle="color: #3B4978" customColor="#3B4978" placeholder ></NavBar>
		<view class="content">
			<view class="title u-p-t-80">登录密码重设</view>
			<up-form
				labelPosition="top"
				:model="form" 
				:rules="rules"
				ref="uForm"  
				errorType="toast"
			>
				<up-form-item prop="mobile">
					<up-input shape="circle" size="large"
						v-model="form.mobile" 
						prefixIcon="account-fill"
						border="none" 
						disabled
						fontSize="17px" 
						:customStyle="{padding: '15px', background: '#d8d8d8'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					/> 
				</up-form-item>

				<up-form-item prop="passwd">
					<up-input
						shape="circle"  
						border="none"
						password 
						clearable
						prefixIcon="lock-fill"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
						v-model="form.passwd" 
						placeholder="请输入新密码" 
						fontSize="17px"
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
					></up-input> 
				</up-form-item>
				<up-form-item prop="npasswd">
					<up-input
						shape="circle"  
						border="none"
						password
						clearable
						prefixIcon="lock-fill"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
						v-model="form.npasswd" 
						placeholder="请输入新密码" 
						fontSize="17px"
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
					></up-input> 
				</up-form-item> 
				<up-form-item prop="captcha"> 
					<up-input shape="circle" size="large"
						v-model="form.captcha" 
						prefixIcon="tags-fill"
						border="none"
						clearable 
						fontSize="17px"
						placeholder="请输入验证码" 
						:customStyle="{padding: '10px 15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					> 
						<template #suffix>
							<up-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></up-code>
							<up-button @tap="getCode" :text="tips" type="warning" shape="circle" ></up-button>
						</template>
					</up-input> 
				</up-form-item>
			</up-form>
			<view class="u-p-t-50">
				<up-button type="primary" :ripple="true" @click="submit" size='large' shape="circle" :custom-style="inputStyle">提交</up-button>
			</view>
			


			<!-- <view class="alternative">
				<view class="issue" @click="base.handleGoto({url:'/pages/login/login', type: 'reLaunch'})">返回登录</view>
			</view> -->
		</view>
		<!-- <view class="buttom safe-area-inset-bottom">
			<view class="hint">
				注册/登录代表同意
				<text class="link">平台用户协议、隐私政策，</text>
				并授权使用您的平台账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
			<up-safe-bottom></up-safe-bottom>
		</view> -->

	</view>
</template>
<script setup>
	import {
		userStore
	} from '@/stores/user.js'
	const user = userStore()
	const {
		login
	} = toRefs(user)
	import {
		useCateStore,
		baseStore
	} from '@/stores/base.js'
	const base = baseStore()
	const $api = inject('$api')  
	const {
		themeColor
	} = toRefs(base)
	const form = ref({
		mobile: login.value ,
		passwd: '',
		npasswd: '',
		captcha: '',
	}) 
	const tips = ref('获取验证码')
	const uForm = ref(null)
	const uCode = ref(null)
	const rules = computed(() => {
		return {
			mobile: [{
					required: true,
					message: '手机号有误为空',
					trigger: ['blur', 'change']
				},
				{
					validator: (rule, value, callback) => {
						return uni.$u.test.mobile(value)
					},
					message: '手机号有误',
					trigger: ['blur', 'change']
				},
			],
			passwd: [{
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				},
				{
					validator: (rule, value, callback) => {
						const RegExpObject = /^[0-9A-Za-z]{5,}$/
						return RegExpObject.test(value)
					},
					message: '密码可使用任何英文字母以及阿拉伯数字组合，不得少于5个字符并区分英文大小写',
					trigger: ['blur', 'change']
				},
			],
			npasswd: [{
					required: true,
					message: '请确认密码',
					trigger: ['blur', 'change']
				},
				{
					validator: (rule, value, callback) => {
						return form.value.passwd == value
					},
					message: '密码不一致',
					trigger: ['blur', 'change']
				},
			],
			captcha: {
				required: true,
				message: '请输入验证码',
				trigger: ['blur', 'change']
			}
		}
	})
	onReady(() => {
		uForm.value.setRules(rules)
	})
	function submit() {
		uForm.value.validate().then(valid => {
			console.log(valid)
			if (valid) {
				passwdReset()
			} else {
				// console.log('验证失败');
			}
		}).catch(errors => {
			uni.$u.toast('请检查表单内容')
		});
	} 
	
	function codeChange(text) {
		tips.value = text;
	} 
	function getCode() {
		uForm.value.validateField('mobile', async (err) => {
			console.log(err)
			if(err && err.length > 0) {
				uni.$u.toast(err[0].message);
				return
			}
			if (uCode.value.canGetCode) {
			  // 模拟向后端请求验证码
			  uni.showLoading()
			  const res = await $api.get_captcha({
				  params: {
					  mobile: form.value.mobile,
					  mode: 'forget'
				  }
			  })
			  if(res.code == 1) {
				  uni.$u.toast('验证码已发送');
				  uCode.value.start();
			  }
			} else {
			  uni.$u.toast('倒计时结束后再发送');
			}
		})
		
	} 
	async function passwdReset() {
		uni.showLoading()
		
		let res = await $api.passwd_reset({
			params: {
				...form.value, 
			}
		})
		if(res.code == 1) {
			// uni.setStorageSync('login', res.data.back.login)
			// // uni.setStorageSync('mobile', res.data.back.mobile)
			// // uni.setStorageSync('token', res.data.back.token)
			// this.setLogin(1)
			// this.wode()
			naviBack(res)
			 
		}
		
	}
	function naviBack(res) {
		uni.reLaunch({
			url: '/pages/login/login',
			success() {
				if(res) {
					uni.showToast({
						icon: 'none',
						title: res.msg,
					}) 
				}
			}
		})
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