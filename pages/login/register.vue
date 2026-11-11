<template>
	<view class="wrap">
		<NavBar bgColor="transparent" title="周期掘金" titleStyle="color: #3B4978" customColor="#3B4978" placeholder ></NavBar>
		
		<!-- <view class="top"></view> -->
		<view class="content">
			<view class="title u-p-t-80">欢迎注册</view>
			<up-form 
				labelPosition="top"
				:model="form" 
				ref="uForm" 
			>
				<!-- <up-form-item prop="login" >
					<up-input shape="circle" size="large"
						v-model="form.login" 
						prefixIcon="account-fill"
						clearable
						prefixIconStyle="color: #999"
						placeholder="请输入账号" 
					/>
				</up-form-item> -->
				<up-form-item prop="mobile" >
					<up-input shape="circle" size="large"
						v-model="form.mobile" 
						prefixIcon="phone-fill"
						clearable
						fontSize="17px" 
						placeholder="请输入手机号" 
						:customStyle="{padding: '15px', background: '#F6F6F6'}"
						prefixIconStyle="color: #929cb5"
						placeholderStyle="color: #AFB1B5"
					>
						<template slot="suffix">
							<up-loading-icon show v-if="searching" size="16" color="#007aff"></up-loading-icon>
							<up-icon v-else-if="searchRes == '2'" name="error-circle" color="#da0000"></up-icon>
							<up-icon v-else-if="searchRes == '1'" name="checkmark-circle" color="#00aa7f"></up-icon>
						</template>
					</up-input>
				</up-form-item>

				<!-- <up-form-item prop="passwd" >
					<up-input shape="circle" size="large"
						type="password" 
						prefixIcon="lock-fill"
						clearable
						prefixIconStyle="color: #999"
						v-model="form.passwd" 
						placeholder="请输入密码"
					 />
				</up-form-item>
				<up-form-item prop="passwd2" >
					<up-input shape="circle" size="large"
						type="password" 
						prefixIcon="lock-fill"
						clearable
						prefixIconStyle="color: #999"
						v-model="form.passwd2" 
						placeholder="确认密码"
					 />
				</up-form-item> -->
				<up-form-item >
					<view class="item" @click="roleShow = true" >
						<up-input shape="circle" size="large"
							:value="roleLable"
							prefixIcon="account-fill"
							readonly
							suffixIcon="arrow-down" 
							fontSize="14" 
						></up-input>
					</view>
				</up-form-item>
				
				<up-form-item prop="captcha" >
					<up-input shape="circle" size="large"
						v-model="form.captcha" 
						prefixIcon="tags-fill"
						clearable
						prefixIconStyle="color: #999"
						placeholder="验证码" 
					>
						<template slot="suffix">
							<up-code
								ref="uCode"
								@change="codeChange"
								seconds="60"
								changeText="X秒重新获取"
							></up-code>
							<up-button
								@tap="getCode"
								:text="tips"
								type="warning"
								size="mini"
							></up-button>
						</template>
					</up-input>
				</up-form-item> 
			</up-form>
			<view class="u-flex u-flex-items-start u-m-t-30">
				<up-checkbox-group 
					v-model="agree"
					placement="row" 
					>
					<up-checkbox name="agree"></up-checkbox>
				</up-checkbox-group>
				<view class="hint u-flex-1 u-p-l-5">
					注册前请先阅读并同意
					<text @click="handleGoto('/pages/login/xieyi')" class="link">《服务条款》</text>
				</view>
			</view>
			<up-button type="primary" :ripple="true" @click="submit" :custom-style="inputStyle">注册</up-button>

			
			<view class="alternative">
				<view class="issue" @click="handleGoto({url:'/pages/login/login', type: 'reLaunch'})">返回登录</view>
			</view> 
			
		</view>
		<up-picker 
			:show="roleShow" 
			:columns="columns" 
			closeOnClickOverlay 
			keyName="label"
			@confirm="confirm" 
			@cancel="roleShow = false" 
			@close="roleShow = false"></up-picker>
		<!-- <view class="buttom safe-area-inset-bottom ">
			<view class="u-flex u-flex-items-center u-p-20 u-p-l-40">
				<up-checkbox-group 
					v-model="agree"
					placement="row" 
					>
					<up-checkbox name="agree"></up-checkbox>
				</up-checkbox-group>
				<view class="hint u-flex-1 u-p-l-5">
					注册/登录前请先阅读并勾选同意
					<text @click="handleGoto('/pages/login/xieyi')" class="link">《注册服务协议》</text>
				</view>
			</view>
			<up-safe-bottom></up-safe-bottom>
		</view> -->
		
		<view class="u-p-l-10 u-p-r-10">
			<up-parse :content="denglu_info['info3']"></up-parse>
		</view>
	</view>
</template>

