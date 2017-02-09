define(
	[
		'angular',
		'p2pSofa/services/valid/validService',
		'p2pSofa/services/common/commonService'
	],
	function() {

		mod_directives.directive('cpValidCaptcha', ['validService', function(validService) {
			// 验证码校验
				return {
					link: function(scope, elem, attrs) {
						validService.captcha(scope, elem, attrs);
					}
				};
			}]).directive('cpValidPattern', ['validService', function(validService) {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						validService.pattern(scope, elem, attrs, ctrl, {
							reg: new RegExp(attrs.pattern),
							errorName: attrs.patternErrorType
						})
					}
				};
			}]).directive('cpValidUsername', ['validService', function(validService) {
				// 用户名校验
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						validService.username(scope, elem, attrs, ctrl);
						if (attrs.noRepeat != 'false') {
							validService.remoteUsername(scope, elem, attrs, ctrl);
						}
					}
				};
			}])
			.directive('cpValidInvite', ['validService', function(validService) {
				// 邀请码校验
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						validService.invite(scope, elem, attrs, ctrl);
						if (attrs.noRepeat != 'false') {
							validService.remoteInvite(scope, elem, attrs, ctrl);
						}
					}
				}
			}])
			.directive('cpValidEmail', ['validService', 'commonService', function(validService, cService) {
				// 邮箱校验
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						var
							bNoRepeat = attrs.noRepeat != undefined && attrs.noRepeat != 'false',
							bShowTipbox = attrs.showTipbox != undefined && attrs.showTipbox != 'false',
							emails = ['qq', '126', '163', 'sohu', 'sina', 'gmail'],
							tipbox,
							parent,
							element = elem[0];
						validService.email(scope, elem, attrs, ctrl)
						if (bNoRepeat) {
							validService.remoteEmail(scope, elem, attrs, ctrl);
						}
						if (bShowTipbox) {

							parent = element.parentNode;
							parent.style['position'] = 'relative';
							tipbox = document.createElement('ul');
							tipbox.className = 'cp-validate-email-tipbox';
							cService.setStyle(tipbox, {
								display: 'none',
								position: 'absolute',
								'box-sizing': 'border-box',
								width: element.offsetWidth + 'px',
								'background-color': cService.GetCurrentStyle(element, 'background-color'),
								'border': cService.GetCurrentStyle(element, 'border'),
								'border-top': 'none',
								'z-index': 999
							});
							parent.appendChild(tipbox);
							elem.on('keyup', function(event) {
								var
									i = 0,
									html = '',
									rAt = /@[.\w]*$/;
								for (; i < emails.length; i++) {
									html += '<li><a>' + this.value.replace(rAt, '') + '@' + emails[i] + '.com</a></li>'
								}
								tipbox.innerHTML = html;
								showTipbox();
								angular.element(tipbox).find('a').on('click', function() {
									element.value = this.textContent ? this.textContent : this.innerText;
									showTipbox(false);
									ctrl.$setViewValue(element.value);
								});
							}).on('dblclick', function() {
								showTipbox();
							}).on('blur', function() {
								setTimeout(function() {
									showTipbox(false);
								}, 300);
							})

							function showTipbox(show) {
								tipbox.style.display = show || show == undefined ? 'block' : 'none';
							}

						}
					}
				};
			}]).directive('cpValidPassword', ['validService', function(validService) {
				// 密码校验
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						validService.password(scope, elem, attrs, ctrl)
					}
				};
			}]).directive('cpValidPhone', ['validService', function(validService) {
				// 手机号校验
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						validService.phone(scope, elem, attrs, ctrl);
						if (attrs.noRepeat != 'false') {
							validService.remotePhone(scope, elem, attrs, ctrl);
						}
					}
				};
			}]).directive('cpValidConfirm', [function() {
				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {

						var triggerValue;
						scope.$watch(attrs.cpValidConfirm, validator);

						function validator() {
							ctrl.$setValidity(attrs.confirmErrorType || "cp-valid-confirm", ctrl.$viewValue == scope.$eval(attrs.cpValidConfirm));
							return ctrl.$viewValue;
						}
						ctrl.$parsers.push(validator);
					}
				};
			}]).directive('cpValidMin', ['validService', function(validService) {
				return {
					restrict: 'A',
					require: 'ngModel',
					compile: function(tElement, tAttrs) {
						var
							watchName = tAttrs.cpValidMin.replace(/[{}]/g, '');
						return function(scope, elem, attrs, ctrl) {
							scope.$watch(watchName, function() {
								ctrl.$viewValue || ctrl.$viewValue == 0 && ctrl.$setViewValue(ctrl.$viewValue);
							});
							var
								validators = [],
								i = 0;

							validators.push(validService.validators.min(scope, elem, attrs, ctrl, {
								attrName: watchName
							}));
							validators.push(validService.validators.number(scope, elem, attrs, ctrl, {

							}));

							for (; i < validators.length; i++) {
								ctrl.$parsers.push(validators[i]);
								ctrl.$formatters.push(validators[i]);
							}

						}
					}
				};
			}]).directive('cpValidMax', ['validService', function(validService) {
				return {
					restrict: 'A',
					require: 'ngModel',
					compile: function(tElement, tAttrs) {
						var
							watchName = tAttrs.cpValidMax.replace(/[{}]/g, '');
						return function(scope, elem, attrs, ctrl) {
							scope.$watch(watchName, function() {
								ctrl.$viewValue || ctrl.$viewValue == 0 && ctrl.$setViewValue(ctrl.$viewValue);
							});
							var
								validators = [],
								i = 0;
							validators.push(validService.validators.max(scope, elem, attrs, ctrl, {
								attrName: watchName
							}));
							validators.push(validService.validators.number(scope, elem, attrs, ctrl, {

							}));

							for (; i < validators.length; i++) {
								ctrl.$parsers.push(validators[i]);
								ctrl.$formatters.push(validators[i]);
							}

						}
					}
				};
			}]).directive('cpValidInvestValue', ['validService', '$rootScope', function(validService, $rootScope) {

				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						var
							borrow,
							investMax,
							investMin,
							amountInvestable,
							useableBalanceAvailable,
							limitMax,
							errorType,
							forbidenEnter = false,
							permanentVal;

						if (attrs.forbidenEnter != false) {
							scope.$watch(ctrl.$name, function(newVal, oldVal) {
								if (errorType == 3 || errorType == 4) {
									if (!forbidenEnter) {
										forbidenEnter = true;
										permanentVal = newVal;
									} else {
										scope[ctrl.$name] = permanentVal;
									}
								} else {
									forbidenEnter = false;
								}
							});
						}

						scope.$watch(attrs.cpValidInvestValue, function(newVal, oldVal) {
							if (typeof newVal == 'object') {
								configValidator(newVal);
							}
						})
						ctrl.$parsers.push(validator);
						ctrl.$formatters.push(validator);

						function configValidator(obj) {

							borrow = obj;
							investMax = borrow.investMax;
							investMin = borrow.investMin;
							amountInvestable = borrow.amountInvestable;
							useableBalanceAvailable = borrow.useableBalanceAvailable;
							if (investMax == 0) {
								limitMax = Math.min(amountInvestable, useableBalanceAvailable)
							} else {
								limitMax = Math.min(amountInvestable, useableBalanceAvailable, investMax);
							}

							elem.attr('investMax', investMax);
							elem.attr('investMin', investMin);
							elem.attr('amountInvestable', amountInvestable);
							elem.attr('limitMax', limitMax);
						}
						function validator(value) {

							if (!$rootScope.user.id) return;
							errorType = 0;
							if ($rootScope.user.realNameStatus != 1) {
								errorType = 1; // realname
							} else if (!value || (value < investMin && (amountInvestable > borrow.investMin))) {
								errorType = 2; //min limit
							} else if (value > useableBalanceAvailable) {
								errorType = 4; // useable balance limit
							} else if (value > limitMax) {
								errorType = 3; //max limit

							}
							if($rootScope.user.realNameStatus == 3){
								errorType = 5;
							}
							ctrl.$setValidity('cp-valid-invest-value', !errorType);
							elem.attr('errorType', errorType);
							return value;
						};
						//todo:仅用于doDirectives.js(余额不足的情况)，待后期优化
						scope.validator = function(value) {

							if (!$rootScope.user.id) return;
							errorType = 0;
							if ($rootScope.user.realNameStatus != 1) {
								errorType = 1; // realname
							} else if (value > useableBalanceAvailable) {
								errorType = 4; // useable balance limit
							}
							if($rootScope.user.realNameStatus == 3){
								errorType = 5;
							}
							ctrl.$setValidity('cp-valid-invest-value', !errorType);
							elem.attr('errorType', errorType);
							return value;
						};

					}
				}
			}]).directive('cpValidInvestBondValue', ['validService', '$rootScope', function(validService, $rootScope) {

				return {
					restrict: 'A',
					require: 'ngModel',
					link: function(scope, elem, attrs, ctrl) {
						var
							bond,
							balanceAvailable,
							errorType;

						scope.$watch(attrs.cpValidInvestBondValue, function(newVal, oldVal) {
							if (typeof newVal == 'object') {
								configValidator(newVal);
							}
						})
						ctrl.$parsers.push(validator);
						ctrl.$formatters.push(validator);

						function configValidator(obj) {

							bond = obj;
							bond.account&&bond.account.balanceAvailable?balanceAvailable = bond.account.balanceAvailable:0;
						}

						function validator(value) {

							if (!$rootScope.user.id) return;
							errorType = 0;
							if ($rootScope.user.realNameStatus != 1) {
								errorType = 1; // realname
							} else if (value > balanceAvailable) {
								errorType = 4; // balance available limit
							}
							if($rootScope.user.realNameStatus == 3){
								// console.log(111111111111111);
								errorType = 5;
							}
							ctrl.$setValidity('cp-valid-invest-bond-value', !errorType);
							elem.attr('errorType', errorType);
							return value;
						};

					}
				}
			}])

	}
)