/**
 * [路由配置]
 * @param  {[type]}          [description]
 * @return {[type]}          [description]
 */
define([
	'angular'
], function(angular) {
	return function(app) {
		app.constant('navData', [{
				'name': '我的账户',
				'state': 'account',
				'abstract': true,
				'params': {},
				'subState': [{
					'name': '我的账户',
					'state': 'account.myaccount',
					'params': {},
					'className': 'invest'
				}, {
					'name': '资金管理',
					'params': {},
					'className': 'invest',
					'subState': [{
						'name': '充值提现',
						'state': 'account.rechargeAndCash',
						'params': {},
						'className': 'invest'
					}, {
						'name': '账户充值',
						'state': 'account.recharge',
						'params': {},
						'className': 'invest hide'
					}, {
						'name': '账户提现',
						'state': 'account.withdrawals',
						'params': {},
						'className': 'invest hide'
					}, {
						'name': '支付账户',
						'state': 'account.payAccount',
						'params': {},
						'className': 'invest'
					}, {
						'name': '银行卡',
						'state': 'account.bankCard',
						'params': {},
						'className': 'invest corpBorrow'
					}, {
						'name': '资金记录',
						'state': 'account.accountRecord',
						'params': {},
						'className': 'invest'
					}]
				}, {
					'name': '投资管理',
					'params': {},
					'className': 'invest',
					'subState': [{
							'name': '投资记录',
							'state': 'account.myinvest',
							'params': {},
							'className': 'invest'
						}, {
							'name': '回款计划',
							'state': 'account.payment',
							'params': {},
							'className': 'invest'
						}
						// ,
						// {
						// 	'name': '债权转让',
						// 	'state': 'account.creditorRight',
						// 	'params': {type:null},
						// 	'className': 'invest'
						// }

					]

				}, {
					'name': '借款管理',
					'params': {},
					'className': 'borrow',
					'subState': [{
						'name': '借款详情',
						'state': 'account.borrowdetail',
						'params': {},
						'className': 'invest borrow'
					}, {
						'name': '还款详情',
						'state': 'account.back',
						'params': {},
						'className': 'invest borrow'
					}, {
						'name': '信用额度',
						'state': 'account.credit',
						'params': {},
						'className': 'invest borrow'
					}, {
						'name': '证明资料',
						'state': 'account.material',
						'params': {},
						'className': 'invest borrow'
					}]

				}, {
					'name': '担保管理',
					'params': {},
					'className': 'guarantee',
					'subState': [{
						'name': '担保借款',
						'state': 'account.guaranteeBorrow',
						'params': {},
						'className': 'invest guarantee'
					}, {
						'name': '担保详情',
						'state': 'account.guaranteeBack',
						'params': {},
						'className': 'invest guarantee'
					}]
				}, {
					'name': '好友邀请',
					'state': 'account.invitation',
					'params': {},
					'className': 'invest'
				}, {

					'name': '我的消息',
					'state': 'account.message',
					'params': {},
					'className': 'invest'
				}, {
					'name': '我的优惠',
					'state': 'account.discount',
					'params': {},
					'className': 'invest'
				}, {
					'name': '账户设置',
					'state': 'account.accountSet',
					'params': {},
					'className': 'invest'
				}, {
					'name': '更换头像',
					'state': 'account.photoChange',
					'params': {},
					'className': 'hide photo'
				}]
			}, {
				'name': '首页',
				'state': 'home',
				'params': {}
			}, {
				'name': '首页活动',
				'state': 'homeActivity',
				'params': {
					id: null
				}
			}, {
				'name': '登陆',
				'state': 'login',
				'params': {},
				'subState': [{
					'name': '企业借款登陆',
					'state': 'login.corpBorrow',
					'params': {
						id: null,
						uid: null
					}
				}, {
					'name': '修改密码',
					'state': 'login.modifyPsw',
					'params': {}
				}, {
					'name': '修改邮箱',
					'state': 'login.modifyEmail',
					'params': {}
				}, {
					'name': '忘记密码-手机',
					'state': 'login.getbackMob',
					'params': {}
				}, {
					'name': '忘记密码-邮箱',
					'state': 'login.getbackEma',
					'params': {}
				}, {
					'name': '忘记密码-手机验证',
					'state': 'login.checkPsw',
					'params': {}
				}, {
					'name': '忘记密码-修改成功',
					'state': 'login.modifySuc',
					'params': {}
				}, {
					'name': '忘记密码-邮箱验证',
					'state': 'login.checkEma',
					'params': {}
				}]
			}, {
				'name': '注册',
				'state': 'register',
				'params': {},
				'subState': [{
					'name': '注册第二步',
					'state': 'register.registerSec',
					'params': {}
				}, {
					'name': '注册第三步',
					'state': 'register.activateEmailSucc',
					'params': {}
				}, {
					'name': '邮箱已经激活',
					'state': 'register.activatedEma',
					'params': {}
				}, {
					'name': '链接失效',
					'state': 'register.linkFailure',
					'params': {}
				}]
			}, {
				'name': '我要投资',
				'state': 'invest',
				'params': {
					type: null
				}
			}, {
				'name': '标详情',
				'state': 'borrowDetail',
				'params': {
					id: null
				}
			}, {
				'name': '标详情预览',
				'state': 'borrowPreview',
				'params': {
					id: null
				}
			},
			{
				'name':'体验标详情',
				'state' :'expBorrowsDetail',
				'params': {id:null}
			},
			// {
			// 	'name':'债权详情',
			// 	'state' :'bondDetail',
			// 	'params': {id:null,userId:null}
			// },
			{
				'name': '文章',
				'state': 'article',
				'params': {},
				'subState': [{
					'name': '平台简介',
					'state': 'article.aboutus',
					'params': {},
					articleType: '平台简介'
				}, {
					'name': '网站公告',
					'state': 'article.webtips',
					articleType: 'website'
				}, /*{
					'name': '前沿资讯',
					'state': 'article.news',
					articleType: 'news'
				},*/ {
					'name': '常见问题',
					'state': 'article.faq',
					'params': {},
					articleType: '常见问题'
				}, {
					'name': '法律声明',
					'state': 'article.law',
					'params': {},
					articleType: '法律声明'
				}, {
					'name': '联系我们',
					'state': 'article.contactus',
					'params': {},
					articleType: '联系我们'
				}, {
					'name': '文章详情',
					'state': 'article.articleDetail',
					'params': {
						id: null,
						type: null
					},
					isNavItem: false
				}/*, {
					'name': '安全保障',
					'state': 'article.security',
					'params': {},
					articleType: '安全保障'
				}, {
					'name': '招贤纳士',
					'state': 'article.recruit',
					'params': {},
					articleType: '招贤纳士'
				}*/]
			}, {
				'name': '新手指引',
				'state': 'newuser',
				'params': {}
			}, {
				'name': '错误页面',
				'state': 'error',
				'params': {
					status: null
				}
				// paramObj:
			}, {
				'name': '支付结果',
				'state': 'payResult',
				'params': {},
				'subState': [{
					'name': '跳第三方',
					'state': 'payResult.payThird',
					'params': {}
				}]
			}, {
				'name': '我要借款',
				'state': 'borrow',
				'params': {}
			}, {
				'name': '新手任务',
				'state': 'newTask',
				'params': {}
			}, {
				'name': 'APP下载',
				'state': 'app_down',
				'params': {}
			}, {
				'name': '活动页',
				'state': 'activities',
				'params': {}
			},{
				'name': '艺术品',
				'state': 'art',
				'params': {}
			},


		]);
	}
});