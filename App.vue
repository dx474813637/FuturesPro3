<script setup>
// import {
// 	isWeixinBrowser
// } from '@/utils/base.js'
import {
	routingIntercept,
	permissionBase
} from '@/config/permission/index.js'
import {
	inject,
	nextTick,
	toRefs
} from 'vue'
import {
	baseStore, useCateStore
} from '@/stores/base';
import {
	userStore
} from '@/stores/user';
import {
	onLaunch,
	onShow,
	onHide,
} from "@dcloudio/uni-app";
// const $ws = inject('$ws') 
const $http = inject('$http')
const base = baseStore()
const cate = useCateStore()
const userS = userStore()
const {
	user,
	user_token_app
} = toRefs(userS)
const {
	urlParams
} = toRefs(base)
onLaunch(async () => {
	// await uni.$u.sleep(10000)
	const launchInfo = uni.getLaunchOptionsSync();
	console.log('首次启动路径:', launchInfo.path, launchInfo);
	console.log('首次启动参数:', launchInfo.query);
	urlParams.value = launchInfo.query
	// if (urlParams.value?.token) {
	// 	uni.setStorageSync('token', urlParams.value?.token)
	// }

	// const res = await userS.checkUserToken()
	// // window.alert(res.msg)
	// if (res && res.list == 0) { 
	// 	uni.showModal({
	// 		title: '系统提示',
	// 		content: res.msg,
	// 		showCancel: false,
	// 		success: function (res) {
	// 			onCallNative('WebContainer', 'doFinish', {}, '');
	// 		}
	// 	}); 
	// } 
	
	
	routingIntercept({
		$http
	}) 
	// await userS.getUserData()
	cate.getInfoData()
	// let params = ''
	// for (let key in launchInfo.query) {
	// 	if (!params) params += '?'
	// 	else params += '&'
	// 	params += `${key}=${launchInfo.query[key]}`
	// }
	// permissionBase({
	// 	url: '/' + launchInfo.path + params
	// }, {
	// 	$http
	// })

});
onShow(async (options) => {
	if (options.query.hasOwnProperty('scene')) {
		let arr = decodeURIComponent(options.query.scene).split('&')
		arr.forEach(item => {
			let arr2 = item.split('=')
			options.query[arr2[0]] = arr2[1]
		})
	}


});
onHide((options) => {
});
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import "nutui-uniapp/styles/index.scss";
@import '@/common/iconfont.css';
@import '@/common/ext.scss';
/*每个页面公共css */
// $u-error: #F12E24;
</style>