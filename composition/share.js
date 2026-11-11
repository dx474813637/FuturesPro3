import {
	defineComponent,
	ref,
	reactive,
	inject
} from 'vue'
import {
	onLoad,
	onShareAppMessage,
	onShareTimeline
} from '@dcloudio/uni-app'
import {baseStore} from '@/stores/base.js'
const base = baseStore() 
export function share(config={}) {
	const $http = inject('$http') 
	const onlineControl = reactive({
		share_img: '',
		share_title: '',
		share_desc: '',
		title: '',
		path: '',
		query: '',
	})
	const customShareParams = reactive({})
	const pages = getCurrentPages()
	const curPage = pages[pages.length == 1? 0: pages.length - 1]
	// console.log(curPage)
 
	onLoad((options) => { 
		// if (options && options.poster) {
		// 	$http.setToken({
		// 		poster: options.poster
		// 	})
		// }
	})   

	function setOnlineControl(res) { 
		onlineControl.share_img = res.share_img
		if (res.share_title) onlineControl.share_title = res.share_title
		if (res.title) onlineControl.title = res.title
		if (res.share_path) onlineControl.path = res.share_path
		if (res.share_query) onlineControl.query = res.share_query
		if (res.title) {
			uni.setNavigationBarTitle({
				title: res.title
			})
		} 
		// #ifdef H5
		// base.wxShare(res)
		// #endif
	}
 
	return {
		onlineControl,
		customShareParams,
		setOnlineControl
	}
}
