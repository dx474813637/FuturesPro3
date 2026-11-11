// import {tim_online_login} from '@/utils/tims_login.js'
// import store from '@/store'

import pinia  from '@/stores/index.js';
// import { nextTick, toRefs } from 'vue'
import {
	baseStore
} from '@/stores/base';
import {
	userStore
} from '@/stores/user';
// import messageManager from './message.js';
const sys = uni.getSystemInfoSync();
const duration = sys.osName == 'ios' ? 2000 : 3000

export default function() { 
	const base = baseStore(pinia)
	const user = userStore(pinia) 
	const {urlParams} = toRefs(base)
	const {user_token_app, limitToken} = toRefs(user)
	const http = uni.$u.http
	// import md5Libs from "@/utils/md5";
	const getTokenStorage = () => {
		let token = ''
		try {
			token = uni.getStorageSync('userid')
		} catch (e) {
			//TODO handle the exception
		}
		return token
	}
	let md5flag = false
	let requests = [] // 存储无token的请求队列
	let isRefreshing = false //正在刷新token
	
	http.setToken = (obj, md5flag) => {
		http.config.header = {
			...http.config.header,
			...obj
		}
		// http.config.header['userid'] = token
		// if(!md5flag) {
		// 	// 不存在md5时保存userid
		// 	uni.setStorageSync('userid', obj.userid) 
		// }

	} 
	// 初始化请求配置
	http.setConfig((config) => {
		/* config 为默认全局配置*/
		config.baseURL = base.configBaseURL; /* 根域名 */
		config.header = {
			...config.header,
			...base.configHeader
		}
		console.log('setConfig', config)
		return config
	})
	http.setBaseUrl = (url) => {
		http.config.baseURL = url 
	}
	// 请求拦截
	http.interceptors.request.use(async (config) => { // 可使用async await 做异步操作
		// console.log(config)
		const token = getTokenStorage()
		config.header = {
			...urlParams.value,
			...config.header,
			// 'shareid': base.shareid,
			userid: token,
			test: '1'
			// poster: uni.getStorageSync('poster')
		}
		config.params = {
			...config.params,
			share_other: base.share_other
		} 
		// #ifdef APP-PLUS
		// 登录接口和刷新token接口绕过
		if (config.url.indexOf('app_login') >= 0) {
			console.log(1,config)
			return config
		} 
		// #endif
		// #ifdef MP-WEIXIN
		// 登录接口和刷新token接口绕过
		if (config.url.indexOf('login_cancel') >= 0) {
			return config
		}
		if (!token) { 
			// 立即刷新token
			if (!isRefreshing) {
				console.log('刷新token ing', config.url)
				isRefreshing = true
				user.refreshToken().then(res => {
					console.log('获取token成功，存入头部',res)
					user.saveUserInfo(res) 
					let userid = "" 
					userid = res.userid 
					http.setToken({
						userid: userid
					}) 
					console.log('刷新token成功，执行队列')
					requests.forEach(cb => cb(userid))
					// 执行完成后，清空队列
					requests = []
				}).catch(res => {
					console.error('refresh token error: ', res)
				}).finally(() => {
					isRefreshing = false
				})
			}
			return new Promise(resolve => {
				requests.push((token) => {
					// 因为config中的token是旧的，所以刷新token后要将新token传进来
					config.header['userid'] = token
					resolve(config)
				})
			})

		}
		// #endif
		// #ifdef H5
		// 登录接口和刷新token接口绕过
		// if (config.url.indexOf('login_cancel') >= 0) {
		// 	return config
		// }
		// console.log(Com)
		if (!user_token_app.value ) { 
			// 立即刷新token
			if (!isRefreshing) {
				console.log('刷新token ing', config.url)
				isRefreshing = true
				user.checkUserToken().then(res => {
					limitToken.value = res.list
					if (res && res.list == 0) {
						limitToken.value = 0
						uni.showModal({
							title: '系统提示',
							content: res.msg,
							showCancel: false,
							success: function (r) {
								if(r.confirm) {
									if(res.zt == 1) {
										//新开webview
										Com.newWebViewOpenPage(() => {
											console.log('callback')
										}, {
											pageUrl: res.url, 
											weburl: window.location.href
										}, true)
										// onCallNative('WebContainer', 'transitionWeb', {pageUrl: res.url}, callback);
									}
									else {
										//关闭webview
										onCallNative('WebContainer', 'doFinish', {}, '');
									}
								}
								
							}
						}); 
					} 
					else {
						console.log('刷新token成功，执行队列')
						requests.forEach(cb => cb(res))
						// 执行完成后，清空队列
						requests = [] 
					}
				}).catch(res => {
					console.error('refresh token error: ', res)
				}).finally(() => {
					isRefreshing = false
				})
			}
			return new Promise(resolve => {
				requests.push((res) => {
					// 因为config中的token是旧的，所以刷新token后要将新token传进来
					// config.header['userid'] = token
					config.header['usertoken'] = res.usertoken
					config.header['token'] = res.token
					resolve(config)
				})
			})

		}
		// #endif
		// console.log(config)
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	http.interceptors.response.use((response) => { 
		uni.hideNavigationBarLoading();
		uni.hideLoading({
			fail: () => {},
			success: () => {},
			complete: (complete) => {}
		})
		if (response.hasOwnProperty('data')) { 
			if (response.data.code != 1) {
				if (response.data.msg) { 
					messageManager.showError(response.data.msg); 
				}
				if(response.data.code == 9) {
					user_token_app.value = ''
					uni.showToast({
						title: '权限有误',
						icon: 'error'
					})
				}
			} 
		}
		// console.log(1, response)
		return response.data 
	}, (response) => {
		// console.log(2, response)
		// 对响应错误做点什么 （statusCode !== 200） 
		messageManager.showError(response.errMsg); 
		return Promise.reject(response)
	})
}