/**
 * @desc和app交互的共用的协议
 */
// import Zepto from 'zepto';
// require('__ROOTPATH__/H5_common/asset/common/js/finance-white-list.js');
var $ = window.$; 
window.$js = window.$js || {}; //全局对象，所有提供给native调用的js方法都放在改对象里
'use strict';
var a = function () {
    },
    b = a.prototype;

/**
 * 调用native的方法
 * @param module    native的模块名(事先约定好)
 * @param method    native的方法名
 * @param params    传给native的参数
 * @param arguments[3]    callback  非必须参数
 * @param arguments[4]    callback params  非必须参数，用于在非webview环境测试
 * 注意：请先在$js对象下定义好callback(arguments[3])，然后再调用onCallNative方法
 */
function onCallNative(module, method, params) {
    var PROCOTOL = 'guosen';
    //console.log(param);
    //console.log(callback);
    var l = "";
    var isMobile = Com.clientType();
    var delIframe = function (id) {
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
	console.log('onCallNative:', l)
    if (isMobile == 'android') {
        window.prompt(l);
    } else {
        var iframeid = module + method;
        var iframe = document.createElement("iframe");
        iframe.id = iframeid;
        iframe.src = l;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        setTimeout(function () {
            delIframe(iframeid);
        }, 100);
    }

    if (!(isMobile == 'ios' || isMobile == 'android')) {
        arguments[4] = arguments[4] || "{}";
        onCallJs('{"action":"' + arguments[3] + '","param":' + arguments[4] + '}');
    }
}
window.onCallNative = onCallNative;
/**
 * native调H5方法的统一入口
 * @param nativeParam  json字符串，eg:'{"action":"XXXXX","param":{key:value......}}'
 * @param arguments[1]  参数nativeParam是否encode处理
 */
function onCallJs(nativeParam) {
    var encode_flag = arguments[1];
    if (!nativeParam || nativeParam == null || nativeParam == "undefined" || nativeParam == "") {
        return;
    }
    //校验参数数据
    if (encode_flag && encode_flag == "1") {
        nativeParam = decodeURIComponent(nativeParam);
    }
    nativeParam = nativeParam.replace(/\r\n|\\r\\n|\\r|\\n/g, "<br/>");
    nativeParam = nativeParam.replace(/\s/gm, "&nbsp;");
    nativeParam = nativeParam.replace(/\\/ig, '');
    var _nativeParam = null;
    try {
        // alert(nativeParam.param);
        //nativeParam.action : 业务名称, nativeParam.param : 业务参数
        _nativeParam = typeof nativeParam == "object" ? nativeParam : JSON.parse(nativeParam);
        if (window.$js) {
            if (typeof $js[_nativeParam.action] == "function") {
                $js[_nativeParam.action](_nativeParam.param);
            }
        } else {
            window[_nativeParam.action](_nativeParam.param);
        }
    } catch (err) {
        //异常兼容处理
        if (!_nativeParam) {
            onCallJSCatchErr(nativeParam, err);
        } else {
            Com.showNativeAlert('', err.message, ['确定'])
        }
    }
}
window.onCallJs = onCallJs;

/**
 * 获取客户端是ios还是Android
 */
b.clientType = function () {
    var u = navigator.userAgent;
    var app_type;
    //return false;
    if (u.indexOf('Android') > -1) {
        app_type = 'android'; //android
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        app_type = 'ios'; //ios
    }
    return app_type;
};


/**
 * 关闭ajaxloading
 */
b.ajaxLoaded = function () {
    Com.nativeLoading(false);
};

/**
 * ajaxloading用于ajax提交时的loading效果(css在common.css中)
 *
 */
b.ajaxLoading = function () {
    /*var imgurl = __uri('../../common/images/loading.gif');
     var loadingObj = $('<div class="loadingbox"><div class="loadingmain"><div class="loadingmask"></div><div class="loadingpic"><img src='+imgurl+' width="18" height="18"></div></div></div>');
     $('body').append(loadingObj);*/
    Com.nativeLoading(true);
};


/**
 * 判断登录状态
 * @param callback
 * @param param
 * @param loginType 1交易密码登录  2指纹登录
 */
b.isTradelogin = function(callback, param,loginType) {
    //默认判断是否做交易密码登录
    var datajson = param || {};
    if(typeof loginType !== 'undefined' && loginType != ''){
        datajson.loginType = loginType;
    }else{
        //如果没有该参数，则询问是否交易密码登录
        datajson.loginType ='1';
    }
    onCallNative('DataService', 'isTradeLogin', datajson, callback, '');

    //isTradeLogined:1登录；isTradeLogined:0未登录
    //onCallJs('{"action":"'+callback+'","param":{"isTradeLogined":1}}');
};

/**
 * 弹出native登录界面
 * @param callback
 * @param param
 * @param loginType 1密码登录 2支持指纹/人脸登录)
 */
b.callNativeLogin = function(callback, param,loginType) {
    //默认弹出交易密码登录界面
    var datajson = param || {};
    if(typeof loginType!=='undefined' && loginType!=''){
        datajson.supportBioLogin = loginType;
    }else{
        //如果没有该参数，则询问是否交易密码登录
        datajson.supportBioLogin ='1';
    }
    onCallNative('DataService', 'doTradeLoginData', datajson, callback, '');

    //result:1登录成功；result!=1未登录||登录失败
    //onCallJs('{"action":"'+callback+'","param":{"result":"1","fundId":"xxxxx","orgId":"xxxx","randomKey":"xxxxx"}}');
};



/**
 * 新开webview打开页面(param里面多传一个weburl，用于本机浏览器调试)
 * @param callback
 * @param param
 * @param openflag 如果入参该参数则直接将该参数传给客户端标识游客是否可以查看
 * {pageUrl:"页面地址",touristAvl:1游客可用 0游客不可用,"weburl":"浏览器调试时传入的地址"}
 * touristAvl不传或者传空，客户端默认不允许游客访问
 */
b.newWebViewOpenPage = function (callback, param,openflag) {
    var datajson = param || {};
    var isMobile = Com.clientType();
    var allowstatus = '1'; //allowstatus==1允许游客访问  allowstatus=='0'不允许访问
    if(openflag){
        allowstatus = openflag;
    }else{
        if(window.WHITE_LIST_JSON){
            var FINANCE_ROOT = window.WHITE_LIST_JSON.FINANCE_ROOT; //理财目录
            var FINANCE_WHITELIST = window.WHITE_LIST_JSON.FINANCE_WHITE_LIST;//理财具体的白名单页面
            for(var i = 0;i<FINANCE_ROOT.length;i++){
                if(datajson.pageUrl.indexOf(FINANCE_ROOT[i])!=-1){
                    //理财目录
                    allowstatus = '0';//理财目录默认游客都不能访问
                    for(var j = 0;j<FINANCE_WHITELIST.length;j++){
                        if(datajson.pageUrl.indexOf(FINANCE_WHITELIST[j])!=-1){
                            //白名单列表可以访问
                            allowstatus = '1';
                            break;
                        }
                    }
                }
            }
        }
    }
    datajson.touristAvl = allowstatus;
    if (isMobile == 'ios' || isMobile == 'android') {
        console.log('newWebViewOpenPage');
        onCallNative('WebContainer', 'transitionWeb', datajson, callback);
    } else {
        if (param.weburl && param.weburl != '') {
            window.location.href = param.weburl;
        }
    }
};
/**
 * 设置webview页面title（单行title）
 * @param callback
 * @param param
 * {"title":"长安汽车-新闻","bgColor ":"#272736"}
 * 背景颜色，黑色：#272736，蓝色：#589dfc
 */
b.setWebviewTitle = function (callback, param, isCustColor) {
    var datajson = param || {};
    if(!isCustColor) {
        datajson = {
            title: datajson.title ? datajson.title : ''
        }
    }
    onCallNative('WebContainer', 'titleItem', datajson, callback);
};
/**
 * 设置webview页面title（两行title）
 * @param callback
 * @param param
 * {"title":"长安汽车-新闻","bgColor ":"#272736"}
 * 背景颜色，黑色：#272736，蓝色：#589dfc
 */
b.setWebviewStockTitle = function(callback, param) {
    var datajson = param || {};
    onCallNative('WebContainer', 'setStockTitle', datajson, callback);

};

/**
 * 获取url参数、解析客户端公共参数
 * @param name   //获取name的值
 * @param appStr //已有指定字符串
 * @returns {string}
 */
b.getQueryStringByName = function(name, appStr) {
    var result;
    if (appStr && appStr != '') {
        result = appStr.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    } else {
        result = decodeURI(location.search).match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    }
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
};

/**
 * H5调native弹框
 * @param msgtitle 弹框标题，非必须
 * @param msg      弹框内容
 * @param alertbtn 弹框的按钮，例如["确定"]、["确定","取消"]
 * @param callback 弹框按钮的回调函数(会塞进来一个参数：{"alertViewId":"123456","clickedIndex":"1"})，clickedIndex表示按钮的索引
 * {"alertTitle":"弹框标题","alertMessage":"弹框内容","alertButtonsArray":["取消","确定"],"alertViewId":"数值累加，不用存到localstorage","webaLertMsg":"便于在浏览器调试"}
 */
b.showNativeAlert = function (msgtitle, msg, alertbtn, callback, cancelAble) {
    var datajson = {};
    var aletBoxId = Com.getSessionValue('alertboxid');
    if (!Com.isNumber(aletBoxId)) {
        aletBoxId = 0;
    } else {
        aletBoxId++;
    }
    Com.setSessionValue('alertboxid', aletBoxId);
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'alertHandle' + random;
    $js['alertHandle' + random] = function (p) {
        if (callback && typeof callback === 'function') {
            callback(p);
        }
    };
    datajson['alertTitle'] = msgtitle;
    datajson['alertMessage'] = msg;
    datajson['alertViewId'] = aletBoxId;
    datajson['alertButtonsArray'] = alertbtn;
    datajson['webaLertMsg'] = msg;
    if(cancelAble){
        datajson['cancelAble'] = cancelAble;
    }else{
        datajson['cancelAble'] = '0';
    }

    var isMobile = Com.clientType();
    if (isMobile == 'ios' || isMobile == 'android') {
        onCallNative('WebContainer', 'callNativeAlertView', datajson, callbackName);
    } else {
        alert(msg);
    }
};

/**
 * 判断是否登录，如果已登录则执行callback，如果未登录则先弹出native的登录，native登录成功之后执行callback，否则什么都不执行
 * @param callback 已登录或登录成功之后回调
 * @param param callback参数
 * @param cancelLogin 登录失败执行
 * @param loginTypeUI 1交易密码登录 2指纹登录
 */
b.actionLogin = function(callback, param, cancelLogin,loginTypeUI) {
    $js.checkTradeLogin = function(data) {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        if (data.isTradeLogined == '1') {
            //已登录
            if (typeof callback === 'function') {
                callback(param);
            }
        } else {
            //未登录，让native起登录
            var random = '_' + (Math.random() + '').split('.')[1];
            var callbackName = 'loginCallback' + random;
            $js['loginCallback' + random] = function(data) {
                if (data.result == '1') {
                    //登录成功
                    if (typeof callback === 'function') {
                        callback(param);
                    }
                } else {
                    //登陆失败
                    if (cancelLogin && typeof cancelLogin === 'function') {
                        cancelLogin(data);
                    }
                    return false;
                }
            };
            //未登录
            Com.callNativeLogin(callbackName, {},loginTypeUI);
        }
    };


    //第一步判断是否登录(loginTypeUI 0交易密码登录 1指纹登录)
    Com.isTradelogin('checkTradeLogin', {},loginTypeUI);
};

/**
 * 弹出native半透明遮罩显示标题和内容
 * @param masktitle
 * @param maskcontent
 */
b.showScreenMask = function(masktitle, maskcontent) {
    var datajson = {};
    datajson['tipTitle'] = masktitle;
    datajson['tipContent'] = maskcontent;
    onCallNative('WebContainer', 'setFullTipView', datajson);
};

/**
 * 是否需要native在当前页面上监听返回事件(每个页面都需要调用此方法,不监听的情况下，webview采用默认返回上一个webview的方式)
 * @param isListener 1:需要监听 0:不需要监听
 * @param callback 非必须参数
 */
b.nativeGobackListener = function (isListener, callback) {
    var argumentsLength = arguments.length;
    if (argumentsLength == 0) {
        return;
    }
    var datajson = {};
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'listenerCallback' + random;
    $js['listenerCallback' + random] = function (p) {
        if (argumentsLength > 1 && typeof callback === 'function') {
            callback(p);
        }
    };
    (isListener == 1) ? (datajson['flag'] = '1') : datajson['flag'] = '0';

    onCallNative('WebContainer', 'setReturnListener', datajson, callbackName);
};

/**
 * 调用native的方法，返回上一个web页面
 */
b.browserGoback = function () {
    onCallNative('WebContainer', 'doGoBack', {}, '');
};

/**
 * 调用native的方法关闭当前的webview(实际上相当于返回上一个webview)
 */
b.nativeGoback = function () {
    onCallNative('WebContainer', 'doFinish', {}, '');
};

/**
 * 调用native的loading
 * @param isShow true显示/false隐藏
 */
b.nativeLoading = function (isShow) {
    var datajson = {};
    datajson['isShow'] = isShow;
    onCallNative('WebContainer', 'showProcess', datajson, '');
};

/**
 * 跳转到股票行情
 * @param stockCode 股票代码
 * @param stockName 股票名称
 * @param stockMarket 股票市场
 */
b.gotoStockInfo = function (stockCode, stockName, stockMarket) {
    var datajson = {};
    datajson['stockCode'] = stockCode;
    datajson['stockName'] = stockName;
    datajson['stockMarket'] = stockMarket;
    onCallNative('WebContainer', 'transitionStockInfo', datajson, '');
};

/**
 * 调用native的toast
 * @param type 显示类型  type:1添加自选股toast类型,其他为默认样式
 * @param msg 显示信息
 */
b.nativeToast = function (msg, type) {
    var datajson = {};
    datajson['toastMessage'] = msg;
    if (type) {
        datajson['toastType'] = type;
    }
    onCallNative('WebContainer', 'showToastMsg', datajson, '');
};

/**
 * 右上角自定义按钮
 * @param btntype  0隐藏按钮 1分享 2设置字体 3:自定义按钮名称（必传btnname） 4:搜索按钮（放大镜图标）
 * @param btnname 当btntype == 3时，该参数必传
 * @param callback 点击回调
 * @param searchType 当btntype==4时需要传该参数，表示需要native搜索什么类型产品， 0：查全部 1：查基金 2:查国信产品
 * @param stkType 当btntype==4时需要传该参数，表示需要native搜索什么类型产品
 */
b.rightTopBtn = function (btntype, btnname, callback, searchType, stkType) {
    var datajson = {};
    var _searchType = '';
    var _stkType = '';
    datajson['showType'] = btntype;
    if (btnname && btnname != '') {
        datajson['rightButtonName'] = btnname;
    }
    if (searchType && searchType != '') {
        _searchType = searchType;
    }
    if (stkType && stkType != '') {
        _stkType = stkType;
    }
    datajson['searchType'] = _searchType;
    datajson['stkType'] = _stkType;
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'rightTopBtnHandle' + random;
    $js['rightTopBtnHandle' + random] = function (p) {
        if (callback && typeof callback === 'function') {
            callback(p);
        }
    };
    onCallNative('WebContainer', 'rightButtonItem', datajson, callbackName);
};
/**
 * 返回刷新，当该页面的webview再次呈现的时候native会调用callback(解决返回刷新的问题)
 * @param isrefresh true:再次呈现的时候需要调callback false:不需要
 * @param callback 非必须参数
 */
b.gobackRefreshPage = function (isrefresh, callback) {
    var isMobile = Com.clientType();
    if (isMobile == 'ios' || isMobile == 'android') {
        var argumentsLength = arguments.length;
        if (argumentsLength == 0) {
            return;
        }
        var datajson = {};
        var random = '_' + (Math.random() + '').split('.')[1];
        var callbackName = 'refreshMethod' + random;
        $js['refreshMethod' + random] = function (p) {
            if (argumentsLength > 1 && typeof callback === 'function') {
                callback(p);
            }
        };
        (isrefresh == true) ? (datajson['need'] = true) : datajson['need'] = false;

        onCallNative('WebContainer', 'needRefreshPage', datajson, callbackName);
    }
};

/**
 * 跳转到native界面
 * @param type fun:native界面|web:web页面
 * @param nativeUrl xgsjh(跳转到native修改手机号)
 * @param param 打开native界面时传给native的参数
 */
b.openNativePage = function (nativeUrl, type, param, callback) {
    var datajson = {};
    if (type && type != '') {
        datajson['handleType'] = type;
    } else {
        datajson['handleType'] = 'fun';
    }
    if (typeof param !== 'undefined') {
        datajson['handleParam'] = param;
    }
    datajson['handleUrl'] = nativeUrl;
    if(callback && typeof callback === "function"){
        var random = '_' + (Math.random() + '').split('.')[1];
        var callbackName = 'setData' + random;
        $js['setData' + random] = function(p) {
            callback(p);
        };
        onCallNative('WebContainer', 'transitionComNative', datajson, callbackName);
    }else{
        onCallNative('WebContainer', 'transitionComNative', datajson, '');
    }
};

/**
 * 获取公共参数
 * @param callback
 */
b.getCommonLoginData = function (callback) {
    var datajson = {};
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'setData' + random;
    $js['setData' + random] = function (p) {
        if (typeof callback === 'function') {
            callback(p);
        }
    };
    onCallNative('DataService', 'getCommonLoginData', datajson, callbackName);
};
/*获取客户端最顶部状态栏和导航栏的高度statusBarHeight、navigationBarHeight*/
/**
 * 获取顶部titlebar高度和手机信号拦的高度
 * @param callback
 * return statusBarHeight、navigationBarHeight
 */
b.getNativeBarHeight=function(callback,param){
    var srandom = new Date().getTime();
    var callbackName = 'getHeight' + srandom;
    var datajson = {'key':'getNativeTopBarHeight'};

    $js['getHeight' + srandom] = function(pamram) {
        if (typeof callback === 'function') {
            callback(pamram);
        }
    };
    onCallNative('DataService', 'callCommonValue', datajson, callbackName, '');
};


/**
 *
 * @param partName
 * @param methodName
 * @param callback
 * @param dataJson
 */
b.callNativeFun = function (partName,methodName,callback,dataJson) {
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'setCommonValue'+random ;
    $js[callbackName] = function(param) {
        if (typeof callback === 'function') {
            callback(param);
        }
    };
    onCallNative(partName, methodName, dataJson, callbackName);
};
/**
 * 获取Native公共变量
 * @param callback
 * @param param
 */
b.getCommonValue = function(key, callback) {
    var datajson = {'key':key, 'action':'get'};
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'setCommonValue' + random;
    $js[callbackName] = function(p) {
        if (typeof callback === 'function') {
            callback(p);
        }
    };
    onCallNative('DataService', 'callCommonValue', datajson, callbackName, '');
};

/**
 * 更新Native公共变量
 * @param callback
 * @param param
 */
b.setCommonValue = function(key, value, callback) {
    var datajson = {'key':key, 'action':'set', 'value':value};
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'getCommonValue' + random;
    $js[callbackName] = function(p) {
        if (typeof callback === 'function') {
            callback(p);
        }
    };
    onCallNative('DataService', 'callCommonValue', datajson, callbackName, '');
};
/*调用客户端协议打开pdf（用于资料概要强提示）*/
b.callNativeOpenPdf = function(param,callback,closecallback){
	var srandom = new Date().getTime();
	var callbackName = 'getCallBackHandle' + srandom;
	var closecallbackName = 'closehandle' + srandom;
	if(typeof closecallback=='function'){
		param['closeCallback'] = closecallbackName;
	}
	$js['getCallBackHandle' + srandom] = function(pamram) {
		if (typeof callback === 'function') {
			callback(pamram);
		}
	};
	$js[closecallbackName] = function(pamram) {
		if (typeof closecallback === 'function') {
			closecallback(pamram);
		}
	};
	onCallNative('WebContainer', 'openMutablePdf', param, callbackName, '');
};
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}
//兼容ios切WkWebview bug
var u = navigator.userAgent;
if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
}

/**
 * 获取App的行情配色7.9.0版本添加
 * @param callback 回调函数
 * 调用协议返回示例：
 * {"appTheme" : "white"或"black", // white为白色主题，black为黑色主题
 * "chgColorType": "0"或"1"或"2", // 0:现代配色，1:经典配色，2:高清配色
 * "riseColor":"FF3A3B",         // 当前主题和涨跌配色类型下的红色，格式如左边示例
 * "fallColor":"2BAF95",         // 当前主题和涨跌配色类型下的绿色，格式如左边示例
 * }
 */
b.getMarketThemeColor = function (callback) {
    var random = '_' + (Math.random() + '').split('.')[1];
    var callbackName = 'getAppTheme' + random;
    $js[callbackName] = function (p) {
        callback && callback(p);
    }
    onCallNative('WebContainer', 'getAppTheme', {}, callbackName, '{"chgColorType":"2","appTheme":"white","riseColor":"E50808","fallColor":"139557"}');
}

window.Com = new a;
export default Com;
