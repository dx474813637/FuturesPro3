import App from './App' 
import '@/utils/app_common_bridge.js'
import uviewPlus from 'uview-plus'
import pinia from '@/stores/index.js';
import apis from './config/apis/index'
import setHttp from '@/config/request.js'  
import GlobalToast from '@/components/GlobalToast/GlobalToast.vue'  
import globalMixin from './mixins/globalMixin'
import {
	createSSRApp
} from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.mixin(globalMixin)
	app.component('GlobalToast', GlobalToast) 
	app.use(uviewPlus).use(pinia);  
	app.provide('$http', uni.$u.http);  
	app.provide('$api', apis);
	setHttp()
	return {
		app
	}
}