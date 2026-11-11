<template> 

	<view> 
		<NavBar :bgColor="bgColor"  title="个人中心" :backBtn="false" :titleStyle="`color: ${themeColor}`" placeholder >
			<!-- #ifndef MP-WEIXIN -->
			<template #right>
				<view @click="base.handleGoto('/pages/my/settings')">
					<up-icon name="setting" size="20"></up-icon>
				</view>
			</template>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<template #left>
				<view class="u-nav-slot u-flex" >
					<nut-icon name="home" @click="base.handleGoto('/pages/index/index')"></nut-icon> 
					<up-line direction="column" :hairline="false" length="20" margin="0 12px"></up-line> 
					<view @click="base.handleGoto('/pages/my/settings')">
						<up-icon name="setting" size="20"></up-icon>
					</view>
				</view> 
			</template>
			<!-- #endif -->
		</NavBar>
		<view class="header">
			<view class="u-p-10 "> 
				<view class="box-user u-p-20 u-flex u-flex-items-start u-radius-15" @click="login ?  () =>{} : base.handleGoto('/pages/login/login')">
					
					<nut-avatar custom-color="#e0ecff" size="50" bg-color="#77bfff">
						<up-image :src="userInfo.avatarurl" width="50px" height="50px" v-if="userInfo.avatarurl"></up-image>
						<view class="u-flex u-flex-items-center u-flex-center" style="height: 50px;" v-else>
							<nut-icon name="my2" size="22"></nut-icon>
						</view>
					</nut-avatar>
					<view class="content u-m-l-20 u-flex-1">
						<view class="u-flex u-flex-items-center u-flex-between u-m-b-12">
							<view class="name">{{userInfo.nickname || login || '未登录'}}</view>
							<!-- <view class="u-info u-flex u-flex-items-center" @click="base.handleGoto('/pages/subscribe/index/index')">
								<view class="u-m-r-10">我的订阅</view>
								<nut-icon name="rect-right" size="12"></nut-icon>
							</view> -->
						</view>
						<view>
							<!-- <view class="u-info u-font-12">描述文字</view> -->
							<view class="u-flex u-flex-items-center tags-w"> 
								<view class="  u-flex" v-if="partner == 1">
									<nut-tag   custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="huiyuanvip" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text>合伙人</text>
										</view> 
									</nut-tag>   
								</view>
								<view class="  u-flex" v-else-if="subsVip">
									<nut-tag   custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="huiyuanvip" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text>VIP用户</text>
										</view> 
									</nut-tag>   
								</view>
								<view class="  u-flex" v-else>
									<nut-tag   custom-color="#eee" text-color="#144975">
										<view class="u-flex u-flex-items-center">
											<nut-icon name="myfill" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon>
											<text>普通用户</text>
										</view> 
									</nut-tag>   
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="u-p-l-20 u-p-r-20 u-p-b-20  box-border  " v-if="partner == 1 && shenhe_flag != 1">
				<view class="u-radius-12   u-p-20 box-border   bg-white u-flex u-flex-items-center text-base" >
					<view class="u-flex-1 u-flex u-flex-items-baseline u-flex-center " @click="amountBtn('1')">
						<view class="u-m-r-10">可用</view>
						<view class="u-error"><nut-price :price="partner_amount" thousands size="large"></nut-price></view>
					</view>
					<up-line direction="col" length="20px"></up-line>
					<view class="u-flex-1 u-flex u-flex-items-baseline u-flex-center" @click="amountBtn('2')">
						<view>可提</view>
						<view class="u-error"><nut-price :price="partner_amount2" thousands size="large"></nut-price></view>
					</view>
				</view>
			</view>
			<view class="u-p-l-20 u-p-r-20 u-p-b-20  box-border  ">
				<view class="u-radius-12   u-p-25 box-border   bg-white" >
					<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
						<view class="u-flex u-flex-items-center u-flex-1">
							<view class="u-flex u-flex-items-center u-p-l-10">
								<view class="u-flex u-primary-bg text-white u-radius-30 u-flex-items-center u-flex-center u-p-2"><nut-icon name="hangye" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon></view>
								<view class="text-bold u-m-l-12 ">合伙人中心</view>
							</view>
							<view class="u-flex u-flex-items-center u-m-l-40" @click="base.handleGoto('/pages/partner/about_develop')"> 
								<view class=" text-base u-m-r-5 u-font-14">如何发展</view>
								<view class="u-flex u-primary-light-bg text-white u-radius-30 u-flex-items-center u-flex-center u-p-6">
									<up-icon name="question" color="#007aff" size="12"></up-icon>
								</view> 
							</view>
						</view>
						<view class="u-flex u-flex-items-center" @click="base.handleGoto('/pages/partner/about_partner')"> 
							<view class=" text-base u-m-r-5 u-font-14">关于合伙人</view>
							<view class="u-flex u-primary-light-bg text-white u-radius-30 u-flex-items-center u-flex-center u-p-6">
								<up-icon name="arrow-right" color="#007aff" size="12"></up-icon>
							</view> 
						</view>
					</view>
					<view class="u-flex u-flex-items-start u-flex-wrap u-p-b-10">
						<template v-if="partner == 1">
							<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%"
								@click="base.handleGoto({url: '/pages/index/userCard', params: {login}})" 
								>
								<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
									<nut-icon name="my" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
								</view>
								<view class="text-base u-font-14">我的名片</view>
							</view>
							<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%" @click="base.handleGoto('/pages/partner/haibao_center')">
								<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
									<nut-icon name="haibao1" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
								</view>
								<view class="text-base u-font-14">推广海报</view>
							</view>
							<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%" @click="base.handleGoto('/pages/my/myqrcode')">
								<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
									<nut-icon name="erweima" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
								</view>
								<view class="text-base u-font-14">推广二维码</view>
							</view> 
							<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%" @click="base.handleGoto('/pages/partner/users_partner')">
								<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
									<nut-icon name="chakan" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
								</view>
								<view class="text-base u-font-14">发展列表</view>
							</view> 
						</template> 
						<view class="u-flex-column u-flex-center u-flex-items-center u-info-light-bg u-radius-10 u-p-20 box-border" 
							style="flex: 0 0 100%;border: 1rpx dashed #aaa; " 
							@click="base.handleGoto('/pages/partner/apply_partner')" 
							v-else
						>
							<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base " style="width: 35px; height: 35px;">
								<!-- <nut-icon name="jinhuodan-01" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon> -->
								<up-icon name="plus-circle" size="24" color="#aaa"></up-icon>
							</view>
							<view class="  u-font-14 u-info">申请合伙人</view>
						</view>
						
					</view>
					<!-- <view class="u-flex u-flex-items-center u-flex-between u-primary u-font-16 u-m-t-12" v-if="partner == 1">
						<view 
							@click="base.handleGoto({url: '/pages/partner/users_partner', params: { mode: 'gpt'}})"
							class="u-flex-1 u-flex u-flex-items-center u-flex-between u-radius-4 u-p-12 u-primary-light-bg u-p-r-20 u-p-l-20 box-border u-m-5">
							<view>股票通发展列表</view>
							<view>
								<up-icon name="list-dot" size="16"></up-icon>
							</view>
						</view>
						<view 
							@click="base.handleGoto({url: '/pages/partner/users_partner', params: { mode: 'qht'}})"
							class="u-flex-1 u-flex u-flex-items-center u-flex-between u-radius-4 u-p-12 u-primary-light-bg u-p-r-20 u-p-l-20 box-border u-m-5">
							<view>期货通发展列表</view>
							<view>
								<up-icon name="list-dot" size="16"></up-icon>
							</view>
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view> 
	<view class="u-p-l-20 u-p-r-20">
		<view class="tab-list-cnt box-border  " style=" border-radius: 20px 20px 0 0;">
			<view class="tab-list " >
				<view class="tab-item " 
					v-for="item in tabslist" 
					:key="item.value" 
					@click="tabsEvent(item)" 
					:class="{
						active: item.value == tabValue
					}"
				>
					<view class="u-flex u-m-r-10   icon" v-if="item.icon">
						<nut-icon :name="item.icon" font-class-name="custom-icon" class-prefix="custom-icon" size="16" ></nut-icon>
					</view>
					<view>{{item.name}}</view>
				</view>
				<div :style="{'transform': `translateX(${tabIndex * 100}%)`}" class="tab-selected">
					<div class="left"></div>
					<div class="right"></div>
				</div> 
			</view>  
		</view> 
			 
		<view class="tabs-content u-p-20" v-if="tabValue == 'gp'">
			 
			<view 
				class="vip-card u-p-20 u-radius-10 u-m-b-12" 
				@click="base.handleGoto({url: '/pages/order/order', params: {type: '3'}})"
				v-if="gpt.order_id"
			> 
				<view class="u-flex u-flex-items-center u-flex-between">
					<view class="u-flex u-flex-items-center">
						<view class="u-font-18" style="color: #29455f">股票通</view>
						<view class="tags-w u-flex u-m-l-10">
							<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
								<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
									<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
								</view> 
							</nut-tag> 
						</view> 
					</view>
					<view class="u-flex u-flex-items-center"> 
						<view class="u-font-14 " style="color: #9f5200">
							<template v-if="gpt.status == 1">
								{{gpt.expire_date}}到期
							</template>
							<template v-else-if="gpt.status == 0">
								待支付
							</template>
						</view>
						<view class="tags-w u-flex u-m-l-10">
							<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
						</view> 
					</view>
				</view> 
			</view>
			<view class="vip-card u-p-20 u-radius-10 u-m-b-12" @click="base.handleGoto('/pages/index/gpt')" v-else>
				<view class="u-flex u-flex-items-center u-flex-between">
					<view class="u-flex u-flex-items-center">
						<view class="u-font-18" style="color: #29455f">订阅股票通</view>
						<view class="tags-w u-flex u-m-l-10">
							<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
								<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
									<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
								</view> 
							</nut-tag> 
						</view> 
					</view>
					<view class="u-flex u-flex-items-center">
						<view class="u-font-14 " style="color: #9f5200">去订阅</view>
						<view class="tags-w u-flex u-m-l-10">
							<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
						</view> 
					</view>
				</view>
				<view class="u-m-t-10">
					<view class=" u-warning u-p-12 u-radius-8 u-font-13" style="background-color: rgba(255,255,255,.8)">买卖周期股，就用周期掘金！获取N多投资机会! </view>
				</view>
			</view>
			<view class="tabs-content-item u-p-20 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-p-l-10" style="color: #1254B3;">选股方法</view>
				</view>
				<view class="" style="color: #67799f;">
					<view class="u-radius-10 u-primary-light-bg u-p-20 u-m-b-20" @click="base.handleGoto({url:'/pages/analysis/analysis',params:{mode:'1'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
								<view class="u-font-17  u-flex u-flex-items-center u-warning ">
									<nut-icon name="huore" font-class-name="custom-icon" class-prefix="custom-icon" ></nut-icon>
									<view class="u-m-l-10 text-black">{{infoConfig.gpt.xgff[0].title}}</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<view class="u-font-14">{{infoConfig.gpt.xgff[0].content}}</view>
						</view>
					</view>
					<view class="u-radius-10 u-primary-light-bg u-p-20" @click="base.handleGoto({url:'/pages/analysis/analysis',params:{mode:'2'}})">
						<view> 
							<view class="u-flex u-flex-items-center u-flex-between u-m-b-10">
								<view class="u-font-17  u-flex u-flex-items-center u-primary "> 
									<nut-icon name="tongji" font-class-name="custom-icon" class-prefix="custom-icon" size="20" ></nut-icon> 
									<view class="u-m-l-10 text-black">{{infoConfig.gpt.xgff[1].title}}</view>
								</view>
								<view>
									<view class="u-primary-bg text-white u-radius-15 u-flex u-flex-items-center u-p-4 u-p-l-14 u-p-r-20" >
										<up-icon name="search" color="#fff" ></up-icon>
										<text class="u-m-l-10 u-font-13  text-thin">查 看</text>
									</view>
								</view>
							</view> 
							<view class="u-font-14">{{infoConfig.gpt.xgff[1].content}}</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 期货内容 -->
		<view class="tabs-content u-p-20" v-else-if="tabValue == 'qh'">
			
			<view class="vip-card u-p-20 u-radius-10 u-m-b-12" v-if="qht.order_id"> 
				<view class="u-flex u-flex-items-center u-flex-between" @click="base.handleGoto({url: '/pages/order/order', params: {type: '2'}})">
					<view class="u-flex u-flex-items-center">
						<view class="u-font-18" style="color: #29455f">期货通</view>
						<view class="tags-w u-flex u-m-l-10">
							<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
								<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
									<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
								</view> 
							</nut-tag> 
						</view> 
					</view>
					<view class="u-flex u-flex-items-center"> 
						<view class="u-font-14 " style="color: #9f5200">
							<template v-if="qht.status == 1">
								{{qht.expire_date}}到期
							</template>
							<template v-else-if="qht.status == 0">
								待支付
							</template>
						</view>
						<view class="tags-w u-flex u-m-l-10">
							<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
						</view> 
					</view>
				</view> 
				<view class="u-m-t-20">
					<view class=" u-warning-light-bg text-primary u-p-12 u-radius-18 u-font-16 u-text-center" @click="base.handleGoto('/pages/qxt/qxt')">查 看</view>
				</view>
			</view>
			<view class="vip-card u-p-20 u-radius-10 u-m-b-12"   @click="base.handleGoto('/pages/qxt/qxt')" v-else>
				<view class="u-flex u-flex-items-center u-flex-between">
					<view class="u-flex u-flex-items-center">
						<view class="u-font-18" style="color: #29455f">订阅期货通</view>
						<view class="tags-w u-flex u-m-l-10">
							<nut-tag round custom-color="linear-gradient(45deg, #F9FDE1, #FFD385)" text-color="#8D4E0D">
								<view class="u-p-l-8 u-p-r-8 u-flex u-flex-items-center u-flex-center">
									<nut-icon name="f-vip" font-class-name="custom-icon" class-prefix="custom-icon" size="24"></nut-icon> 
								</view> 
							</nut-tag> 
						</view> 
					</view>
					<view class="u-flex u-flex-items-center">
						<view class="u-font-14 " style="color: #9f5200">去订阅</view>
						<view class="tags-w u-flex u-m-l-10">
							<up-icon name="arrow-right" size="14" color="#9f5200"></up-icon> 
						</view> 
					</view>
				</view>
				<view class="u-m-t-10">
					<view class=" u-warning u-p-12 u-radius-8 u-font-13" style="background-color: rgba(255,255,255,.8)">关注基差变化，把握投资机会！一年只需1999元，即可关注50+期货商品。</view>
				</view>
			</view>
			 
			<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.hxyl.title}}</view>
				</view>
				<view class="u-font-14" style="color: #67799f;">
					<u-parse :content="infoConfig.qxt.hxyl.content"></u-parse>
					<!-- <rich-text v-for="(item, index) in infoConfig.qxt.hxyl.content" :nodes="item" :key="index"> </rich-text> -->
				</view>
			</view> 
			<view class="tabs-content-item u-p-20 u-p-l-30 u-p-r-30 u-p-b-40 u-radius-16">
				<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
					<view class="text-bold u-font-16" style="color: #1254B3;">{{infoConfig.qxt.jtff.title}}</view>
				</view>
				<view class="u-font-14" style="color: #67799f;">
					<u-parse :content="infoConfig.qxt.jtff.content"></u-parse>
					<!-- <view v-for="(item, index) in infoConfig.qxt.jtff.content" :key="index">{{item}}</view> -->
				</view>
			</view>  
		</view>
		
	</view>
	
	
	<!-- <view class="u-p-20  box-border  " v-if=" shenhe_flag != 1">
		<view class="u-radius-12   u-p-25 box-border   bg-white" >
			<view class="u-flex u-flex-items-center u-flex-between u-m-b-20">
				<view class="u-flex u-flex-items-center u-p-l-10">
					<view class="u-flex u-primary-bg text-white u-radius-30 u-flex-items-center u-flex-center u-p-2"><nut-icon name="moneybagfill" font-class-name="custom-icon" class-prefix="custom-icon" size="14" ></nut-icon></view>
					<view class="text-bold u-m-l-12 ">股票通</view>
				</view>
				<view class="u-flex u-flex-items-center" @click="base.handleGoto('/pages/index/cfh')"> 
					<view class=" text-base u-m-r-5 u-font-14">发现</view>
					<view class="u-flex u-primary-light-bg text-white u-radius-30 u-flex-items-center u-flex-center u-p-6">
						<up-icon name="arrow-right" color="#007aff" size="12"></up-icon>
					</view> 
				</view>
			</view>
			<view class="u-flex u-flex-items-start u-flex-wrap">
				
				<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%" >
					<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
						<nut-icon name="jinhuodan-01" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
					</view>
					<view class="text-base u-font-14">我要发布</view>
				</view>
				<view class="u-flex-column u-flex-center u-flex-items-center" style="flex: 0 0 25%"  @click="base.handleGoto({url: '/pages/index/cfh_user', params: {login}})">
					<view class="u-radius-40   u-flex u-flex-items-center u-flex-center u-m-b-6 text-base bg-white" style="width: 35px; height: 35px;">
						<nut-icon name="xinwen" font-class-name="custom-icon" class-prefix="custom-icon" size="24" ></nut-icon>
					</view>
					<view class="text-base u-font-14">我的发布</view>
				</view> 
			</view>
		</view>
	</view> -->
	<view class="u-p-20 u-p-l-40 u-p-r-40" v-if="login && login != '0'"><u-button type="primary" plain shape="circle" @click="user.logout">退出登录</u-button></view>
	<u-safe-bottom></u-safe-bottom>
	
	<MenusBar></MenusBar>
	<PartnerAmountListPopup
		:show="amountShow"
		:mode="mode"
		:list="amountList"
		:title="amountTitle"   
		:onUpdateShow="handleChangeShow"
	></PartnerAmountListPopup>
