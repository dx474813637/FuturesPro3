import {
	defineStore
} from 'pinia';
import apis from '@/config/apis/index'; 
import { menusStore } from '@/stores/base'; 
import CryptoJS from 'crypto-js';
export const userStore = defineStore('user', {
	state: () => {
		return { 
			login: '', 
			subscription_loading: false,
			gpt: {},
			qht: {},  
			shenhe_flag: 0,
			share_id: '',
			partner: 0,
			partner_amount: 0,
			partner_amount2: 0, 
			partner_amount_list: [], 
			partner_amount2_list: [], 
			userInfo: uni.getStorageSync('userInfo') || {},
			user_token_app: '1',
			limitToken: 1
		};
	},
	getters: { 
		gptExpireTimestamp(){
			return new Date(this.gpt.expire_date).getTime() || 0
		},
		gptVip() {
			return this.gptExpireTimestamp > new Date().getTime() 
		},
		qhtExpireTimestamp(){
			return new Date(this.qht.expire_date).getTime() || 0
		},
		qhtVip() {
			return this.qhtExpireTimestamp > new Date().getTime() 
		},
		subsVip() {
			return this.gptVip || this.qhtVip
		}
	}, 
	actions: {
		async checkUserToken() {
			// const now1 = new Date();
			// const dateStr1 = `${now1.getFullYear()}/${String(now1.getMonth() + 1).padStart(2, '0')}/${String(now1.getDate()).padStart(2, '0')}`;
			// const encryptedMessage1 = CryptoJS.MD5(dateStr1).toString();
			// console.log(encryptedMessage1)
			// return
			
			console.log('注意测试: getGuosenAppUserToken before')
			let user_token_app = await this.getGuosenAppUserToken()  
			console.log('注意测试: getGuosenAppUserToken after success token: ', user_token_app)
			// let user_token_app = ''
			if(!user_token_app) { 
				uni.showModal({
					title: 'Error',
					content: '获取token失败',
					showCancel: false,
					success: function (res) {
						onCallNative('WebContainer', 'doFinish', {}, '');
					}
				});
				return 
			}
			const now = new Date();
			const dateStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
			const encryptedMessage = CryptoJS.MD5(dateStr + user_token_app).toString();
			this.user_token_app = user_token_app
			uni.$u.http.setToken({
				token: encryptedMessage,
				usertoken: user_token_app
			})
			try{
				const res = await apis.gx_check_auth({params: {usertoken: user_token_app}})
				// if(res.list == 0) this.limitToken = 0
				return {...res, usertoken: user_token_app, token: encryptedMessage}
			}
			catch(e) { 
				uni.showModal({
					title: 'Error',
					content: e,
					showCancel: false,
					success: function (res) {
						onCallNative('WebContainer', 'doFinish', {}, '');
					}
				});
			}
		},
		getGuosenAppUserToken() { 
			return new Promise((resolve, reject) => {
				var random = '_' + (Math.random() + '').split('.')[1];
				var callbackName = 'setUserToken' + random;
				$js[callbackName] = function(p) {
					let token = p.token || ''
					console.log('注意测试: getGuosenAppUserToken callback:', token, p)
					resolve(token);
				};
				try{
					onCallNative('DataService', 'getUserToken', {}, callbackName); 
				}
				catch(e) {
					console.log('onCallNative', e)
				}
				setTimeout(() => {
					console.log(new Error('getUserToken timeout'))
					reject('')
				}, 10000);
			});
		},
		async getUserData() { 
			 
			// #ifdef APP-PLUS 
			// uni.removeStorageSync('userid') 
			if(!uni.getStorageSync('userid')) {
				await this.getNewAppToken()
			}
			// #endif
			const menus = menusStore()
			await menus.getMenusData()
			if(this.login && this.login != '0') {
				await this.getUserSubscription()
			}
			
		}, 
		async getUserSubscription() {
			if(this.subscription_loading) return
			this.subscription_loading = true
			try{
				const res = await apis.my_subscription()
				if(res.code == 1) {
					this.gpt = res.list.res.gpt
					this.qht = res.list.res.qht
					this.userInfo = res.info
					uni.setStorageSync('userInfo', res.info)
				}
			}catch(e) {
				
			} 
			this.subscription_loading = false
		}, 
		clearLogout() {
			this.share_id = ''  
			this.login = ''  
			this.partner_amount = 0  
			this.partner_amount2 = 0  
			this.partner_amount_list = [] 
			this.partner_amount2_list = [] 
			this.userInfo = {}
			this.gpt = {}
			this.qht = {}
			uni.removeStorageSync('userInfo')  
		},
		async logout() {
			uni.showLoading()
			const res = await apis.logout();
			if(res.code == 1) {
				this.clearLogout()
				messageManager.showSuccess(res.msg); 
			}
		}, 
		async getUserInfo(data) { 
			this.user_info = data;
			
			data.tid && uni.$u.http.setToken({
				tid: data.tid
			})  
			data.id && uni.$u.http.setToken({
				poster: data.id
			})  
		},
		async refreshUserData() {
			const res = await apis.memu()
			if(res.code == 1) {   
				// this.getUserInfo(res.info)
				this.login = res.login 
			}
		}, 
		saveUserInfo(data) {
			// this.user = data; 
			// uni.setStorageSync('poster', data.poster) 
			// uni.setStorageSync('user', data) 
			uni.setStorageSync('userid', data.userid) 
		},
		get_xcx_code() {
			return new Promise((resolve, rejected) => {
				uni.login({
					success: function (res){
						resolve(res.code);
					},
					fail: err => {
						// md5flag = true
						rejected(err)
					}
				});
			});
		},
		async refreshAppToken() {
			try{
				// let code = await this.get_xcx_code();
				// console.log('code打印:',code) 
				let data = uni.getSystemInfoSync() 
				return apis.app_login({params: {id: data.deviceId}}) 
			}catch(e){
				return e
			}
		},
		async refreshToken() {
			try{
				let code = await this.get_xcx_code();
				console.log('code打印:',code)
				return apis.login_cancel({params: {code}}) 
			}catch(e){
				return e
			}
		},
		async getNewToken() {
			this.refreshToken().then(res => {
				console.log('获取token成功，存入头部',res)
				this.saveUserInfo(res) 
				let userid = "" 
				userid = res.userid
				uni.$u.http.setToken({
					userid: userid
				}) 
			}) 
		},
		async getNewAppToken() {
			this.refreshAppToken().then(res => {
				console.log('获取token成功，存入头部',res)
				this.saveUserInfo(res) 
				let userid = "" 
				userid = res.userid
				uni.$u.http.setToken({
					userid: userid
				}) 
			}) 
		}
	},
});