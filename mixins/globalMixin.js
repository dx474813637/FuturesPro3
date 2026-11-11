// mixins/globalMixin.js
import messageManager from '@/config/message.js'
import {
		baseStore
	} from '@/stores/base';
	const base = baseStore()
export default {
	data() {
		return {
			// 全局数据
		}
	},
	onLoad(options) {  
		let pages = uni.$u.pages() 
		if(pages[pages.length - 1].route !== 'pages/index/index') {  
			Com.nativeGobackListener(1, () => { 
				Com.browserGoback()
			})
		}else {  
			Com.nativeGobackListener(1, () => { 
				Com.nativeGoback()
			})
		}
		// console.log(1,getCurrentPages())
		
		if (options.hasOwnProperty('scene')) {
			let str = decodeURIComponent(options.scene)
			if (str) {
				str.split('&').forEach(ele => {
					let key = ele.split('=')[0]
					let v = ele.split('=')[1]
					// scene[key] = v;
					if (key && v) options[key] = v
				})
			}
		}
		// console.log('页面加载了 - 来自全局 mixin')
		// 这里可以写全局的页面生命周期逻辑
	},

	onShow() {
		// console.log('页面显示 - 来自全局 mixin')
		// 比如友盟统计、页面曝光等 
	},
	onReady() {
		const {
			proxy
		} = getCurrentInstance();
		// console.log('onReady - 来自全局 mixin', proxy.$refs )
		if (proxy.$refs.globalToast ) {
			messageManager.registerToast(proxy.$refs.globalToast)
			// console.log('GlobalToast实例已注册到消息管理器')
		}
		// #ifdef H5
		// try{
		// 	base.wxShare()
		// }
		// catch(e) {console.log(e)}
		
		// #endif
	},
	methods: {
		// 全局方法
		globalLog(msg) {
			console.log('【全局日志】', msg)
		}
	}
}