</template>


<script setup>    
	const $api = inject('$api') 
import {userStore } from '@/stores/user.js'  
	const user = userStore() 
import {useCateStore, baseStore} from '@/stores/base.js'  
	const cate = useCateStore() 
	const {infoConfig} = toRefs(cate)
	const base = baseStore() 
	const {themeColor} = toRefs(base)
	const {
		gpt, 
		gptVip,
		shenhe_flag,
		qht, 
		qhtVip, 
		subsVip,
		userInfo, 
		partner, 
		login, 
		subscription_loading, 
		partner_amount, 
		partner_amount2, 
		partner_amount_list, 
		partner_amount2_list
	} = toRefs(user)
	const top = ref(true)
	const amountShow = ref(false)
	// #ifdef H5
	// const baseUrl = ref(window._url2)
	// #endif
	const bgColor = computed(() => {
		// if(top.value) return '#BEDAFF'
		return '#BEDAFF'
	}) 
	const mode = ref('1')
	const amountList = computed(() => {
		if(mode.value == '1') return partner_amount_list.value
		if(mode.value == '2') return partner_amount2_list.value
		return []
	})
	const amountTitle = computed(() => {
		if(mode.value == '1') return '可用金额明细列表'
		if(mode.value == '2') return '可提金额明细列表'
		return []
	})
	const tabIndex = computed(() => {
		return tabslist.value.findIndex(ele => ele.value == tabValue.value)
	});
	const tabValue = ref('gp');
	
	const tabslist = ref([
		{
			name: '股票通',
			value: 'gp',
			disabled: false,
			icon: 'Kxiantu'
		},
		{
			name: '期货通',
			value: 'qh', 
			disabled: false,
			icon: 'tongji'
		}, 
		// {
		// 	name: '敬请期待',
		// 	value: '', 
		// 	disabled: true
		// },
		// {
		// 	name: '现货通',
		// 	value: 'xh', 
		// 	disabled: true
		// },
	])
	onPageScroll((e) => { 
		handleScroll(e)
	})
	// 组件挂载时添加滚动事件监听
	onLoad(async () => { 
		user.getUserSubscription()
	})
	function tabsEvent (obj) {  
		if(obj.disabled) {
			messageManager.showText('敬请期待'); 
			return
		}
		tabValue.value = obj.value
		// nextTick(() => {
		// 	swiperRef.value.to(obj.index)
		// })
	}
	// 滚动事件处理函数
	const handleScroll = (e) => {
		// 直接使用回调提供的滚动信息
		const scrollTop = e.scrollTop
		// 当滚动距离超过80px时，top设为false，否则设为true
		top.value = scrollTop < 60
	}
	function handleChangeShow(data) {
		amountShow.value = data
	}
	function amountBtn(v) {
		mode.value = v
		if(amountList.value ) {
			handleChangeShow(true)
		}
		
	}
