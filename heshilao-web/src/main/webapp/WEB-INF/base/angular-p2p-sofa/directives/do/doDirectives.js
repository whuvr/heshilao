/**
 * @name doDirectives
 * @description
 * directives doing someting by click event, such as opennig the email official web in a new window according to the email address

 **/
define(
	[
		'angular',
		'p2pSofa/services/do/doService',
		'p2pSofa/services/info/infoService',
		'p2pSofa/services/common/commonService'
	],
	function(angular) {


		var
			$dialog = null;
		mod_directives.directive('cpDo', ['doService', function(doService) {
			/**
			 * @name cpDo
			 * @description
			 * do anything you want with the doService.doAjax method just by specifying the options by the attribute style
			 * @usage
			 * <a cp-do url="url" method="get" var-name="result">i want to fly</a>
			 * @mark 用此指令可以做任何动作,属性请通过dom的attribute方式传入
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						doService.doAjax({
							url: attrs.url,
							method: attrs.method
						})
					});
				}
			};

		}]).directive('cpDoGotoEmail', ['doService', '$rootScope', function(doService, $rootScope) {
			/**
			 * @name cpDoGotoEmail
			 * @description
			 * open the email official web in a new window according to the email address
			 * @usage
			 * please revise this directive
			 * @mark 跳转去邮箱官方网站
			 **/
			return {
				link: function(scope, elem, attrs) {
					var
					//get the email,please modify this code with your stuff
						regParams = $rootScope.cookie('regParams'),
						email = 'test@qq.com';

					elem.on('click', function() {
						doService.gotoEmail(scope, elem, attrs, email);
					})
				}
			};

		}]).directive('cpDoSendActivateEmail', ['doService', function(doService) {
			/**
			 * @name cpDoSendActivateEmail
			 * @description
			 * send a email to user's mailbox for activating account
			 * @usage
			 * please revise this directive
			 * @mark 发送激活账户邮件
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						//get the username,please modify this code with your stuff
						var
							username = 'zhua1';
						doService.sendActivateEmail(scope, elem, attrs, username);
					})
				}
			};

		}]).directive('cpDoSellBond', ['doService', '$rootScope', function(doService, $rootScope) {
			/**
			 * @name cpDoSellBond
			 * @description
			 * sell bond
			 * @usage
			 * please invoke the array of sellable bonds used for reloading sellable bonds list after transferring bond successfully
			 * <a cp-do-sell-bond="selectedBond" sellable-bond-data="bondData">转让</a>
			 * @mark 转让债权
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._sellableBondData = scope.$eval(attrs.sellableBondData);
						$rootScope._selectedBond = scope.$eval(attrs.cpDoSellBond);
						$rootScope._showSellBondForm = true;
						scope.$apply();
					})
					scope.$on('$destroy', function() {
						$rootScope._sellableBondData = null;
						$rootScope._selectedBond = null
						$rootScope._showSellBondForm = false;
					})
				}
			};

		}]).directive('cpDoBackSellableBondList', ['doService', '$rootScope', function(doService, $rootScope) {
			/**
			 * @name cpDoBackSellableBondList
			 * @description
			 * return sellable bond list page
			 * @usage
			 * <input type="button" class="button-grey" value="返回" cp-do-back-sellable-bond-list />
			 * @mark 返回可转让债权列表
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._showSellBondForm = false;
						scope.$apply();
						scope.reload();
					})

				}
			};

		}]).directive('cpDoStopBond', ['doService', function(doService) {
			/**
			 * @name cpDoStopBond
			 * @description
			 * stop bond transferring
			 * @usage
			 * <a cp-do-stop-bond="bond">撤回</a>
			 * @mark 撤销债权转让
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						doService.stopBond(scope, elem, attrs, {
							bondId: scope.$eval(attrs.cpDoStopBond).id,
							doSuccess: function() {
								alert('撤销成功');
								scope.bondData && scope.bondData.reload();
							}
						});
					})
				}
			};

		}]).directive('cpDoSellBondProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoSellBondProtocolPreview
			 * @description
			 * view the transferring protocol of current selling bond
			 * @usage
			 * <a cp-do-sell-bond-protocol-preview="selectedBond">《转让协议》</a>
			 * @mark 查看正在转让债权转让协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoSellBondProtocolPreview);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_sellBondProtocolPreview', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px'
							}
						});
					})
				}
			};

		}]).directive('cpDoSoldBondProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoSoldBondProtocolPreview
			 * @description
			 * view the transferring protocol of the sold bond
			 * @usage
			 * <a cp-do-sold-bond-protocol-preview="selectedBond">《转让协议》</a>
			 *@mark 查看已转出债权转让协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoSoldBondProtocolPreview);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_soldBondProtocolPreview', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBoughtBondProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoBoughtBondProtocolPreview
			 * @description
			 * view the transferring protocol of the bought bond
			 * @usage
			 * <a cp-do-bought-bond-protocol-preview="selectedBond">《转让协议》</a>
			 *@mark 查看已转入债权转让协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoBoughtBondProtocolPreview);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_boughtBondProtocolPreview', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowsBorrowProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			// 投资记录 协议查看
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedRecord = scope.$eval(attrs.cpDoBorrowsBorrowProtocolPreview);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_borrowsBorrowProtocolPreview', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px',
								height: '440px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowsProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			// 借款详情 协议查看
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedRecord = scope.$eval(attrs.cpDoBorrowsProtocolPreview);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_borrowsProtocolPreview', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px',
								height: '440px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowsBorrowProtocolDownload', ['commonService', '$rootScope', function(cService, $rootScope) {
			// 投资记录 协议下载
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedRecord = scope.$eval(attrs.cpDoBorrowsBorrowProtocolDownload);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_borrowsBorrowProtocolDownloadTip', scope, {
							type: "no-icon",
							buttons: [],
							css: {

							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowsSeeProtocolDownload', ['commonService', '$rootScope', function(cService, $rootScope) {
			// 借款详情协议下载
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedRecord = scope.$eval(attrs.cpDoBorrowsSeeProtocolDownload);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_borrowsSeeProtocolDownloadTip', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '350px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowCollections', ['commonService', '$rootScope', function(cService, $rootScope) {
			//回款计划 弹窗
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedRecord = scope.$eval(attrs.cpDoBorrowCollections);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_backRecord', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '1000px',
								height: '400px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBorrowsRepayment', ['cService', '$rootScope', 'commonService', function(cService, $rootScope, commonService) {
			//还款详情 还款弹窗
			return {
				link: function(scope, elem, attrs) {
					$rootScope._selectedRepayment = scope.$eval(attrs.cpDoBorrowsRepayment);
					elem.on('click', function() {
						cService.ajax({
							url: 'repayments',
							method: 'post',
							params: {
								id: attrs.itemId
							}
						}).success(function(data, status, header, config) {
							scope.repaymentData = data;
							$rootScope._selectedRepayment = scope.$eval(attrs.cpDoBorrowsRepayment);
							commonService.removePopupDialog();
							scope.paid = false;
							$dialog = commonService.popupDialog('template_payBack', scope, {
								//closeBtn: false,
								title: '还款提示',
								type: "no-icon",
								buttons: [],
								css: {
									width: '350px'
								}
							});

						})

					})
				}
			};
		}]).directive('cpDoBorrowsPayback', ['doService', function(doService) {
			//还款详情 企业还款
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						doService.borrowsPayback(scope, elem, attrs, {
							backId: scope.$eval(attrs.cpDoBorrowsPayback).id,
							token: scope.$eval(attrs.cpDoBorrowsPayback).token,
							doSuccess: function() {
								$dialog.close($dialog);
								alert('恭喜您，已成功完成还款！', {
									buttons: [{
										type: 'button',
										value: '确定',
										callBack: function() {
											location.reload();
										}
									}]
								});
							}
						});
					})
				}
			};
		}]).directive('cpDoClosePopupdialog', ['commonService', '$rootScope', function(cService, $rootScope) {
			//关闭弹窗
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						cService.removePopupDialog()
					})
				}
			};

		}]).directive('cpDoReloadPopupdialog', ['commonService', '$rootScope', function(cService, $rootScope) {
			//刷新页面
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						location.reload();
					})
				}
			};

		}]).directive('cpDoSoldBondProtocolDownload', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoSoldBondProtocolDownload
			 * @description
			 * download the protocol of sold bond
			 * @usage
			 * <a cp-do-sold-bond-protocol-download="selectedBond">download</a>
			 *@mark 下载已转出债权转让协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoSoldBondProtocolDownload);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_soldBondProtocolDownloadTip', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '350px'
							}
						});
					})
				}
			};

		}]).directive('cpDoBoughtBondProtocolDownload', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoBoughtBondProtocolDownload
			 * @description
			 * download the protocol of bought bond
			 * @usage
			 * <a cp-do-bought-bond-protocol-download="selectedBond">download</a>
			 *@mark 下载已转入债权转让协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoBoughtBondProtocolDownload);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_boughtBondProtocolDownloadTip', scope, {
							type: "no-icon",
							buttons: [],
							css: {
								width: '350px'
							}
						});
					})
				}
			};

		}]).directive('cpDoShowSoldBondDetail', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoShowSoldBondDetail
			 * @description
			 * view the detail of sold bond
			 * @usage
			 * <a cp-do-show-sold-bond-detail="item">detail</a>
			 *@mark 查看已转出债权详情
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoShowSoldBondDetail);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_soldBondDetail', scope,{
							type: "no-icon",
							buttons: [],
							css: {
								width: '906px'
							}
						});
					})
				}
			};

		}]).directive('cpDoShowBoughtBondDetail', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoShowBoughtBondDetail
			 * @description
			 * view the detail of bought bond
			 * @usage
			 * <a cp-do-show-bought-bond-detail="item">detail</a>
			 *@mark 查看已转入债权详情
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						$rootScope._selectedBond = scope.$eval(attrs.cpDoShowBoughtBondDetail);
						cService.removePopupDialog()
						$dialog = cService.popupDialog('template_boughtBondDetail', scope,{
							buttons: [],
								addClassName:'detail'
							});
					})
				}
			};

		}]).directive('cpDoRegisterProtocol', ['doService', function(doService) {
			/**
			 * @name cpDoRegisterProtocol
			 * @description
			 * view register protocol
			 * @usage
			 * <a cp-do-register-protocol class="light">《融都云注册协议》</a>
			 * @mark 查看注册协议
			 **/
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						doService.registerProtocol(scope, elem, attrs, {
							doSuccess: function(scope, arg) {
								alert('<div style="height:450px;width:800px;overflow-y:scroll;text-align:left">' + arg.data + '</div>', {
									title: '<h1 id="register-protocol-title">协议内容</h1>',
									buttons: [],
									type: "no-icon"
								});
							}
						});
					})
				}
			};

		}]).directive('cpDoSendCode', ['doService', '$cookieStore', '$interval', '$rootScope', function(doService, $cookieStore, $interval, $rootScope) {
			/**
			 * @name cpDoSendCode
			 * @description
			 * send different type captcha according to the sendcodeType attribute of host element
			 * @usage
			 * if you want to send captcha to user to verify the validity of mobile phone number  when registering,
			 * just set the sendcode-type attribute to 'register'
			 * <a cp-do-send-code="phone" sendcode-type="register">获取验证码</a>
			 * @mark 注册时发送手机校验码
			 **/
			return {
				require: '^form', // - Locate the required controller by searching the element and its parents. Throw an error if not found.
				link: function(scope, elem, attrs, form) {
					var
						cookieName = attrs.sendcodeType || 'regValidCodeCountdown',
						countdown,
						phone,
						element = elem[0];

					// if(attrs.startCount && attrs.startCount!="0"){
					// 	countdown = $cookieStore.get( cookieName );
					// }else{
					countdown = $cookieStore.get(cookieName) || 0;
					// }

					function timer() {
						var
							timer;
						if (countdown <= 0) return;
						timer = $interval(function() {
							countdown--;
							$cookieStore.put(cookieName, countdown);
							elem.text(countdown + "秒后重新获取");
							elem.val(countdown + "秒后重新获取");
							if (countdown <= 0) {
								$interval.cancel(timer);
								elem.text("重新获取");
								elem.val("重新获取");
								element.removeAttribute('disabled');
							}
						}, 1000);
					}
					if (countdown > 0) {
						elem.text(countdown + "秒后重新获取");
						elem.val(countdown + "秒后重新获取");
						element.setAttribute('disabled', 'disabled');
						timer();
					}
					elem.on('click', function() {
						if (countdown > 0) return;
						var params = {};

						if (attrs.startCount) {
							doService.sendCode(scope, elem, attrs, params);
						} else {
							var
								paramVal = scope.$eval(attrs.cpDoSendCode),
								paramName = attrs.cpDoSendCode;

							form[paramName].$setViewValue(form[paramName].$viewValue);
							if (!form[paramName].$valid) return;
							params[paramName] = paramVal
							doService.sendCode(scope, elem, attrs, params);
						}
						element.setAttribute('disabled', 'disabled');
						countdown = 60;
						elem.text(countdown + "秒后重新获取");
						elem.val(countdown + "秒后重新获取");
						timer();

					})
				}
			};

		}]).directive('cpDoBorrowProtocolPreview', ['commonService', '$rootScope', function(cService, $rootScope) {
			/**
			 * @name cpDoBorrowProtocolPreview
			 * @description
			 * view the borrow detail protocol
			 * @usage
			 * <a  cp-do-borrow-protocol-preview="borrowId">preview</a>
			 * @mark 标详情协议预览
			 **/
			return {
				link: function(scope, elem, attrs) {
					var
						borrowId = scope.$eval(attrs.cpDoBorrowProtocolPreview);
					elem.on('click', function() {
						cService.popupDialog('', scope, {
							wrapClass: 'protocol-dialog',
							css: {
								width: '700px',
								height: '400px',
								overflow: 'auto'
							},
							ajax: function() {
								var $dialog = this;
								return cService.ajax({
									url: 'borrows/borrowProtocolPreview',
									method: 'get',
									params: {
										borrowId: borrowId
									}
								}).success(function(protocol) {
									$dialog.append(protocol);
								})
							}
						});

					})
				}
			};

		}]).directive('cpDoBondDetailProtocolPreview', ['commonService', 'doService', function(cService, doService) {
			//unkown because this directive has not been used,
			//please update the annotate after invoking according to the literal sense of the directive name
			return {
				link: function(scope, elem, attrs) {
					var
						bondId = scope.$eval(attrs.cpDoBondDetailProtocolPreview);
					elem.on('click', function() {
						cService.popupDialog('', scope, {
							css: {
								width: '700px',
								height: '400px',
								overflow: 'auto'
							},
							ajax: function() {
								var $dialog = this;
								return cService.ajax({
									url: 'bond/userBonds/bondProtocolPreviewSell',
									method: 'get',
									params: {
										bondId: bondId
									}
								}).success(function(protocol) {
									$dialog.append(protocol);
								})
							}
						});
					})
				}
			};

		}]).directive('cpDoFillInvite', ['$location', function($location) {
			/**
			 * @name cpDoFillInvite
			 * @description
			 * fill the input with my friend invitation link
			 * @usage
			 * <input
				cp-valid-invite
				cp-do-fill-invite
				username-error-type="UserError"
				remote-invite-error-type="remote-friend"
				required maxlength="16"
			 	type="text" name="userInviteCode"
			 	ng-model="userInviteCode" cp-ui-placeholder="请输入好友推荐人" />
			 * @mark 我的好友邀请链接
			**/
			return {
				require: 'ngModel',
				link: function(scope, elem, attrs, ctrl) {
					if ($location.$$search.ui) {
						scope[ctrl.$name] = $location.$$search.ui;
					}
				}
			}
		}]).directive('cpDoSelectRedpacket', ['commonService', function(cService) {
			/**
			 * @name cpDoSelectRedpacket
			 * @description
			 * select red packets for investing
			 * @usage
			 * <a class="redp-trigger" cp-do-select-redpacket="borrowData" invest-value="capital">
			 * @mark 投资页面红包选择
			 **/
			return {
				link: function(scope, elem, attrs) {
					scope.redpacketTotal = 0;
					scope.redpacketPlaceholder = '请选择红包';
					scope.rInvalidateRatio = false;

					scope.getRedPacketIds = function(redPackets) {
						var redPacketIds = [];
						for (var i = 0; i < redPackets.length; i++) {
							if (redPackets[i].checked) redPacketIds.push(redPackets[i].id);
						}
						return redPacketIds.join(',');
					}
					// 选择红包
					scope.selectRedpacket = function(item, investValue, redPackets, redPacketInvestMaxRatioKey) {
						var amount = item.amount;
						scope.rInvalidateRatio = false;
						if (!item.checked) {
							if (scope.redpacketTotal + amount <= investValue * redPacketInvestMaxRatioKey) {
								scope.redpacketTotal += amount;
								item.checked = true;
							} else {
								item.checked = false;
								scope.rInvalidateRatio = true;
							}

						} else {
							scope.redpacketTotal -= amount;
							item.checked = false;
						}
						scope.redPacketIds = scope.getRedPacketIds(redPackets);
						var needpay = scope.cashStr - scope.redpacketTotal;
						scope.validator(needpay);
					}

					// 清除选择的红包
					scope.clearRedp = function(redPackets) {
						if (scope.redpacketTotal > 0) {
							angular.forEach(redPackets, function(item, i) {
								item.checked = false;
								scope.validator(scope.cashStr);
							});
							scope.rRedpAll = false;
							scope.redpacketTotal = 0;
							scope.redPacketIds = '';
						}

					}
					// 选择所有红包
					scope.selectAllRedp = function(e, redPackets, redPacketInvestMaxRatioKey) {
						var
							_this = angular.element(e.target),
							total = 0,
							checked = _this.prop('checked');
						scope.rInvalidateRatio = false;
						if (checked) {
							angular.forEach(redPackets, function(item, i) {
								total += item.amount;
							});
							if (total <= scope.investValue * redPacketInvestMaxRatioKey) {
								angular.forEach(redPackets, function(item, i) {
									if (checked) {
										item.checked = true;
									}
								})
								scope.redpacketTotal = total;
							} else {
								_this.prop('checked', false);
								checked = false;
								scope.rInvalidateRatio = true;
							}
							scope.redPacketIds = scope.getRedPacketIds(redPackets);
						} else {
							scope.clearRedp(redPackets);
						}
						scope.rRedpAll = checked;
						var needpay = scope.cashStr - scope.redpacketTotal;
						scope.validator(needpay);
					}

					elem.on('click', function() {
						var
							borrowData = scope.borrowData = scope.$eval(attrs.cpDoSelectRedpacket),
							investValue = scope.investValue = scope.$eval(attrs.investValue);

						if (borrowData.redPacketResArrays.length == 0) return; //去掉了注释，原先为什么注释掉？ 2017年1月6日19:51:01

						if (!investValue) {
							alert('请输入投资金额', {
								type: 'info'
							})
							return;
						}
						scope.closeRedpDialog = cService.removePopupDialog;
						cService.popupDialog('template_selectRedpacket', scope, {
							title: '请选择可使用红包',
							css: {
								width: '600px',
								overflow: 'auto'
							},
							closeBtn: false,
							buttons: [{
								value: '确定'
							},{
								value: '取消',
								callBack: function () {
									if (scope.redpacketTotal > 0) {
										angular.forEach(borrowData.redPacketResArrays, function(item, i) {
											item.checked = false;
											scope.validator(scope.cashStr);
										});
										scope.$apply(function () {
											scope.rRedpAll = false;
											scope.redpacketTotal = 0;
											scope.redPacketIds = '';
										});//click 不进入angular context，手动执行dirty check

									}
								}
							}],
							wait: false
						})

					})
				}
			}
		}]).directive('cpDoOperateUserMessage', ['doService', 'commonService', function(doService, cService) {
			/**
			 * @name cpDoOperateUserMessage
			 * @description
			 * operate user message such as markup 、 delete
			 * @usage
			 * <div class="top-operate-bar clearfix" cp-do-operate-user-message="messageData">

					<div class="floatleft left-part">
						<label><input type="checkbox" ng-click="checkedAll(!bAll)" ng-model="bAll" />选择所有</label>
					</div>
					<div class="floatright right-part">
						<a ng-click="signRow(1)">删除信息</a>|
						<a ng-click="signRow(3)">标记已读</a>|
						<a ng-click="signRow(2)">标记未读</a>
					</div>
				</div>
			 * @mark 操作用户消息，如标记已读、未读、删除等
			**/
			return {

				link: function(scope, elem, attrs) {
					var
						messageData = [];
					scope.$watch(attrs.cpDoOperateUserMessage, function(newVal, oldVal) {
						if (typeof newVal == 'object') {
							messageData = newVal;
						}
					})

					function getCheckedRows() {
						var arr = [];
						angular.forEach(messageData, function(item, index) {
							if (item.checked) {
								arr.push(item.id);
							}
						});
						return arr;
					}

					scope.signRow = function(flag) {
						var arr = getCheckedRows();
						var title = '';
						switch (flag) {
							case 1:
								title = '确定要将选中项删除吗？';
								break;
							case 2:
								title = '确定将选中项标记为未读吗？';
								break;
							case 3:
								title = '确定将选中项标记为已读吗？';
								break;
							default:
								break;
						}
						if (arr.length > 0) {
							alert(title, {
								buttons: [{
										type: 'submit',
										value: '确定',
										callBack: function() {
											doService.operateUserMessage(scope, elem, attrs, {
												arr: arr,
												operate: flag,
												doSuccess: function(scope, arg) {
													messageData.reload({
														remainPage: flag != 1 ? true : false
													});
													scope.bAll = false;
												}
											})
										}
									}, {
										type: 'submit',
										value: '取消',
										className: 'cancel'
									}

								]
							})
						} else {
							alert('至少选择一条消息');
						}
					}

					scope.expandRow = function(item, expand) {
						item.expand = expand;
						if (expand && item.isReaded == 1) {
							doService.viewUserMessage(scope, elem, attrs, {
								id: item.id,
								doSuccess: function(scope, arg) {
									item.content = arg.data;
									item.isReaded = 2;
									cService.updateUserMessage();
								}
							})
						}
					}

					scope.checkedAll = function(checked) {
						angular.forEach(messageData, function(item, index) {
							item.checked = checked;
						})
						scope.bAll = checked;

					}
				}
			}
		}]).directive('cpDoSelectExpborrows', ['commonService', function(cService) {
			/**
			 * @name cpDoSelectExpborrow
			 * @description
			 * select red packets for investing
			 * @usage
			 * <a class="redp-trigger" cp-do-select-expborrow="expborrowsData" invest-value="capital">
			 * @mark 投资页面体验金选择
			 **/
			return {
				link: function(scope, elem, attrs) {
					scope.expborrowTotal = 0;
					scope.expborrowPlaceholder = '请选择体验金';
					scope.rInvalidateRatio = false;
					scope.getExpBorrowIds = function(expBorrows) {
						var expBorrowIds = [];
						for (var i = 0; i < expBorrows.length; i++) {
							if (expBorrows[i].checked) expBorrowIds.push(expBorrows[i].id);
						}
						return expBorrowIds.join(',');
					}
					// 选择体验金
					scope.selectExpborrow = function(item, expBorrows, amountInvestable) {
						var amount = item.amount;
						scope.rInvalidateRatio = false;
						if (!item.checked) {
							if (scope.expborrowTotal + amount <= amountInvestable) {
								scope.expborrowTotal += amount;
								item.checked = true;
							} else {
								item.checked = false;
								scope.rInvalidateRatio = true;
							}

						} else {
							scope.expborrowTotal -= amount;
							item.checked = false;
						}
						scope.expBorrowIds = scope.getExpBorrowIds(expBorrows);
					}

					// 清除选择的体验金
					scope.clearRedp = function(expBorrows) {
						if (scope.expborrowTotal > 0) {
							angular.forEach(expBorrows, function(item, i) {
								item.checked = false;
							});
							scope.rRedpAll = false;
							scope.expborrowTotal = 0;
							scope.expBorrowIds = '';
						}

					}

					// 选择所有体验金
					scope.selectAllRedp = function(e, expBorrows, amountInvestable) {
						var
							_this = angular.element(e.target),
							total = 0,
							checked = _this.prop('checked');
						scope.rInvalidateRatio = false;
						if (checked) {
							angular.forEach(expBorrows, function(item, i) {
								total += item.amount;
							});
							if (total <= amountInvestable) {
								angular.forEach(expBorrows, function(item, i) {
									if (checked) {
										item.checked = true;
									}
								})
								scope.expborrowTotal = total;
							} else {
								_this.prop('checked', false);
								checked = false;
								scope.rInvalidateRatio = true;
							}
							scope.expBorrowIds = scope.getExpBorrowIds(expBorrows);
						} else {
							scope.clearRedp(expBorrows);
						}
						scope.rRedpAll = checked;
					}

					elem.on('click', function() {
						scope.closeRedpDialog = cService.removePopupDialog;
						cService.popupDialog('template_selectExpborrows', scope, {
							title: '请选择可使用体验金',
							css: {
								width: '600px',
								overflow: 'auto'
							},
							closeBtn: false,
							buttons: [{
								value: '确定'
							},{
								value: '取消',
								callBack: function () {
									if (scope.expborrowTotal > 0) {
										angular.forEach(scope.expborrowsData.list, function(item, i) {
											item.checked = false;
										});
										scope.$apply(function () {
											scope.rRedpAll = false;
											scope.expborrowTotal = 0;
											scope.expBorrowIds = '';
										});//click 不进入angular context，手动执行dirty check

									}
								}
							}],
							wait: false
						})

					})
				}
			}
		}])
	}
)