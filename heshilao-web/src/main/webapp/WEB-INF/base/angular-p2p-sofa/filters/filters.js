define(
	[
		'angular'
	],
	function(angular) {
		mod_filters.filter('cpFilterTrim', [function() {
			var
				rLeftSpace = /^[\s]*/,
				rRightSpace = /[\s]$/,
				rBothSpace = /^[\s]*|[\s]*$/,
				rAllSpace = /[\s]/g,
				regReplace;
			return function(text) {
				if (arguments.length > 1) {
					arguments[1] == 'left' && (regReplace = rLeftSpace);
					arguments[1] == 'right' && (regReplace = rRightSpace);
					arguments[1] == 'both' && (regReplace = rBothSpace);
					arguments[1] == 'all' && (regReplace = rAllSpace);
				}

				return regReplace ? text.replace(regReplace, '') : text;
			};

		}]).factory('nullModifier', [
			function() {
				var

					makeValid = function(el) {

					},
					makeInvalid = function(el, errorMsg) {

						var
							investMax = parseFloat(el.attr('investMax')),
							investMin = parseFloat(el.attr('investMin')),
							amountInvestable = parseFloat(el.attr('amountInvestable')),
							limitMax = parseFloat(el.attr('limitMax')),
							errorType = parseFloat(el.attr('errorType'));
						printError(errorType);

						function printError(errorType) {
							var
								msg = '';
							switch (errorType) {
								case 1:
									msg = '您还未实名认证，<a href="#/account/payAccount" class="recharge">点击实名认证</a>'
									break;
								case 2:
									msg = '投资金额不能小于最小投资额' + investMin + '元';
									break;
								case 3:
									msg = '投资金额需在' + investMin + '~' + limitMax + '元范围内';
									break;
								case 4:
									msg = '余额不足，<a href="#/account/recharge" class="recharge">请充值</a>';

									break;
								case 5:
									msg = '您还未授权，<a href="#/account/payAccount" class="recharge">点击去授权</a>';
									break;
							}
							removeError(el);
							optFormGroupErrorClass(el, false);
							if (errorType) {
								addError(el, msg);
								optFormGroupErrorClass(el);
							}

						}
					},
					makeDefault = function(el) {
						removeError(el);
						optFormGroupErrorClass(el, false);
					};

				function addError(elem, msg) {
					var $errorMsg = angular.element('<s class="has-error error-msg">' + msg + '</s>');
					elem.parent().append($errorMsg);
				}

				function removeError(elem) {
					var
						sibling = elem[0];
					while (sibling = sibling.nextSibling) {
						if (typeof sibling.className == 'string' && sibling.nodeName.toLowerCase() == 's' && sibling.className.indexOf('has-error') >= 0) {
							sibling.parentNode.removeChild(sibling);
						}
					}
				}

				function optFormGroupErrorClass(elem, add) {
					var
						$formGroup = elem;
					while (($formGroup = $formGroup.parent()).length) {
						if ($formGroup.hasClass('form-group')) {
							add != false ? $formGroup.addClass('has-error') : $formGroup.removeClass('has-error');
						}
					}
				}


				return {
					makeValid: makeValid,
					makeInvalid: makeInvalid,
					makeDefault: makeDefault,
					key: 'nullModifier'
				};
			}
		]).filter('cpFilterHtml', ['$sce', function($sce) {
			return function(text) {
				return $sce.trustAsHtml(text);
			};
		}]).filter('cpFilterResource', ['$sce', function($sce) {
			return function(src) {
				return $sce.trustAsResourceUrl(src);
			};
		}]).filter('trimAnyThing', [function() {
			// wyk@erongdu.com
			// regx必须是正则格式，如“ \{#+\} ”
			return function(input, regx) {
				if (input) {
					var
						output,
						regx = eval('/' + regx + '/g');
					output = input.replace(regx, '')
					return output;
				}
			};
		}]);
	}
)