</script> 

<style lang="scss">
	page {
		background-color: #F5F6FA;  
		padding-bottom: 100px;
		::v-deep {
			.nut-price {
				color: $u-error!important
			}
		}
	}
</style>
<style lang="scss" scoped>
	$tab-height: 52px;
	$active-color: #ffffff;
	$default-color: #ede6f2;
	$primary-color: #343433;
	
	@mixin tabSelected($bgColor, $skewX) {
		position: absolute;
		width: 12px;
		height: $tab-height;
		background: $bgColor;
		transform: skewX($skewX); // 重点
	}
	
	.tab-list-cnt {
		position: relative;
		// top: 0;
		border-radius: 12px 12px 0 0;
		background-color: $default-color;
		overflow: hidden;
		z-index: 2;
		.tab-list {
			position: relative;
			display: flex;
			border-radius: 12px 12px 0 0;
		
			.tab-item {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 1;
				height: $tab-height;
				color: #8E9295;
				font-size: 17px; 
				cursor: pointer; 
				.icon {
					color: #8198b4;
				}
				&.active {
					color: $primary-color;
					font-style: italic;
					font-weight: bold;
					font-size: 19px; 
					.icon {
						color: #1576E8;
					}
				}
			}
			// .tab-icon {
			// 	width: 18px;
			// 	height: 18px;
			// 	margin-right: 8px;
			// 	margin-top: 1px;
			// }
		
			.tab-selected {
				position: absolute;
				width: 50%;
				height: $tab-height;
				background: #ffffff;
				border-radius: 12px 12px 0 0;
				box-shadow: 24px 40px 0 $active-color, -24px 40px 0 0 $active-color; // 重点
				opacity: 1;
				z-index: -1;
				transition: .3s ease-in-out;
		
				.left {
					@include tabSelected($default-color, -15deg);
					left: -18px;
					border-bottom-right-radius: 12px;
				}
		
				.right {
					@include tabSelected($default-color, 15deg);
					right: -18px;
					border-bottom-left-radius: 12px;
				}
			}
			.tab-selected::before {
				content: '';
				@include tabSelected($active-color, -15deg);
				left: -6px;
				border-top-left-radius: 12px;
			}
			.tab-selected::after {
				content: '';
				@include tabSelected($active-color, 15deg);
				right: -6px;
				border-top-right-radius: 12px;
			}
		} 
	}
	.vip-card {
		background: linear-gradient(to right, #D1ECFB, #DFE3FA, #FCE5EC, #FADBDB, #FDDFC9);
	}
	.tabs-content {
		// background: linear-gradient(to bottom, #fff, transparent 50px, #fff); 
		background-color: #fff;
		border-radius: 0  0 20px 20px;
		.tabs-content-item {
			background: linear-gradient(to bottom, #EBF1FF, #fff 50px );  
			box-shadow: 0 0 5px rgba(0,0,0,.05);
			border: 1rpx solid #fff;
			margin-bottom: 12px;;
			&:first-of-type {
				background: #fff;  
				
			}
		}
	}
	.tags-w {
		::v-deep {
			--nut-tag-border-width: 0
		}
	}
	.header { 
		background: linear-gradient(to bottom, #BEDAFF, #e3e7fa , #F5F6FA );
	}
	.box-user {
		
	}
</style>
