define(
	[
		'angular',
		'p2pSofa/services/info/infoService'
	],
	function(angular) {
		mod_directives.directive('cpInfoAccountCash', ['infoService', function(infoService) {
			//账户中心首页统计数据
			return {
				link: function(scope, elm, attrs) {
					infoService.accountCash(scope, elm, attrs, {

					});
				}
			};

		}]).directive('cpInfoAccountBank', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.accountBank(scope, elm, attrs, {

					});
				}
			};

		}]).directive('cpInfoRechargeBanks', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.rechargeBanks(scope, elm, attrs, {

					});
				}
			};

		}]).directive('cpInfoUserInviteLink', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.userInviteLink(scope, elm, attrs, {

					});
				}
			};

		}]).directive('cpInfoSellBondProtocol', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.sellBondProtocol(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoSellBondProtocol)
					});
				}
			};

		}]).directive('cpInfoSoldBondProtocol', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.soldBondProtocol(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoSoldBondProtocol)
					});
				}
			};

		}]).directive('cpInfoBorrowsBorrowProtocol', ['infoService', function(infoService) {
			// 投资记录 协议查看
			return {
				link: function(scope, elm, attrs) {
					infoService.borrowsBorrowProtocol(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoBorrowsBorrowProtocol)
					});
				}
			};

		}]).directive('cpInfoBorrowsSeeProtocol', ['infoService', function(infoService) {
			// 借款详情 协议查看
			return {
				link: function(scope, elm, attrs) {
					infoService.borrowsSeeProtocol(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoBorrowsSeeProtocol)
					});
				}
			};

		}]).directive('cpInfoBorrowsBorrowProtocolDownload', ['infoService', function(infoService) {
			// 投资记录 协议下载
			return {
				link: function(scope, elm, attrs) {
					infoService.borrowsBorrowDownload(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoBorrowsBorrowProtocolDownload)
					});
				}
			};

		}]).directive('cpInfoBorrowsRepayment', ['infoService', function(infoService) {
			// 还款弹框 展示内容
			return {
				link: function(scope, elm, attrs) {
					infoService.borrowsRepayment(scope, elm, attrs, {
						back: scope.$eval(attrs.cpInfoBorrowsRepayment)
					});
				}
			};

		}]).directive('cpInfoSoldBondProtocolDownload', ['infoService', '$rootScope', function(infoService, $rootScope) {
			return {
				link: function(scope, elm, attrs) {
					infoService.soldBondProtocolDownload(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoSoldBondProtocolDownload)
					});
				}
			};

		}]).directive('cpInfoBoughtBondProtocol', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.boughtBondProtocol(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoBoughtBondProtocol)
					});
				}
			};

		}]).directive('cpInfoBoughtBondProtocolDownload', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.boughtBondProtocolDownload(scope, elm, attrs, {
						bond: scope.$eval(attrs.cpInfoBoughtBondProtocolDownload)
					});
				}
			};

		}]).directive('cpInfoCookie', ['$cookieStore', function($cookieStore) {
			return {
				link: function(scope, elm, attrs) {
					var
						varName = attrs.varName,
						key = attrs.cpInfoCookie;
					scope[varName] = $cookieStore.get(key);
				}
			};

		}]).directive('cpInfoBorrowDetail', ['infoService', '$stateParams', function(infoService, $stateParams) {
			// 投资详情页
			return {
				link: function(scope, elm, attrs) {
					var
						id = $stateParams.id;
					infoService.borrowDetail(scope, elm, attrs, {
						id: id
					});
				}
			};

		}]).directive('cpInfoBondDetail', ['infoService', '$stateParams', function(infoService, $stateParams) {
			// 债权详情页
			return {
				link: function(scope, elm, attrs) {
					var
						id = $stateParams.id,
						userId = $stateParams.userId;
					infoService.bondDetail(scope, elm, attrs, {
						params: {
							id: id,
							userId: userId
						}
					});
				}
			};

		}]).directive('cpInfoExpborrowsDetail', ['infoService', '$stateParams', function(infoService, $stateParams) {
			return {
				link: function(scope, elm, attrs) {
					var
						id = $stateParams.id;
						infoService.expborrowsDetail(scope, elm, attrs, {
						id: id
					});
				}
			};

		}]).directive('cpInfoBorrowProtocol', ['infoService', function(infoService) {
			return {
				link: function(scope, elm, attrs) {
					infoService.borrowProtocol(scope, elm, attrs, {
						id: scope.$eval(attrs.cpInfoBorrowProtocol)
					});
				}
			};

		}]).directive('cpInfoBorrowStatus', ['$rootScope', function($rootScope) {
			/**
			 * 获取标的数据（borrowData）中的状态，并填入scope
			 * 返回值名称通过varname定义
			 * 1 means can invest;
			 * 2 means full;
			 * 3 means  can't invest bond because current user is the bond owner;
			 * 4 means do not invest novice borrow
			 * 5 borrower can't invest the bond which be belonged to the borrow of borrower
			 * 6 corpUser is forbidden to invest
			 */
			function build(scope, elm, attrs) {
				var
					borrow = scope.$eval(attrs.cpInfoBorrowStatus),
					varName = attrs.varName;
				if (!varName) return;
				if ($rootScope.user.userType == 1 || $rootScope.user.userType == 2) {
					scope[varName] = 6;
				} else if (borrow.status >= 3) {
					scope[varName] = 2;
				} else if ($rootScope.user.id == borrow.userId) {
					scope[varName] = 3;
				} else if (!borrow.investAble) {
					scope[varName] = 4;
				} else {
					scope[varName] = 1;
				}

				if (borrow.status == 1 || borrow.status == 3 || borrow.status == 4 || borrow.status == 8) {
					scope['borrowExist'] = true;
				} else {
					scope['borrowExist'] = false;
				}

				//if remain account less than the min invest value, disabled user input and set 'investValue' to be as much as remain account
				//当剩余可投金额比最小投资金额小，禁止输入并默认为剩余可投金额
				if (borrow.amountBorrow - borrow.amountInvested <= borrow.investMin) {
					scope['disabledInvest'] = true;
					scope['cashStr'] = borrow.amountInvestable;
				}
			}
			return {

				link: function(scope, elm, attrs) {
					scope.$watch(attrs.cpInfoBorrowStatus, function(newVal, oldVal) {
						typeof newVal == 'object' && build(scope, elm, attrs);
					})
				}
			};

		}]).directive('cpInfoBondStatus', ['$rootScope', function($rootScope) {
			//1 means can invest;
			//2 means full;
			//3 means  can't invest bond because current user is the bond owner;
			//4 means do not invest novice borrow
			//5 borrower can't invest the bond which be belonged to the borrow of borrower
			//6 corpUser is forbidden to invest
			function build(scope, elm, attrs) {
				var
					bond = scope.$eval(attrs.cpInfoBondStatus),
					varName = attrs.varName,
					status = bond.bond.status;
				if (!varName) return;

				if ($rootScope.user.userType == 1 || $rootScope.user.userType == 2) {
					scope[varName] = 6;
				} else if (status >= 3) {
					scope[varName] = 2;
				} else if ($rootScope.user.id == bond.bond.userId) {
					scope[varName] = 3;
				} else if ($rootScope.user.id == bond.borrow.userId) {
					scope[varName] = 5;
				} else {
					scope[varName] = 1;
				}
			}
			return {

				link: function(scope, elm, attrs) {
					scope.$watch(attrs.cpInfoBondStatus, function(newVal, oldVal) {
						typeof newVal == 'object' && build(scope, elm, attrs);
					})

				}
			};

		}]).directive('cpInfoInitAccountset', ['$rootScope', '$cookieStore', function($rootScope, $cookieStore) {
			return {
				scope: true,
				link: function(scope, elem, attrs) {
					scope.MobileModify = true;
					scope.showPsw = false;
					scope.bindEma = false;
					scope.showEma = false;

					function addX(num) {
						var i, z;
						for (i = 0, z = ''; i < num; i++) {
							z += '*';
						}
						return z;
					}

					function hide(str, start, num) {
						var i, str1;
						str1 = str.substr(0, start);
						return str1 + addX(num) + str.substr((num + str1.length));
					}

					function hideEmail(str) {
						var num = str.indexOf('@');
						str1 = str.substr(0, num);
						return hide(str1, 1, str1.length - 2) + str.substr(num);
					}

					var user = $cookieStore.get("curUser");
					if (user.email == undefined || user.email == '') {
						scope.isEmail = false;
					} else {
						scope.isEmail = true;
						scope.bindEmail = hideEmail(user.email);
					}
					if (user.realName) {
						var num = user.realName.length;
						var z = hide(user.realName, 1, num - 1);
						scope.idNo = z + '    ' + user.idNo;
					}
					scope.userPhone = hide(user.phone, 3, 4);

					if ($rootScope.user.realNameStatus == 1) {
						scope.idIdentify = false;
						scope.score = "100";
						scope.grade = "高";
						scope.modifyMob = false;
						document.getElementById("progress").style.backgroundPosition = "0px -15px";
						document.getElementById("safety-color").style.color = "#70bc31";
					} else {
						scope.idIdentify = true;
						scope.grade = "中";
						scope.score = "75";
						scope.modifyMob = true;
						document.getElementById("progress").style.backgroundPosition = "0px 0px";
						document.getElementById("safety-color").style.color = "#f39800";
					}
				}
			}
		}]);
	}
)