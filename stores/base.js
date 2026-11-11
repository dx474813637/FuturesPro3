import {
	defineStore,
	storeToRefs
} from 'pinia';
import {onCallNative} from '@/utils/guosen.js'
import pinia from '@/stores/index.js'
import apis from '@/config/apis/index';
// import {initAddressData} from '@/utils/base.js'
// let addressData = initAddressData()
import { userStore } from '@/stores/user'; 
// const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync():{}
// console.log(extConfig) 
let pageRoute = uni.getStorageSync('noTokenNeedPermissionRoute') || ''
import {isWeixinBrowser} from '@/utils/base' 
export const baseStore = defineStore('base', {
	state: () => {
		return {
			sys: uni.getSystemInfoSync(), 
			configBaseURL: `${window._url}/Ppi3/`, 
			configHeader: {
				'content-type': 'application/x-www-form-urlencoded', 
				// 'token': uni.getStorageSync('token') || '', 
			},
			urlParams: {
				token: 1
			},
			share_other: '',
			// themeColor: '#1777FF',
			themeColor: '#FF3A3B',
			empty: 'https://cft.100ppi.com/Public/memu/data1.png',
			online: {
				count: 0, 
			}, 
			msg: {},
			home: {},
			roomList: [],
			home_loading: false,
			noTokenNeedPermissionRoute: pageRoute,
			// regional_list: addressData,
			// regional_list_loading: false,
			// addressData: addressData,
			msgBox: {
				show: false,
				content: ''
			},
			analysisModeList:[
				{
					value: '1',
					name: '热点选股',
					themeColor: '#FF3A3B',
					apiName: 'gpt',
					bgHeaderImage: 'https://cft.100ppi.com/Public/rdxg-bg/rdxg-bg.png',
				},
				{
					value: '2',
					name: '季报选股',
					themeColor: '#FF3A3B',
					apiName: 'gpt_analysis',
					bgHeaderImage: 'https://cft.100ppi.com/Public/rdxg-bg/jbxg-top.png',
				}
			]
		};
	}, 
	actions: { 
		setMsgBox( data ) { 
			this.msgBox = data;
		},
		async getRoomList() {
			if(this.home_loading) return
			try {
				this.home_loading = true
				const res = await apis.yuyue_roomid_list() 
				if(res.code == 1) { 
					this.home_loading = false
					//获取搜索类型数据
					this.home = res.home
					this.roomList = res.list
					return res
				}
			} catch (error) { 
				this.home_loading = false
				return error
			}
		},
		getMsg(data) {
			console.log('getMsg', data)
			this.msg = data
		},
		addMsg(data) {
			console.log('add', data)
			this.msg.push(data)
		},
		delMsg(data) {
			this.msg.shift(data)
		},
		saveShareInfo(data) {
			this.share_other = data;
		}, 
		handleGoto(data, type="") {
			// #ifdef H5
			if(type == 'alink') { 
				window.location.href = data
				return
			}
			// #endif
			if(type == 'serviceChat') { 
				if(!data.url || !data.appid) {
					uni.showToast({ title: '客服参数异常' })
					return 
				}
				wx.openCustomerServiceChat({
				  extInfo: { url: data.url },
				  corpId: data.appid,
				  ...data,
				  success(res) {
					  if(data.hasOwnProperty('success')) {
						  data.success(res)
					  }
				  },
				  fail(err) {
					  if(data.hasOwnProperty('fail')) {
						  data.fail(err)
					  }
				  }
				})
				return
			}
			// if(!data.hasOwnProperty('params')) {
			// 	data.params = {_xx: 'x'}
			// }
			uni.$u.route(data)
		}, 
		setNoTokenNeedPermissionRoute(data) {
			this.noTokenNeedPermissionRoute = data;
			uni.setStorageSync('noTokenNeedPermissionRoute', data)
		},
		handleLongPress(imageUrl){
			console.log(imageUrl)
		  uni.showActionSheet({
		    itemList: ['保存图片到相册'],
		    success: (res) => { 
		      if (res.tapIndex === 0) {
		        this.saveImage(imageUrl)
		      }
		    }
		  })
		},
		saveImage(imageUrl){
		  // 如果是网络图片，需要先下载
		  if (imageUrl.startsWith('http')) {
		    uni.downloadFile({
		      url: imageUrl,
		      success: (res) => { 
		        if (res.statusCode === 200) {
		          this.saveToAlbum(res.tempFilePath)
		        }
		      }
		    })
		  } else {
		    this.saveToAlbum(imageUrl)
		  }
		},
		saveToAlbum(filePath){
		  uni.saveImageToPhotosAlbum({
		    filePath: filePath,
		    success: () => {
		      uni.showToast({ title: '保存成功', icon: 'success' })
		    },
		    fail: (err) => {
		      if (err.errMsg.includes('auth deny')) {
		        uni.showModal({
		          title: '提示',
		          content: '请授权保存相册权限',
		          success: (res) => {
		            if (res.confirm) {
		              uni.openSetting()
		            }
		          }
		        })
		      }
		    }
		  })
		},
		async get_regional_list() {
			if(this.regional_list_loading) return
			try {
				this.regional_list_loading = true
				const res = await apis.addressDetail() 
				if(res.code == 1) { 
					this.regional_list_loading = false
					//获取搜索类型数据
					this.regional_list = exchangeData(JSON.parse(res.regional_list))
					// console.log(this.regional_list)
					return true
				}
			} catch (error) { 
				this.regional_list_loading = false
				return error
			}
		},
		async getImageBase64_readFile(tempFilePath) {
			console.log(tempFilePath)
			  return await new Promise(resolve => {
					//获取全局唯一的文件管理器 
					uni.getFileSystemManager().readFile({ //读取本地文件内容
					  filePath: tempFilePath, // 文件路径
					  encoding: 'base64', // 返回格式
					  success: ({
						data
					  }) => {
						// return resolve('data:image/png;base64,' + data);
						return resolve( data);
					  }
					});
			  });
		},
		blobToFile (blob,fileName) {
			return new File([blob], fileName, {type:'image/png'})
		},
		async uploadFilePromise(files, api="upimg") { 
			return new Promise((resolve, reject) => {  
				// #ifdef APP-PLUS
				uni.uploadFile({
					url: `${this.configBaseURL}${api}`,  
					files: files,  
					header: {
						'appid': 10005,
						'appsecret': 'cd5dZ01POBjvEGvBZEE83C2ItAHHIw+TT54A1+BKq72XpxbaE7oOmz4',
						'userid': uni.getStorageSync('userid') || '', 
					},
					success: (res) => {
						console.log(res)
						resolve(JSON.parse(res.data))
					},
					fail(error) { 
						console.log(error)
						reject(error)
					}
				});
				// #endif
				// #ifdef MP-WEIXIN
				uni.uploadFile({
					url: `${this.configBaseURL}${api}`, 
					filePath: url,
					name: 'file',
					header: {
						...this.configHeader,
						'content-type': 'multipart/form-data',
						userid: uni.getStorageSync('userid'),
					},
					success: (res) => {
						console.log(res)
						resolve(JSON.parse(res.data))
					},
					fail(error) { 
						console.log(error)
						reject(error)
					}
				}); 
				// #endif
				// #ifdef H5 
				uni.uploadFile({
					url: `${this.configBaseURL}${api}`,  
					files: files,  
					header: {
						'appid': 10004,
						'appsecret': '29caD4UaRVtdotmMrRksDcYHOBG2VxunY278w7+6LK6rE/V1VW29fPY',
						'userid': uni.getStorageSync('userid') || '', 
					},
					success: (res) => {
						console.log(res)
						resolve(JSON.parse(res.data))
					},
					fail(error) { 
						console.log(error)
						reject(error)
					}
				});
				// #endif
			})
		},
		appShare(res) { 
			const _params = {
				shareTitle: res.shareTitle || '标题',
				shareMessage: res.shareMessage || '内容',
				shareUrl: res.shareUrl || '落地链接',
				shareImageUrl: res.shareImageUrl || '分享图片'
			};
			onCallNative('WebContainer', 'shareOutApp', _params);
		},
		async wxShare(){
			return
			// console.log( 'wxShare' ) 
			if (!isWeixinBrowser()) return  
			let url = window.location.href
			const res = await apis.get_share_url({params: {url, share_id: uni.getStorageSync('share_id') || ''}})
			if(res && res.code == 1) {
				if(jWeixin && jWeixin.config) {
					const share_config = res.list
					jWeixin.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: share_config.appid, // 必填，公众号的唯一标识
						timestamp: share_config.timestamp, // 必填，生成签名的时间戳
						nonceStr: share_config.noncestr, // 必填，生成签名的随机串
						signature: share_config.signature,// 必填，签名
						jsApiList: [
							'onMenuShareAppMessage',
							'onMenuShareTimeline',
							'chooseWXPay',
							'showOptionMenu',
							"updateAppMessageShareData",
							"updateTimelineShareData",
							"hideMenuItems",
							"showMenuItems" ,
							"downloadImage"
						] // 必填，需要使用的JS接口列表
					});
					jWeixin.ready(() => { 
						// console.log('wxShare2')
						let obj = {
							title: share_config.title,
							link: res.url,// url,
							desc: share_config.desc || '',
							imgUrl: share_config.imgUrl || '',
						}
						  // 分享到朋友圈及QQ空间
						if(jWeixin.updateAppMessageShareData) {
						   	jWeixin.updateAppMessageShareData({
								...obj, 
								success(data){
									console.log('success', data)
								}, 
								fail(data){
									console.log('fail', data)
								}
							})
						} else {
						  	jWeixin.onMenuShareAppMessage({...obj})
						} 
						  // 分享给朋友及分享到QQ
						if(jWeixin.updateTimelineShareData) {
						   	jWeixin.updateTimelineShareData({
								...obj, 
								success(data){
									console.log('success', data)
								}, 
								fail(data){
									console.log('fail', data)
								}
							})
						} else {
						  	jWeixin.onMenuShareTimeline({...obj})
						}  
					 
						jWeixin.error((err ) => {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
							console.log('验证失败', err)
						})
					}) 
				}
			} 
		} 
	},
});
 

