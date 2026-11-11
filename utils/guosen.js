export function onCallNative(module, method, params) {
	var PROCOTOL = 'guosen';
	//console.log(param);
	//console.log(callback);
	var l = "";
	var isMobile = Com.clientType();
	// var isMobile = 'android';
	var delIframe = function(id) {
		var tmp = document.getElementById(id);
		if (tmp && tmp.remove) {
			tmp.remove();
		} else if (tmp) {
			document.body.removeChild(tmp);
		}
	};
	if (arguments.length == 3) {
		l = PROCOTOL + '://' + module + '/' + method + '/?params=' + JSON.stringify(params);
	} else if (arguments.length > 3) {
		l = PROCOTOL + '://' + module + '/' + method + '/?params=' + JSON.stringify(params);
		l = arguments[3] == "" ? l : l + '&callback=' + arguments[3];
	}
	if (isMobile == 'android') { 
		window.prompt(l); 
	} else {
		var iframeid = module + method;
		var iframe = document.createElement("iframe");
		iframe.id = iframeid;
		iframe.src = l;
		iframe.style.display = "none";
		document.body.appendChild(iframe);
		setTimeout(function() {
			delIframe(iframeid);
		}, 100);
	}
	if (!(isMobile == 'ios' || isMobile == 'android')) {
		arguments[4] = arguments[4] || "{}";
		onCallJs('{"action":"' + arguments[3] + '","param":' + arguments[4] + '}');
	}
}

// 2、获取金太阳userToken
// var random = '_'+(Math.random()+'').split('.')[1];
//     var callbackName = 'setUserToken'+random;
//     $js['setUserToken'+random] = function(p){
//         var c = typeof (callback)
//         if(typeof callback === 'function'){
//             callback(p);
//         }
//     };
// onCallNative('DataService','getUserToken',{},callbackName);

// 3、设置分享
// const _params = {
// 	shareTitle: '标题',
// 	shareMessage: '内容',
// 	shareUrl: '落地链接',
// 	shareImageUrl: '分享图片'
// };
// onCallNative('WebContainer', 'shareOutApp', _params);

// 4、打开个股行情
// var datajson = {};
// datajson['stockCode'] = stockCode;   // 股票代码
// datajson['stockName'] = stockName;   // 股票名称
// datajson['stockMarket'] = stockMarket;  // 市场代码 1 深圳 2 上海  3香港  5 股转和北京
// onCallNative('WebContainer', 'transitionStockInfo', datajson, '');

// 5、新开webview
// var datajson = {}
// datajson['pageUrl'] = '目标链接';
// onCallNative('WebContainer', 'transitionWeb', datajson, callback);
// onCallNative('WebContainer', 'transitionWeb', datajson, callback);
// 6、关闭webview
// onCallNative('WebContainer', 'doFinish', {}, '');
// 7、弹窗交易登录
// onCallNative('DataService', 'doTradeLoginData', {}, callback, ''); // callback为交易登录后的回调方法