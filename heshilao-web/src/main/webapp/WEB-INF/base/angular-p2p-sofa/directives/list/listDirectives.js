define(
	[
		'angular',
		'p2pSofa/services/list/listService'
	],
	function() {
		mod_directives.directive('cpList', ['listService', function(listService) {
			/**
			 * @USEAGE:
			 * cp-list params="{{ {'pageSize':1,'rows':1} }}" data="borrowData.borrowImageList || []" var-name="imageData"
			 */
			return {
				link: function(scope, elm, attrs) {
					listService.listAjax(scope, elm, attrs, {

					});
				}
			};
		}]).directive('cpListBorrow', ['listService', function(listService) {
			// 列表页 投资列表
			return {
				link: function(scope, elm, attrs) {
					listService.investList(scope, elm, attrs, {

					});
				}
			};
		}]).directive('cpListBond', ['listService', function(listService) {
			// 列表页 债权列表
			return {
				link: function(scope, elm, attrs) {
					listService.bondList(scope, elm, attrs, {

					});
				}
			};
		}]).directive('cpRecommendBorrow', ['listService', function(listService) {
			// 推荐标
			return {
				link: function(scope, elm, attrs) {
					listService.recommendList(scope, elm, attrs, {});
				}
			};
		}]).directive('cpListAccountRecommend', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.accountRecommendList(scope, elm, attrs);
				}
			};
		}]).directive('cpListAccountNav', ['navData', '$rootScope', '$cookieStore', function(navDate, $rootScope, $cookieStore) {
			return {
				link: function(scope, elm, attrs) {
					var
						varName = attrs.varName;
					if (varName) {
						scope[varName] = [];
						if (!$rootScope.user.id && !!$cookieStore.get("curUser")) {
							$rootScope.user = $cookieStore.get("curUser");
						}
						if ($rootScope.user.canBorrow) {
							scope[varName] = navDate[0].subState;
						} else {
							angular.forEach(navDate[0].subState, function(item, index) {
								var curArr = item.className.split(' ');
								if (curArr.indexOf('borrow') == -1) {
									scope[varName].push(item);
								}
							})
						}
					}
				}
			};
		}]).directive('cpListRecharge', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.rechargeList(scope, elm, attrs);
				}
			};
		}]).directive('cpListWithdraw', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.withdrawList(scope, elm, attrs);
				}
			};
		}]).directive('cpListMyinvest', ['listService', function(listService) {
			//投资项目(暂时没用到)
			return {
				link: function(scope, elm, attrs) {
					listService.myinvestList(scope, elm, attrs);
				}
			};
		}]).directive('cpListMyinvestRecord', ['listService', function(listService) {
			//投资记录
			return {
				link: function(scope, elm, attrs) {
					listService.myinvestRecordList(scope, elm, attrs);
				}
			};
		}]).directive('cpListBorrowCollection', ['listService', function(listService) {
			// 回款计划
			return {
				link: function(scope, elm, attrs) {
					listService.borrowCollectionList(scope, elm, attrs);
				}
			};
		}]).directive('cpListMyRedPacket', ['listService', function(listService) {
			// 我的红包
			return {
				link: function(scope, elm, attrs) {
					listService.myRedPacketList(scope, elm, attrs);
				}
			};
		}]).directive('cpListUserInvite', ['listService', function(listService) {
			// 好友邀请
			return {
				link: function(scope, elm, attrs) {
					listService.userInviteList(scope, elm, attrs);
				}
			};
		}]).directive('cpListUserInviteLink', ['listService', function(listService) {
			// 好友邀请链接
			return {
				link: function(scope, elm, attrs) {
					listService.userInviteLinkList(scope, elm, attrs);
				}
			};
		}]).directive('cpListMyBorrow', ['listService', function(listService) {
			//账户中心 借款详情
			return {
				link: function(scope, elm, attrs) {
					listService.myBorrowList(scope, elm, attrs);
				}
			};
		}]).directive('cpListRepayment', ['listService', function(listService) {
			//账户中心 还款详情
			return {
				link: function(scope, elm, attrs) {
					listService.repaymentList(scope, elm, attrs);
				}
			};
		}]).directive('cpListAccountLogs', ['listService', function(listService) {
			//资金记录
			return {
				link: function(scope, elm, attrs) {
					listService.accountlogsList(scope, elm, attrs);
				}
			};
		}]).directive('cpListCreditApply', ['listService', function(listService) {
			//信用额度
			return {
				link: function(scope, elm, attrs) {
					listService.creditApplyList(scope, elm, attrs);
				}
			};
		}]).directive('cpListSaleableBond', ['listService', '$rootScope', function(listService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					listService.saleableBondList(scope, elm, attrs, {
						success: function(scope, arg) {
							$rootScope._bondConfig = arg.data.bondConfig;
							$rootScope._discountRate = arg.data.bondConfig.discountRateMin;
						}
					});
				}
			};
		}]).directive('cpListSellingBond', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.sellingBond(scope, elm, attrs);
				}
			};
		}]).directive('cpListSoldBond', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.soldBondList(scope, elm, attrs);
				}
			};
		}]).directive('cpListBoughtBond', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.boughtBondList(scope, elm, attrs);
				}
			};
		}]).directive('cpListSoldBondDetail', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.soldBondDetailList(scope, elm, attrs);
				}
			};
		}]).directive('cpListBoughtBondDetail', ['listService', function(listService) {

			return {
				link: function(scope, elm, attrs) {
					listService.boughtBondDetailList(scope, elm, attrs);
				}
			};
		}]).directive('cpListStopBondRecord', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.stopBondRecordList(scope, elm, attrs);
				}
			};
		}]).directive('cpListLinks', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					listService.linksList(scope, elm, attrs);
				}
			};
		}]).directive('cpListArticleNav', [function() {
			return {
				link: function(scope, elm, attrs) {
					var
						varName = attrs.varName,
						navs = [{
							name: '平台简介',
							type: '5',
							state: 'article.aboutus'
						}, {
							name: '网站公告',
							type: '1',
							state: 'article.webtips'
						}, {
							name: '前沿资讯',
							type: '2',
							state: 'article.news'
						}, {
							name: '常见问题',
							type: '3',
							state: 'article.faq'
						}, {
							name: '法律声明',
							type: '4',
							state: 'article.law'
						}, {
							name: '联系我们',
							type: '6',
							state: 'article.contactus'
						}, {
							name: '安全保障',
							type: '7',
							state: 'article'
						}, {
							name: '招贤纳士',
							type: '8',
							state: 'article'
						}];
					scope[varName] = navs;
				}
			};
		}]).directive('cpListBorrowInvestmentRecord', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					var
						id = scope.$eval(attrs.cpListBorrowInvestmentRecord);
					listService.borrowInvestmentRecordList(scope, elm, attrs, {
						params: {
							borrowId: id
						}
					});
				}
			};
		}]).directive('cpListBorrowInvestmentRank', ['listService', function(listService) {
			return {
				link: function(scope, elm, attrs) {
					var
						id = scope.$eval(attrs.cpListBorrowInvestmentRank);
					listService.borrowInvestmentRankList(scope, elm, attrs, {
						params: {
							borrowId: id
						}
					});
				}
			};
		}]).directive('cpListBorrowCollections', ['listService', '$rootScope', function(listService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					listService.borrowCollectionsList(scope, elm, attrs);
				}
			};
		}]).directive('cpListUserMessage', ['listService', '$rootScope', function(listService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					listService.userMessageList(scope, elm, attrs);
				}
			};
		}]).directive('cpListBondRepayPlan', ['listService', '$rootScope', function(listService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					scope.$watch(attrs.cpListBondRepayPlan, function(newVal, oldVal) {
						if (typeof newVal == 'object') {
							listService.bondRepayPlanList(scope, elm, attrs, {
								params: {
									borrowId: newVal.bond.borrowId,
									investmentId: newVal.bond.borrowInvestmentId,
									bondId: newVal.bond.id,
									bondStatus: newVal.bond.status
								}
							});
						}
					})

				}
			};
		}]).directive('cpListBondTransferRecord', ['listService', '$rootScope', function(listService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					var
						id = scope.$eval(attrs.cpListBondTransferRecord);
					listService.bondTransferRecordList(scope, elm, attrs, {
						params: {
							bondId: id
						}
					});

				}
			};
		}]).directive('cpListIndustryInformation', ['listService', function(listService) {
			//资讯
			return {
				link: function(scope, elm, attrs) {
					listService.industryInformationList(scope, elm, attrs);
				}
			};
		}]).directive('cpListWebsiteAnnouncement', ['listService', function(listService) {
			//公告
			return {
				link: function(scope, elm, attrs) {
					listService.websiteAnnouncementList(scope, elm, attrs);
				}
			};
		}])

	}
)