export const menusStore = defineStore('menus', {
	state: () => {
		return {  
			menus: [
				{
					icon: 'home',
					name: '周期掘金', 
					url: '/pages/index/index',
					type: 1,
					route: '/pages/index/index',
					options: {}
				},
				{
					icon: 'find',
					name: '快讯',
					url: '/pages/index/daily',
					type: 3,
					route: '/pages/index/daily',
					options: {}
				},
				{
					icon: 'search',
					name: '热点选股',
					url: '/pages/analysis/analysis?mode=1',
					type: 3,
					route: '/pages/analysis/analysis',
					options: {
						mode: 1
					}
				},
				{
					icon: 'horizontal',
					name: '季报选股',
					url: '/pages/analysis/analysis?mode=2',
					type: 3,
					route: '/pages/analysis/analysis',
					options: {
						mode: 2
					}
				} 
			], 
			menus_community: [], 
			menus_note: [], 
			menus_51xp: [], 
			menus_wd: [],
			menus_wd1: [], 
			menus_ad: {},
			menus_xr: {},
			menus_xr_loading: false,
			new_memu: [],
			news: 0,
			currPage: {
				route: '/pages/index/index',
				options: {}
			},
			cpy_type_origin: [[]],
			cpy_type: [[]]
		};
	},
	getters: {
		menusActive: (state) => {
			return state.menus.findIndex(ele => {
				if(state.currPage.route == '/pages/analysis/analysis') {
					return ele.route == state.currPage.route && ele.options.mode == state.currPage.options.mode
				}else {
					return ele.route == state.currPage.route
				}
			})
		} ,
		menusNoteActive: (state) => state.menus_note.findIndex(ele => ele.route == state.currPage.route) ,
	}, 
	actions: {
		saveCurPage(data) {
			// console.log('saveCurPage', data)
			this.currPage = data;
		},
		async getMenusData() {   
			const res = await apis.memu()  
			if(res.code == 1) {  
				const user = userStore()
				const {shenhe_flag, login, partner, partner_amount, partner_amount2, share_id, partner_amount_list, partner_amount2_list} = toRefs(user)
				login.value = res.login 
				share_id.value = res.share_id 
				partner.value = res.partner 
				partner_amount.value = res.partner_amount 
				partner_amount2.value = res.partner_amount2 
				partner_amount_list.value = res.partner_amount_list
				partner_amount2_list.value = res.partner_amount2_list
				shenhe_flag.value = res.test
				if(res.share_id) uni.setStorageSync('share_id', res.share_id)
				// user.saveUserInfo(res.info)
				// user.getUserInfo(res.info)
				//获取底部导航菜单
				this.menus = res.list.map((ele, index) => {
					let paramsStr = ele.url.split('?')[1] || ''
					let paramsObj = {}
					paramsStr && paramsStr.split('&').forEach(item => {
						paramsObj[item.split('=')[0]] = item.split('=')[1]
					})
					 
					return {
						...ele,
						route: ele.url.split('?')[0],
						options: paramsObj
					}
				})   
				// this.menus_51xp = res.list.memu
				// 获取个人中心基础菜单
				// this.menus_wd = res.list
				// this.menus_wd1 = res.list1
				// this.menus_ad = res.ad || {}
				// this.menus_xr = res.xr || {}
				 
			} 
		},
		async getCommunityMenusData($http) {   
			const res = await apis.memu2()  
			if(res.code == 1) {  
				let user = userStore()
				// user.saveUserInfo(res.info)
				user.getUserInfo(res.info)  
				this.menus_community = res.list 
			} 
		},
		async getNoteMenusData($http) {   
			const res = await apis.longs_memu()  
			if(res.code == 1) {   
				//获取底部导航菜单
				this.menus_note = res.memu.map((ele, index) => {
					let paramsStr = ele.url.split('?')[1] || ''
					let paramsObj = {}
					paramsStr && paramsStr.split('&').forEach(item => {
						paramsObj[item.split('=')[0]] = item.split('=')[1]
					})
					 
					return {
						...ele,
						route: ele.url.split('?')[0],
						options: paramsObj
					}
				})   
				 
			} 
		}
	},
});


