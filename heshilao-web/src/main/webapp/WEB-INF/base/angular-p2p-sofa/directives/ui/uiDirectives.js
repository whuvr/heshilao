define(
	[
		'angular',
		'p2pSofa/services/ui/uiService',
		'p2pSofa/services/common/commonService'
	],
	function(angular) {
		mod_directives
		/**
		 * [description]
		 * @param
		 * @return {[type]} [description]
		 * 这个指令从没被使用
		 */
			.directive('cpUiSwitch', ['uiService', function(uiService) {
			return {
				link: function(scope, elem, attrs) {
					var
						watches = attrs.watches;

					if (watches) {
						scope.$watch(watches, function(newVal, oldVal) {
							if (newVal) {
								setTimeout(function() {
									build();
									scope.$apply();
								}, 0);
							}
						})
					} else {
						build();
					}

					function build() {
						uiService.switchTo(scope, elem, attrs, {
							$switches: elem.children()
						});
					}

				}
			};

		}]).directive('cpUiTab', ['uiService', '$parse', function(uiService, $parse) {
			return {
				link: function(scope, elem, attrs) {
					var
						watches = attrs.watches,
						$watches = scope.$eval(watches),
						watchName,
						i = 0;

					function build() {
						var
							$navs = elem.children().eq(0).find('a'),
							$views = elem.children().eq(1).children();
						uiService.switchTo(scope, elem, attrs, {
							$switches: $navs,
							switchAction: function(scope, args) {
								$views.css('display', 'none');
								$views[args.index] && ($views[args.index].style.display = 'block');
								$parse(attrs.switchAction)(scope, args);
							}
						});
					}

					if (watches) {
						$watches = $watches.split(',');
						for (i; i < $watches.length; i++) {
							watchName = $watches[i];
							scope.$watch(watchName, function(newVal, oldVal) {
								build();
							})
						}
					} else {
						build();
					}

				}
			};

		}]).directive('cpUiOperateDiscountRate', ['uiService', '$rootScope', function(uiService, $rootScope) {
			return {
				link: function(scope, elem, attrs) {
					elem.on('click', function() {
						var
							bondConfig = $rootScope._bondConfig,
							plus = scope.$eval(attrs.cpUiOperateDiscountRate),
							bPlus = plus == true,
							DISCOUNTRATE_STEP = 0.1,
							result,
							discountRateMin = bondConfig.discountRateMin;
						discountRateMax = bondConfig.discountRateMax,
							discountRate = $rootScope._discountRate;


						result = plus ? (discountRate + DISCOUNTRATE_STEP).toFixed(2) : (discountRate - DISCOUNTRATE_STEP).toFixed(2);
						result = parseFloat(result);

						if (plus && result <= discountRateMax) {
							$rootScope._discountRate = result;
						} else if (!plus && result >= discountRateMin) {
							$rootScope._discountRate = result;
						}
						scope.$apply();
					})
				}
			};

		}]).directive('cpUiFly', ['uiService', 'commonService', '$interval', function(uiService, cService, $interval) {
			// 例：
			// <ul
			//  cp-ui-fly
			//  items="dataPartner"
			//  item-tag="li"
			//  move-name="left"
			//  delay-time="3000"
			//  move-time="2000"
			//  triggers="false"
			//  triggers-class="ol1"
			//  class="clearfix">
			// 	<li
			// 	 ng-repeat="item in dataPartner"
			// 	 rd-fly-item>
			// 		<a ng-href="{{item.url}}" target="_blank"><img ng-src="{{'data:image/png;base64,' + item.image}}" /></a>
			// 	</li>
			// </ul>
			function setScopeValues(scope, attrs) {
				scope.moveTime = scope.moveTime || 1000;
				scope.delayTime = scope.delayTime || 3000;
				scope.moveName = scope.moveName == undefined ? 'top' : scope.moveName;
				scope.itemTag = scope.itemTag || 'li';
			}


			function fly(scope, elm, attrs) {
				var
					$items = [],
					itemsLength,
					$triggers = angular.element('<ul class="' + scope.triggersClass + '"></ul>'),
					$trigger,
					count, //move count
					itemWith,
					curIndex = 0,
					i = 0,
					rReverse = false,
					rVertical = scope.moveName == 'top' || scope.moveName == 'bottom',
					rHorizontal = scope.moveName == 'left' || scope.moveName == 'right',
					rOpacity = scope.moveName == 'opacity';

				elm.css('position', 'relative');

				// 生成控制条
				angular.forEach(elm.find(scope.itemTag), function(item, i) {
					item = angular.element(item);
					if (item.attr('rd-fly-item') != undefined) {
						$items.push(item);
						if (scope.$eval(scope.triggers)) {
							$trigger = angular.element('<li></li>').on('mouseenter', function() {
								$interval.cancel(scope.timer);
								targetIndex = cService.getIndex(this, $triggers.children());
								moveTo(targetIndex);
							}).on('mouseleave', function() {
								autoMove();
							})
							$triggers.append($trigger);
							$triggers.children().length == 1 && $trigger.addClass('active');
						}
					}

				});

				// 生成控制按钮
				if (scope.$eval(scope.triggerBtn)) {
					$triggerBtnPrev = angular.element('<button class="prev"></button>').on('click', function() {
						$interval.cancel(scope.timer);
						targetIndex = curIndex - 1;
						moveTo(targetIndex);
					}).on('mouseleave', function() {
						autoMove();
					});
					$triggerBtnNext = angular.element('<button class="next"></button>').on('click', function() {
						$interval.cancel(scope.timer);
						targetIndex = curIndex + 1;
						moveTo(targetIndex);
					}).on('mouseleave', function() {
						autoMove();
					});
					$triggerBtn.append($triggerBtnPrev);
					$triggerBtn.append($triggerBtnNext);
					elm.parent().parent().append($triggerBtn);
				}

				itemsLength = $items.length;
				if (itemsLength <= 1) return;

				//水平滚动时，把ul宽度设置成rd-fly-item的宽度之和
				if (rHorizontal) {
					itemWith = $items[0][0].offsetWidth + 1;
					elm.css('width', itemWith * itemsLength + 'px');
					// 2016-5-16 14:51:52 wyk@erongdu.com  注释掉下面的
					// 这个应该没有针对banner做适配，
					// 首页banner还是需要使用rd-fly
					// angular.forEach($items, function(item, i) {
					// 	item.css('width', itemWith + 'px');
					// });
				}

				//滚动控制条
				if (scope.$eval(scope.triggers) && itemsLength > 1) {
					elm.parent().append($triggers);
					$triggers.css('margin-left', -$triggers[0].offsetWidth / 2 + 'px')
				}

				function moveTo(index) {
					var
						$triggersArray = $triggers.children();

					count = scope.moveDistance;
					rVertical && (count = $items[0][0].offsetHeight);
					rHorizontal && (count = $items[0][0].offsetWidth);
					uiService.animate(elm[0], scope.moveName, -count * index, scope.moveTime, function() {
						curIndex = index;
					});
					$triggersArray.removeClass('active');
					$triggersArray.eq(index).addClass('active');


				}

				function autoMove() {

					$interval.cancel(scope.timer);
					scope.timer = $interval(function() {
						if (scope.triggers) {
							if ((curIndex == 0 && rReverse) || (curIndex == $items.length - 1 && !rReverse)) {
								rReverse = !rReverse;
							}
							moveTo(rReverse ? --curIndex : ++curIndex);
						} else {
							count = scope.moveDistance;
							rVertical && (count = $items[0][0].offsetHeight);
							rHorizontal && (count = $items[0][0].offsetWidth);
							uiService.animate(elm[0], scope.moveName, -count, scope.moveTime, function() {
								$items[0].parent().append($items[0]);
								elm.css(scope.moveName, '0px');
								$items.push($items.shift());
							});
						}
					}, scope.delayTime)
				}
				//wait the css render thread
				setTimeout(function() {
					if ((rVertical && elm[0].offsetHeight > elm.parent()[0].offsetHeight) || (rHorizontal && elm[0].offsetWidth > elm.parent()[0].offsetWidth)) {
						autoMove();
						elm.on('mouseenter', function() {
							$interval.cancel(scope.timer);
						}).on('mouseleave', function() {
							autoMove();
						});
					}
				}, 100);
			}

			function build(scope, elm, attrs) {
				setScopeValues(scope, attrs);
				fly(scope, elm, attrs);
			}
			return {
				scope: {
					moveTime: '@',
					delayTime: '@',
					moveName: '@', //滚动方向
					items: '=', //监听数据变化
					itemTag: '@', //滚动的元素
					triggers: '@', //true/false，是否显示控制条
					triggersClass: '@', //滚动控制条的类名
					moveDistance: '='
				},
				link: function(scope, elm, attrs) {

					scope.$watch('items', function(newVal, oldVal) {
						if (newVal != oldVal) {
							build(scope, elm, attrs);
						}
					});

					scope.$on('$destroy', function() {
						$interval.cancel(scope.timer);
					});


				}
			}

		}]).directive('cpUiFlyStatic', ['uiService', 'commonService', '$interval', function(uiService, cService, $interval) {
			// 例：
			// <ul
			//  cp-ui-fly-static
			//  item-tag="li"
			//  move-name="left"
			//  delay-time="3000"
			//  move-time="2000"
			//  triggers="false"
			//  triggers-class="ol1"
			//  trigger-btn="true"
			//  class="clearfix">
			// 	<li rd-fly-item></li>
			// </ul>
			var n = 0;

			function setScopeValues(scope, attrs) {
				scope.moveTime = scope.moveTime || 1000;
				scope.delayTime = scope.delayTime || 3000;
				scope.moveName = scope.moveName == undefined ? 'top' : scope.moveName;
				scope.itemTag = scope.itemTag || 'li';
			}


			function fly(scope, elm, attrs) {
				var
					$items = [],
					itemsLength,
					$triggers = angular.element('<ul class="' + scope.triggersClass + '"></ul>'),
					$triggerBtn = angular.element('<div class="cp-ui-fly-btn"></div>'),
					$trigger,
					count, //move count
					itemWith,
					curIndex = 0,
					i = 0,
					rReverse = false,
					clockWise = 'CW', //顺时针 CW，逆时针 CCW
					reverseLoop = false, //循环，true到第一个，false到最后一个
					rVertical = scope.moveName == 'top' || scope.moveName == 'bottom',
					rHorizontal = scope.moveName == 'left' || scope.moveName == 'right',
					rOpacity = scope.moveName == 'opacity';

				elm.css('position', 'relative');

				// 生成控制条
				angular.forEach(elm.find(scope.itemTag), function(item, i) {
					item = angular.element(item);
					if (item.attr('rd-fly-item') != undefined) {
						$items.push(item);
						if (scope.$eval(scope.triggers)) {
							$trigger = angular.element('<li class="li' + (i + 1) + '"></li>').on('mouseenter', function() {
								$interval.cancel(scope.timer);
								targetIndex = cService.getIndex(this, $triggers.children());
								moveTo(targetIndex);
							}).on('mouseleave', function() {
								autoMove();
							})
							$triggers.append($trigger);
							$triggers.children().length == 1 && $trigger.addClass('active');
						}
					}

				});

				// 生成控制按钮
				if (scope.$eval(scope.triggerBtn)) {
					$triggerBtnPrev = angular.element('<button class="prev"></button>').on('click', function() {
						$interval.cancel(scope.timer);
						targetIndex = curIndex - 1;
						moveTo(targetIndex);
					}).on('mouseleave', function() {
						autoMove();
					});
					$triggerBtnNext = angular.element('<button class="next"></button>').on('click', function() {
						$interval.cancel(scope.timer);
						targetIndex = curIndex + 1;
						moveTo(targetIndex);
					}).on('mouseleave', function() {
						autoMove();
					});
					$triggerBtn.append($triggerBtnPrev);
					$triggerBtn.append($triggerBtnNext);
					elm.parent().parent().append($triggerBtn);
				}

				itemsLength = $items.length;
				if (itemsLength <= 1) return;

				//水平滚动时，把ul宽度设置成rd-fly-item的宽度之和
				if (rHorizontal) {
					itemWith = $items[0][0].offsetWidth + 1;
					elm.css('width', itemWith * itemsLength + 'px');
				}

				//滚动控制条
				if (scope.$eval(scope.triggers) && itemsLength > 1) {
					elm.parent().parent().append($triggers);
				}

				function moveTo(index) {
					var
						$triggersArray = $triggers.children();

					count = scope.moveDistance;
					rVertical && (count = $items[0][0].offsetHeight);
					rHorizontal && (count = $items[0][0].offsetWidth);

					if (index < 0) {
						index = itemsLength - 1;
					} else if (index >= itemsLength) {
						index = 0
					};
					// 循环判断：从第一个到最后一个false 或者 从最后一个到第一个为true
					// 即 顺时针 false，逆时针 true
					if ((curIndex == 0 && index == $items.length - 1 && reverseLoop) || (curIndex == $items.length - 1 && index == 0 && !reverseLoop)) {
						reverseLoop = !reverseLoop;
						clockWise = reverseLoop ? 'CCW' : 'CW';
					}
					uiService.animate(elm[0], scope.moveName, -count * index, scope.moveTime, function() {
						curIndex = index;
					}, curIndex, clockWise);
					$triggersArray.removeClass('active');
					$triggersArray.eq(index).addClass('active');
				}

				function autoMove() {
					// 判断当前索引值
					var x = 0;

					$interval.cancel(scope.timer);
					scope.timer = $interval(function() {
						if (x < itemsLength - 1) {
							x += 1;
						} else {
							x = 0;
						};
						if (scope.$eval(scope.triggers)) {
							if ((curIndex == 0 && rReverse) || (curIndex == $items.length - 1 && !rReverse)) {
								rReverse = !rReverse;
							}
							moveTo(rReverse ? --curIndex : ++curIndex);
						} else {
							count = scope.moveDistance;
							rVertical && (count = $items[0][0].offsetHeight);
							rHorizontal && (count = $items[0][0].offsetWidth);
							uiService.animate(elm[0], scope.moveName, -count * x, scope.moveTime, function() {
								curIndex = x ? x : 1;
							});
						}
					}, scope.delayTime)
				}
				//wait the css render thread
				setTimeout(function() {
					if ((rVertical && elm[0].offsetHeight > elm.parent()[0].offsetHeight) || (rHorizontal && elm[0].offsetWidth > elm.parent()[0].offsetWidth)) {
						autoMove();
						elm.on('mouseenter', function() {
							$interval.cancel(scope.timer);
						}).on('mouseleave', function() {
							autoMove();
						});
					}
				}, 100);
			}

			function build(scope, elm, attrs) {
				setScopeValues(scope, attrs);
				fly(scope, elm, attrs);
			}
			return {
				scope: {
					moveTime: '@',
					delayTime: '@',
					moveName: '@', //滚动方向
					itemTag: '@', //滚动的元素
					triggers: '@', //true/false，是否显示控制条
					triggersClass: '@', //滚动控制条的类名
					triggerBtn: '@', //true/false，按钮是否显示
					moveDistance: '='
				},
				link: function(scope, elm, attrs) {

					build(scope, elm, attrs);

					scope.$on('$destroy', function() {
						$interval.cancel(scope.timer);
					});


				}
			}

		}]).directive('cpUiSedate', ['uiService', function(uiService) {
			//账户中心 时间查询
			return {
				link: function(scope, elem, attrs) {
					var
						varName = attrs.varName || '',
						$input = elem.find('input'),
						tuples = ['startTime', 'endTime'],
						name;
					angular.forEach(tuples, function(value, i) {
						$input.eq(i).on('blur', function() {
							name = varName ? varName + tuples[i].replace(/^[w]/, function(letter) {
								return letter.toUpperCase();
							}) : tuples[i]
							scope[name] = this.value;
						});
					})
				}
			};

		}]).directive('cpUiKnob', ['commonService', function(cService) {
			return {
				link: function(scope, elem, attrs) {
					var
						r = 70,
						w = attrs.r || r,
						h = attrs.r || r,
						canvas,
						bgcolor = attrs.bgcolor || '#eaeaea',
						color = attrs.color || '#58bf8b',
						lineWidth = attrs.lineWidth || 4,
						el = document.createElement('canvas');
					el.setAttribute('width', w);
					el.setAttribute('height', h);
					if (cService.isIE8()) {
						if (!G_vmlCanvasManager) return;
						G_vmlCanvasManager.initElement(el);
					}
					elem.prepend(el);

					canvas = el.getContext('2d');

					scope.$watch(attrs.cpUiKnob, function(newVal, oldVal) {

							draw(scope.$eval(attrs.cpUiKnob));

						})
						//if element's parents  use rd-show derective or some like to display and hide,
						//draw should be recalled or the percentage circle will not display
					if (attrs.rdShow) {
						scope.$watch(attrs.rdShow, function() {
							draw(scope.$eval(attrs.cpUiKnob));
						})
					}

					function draw(degrees) {
						!degrees && (degrees = 0);
						var radians = degrees * Math.PI / 50; //degrees which means process percent from 0 to 100
						canvas.clearRect(0, 0, w, h);
						//Background 360 degree arc
						canvas.beginPath();
						canvas.strokeStyle = bgcolor;
						canvas.lineWidth = lineWidth; //预填充环的宽度
						canvas.arc(w / 2, h / 2, w / 2 - canvas.lineWidth, 0, Math.PI * 2, false);
						canvas.stroke();

						if (radians != 0) {
							canvas.beginPath();
							canvas.strokeStyle = color;
							canvas.lineWidth = lineWidth;
							canvas.arc(w / 2, h / 2, w / 2 - canvas.lineWidth, 0, radians, false);
							canvas.stroke();
						}

					}
				}
			};

		}]).directive('cpUiImagePreview', ['uiService', function(uiService) {
			function build(scope, elm, attrs) {
				var
					src = scope.src, //image source
					$container,
					$body,
					$mask,
					$prev, //previous button
					$next, // next button
					$images,
					imageWidth = parseInt(scope.imageWidth) ? scope.imageWidth : 1600,
					imageHeight = parseInt(scope.imageHeight) ? scope.imageHeight : 1200;

				$images = elm.find('img');

				function clear() {
					if ($mask) {
						$box.remove();
						$mask.remove();
						$container.remove();
						$mask = null;
					}
				}

				function showItem(item, index, $routeParams) {
					var documnetH = document.documentElement.offsetHeight;
					var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;

					$body = angular.element(document.body);
					$box = angular.element('<div class="rd-image-preview-box"></div>');
					$container = angular.element('<div class="rd-image-preview-conta"><img id="abc" src="' + item.attr('src').replace(/w\/[\d]+\/h\/[\d]+|w\/[\d]+$/, '') + '" /><div class="close_btn" id="close_btn">X</div></div>');
					$mask = angular.element('<div class="rd-mask"></div>').off('click').on('click', function() {
						clear();
					});

					$box.css({
						'display': 'block',
						'top': scrollTop + 50 + 'px'
					});
					$mask.css({
						'height': documnetH + 'px',
						'display': 'block'
					});
					$prev = angular.element('<a class="prev-btn"></a>').on('click', function() {
						if (index > 0) {
							clear();
							showItem(angular.element($images[index - 1]), index - 1);
						}
					});
					$next = angular.element('<a class="next-btn"></a>').on('click', function() {
						if (index < $images.length - 1) {
							clear();
							showItem(angular.element($images[index + 1]), index + 1);
						}
					});
					index > 0 && $container.append($prev);
					index < $images.length - 1 && $container.append($next);
					$body.append($mask);
					$box.append($container);
					$body.append($box);

					angular.element(document.getElementById('close_btn')).off('click').on('click', function() {
						clear();
					});
				}
				angular.forEach($images, function(item, i) {
					item = angular.element(item);
					item.off('click').on('click', function() {
						showItem(item, i);
					})
				})
			}
			return {
				scope: {
					images: '=cpUiImagePreview',
					imageWidth: '@',
					imageHeight: '@'
				},
				link: function(scope, elm, attrs) {
					scope.$watch('images', function(newVal, oldVal) {

						build(scope, elm, attrs);

					})
				}
			}

		}]).directive('cpUiFixed', ['commonService', function(cService) {
			return {
				scope: {},
				link: function(scope, elm, attrs) {
					var
						scrollTop,
						abs,
						a_top,
						a_left,
						a_width,
						e_left = cService.GetCurrentStyle(elm[0], 'left'),
						e_width = cService.GetCurrentStyle(elm[0], 'width'),
						rFixed = false;

					function build(resetPosition) {
						resetPosition && reset();
						scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
						abs = cService.getElementAbsPos(elm[0]);
						a_top = abs.top;
						a_left = abs.left;
						a_width = elm[0].offsetWidth;
						if (scrollTop > a_top) {

							if (!rFixed) {
								elm.addClass('rd-fixed').css({
									left: a_left + 'px',
									width: a_width + 'px',
									top: '0px'
								});
								rFixed = true;
							}
						} else {
							if (rFixed) {
								reset();
							}
						}

						function reset() {
							elm.removeClass('rd-fixed');
							elm[0].style.left = null;
							elm[0].style.width = null;
							rFixed = false;
						}
					}

					function resize() {
						build(true);
					}
					angular.element(window).on('scroll', build);
					angular.element(window).on('resize', resize);
					scope.$on('$destroy', function() {
						angular.element(window).off('scroll', build);
						angular.element(window).off('resize', resize);
					})
				}
			}

		}]).directive('cpUiLimitDecimal', [function() {
			// 限制小数点位数
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					var
						name = ctrl.$name,
						count = scope.$eval(attrs.cpUiLimitDecimal),
						rNumber = new RegExp('^[\\d]+\\.?[\\d]*$')
					rErrorDecimal = new RegExp('[\\d]+\\.[\\d]{' + (count + 1) + ',}'),
						okReg = new RegExp('[\\d]+\\.?[\\d]{' + count + ',' + count + '}');
					scope.$watch(name, function(curVal, prevVal) {
						if (curVal && typeof curVal == 'string') {
							!curVal.match(rNumber) && (scope[name] = prevVal);
							curVal.match(rErrorDecimal) && (scope[name] = curVal.match(okReg)[0]);
						}
					})
				}
			}
		}]).directive('cpUiP2pArea', ['$http', function($http) {
			return {
				scope: {
					jsonUrl: '@jsonUrl',
					p2pProvince: '=p2pProvince',
					p2pCity: '=p2pCity'
				},
				restrict: 'A',
				template: '<select ng-change="setCity()" class="form-control select1" name="province" ng-model="selected" ng-disabled="opProvinceDis" ng-options="list.p for list in areas track by list.p"></select><select id="city" name="city" class="form-control select2" ng-disabled="opCityDis" ng-model="selected1" ng-options="list.n for list in selected.c track by list.n"></select>',
				link: function($scope, $element, $attrs) {
					$http({
						url: $scope.jsonUrl,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'x-requested-with': 'XMLHttpRequest'
						}
					}).success(function(data, status, headers, config) {
						$scope.areas = data.citylist;
						$scope.selected = $scope.areas[0];
						$scope.selected1 = $scope.selected.c[0];
						$scope.setCity = function() {
							$scope.selected1 = $scope.selected.c[0];
						}
					})
					$scope.$watch("selected1", function(newValue, oldValue) {
						if (newValue) {
							$scope.p2pProvince = $scope.selected.p;
							$scope.p2pCity = $scope.selected1.n;
						}
					})
				}
			}
		}]).directive('cpUiMax', [function() {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					var
						max,
						name = attrs.cpUiMax;
					if (parseInt(name) == 'number') {
						max = parseInt(name);
					} else {
						scope.$watch(name, function(newVal, oldVal) {
							max = newVal;
						})
					}
					scope.$watch(ctrl.$name, function(newVal, oldVal) {
						if (newVal > max) {
							scope[ctrl.$name] = oldVal;
						}
					});

				}
			};
		}])
	}
)