<script>
	
	import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		data() {
			return {
				form: {
					// login: '',
					mobile: '',
					// passwd: '',
					// passwd2: '',
					captcha: '',
				},
				tips: '获取验证码',
				searching: false,
				roleShow: false,
				searchRes: 0,
				timer: null,
				agree: [],
				denglu_info: {
					info3: ''
				},
				roleIndex: 0,
				columns: [
					[
						{
							label: '交易商账户',
							value: ''
						},
						{
							label: '分销账户',
							value: 'fx'
						},
						{
							label: '撮合员',
							value: 'obro'
						}
					]
				]
			}
		},
		onReady() {
			this.handleSetRules()
		},
		computed: {
			inputStyle() {
				return {
					'borderRadius': '10rpx',
					// 'backgroundColor': this.$store.state.theme.themeColor,
					'backgroundColor': '#007aff',
					'marginTop': '40rpx'
				}
			},
			roleLable() {
				return this.columns[0][this.roleIndex].label
			},
			rules() {
				return {
					// login: [{
					// 		required: true,
					// 		message: '请填写账号',
					// 		trigger: ['blur', 'change']
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			const RegExpObject = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,}$/
					// 			return RegExpObject.test(value)
					// 		},
					// 		message: '以字母开头的任何英文字母以及阿拉伯数字组合，不得少于5个字符',
					// 		trigger: ['blur', 'change']
					// 	},
					// ],
					mobile: [
						{
							asyncValidator:  (rule, value, callback) => {
								// this.searchRes = '0'
								// this.searching = false
								if(!uni.$u.test.mobile(value)) {
									callback(new Error('请输入正确的11位手机号'))
									clearTimeout(this.timer)
									this.searchRes = '2'
									this.searching = false
									this.timer = null
									return
								}
								if(this.timer) {
									clearTimeout(this.timer)
									this.timer = null
								}
								this.timer = setTimeout(async () => {
									console.log(value)
									if(this.searching) {
										// this.searchRes = '0'
										// this.searching = false
										return
									}
									this.searching = true
									
									const res = await this.$api.searchMobile({params: {mobile: value}})
									
									this.searching = false
									if(res.code == 1) {
										this.searchRes = '1'
										callback()
									}else {
										this.searchRes = '2'
										callback(new Error(res.msg))
									}
									clearTimeout(this.timer)
									this.timer = null
								}, 1000)
							}
						}
					],
					// passwd: [{
					// 		required: true,
					// 		message: '请输入密码',
					// 		trigger: ['blur', 'change']
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			const RegExpObject = /^[0-9A-Za-z]{5,}$/
					// 			return RegExpObject.test(value)
					// 		},
					// 		message: '密码可使用任何英文字母以及阿拉伯数字组合，不得少于5个字符并区分英文大小写',
					// 		trigger: ['blur', 'change']
					// 	}
					// ],
					// passwd2: [{
					// 		required: true,
					// 		message: '请确认密码',
					// 		trigger: ['blur', 'change']
					// 	},
					// 	{
					// 		validator: (rule, value, callback) => {
					// 			return this.form.passwd == value
					// 		},
					// 		message: '密码不一致',
					// 		trigger: ['blur', 'change']
					// 	},
					// ],
					captcha: {
						required: true,
						message: '请输入验证码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		
		async onLoad(){
			const res = await this.$api.denglu_info()
			if(res.code == 1) {
				this.denglu_info = res.list
			}
		},
		methods: {
			...mapMutations({
				setLogin: 'user/setLogin',
				handleGoto: 'user/handleGoto'
			}),
			...mapActions({
				wode: 'user/wode'
			}),
			confirm(e) {
				console.log('confirm', e)
				this.roleIndex = e.indexs[0]
				this.roleShow = false
			},
			handleSetRules() {
				this.$refs.uForm.setRules(this.rules)
			},
			submit() {
				if(this.agree.length == 0) {
					uni.showToast({
						title: '请先阅读并勾选服务条款',
						icon: 'none'
					})
					return
				}
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						this.getReg()
					} else {
						// console.log('验证失败');
					}
				}).catch(errors => {
					uni.$u.toast('请检查表单内容')
				});
			},
			
			codeChange(text) {
				this.tips = text;
			},
			async getCode() {
				// this.$refs.uForm.validateField('mobile', async (err) => {
					// console.log(err)
					if(this.searchRes != '1' || this.searching) return
					// if(err && err.length > 0) return
					if (this.$refs.uCode.canGetCode) {
					  // 模拟向后端请求验证码
					  console.log('fasong')
					  uni.showLoading()
					  const res = await this.$api.register({
						  params: {
							  ...this.form,
							  flag: 1
						  }
					  })
					  if(res.code == 1) {
						  uni.$u.toast('验证码已发送');
						  this.$refs.uCode.start();
					  }
					} else {
					  uni.$u.toast('倒计时结束后再发送');
					}
				// })
				
			},
			async getReg() {
				if(this.searchRes != '1' || this.searching) return
				uni.showLoading({
					title: '注册信息验证中...'
				})
				
				let res = await this.$api.register({
					params: {
						...this.form,
						flag: 2,
						role: this.columns[0][this.roleIndex].value
					}
				})
				if(res.code == 1) {
					// uni.setStorageSync('login', res.data.back.login)
					// // uni.setStorageSync('mobile', res.data.back.mobile)
					// // uni.setStorageSync('token', res.data.back.token)
					this.setLogin(1)
					await this.wode()
					this.naviBack()
					 
				}
				
			},
			naviBack() {
				uni.reLaunch({
					url: '/pages/my/user/index',
					success() {
						uni.showToast({
							icon: 'none',
							title: res.msg,
						})
					}
				})
			},
			changeLoginType() {
				
			}
		}
	};
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