export const useCateStore = defineStore('cate', {
	state: () => {
		return {  
			name: '',
			cate_list: [], 
			cate_list2: [],  
			cate_origin: [],
			cate_loading: false, 
			qxt: [],
			qxt_one: [],
			qxt_loading: false,
			seasonConfig_sdate: [],
			seasonConfig_loading: false, 
			qxt_position_list: [
				{
					name: '10天',
					value: 'ten_day_position', 
					keys_front: 'ten_day',
					name_tj: '10天',
				},
				{
					name: '20天',
					value: 'twenty_day_position',  
					keys_front: 'twenty_day',
					name_tj: '20天', 
				},
				{
					name: '30天',
					value: 'thirty_day_position',  
					keys_front: 'thirty_day',
					name_tj: '30天', 
				},
				{
					name: '60天',
					value: 'sixty_day_position',  
					keys_front: 'sixty_day',
					name_tj: '60天', 
				},
				{
					name: '90天',
					value: 'three_month_position',  
					keys_front: 'three_month',
					name_tj: '90天', 
				} ,
				{
					name: '一年',
					value: 'one_year_position',  
					keys_front: 'one_year' ,
					name_tj: '一年',
				} 
			],
			ad:'',
			info_loading:false,
			infoConfig: {
				gpt: {
					hxyl: {
						title: '核心原理',
						content: '',
					},
					xgff: [
						{
							title: '热点选股',
							content: '利用n天商品价格上涨幅度，筛选热点商品，从而选择合适的周期股投资机会。'
						},
						{
							title: '季报选股',
							content: '利用季报周期内商品价格上涨幅度，提前于季报与年报，发现周期股买入信号。'
						},
					], 
					jtff: {
						title: '具体方法',
						content: '',
					},
				},
				qxt: {
					hxyl: {
						title: '核心原理',
						content: ''
					},
					jtff: {
						title: '具体方法',
						content: ''
					}, 
					
				}
			}
		};
	},
	getters: { 
	}, 
	actions: { 
		async getSeasonConfigData() {  
			this.seasonConfig_loading = true
			let r
			try {
				const res = await apis.gpt_analysis()
				this.seasonConfig_loading = false
				if(res.code == 1) { 
					this.seasonConfig_sdate = res.list.res.list_date.map(ele => ({value: ele.sdate, name: ele.sdate})) 
					// const base = baseStore()
					// base.appShare(res)
					r = res
				} 
			} catch (error) { 
				console.log(error)
				this.seasonConfig_loading = false
				return error
			}
			return r
		},
		
		async getInfoData() { 
			this.info_loading = true
			try {
				const res = await apis.about3() 
				this.info_loading = false
				if(res.code == 1) { 
					this.ad = res.list.ad
					this.name = res.list.name
					this.infoConfig.qxt.hxyl.content = res.list.info1
					this.infoConfig.qxt.jtff.content = res.list.info2 
					this.infoConfig.gpt.hxyl.content = res.list.info4
					this.infoConfig.gpt.jtff.content = res.list.info5
				}
			} catch (error) { 
				console.log(error)
				this.info_loading = false
				return error
			}
			
		},
		async getCateData() { 
			this.cate_loading = true
			try {
				const res = await apis.category() 
				this.cate_loading = false
				if(res.code == 1) { 
					//获取搜索类型数据
					this.cate_origin = uni.$u.deepClone(res.list)
					this.cate_list_one = this.cate_origin.reduce((acc, item) => acc.concat(item.children.map(ele => ({...ele, value: ele.id}))), []);
					this.cate_list = res.list.map(ele => {
						ele.children.unshift({
							name: '全部',
							id: ele.id
						})
						return {
							...ele
						}
					})  
				}
			} catch (error) { 
				console.log(error)
				this.cate_loading = false
				return error
			}
			
		},
		async getQxtData() { 
			this.qxt_loading = true
			try {
				const res = await apis.qxt() 
				this.qxt_loading = false
				if(res.code == 1) { 
					//获取搜索类型数据
					this.qxt = uni.$u.deepClone(res.list.res.listing)
					this.qxt_one = this.qxt.reduce((acc, item) => acc.concat(item.plist.map(ele => ({...ele, name: ele.product, value: ele.dashboard_ppid}))), []);
					console.log(this.qxt_one) 
				}
			} catch (error) { 
				console.log(error)
				this.qxt_loading = false
				return error
			}
			
		},
		async getCate2Data() { 
			this.cate_loading = true
			try {
				const res = await apis.cate_list({params: {pf: 1}}) 
				this.cate_loading = false
				if(res.code == 1) { 
					//获取搜索类型数据
					// this.cate_origin = uni.$u.deepClone(res.list)
					this.cate_list2 = res.list.map(ele => {
						ele.children.unshift({
							name: '全部',
							id: ele.id
						})
						return {
							...ele
						}
					})  
				}
			} catch (error) { 
				console.log(error)
				this.cate_loading = false
				return error
			}
			
		}
	}, 
}) 


function exchangeData(data) {
	let arr = []
	arr = data.map(ele => {
		let base = {
			text: ele.value,
			value: ele.id, 
		}
		if(ele.childs) {
			base.children = exchangeData(ele.childs)
		}
		return base
	})  
	return arr
}