// const http = uni.$u.http

// all_api api=接口名称 其他参数保持一致
export const all_api = (data, methods = 'GET', config = {}) => {
	if (methods == 'GET') {
		return uni.$u.http.get('all_api', data)
	} else if (methods == 'POST') {
		return uni.$u.http.post('all_api', data, config)
	}
}
 
 
 // export const create_order_post = (data, config={}) => uni.$u.http.post('create_order', data, config)
 
// login  登录接口  参数cate=1 密码登录 0或不传 验证码登录 login账号 passwd密码  captcha验证码  密码和验证码只要传对应方式的参数
export const login = (data) => uni.$u.http.get('login', data)
// logout 退出登录接口 没参数
export const logout = (data) => uni.$u.http.get('logout', data)
// get_captcha 获取验证 参数mode=login、regist、forget  mobile手机号
export const get_captcha = (data) => uni.$u.http.get('get_captcha', data)
// passwd_reset 验证码修改密码（忘记密码） passwd新密码 npasswd重复新密码  captcha验证码
export const passwd_reset = (data) => uni.$u.http.get('passwd_reset', data)


// memu  底部菜单接口，包括验证有没有登录 返回的login有值就是登录，0或空就是没登录。
export const memu = (data) => uni.$u.http.get('memu', data)
// login_cancel  小程序获取userid
export const login_cancel = (data) => uni.$u.http.get('login_cancel', data)
// app_login  APP获取userid
export const app_login = (data) => uni.$u.http.get('app_login', data)

// category 商品分类
export const category = (data) => uni.$u.http.get('category', data)
// apply_partner  合伙人申请 code:推荐人id 不是必填
export const apply_partner = (data) => uni.$u.http.get('apply_partner', data)
// query_ptp 合伙人发展用户 返回字段： poster：合伙人账号（不用显示）dy_poster：发展的用户账号 cdate：添加日期
export const query_ptp = (data) => uni.$u.http.get('query_ptp', data)
// query_ptp_statist  股票通发展列表 期货通发展列表  type=2：期货通；3：股票通
export const query_ptp_statist = (data) => uni.$u.http.get('query_ptp_statist', data) 
// query_ptp_dy 用户订阅查询 参数login 返回字段：poster：合伙人账号（不用显示） dy_poster：发展的用户账号 
	// pt_status：合伙人当前状态 type：订阅内容，2：期货通，3：股票通
	// status：订阅状态，1：已支付，0：未支付ctime：订阅时间
	// status_date：支付时间expire_date：到期日期 （trade_number：交易单号merchant_number：商户单号 不用显示）
export const query_ptp_dy = (data) => uni.$u.http.get('query_ptp_dy', data)

 // about 关于合伙人
export const about = (data) => uni.$u.http.get('about', data)

 // about2 app隐私声明
export const about2 = (data) => uni.$u.http.get('about2', data)
 // about3 
export const about3 = (data) => uni.$u.http.get('about3', data)
 // about5 
export const about5 = (data) => uni.$u.http.get('about5', data)


// my_subscription 我的订阅
export const my_subscription = (data) => uni.$u.http.get('my_subscription', data)

// get_order 获取订单 参数type 类型 值：2股票通 3期货通
export const get_order = (data) => uni.$u.http.get('get_order', data)

// 前台接口：
// gpt 股票通热点选股 参数by=五档位置5/10/20/30/60/90  zf涨幅
export const gpt = (data) => uni.$u.http.get('gpt', data)
// gpt_analysis 股票通季报选股 
export const gpt_analysis = (data, config) => uni.$u.http.post('gpt_analysis', data, config)
 
// gpt_analysis_detail 详细页
export const gpt_analysis_detail = (data) => uni.$u.http.get('gpt_analysis_detail', data) 
// get_share_url  
export const get_share_url = (data) => uni.$u.http.get('get_share_url', data) 
 
 // weixin_pay 发起支付 参数id 订单id price 价格（单位分）
export const weixin_pay = (data) => uni.$u.http.get('weixin_pay', data) 

// upimg 上传图片
export const upimg = (data, config) => uni.$u.http.post('upimg', data, config)
// login_card 我的名片
export const login_card = (data) => uni.$u.http.get('login_card', data) 
// edit_card 创建编辑我的名片 `name`, `position`, `company`, `phone`, `tel`, `email`, `address` img  info
export const edit_card = (data, config) => uni.$u.http.post('edit_card', data, config)

// 前台接口
// web_login_card 名片信息 参数login
export const web_login_card = (data) => uni.$u.http.get('web_login_card', data) 
// my_ewm  推广二维码
export const my_ewm = (data) => uni.$u.http.get('my_ewm', data) 
// list_chance_recommend
export const list_chance_recommend = (data) => uni.$u.http.get('list_chance_recommend', data) 
// list_chance  资讯列表 参数pid 不必填  用在推广海报的，没有翻页。
export const list_chance = (data) => uni.$u.http.get('list_chance', data) 
// detail_chance 资讯详情 参数id
export const detail_chance = (data) => uni.$u.http.get('detail_chance', data)
 // haibao  海报生成 参数id
export const haibao = (data) => uni.$u.http.get('haibao', data)


// top_hs  沪深原材料价格涨跌榜接口
export const top_hs = (data) => uni.$u.http.get('top_hs', data)
// qxt		期货通接口
export const qxt = (data) => uni.$u.http.get('qxt', data)
// qxt_charts_xianqi  期货通现期图/基差图接口
export const qxt_charts_xianqi = (data) => uni.$u.http.get('qxt_charts_xianqi', data)
// intelligence  20.商品情报接口
export const intelligence = (data) => uni.$u.http.get('intelligence', data)
// dashboard  21.现货通行情分析
export const dashboard = (data) => uni.$u.http.get('dashboard', data)
// dashboard_sf  22.现货通现期分析
export const dashboard_sf = (data) => uni.$u.http.get('dashboard_sf', data)

// list_chance_recommend_zx  all=1时，付款页面案例接口没有翻页  all=0或其他时，首页动态列表  参数p
export const list_chance_recommend_zx = (data) => uni.$u.http.get('list_chance_recommend_zx', data)
// list_chance_recommend_zx2
export const list_chance_recommend_zx2 = (data) => uni.$u.http.get('list_chance_recommend_zx2', data) 

// list_dy_status 
export const list_dy_status = (data) => uni.$u.http.get('list_dy_status', data)
// list_hot_stock  热点股
export const list_hot_stock = (data) => uni.$u.http.get('list_hot_stock', data)
// gpt_zd 3个最近一周涨幅最多的商品
export const gpt_zd = (data) => uni.$u.http.get('gpt_zd', data)
// gx_check_auth  购买鉴权 参数usertoken 返回zt和url  zt=1 跳转url  zt=0 关闭窗口 现在的。
export const gx_check_auth = (data) => uni.$u.http.get('gx_check_auth', data)
// home  
export const home = (data) => uni.$u.http.get('home', data)