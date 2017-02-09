define(
	[
		'angular',
        'p2pSofa/services/do/doService',
        'p2pSofa/services/common/commonService'
	],
	function(angular) {
		mod_services.service('infoService',['commonService', '$parse', 'doService', '$rootScope', '$cookieStore',
         function( cService, $parse, doService, $rootScope, $cookieStore ) {
            var
                service,
                accountCashURL = 'account/cashAccount',
                accountBankURL = 'account/recharge/getBank',
                rechargeBanksURL = 'account/recharge/getRechargeBanks',
                userInviteLinkURL = 'userInvite',
                sellBondProtocolURL = 'bond/userBonds/bondProtocolPreviewSell',
                soldBondProtocolURL = 'bond/userBonds/bondProtocolPreviewSell',
                soldBondProtocolDownloadURL = 'bond/userBonds/bondSellProtocol',
                boughtBondProtocolURL = 'bond/userBonds/bondBuyProtocolPreview',
                boughtBondProtocolDownloadURL = 'bond/userBonds/bondBuyProtocol',
                borrowDetailUrl = 'borrows',
                bondDetailUrl = 'bond/bonds/bondDetail',
                expBorrowsDetailUrl = 'expBorrows',
                borrowsBorrowProtocolURL = 'borrows/borrowProtocolPreview',
                borrowsBorrowDownloadURL = 'borrows/investorProtocolDownload';
            service = {
            	accountCash: function( scope, elem, attrs, opts ){
                    //账户中心首页统计数据
            		return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: accountCashURL,
                        method : 'get'
                    }, opts || { } ) );

                },
                accountBank: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: accountBankURL,
                        method : 'get'
                    }, opts || { } ) );

                },
                rechargeBanks: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: rechargeBanksURL,
                        method : 'get'
                    }, opts || { } ) );

                },
                userInviteLink: function( scope, elem, attrs, opts ){
                    //好友邀请链接
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: userInviteLinkURL,
                        method : 'get'
                    }, opts || { } ) );

                },
                sellBondProtocol: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: sellBondProtocolURL,
                        method : 'get',
                        params: {
                            borrowInvestmentId: opts.bond.borrowInvestmentId
                        }
                    }, opts || { } ) );

                },
                soldBondProtocol: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: soldBondProtocolURL,
                        method : 'get',
                        params: {
                            bondId: opts.bond.id,
                            userId: opts.bond.userId
                        }
                    }, opts || { } ) );

                },
                borrowsBorrowProtocol: function( scope, elem, attrs, opts ){
                    // 投资记录 协议查看
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: borrowsBorrowProtocolURL,
                        method : 'get',
                        params: {
                            borrowId: opts.bond.borrowId,
                            investmentId: opts.bond.id
                        }
                    }, opts || { } ) );

                },
                borrowsSeeProtocol: function( scope, elem, attrs, opts ){
                    // 借款详情 协议查看
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: borrowsBorrowProtocolURL,
                        method : 'get',
                        params: {
                            borrowId: opts.bond.id,
                            investmentId: opts.bond.investmentId,
                            isBorrowProtocol: 1
                        }
                    }, opts || { } ) );

                },
                borrowsBorrowDownload: function( scope, elem, attrs, opts ){
                    // 投资记录 协议下载
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: borrowsBorrowDownloadURL,
                        method : 'get',
                        params: {
                            borrowId: opts.bond.borrowId,
                            investmentId: opts.bond.id
                        }
                    }, opts || { } ) );

                },
                borrowsRepayment: function( scope, elem, attrs, opts ){
                    // 还款弹框 展示内容
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: 'repayments',
                        method : 'post',
                        params: {
                           id: opts.back.id
                        }
                    }, opts || { } ) );

                },
                soldBondProtocolDownload: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: soldBondProtocolDownloadURL,
                        method : 'get',
                        params: {
                            bondId: opts.bond.id,
                            userId: opts.bond.userId
                        }
                    }, opts || { } ) );

                },
                boughtBondProtocol: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: boughtBondProtocolURL,
                        method : 'get',
                        params: {
                            bondInvestmentId: opts.bond.id
                        }
                    }, opts || { } ) );

                },
                boughtBondProtocolDownload: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: boughtBondProtocolDownloadURL,
                        method : 'get',
                        params: {
                            bondInvestmentId: opts.bond.id
                        }
                    }, opts || { } ) );

                },
                borrowProtocol: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: 'borrows/borrowProtocolPreview',
                        method : 'get',
                        params: {
                            borrowId: opts.id
                        }
                    }, opts || { } ) );

                },
                borrowDetail: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                            url: borrowDetailUrl + '/' + opts.id,
                            method : 'get'
                        }, opts || { } ) );

                },
                bondDetail: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url: bondDetailUrl,
                        method : 'get'
                    }, opts || { } ) );

                },
                expborrowsDetail: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                            url: expBorrowsDetailUrl + '/' + opts.id,
                            method : 'get'
                        }, opts || { } ) );

                },
                userInfo: function( scope, elem, attrs, opts ){
                    return doService.doAjax( scope, elem, attrs, angular.extend( {
                        url :  'users/userInfo',
                        method: 'get',
                        doSucess: function(scope, arg){
                            $rootScope.user = arg.data;
                            $cookieStore.put("curUser", arg.data);
                        }
                    }, opts || { } ) );

                }
            }
			return service;

		} ] )
	}
);