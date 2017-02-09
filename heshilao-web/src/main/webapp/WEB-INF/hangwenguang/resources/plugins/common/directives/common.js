define([
	'angular',
	'jsCommon/configs/G'
], function(angular) {
	return function(app) {
		app.directive('rdFixed', ['G', function(G) {

			return {
				scope: {},
				link: function(scope, elm, attrs) {
					var
						scrollTop,
						abs = G.getElementAbsPos(elm[0]),
						a_top = abs.top,
						a_left = abs.left,
						a_width = elm[0].offsetWidth,
						e_left = G.GetCurrentStyle(elm[0], 'left'),
						e_width = G.GetCurrentStyle(elm[0], 'width'),
						rFixed = false;

					function build() {
						scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
						if (scrollTop > a_top) {
							if (!rFixed) {
								elm.addClass('rd-fixed').css({
									left: a_left + 'px',
									width: a_width + 'px'
								});
								rFixed = true;
							}
						} else {
							if (rFixed) {
								elm.removeClass('rd-fixed').css({
									left: e_left,
									width: e_width
								});
								elm[0].style.left = null;
								elm[0].style.width = null;
								rFixed = false;
							}
						}
					}
					angular.element(window).on('scroll', build);
					scope.$on('$destroy', function() {
						angular.element(window).off('scroll', build);
					})
				}
			}
		}]).directive('limitDecimal', [function() {

			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					var
						name = ctrl.$name,
						count = scope.$eval(attrs.limitDecimal),
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
		}]).directive('rdFly', ['rdAnimate', '$interval', 'G', '$window', function(rdAnimate, $interval, G, $window) {

			function setScopeValues(scope, attrs) {
				scope.moveTime = scope.moveTime || 1000;
				scope.delayTime = scope.delayTime || 3000;
				scope.moveName = scope.moveName == undefined ? 'top' : scope.moveName;
				scope.itemTag = scope.itemTag || 'li';
			}


			function fly(scope, elm, attrs) {
				var
					$items = [],
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


				angular.forEach(elm.find(scope.itemTag), function(item, i) {
					item = angular.element(item);
					if (item.attr('rd-fly-item') != undefined) {
						$items.push(item);
						if (scope.triggers) {
							$trigger = angular.element('<li></li>').on('mouseenter', function() {
								$interval.cancel(scope.timer);
								targetIndex = G.index(this, $triggers.children());
								moveTo(targetIndex);

							}).on('mouseleave', function() {
								autoMove();
							})
							$triggers.append($trigger);
							$triggers.children().length == 1 && $trigger.addClass('active');
						}
					}

				});



				if ($items.length <= 1) return;


				//IF is moved in the horizontal direction,set the elm's with be total of  rd-fly-item's width


				if (rHorizontal) {
					itemWith = $items[0][0].offsetWidth;
					elm.css('width', 100 * $items.length + '%');
					angular.forEach($items, function(item, i) {
						item.css('width', 100 / $items.length + '%');
					});
				}

				if (scope.triggers && $items.length > 1) {
					elm.parent().append($triggers); //triggers
					$triggers.css('margin-left', -$triggers[0].offsetWidth / 2 + 'px')
				}

				function moveTo(index) {
					var
						$triggersArray = $triggers.children();
					count = scope.moveDistance;
					rVertical && (count = $items[0][0].offsetHeight);
					rHorizontal && (count = $items[0][0].offsetWidth);
					rdAnimate(elm[0], scope.moveName, -count * index, scope.moveTime, function() {
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
							rdAnimate(elm[0], scope.moveName, -count, scope.moveTime, function() {
								$items[0].parent().append($items[0]);
								elm.css(scope.moveName, '0px');
								$items.push($items.shift());
							});
						}
					}, scope.delayTime)
				}
				//wait the css render thread 
				setTimeout(function() {
					if ((rVertical && elm[0].offsetHeight > elm.parent()[0].offsetHeight) || (rHorizontal && $items.length > 1)) {
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
					moveName: '@',
					items: '=',
					itemTag: '@',
					triggers: '@',
					triggersClass: '@',
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
		}]).directive('multiLineTextOverflow', [function() {
			function build(scope, elm, attrs) {
				var
					oriText = scope.text,
					subText,
					$textContainer,
					$open,
					rOpen = false,
					count = scope.$eval(attrs.multiLineTextOverflow);
				if (!oriText) return;
				if (count < oriText.length) {
					elm.html('');
					subText = oriText.substr(0, count) + '...';
					$textContainer = angular.element('<span>' + subText + '</span>');
					$open = angular.element('<a>[展开]</a>').on('click', function() {
						rOpen = !rOpen;
						if (rOpen) {
							$open.text('[收缩]');
							$textContainer.text(oriText);
						} else {
							$open.text('[展开]');
							$textContainer.text(subText);
						}
					});
					elm.append($textContainer);
					elm.append($open);
				} else {
					elm.text(oriText);
				}
			}
			return {
				scope: {
					text: '='
				},
				link: function(scope, elm, attrs) {
					scope.$watch('text', function() {
						build(scope, elm, attrs)
					});
				}
			}

		}]).directive('countdown', ['$interval', function($interval) {
			return {
				link: function(scope, elm, attrs) {
					var count;

					function clock(value) {

						var d = parseInt(value / (3600 * 24));
						value = parseInt(value % (3600 * 24));
						var h = parseInt(value / 3600);
						value = parseInt(value % 3600);
						var m = parseInt(value / 60);
						var s = value % 60;
						elm.html(d + ' 天 ' + h + ' 时 ' + m + ' 分 ' + s + ' 秒 ');


					};
					var $promise;
					scope.$watch(attrs.countdown, function() {
						count = scope.$eval(attrs.countdown);
						clock(count); //
						if (count > 0) {
							$promise = $interval(function() {
								count--;
								if (count >= 0) {
									clock(count);
								}

								if (!count) {
									$interval.cancel($promise);
									$promise = undefined;
									try {
										scope.$eval(attrs.countdown + '=0');
									} catch (e) {

									}
								}

							}, 1000);
						}
					})

					scope.$on('$destroy', function() {

						$interval.cancel($promise);
						$promise = undefined;

					});
				}
			}

		}]).directive('iePlaceholder', ['G', function(G) {
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs, ctrl) {
					var
						placeholder = attrs.iePlaceholder,
						bShow = true,
						$placeholder,
						text = ctrl.$viewValue || elm.val();

					//elm.wrap('<div></div>')
					/*elm.parent().css({
						position: 'relative',
						display: 'inline-block',
						verticalAlign: 'middle'						
					});*/
					elm.parent().css({
						position: 'relative'
					});
					$placeholder = angular.element(document.createElement("input"));
					$placeholder.val(placeholder).css({
						color: '#999',
						display: 'none'
					});
					$placeholder.attr('class', elm.attr('class'));
					$placeholder.attr('type', 'text');
					elm.parent().prepend($placeholder);
					var height = G.GetCurrentStyle(elm[0], 'height');
					var borderColor = G.GetCurrentStyle(elm[0], 'border-left-color');
					var position = G.GetCurrentStyle(elm[0], 'position');
					var zIndex = G.GetCurrentStyle(elm[0], 'zIndex');
					if (!zIndex || zIndex < 0) {
						zIndex = 0;
					}

					function showElm() {

						/*elm.css({
							height: height,
							'border-color': borderColor,
							position: position,
							'z-index': zIndex
						})*/
						G.removeInlineStyle(elm[0], ['height', 'border-color', 'position', 'z-index']);
						$placeholder.css('display', 'none');
						elm[0].focus();
					}

					function hideElm() {
						elm.css({
							height: '0px',
							'border-color': 'transparent',
							position: 'absolute',
							'z-index': -1
						});
						$placeholder.css('display', '');
						elm[0].blur();
					}

					elm.on('blur', function(e) {
						if (!elm.val()) {
							hideElm();
						}
					});
					$placeholder.on('focus', function() {
						elm.attr('readonly', false);
						showElm();

					});
					scope.$watch(ctrl.$name, function() {
						if (ctrl.$viewValue) {
							showElm();
						} else {
							hideElm();
						}
					})
				}
			}
		}]).directive('rdSelect', ['$compile', 'G', '$templateCache', function($compile, g, $templateCache) {
			function setScopeValues(scope, elm, attrs) {

				scope.optionHandler = function(e) {
					var _this = angular.element(e.target);
					var text = _this.text();
					var index = g.getIndex(_this.parent()[0]);
					elm[0].selectedIndex = index;
					scope.$display.html(text);
					scope.$content.css('display', 'none');
				}
				attrs.textField = attrs.textField || 'text';
			}

			function build(scope, elm, attrs) {
				scope.$content.html('');
				if (attrs.templateDiv) { //if exits the templateCache,create the templateCache,or create the options
					var $template = angular.element($templateCache.get(attrs.templateDiv)).addClass('template-div');
					scope.$content.append($compile($template)(scope.$parent)).css({
						overflow: 'visible',
						border: 'none'
					});
				} else {
					var ul = '<ul>';
					//static options. note do not to use ng-repeat create the option becase directive will do it if exist the options attribute
					var $options = elm.find('option');

					for (var i = 0; i < $options.length; i++) {
						var $option = $options.eq(i);
						var text = $option.text();
						ul += '<li><a class="option" ng-click="optionHandler($event)">' + text + '</a></li>';
						if ($option.attr('selected') == 'selected' || i == 0) scope.$display.html(text);
					}
					//dynamic options
					if (attrs.options) {
						var $doptions = scope[attrs.options];
						if ($doptions) {
							for (var j = 0; j < $doptions.length; j++) {
								var $doption = $doptions[j];
								var text = $doption[attrs.textField];
								ul += '<li><a class="option" ng-click="optionHandler($event)">' + text + '</a></li>';

								if (j == 0 && $options.length == 0) scope.$display.html(text);
							}
						}
					}
					ul += '</ul>';

					scope.$content.append($compile(ul)(scope));
				}
			}

			function factory(scope, elm, attrs) {

				var $wrap = scope.$wrap = elm.wrap('<div class="rd-select" style="position:relative;overflow:visible;"></div>').parent().addClass(elm.attr('class'));
				//create the display layer
				var $display = scope.$display = angular.element('<div class="display"></div>');
				attrs.placeholder && $display.html(attrs.placeholder);

				//create the trigger
				var $trigger = scope.$trigger = angular.element('<a class="trigger" tabindex="-1"></a>');
				//create the body
				var $content = scope.$content = angular.element('<div class="content" style="display:none;position:absolute;top:100%;left:-1px;width:100%;"></div>');


				function showContent() {
					$content.css({
						display: 'block'
					});
				}

				function hideContent() {
					$content.css({
						display: 'none'
					});
				}

				//bind events
				var readyClose = true;
				$wrap.on('click', function() {
					showContent();
				})

				$wrap.on('mouseenter', function() {
					readyClose = false;
				}).on('mouseleave', function() {
					readyClose = true;
				})
				angular.element(document).on('click', function(e) {
					if (readyClose) hideContent();
				})


				//compile elements and append to wrap
				$wrap.append($compile($display)(scope));
				$wrap.append($compile($trigger)(scope));
				$wrap.append($compile($content)(scope));


			}

			return {
				scope: {
					dyPlaceholder: '='
				},
				transclude: true,
				link: function(scope, elm, attrs) {
					elm.css({
						display: 'none'
					}); //hide the select
					//elm.css({position:'relative',top:'-30px'})
					setScopeValues(scope, elm, attrs);
					factory(scope, elm, attrs);
					scope.$watch(attrs.options, function() {
							build(scope, elm, attrs);
						})
						//dynamic placeholder					
					scope.$watch('dyPlaceholder', function() {

						if (scope.$display) {
							scope.$display.html(scope.dyPlaceholder);
						}
					});

				}
			}
		}]).factory('popupDialog', ['$compile', '$templateCache', function($compile, $templateCache) {


			return function(template, scope, args, delay) {
				var template = template ? $templateCache.get(template) : '<div></div>';
				var opts = angular.extend({
					wait: true,
					type: 'no-icon'
				}, args || {});
				if (opts.wait) {
					scope.alert_wait = true;
					template = '<i ng-show="alert_wait">loading...</i><div ng-show="!alert_wait">' + template + '</div>';
				}
				var html = $compile(template)(scope);

				//show dialog 

				var $dialog = alert('<div id="popupDialog" class="' + opts.wrapClass + '"></div>', opts, delay);

				var $container = angular.element(document.getElementById('popupDialog')).append(html);

				//css
				opts.css && $container.css(opts.css)
					// ajax rquest
				if (typeof opts.ajax == 'function') {
					opts.ajax.call($container).then(function() {
						scope.alert_wait = false;
					}, function() {
						$dialog.close($dialog);
					});
				}
				return $dialog;
			}


		}]).filter('html', ['$sce', function($sce) {
			return function(text) {
				return $sce.trustAsHtml(text);
			};
		}]).filter('synomymous', function() {
			return function(name) {
				var out = '';
				for (var i = 0; i < name.length; i++) {
					if (i == 0) {
						out += name.charAt(i);
					} else {
						out += '*';
					}

				}
				return out;
			};
		}).filter('decimal', function() {
			return function(value, decimal) {
				return value.toFixed(decimal);
			};
		}).filter('million', ['$filter', function($filter) {
			return function(value, min, decimal) {
				var
					unit = '万';
				min == undefined && (min = 100000);
				decimal == undefined && (decimal = 2);
				if (value >= min)
					return $filter('number')(value / 10000, 0) + unit;
				else
					return $filter('number')(value, decimal);
			};
		}]).service('rdAnimate', ['G', function(G) {
			return function move(obj, sName, target, time, fn) {
				var
					rOpacity = sName == 'opacity',
					start = parseFloat(G.GetCurrentStyle(obj, sName)),
					dis,
					//count=Math.ceil(time/(G.isIE8() ? 90 : 30)), 
					count = time / 20,
					n = 0;
				!start && (start = 0);
				rOpacity && G.isIE8() && !start && (start = 100);
				rOpacity && !G.isIE8() && (target /= 100);

				dis = target - start;


				function finish() {
					clearInterval(obj.timer);
					obj.timer = null;
					if (rOpacity) {
						if (G.isIE8()) {
							obj.style['filter'] = 'alpha(opacity=' + (start + dis) + ')';
						} else {
							obj.style[sName] = start + dis;
						}
					} else {
						obj.style[sName] = start + dis + 'px';
					}
					typeof fn == 'function' && fn();
				}

				if (obj.timer) {
					clearInterval(obj.timer);
					obj.timer = null;
				}
				obj.timer = setInterval(function() {
					n++;

					if (rOpacity) {
						if (G.isIE8()) {
							obj.style['filter'] = 'alpha(opacity=' + (start + dis * n / count) + ')';
						} else {
							obj.style[sName] = start + dis * n / count;
						}

					} else {
						obj.style[sName] = start + dis * n / count + 'px';
					}


					n >= count && obj.timer && finish();


				}, 5);
			}
		}]).directive('rdShow', ['G', function(G) {
			return {
				link: function(scope, elm, attrs) {
					scope.$watch(attrs.rdShow, function() {
						var bshow = scope.$eval(attrs.rdShow);
						// js analysis may be slow sometimes which leading to make the elm  be  hidden after showing instantly.
						// using css display property can prohibite this case as the elm is hidden primitively
						bshow ? elm.css('display', 'block') : elm.css('display', 'none');
					});
				}
			};
		}]).directive('compareTo', function() {
			return {
				require: 'ngModel',

				link: function(scope, elm, attrs, ctrl) {

					var triggerValue;
					scope.$watch(attrs.compareTo, function() {
						triggerValue && ctrl.$setViewValue(triggerValue);
					});
					ctrl.$parsers.push(function(value) {
						ctrl.$setValidity("repeat", value == scope.$eval(attrs.compareTo));
						triggerValue = value;
					});

				}
			};
		}).directive('dymin', function() {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, elem, attr, ctrl) {

					scope.$watch(attr.dyMin, function() {
						/* if (ctrl.$isDirty) */
						ctrl.$viewValue || ctrl.$viewValue == 0 && ctrl.$setViewValue(ctrl.$viewValue);
					});
					var minValidator = function(value) {

						var min = scope.$eval(attr.dymin);

						if (value < min) {
							ctrl.$setValidity('dymin', false);
							return undefined;
						} else {
							ctrl.$setValidity('dymin', true);
							return value;
						}
					};

					ctrl.$parsers.push(minValidator);
					ctrl.$formatters.push(minValidator);
				}
			};
		}).directive('dymax', function() {

			return {
				restrict: 'A',
				require: 'ngModel',
				link: function(scope, elem, attr, ctrl) {
					scope.$watch(attr.dyMax, function() {

						/*if (ctrl.$isDirty) */
						ctrl.$viewValue || ctrl.$viewValue == 0 && ctrl.$setViewValue(ctrl.$viewValue);
					});
					var maxValidator = function(value) {
						var max = scope.$eval(attr.dymax);
						if (value > max) {
							ctrl.$setValidity('dymax', false);
							return undefined;
						} else {
							ctrl.$setValidity('dymax', true);
							return value;
						}
					};

					ctrl.$parsers.push(maxValidator);
					ctrl.$formatters.push(maxValidator);
				}
			};
		}).directive('tabs', function() {
			/**
			*用法:
			<div tabs>
				<div>
					<a tab-index="0">tab1</a> <!--说明：当a被选中时，会自动加上class:"active",tab-index对应tab1和tab2的index,如果不填，则为a的index-->
					<a tab-index="1">tab2</a>
				</div>
				<div>
					<div>tab1</div>
					<div>tab2</div>
				</div>
			</div>				
			**/
			return {


				link: function(scope, elm, attrs) {
					var $navs = elm.children().eq(0).find('a');
					var $contents = elm.children().eq(1).children();

					function build() {

						var initializeIndex = scope.$eval(attrs.initializeIndex);

						if (!initializeIndex) initializeIndex = 0;
						$navs.removeClass('active');
						$contents.css({
							display: 'none'
						});

						$navs.eq(initializeIndex).addClass('active');
						$contents.eq(initializeIndex).css({
							display: 'block'
						});
					};

					scope.$watch(attrs.initializeIndex, function() {
						build();
					})

					if ($navs.length <= 1) {
						$navs.css('cursor', 'default');
						return;
					}
					$navs.on('click', function() {
						var _this = angular.element(this);
						var targetIndex = _this.attr('tab-index');
						if (targetIndex == undefined) {
							var e = this;
							var i = 0;
							while ((e = e.previousSibling) != null) {
								e.nodeType == 1 && i++;
							}
							targetIndex = i;
						}
						$navs.removeClass('active');
						$contents.css({
							display: 'none'
						});
						_this.addClass('active');
						$contents.eq(targetIndex).css({
							display: 'block'
						});
					})
				}
			}
		}).directive('rdImagePreview', function() { //for single image

			return {
				scope: {
					src: '@rdImagePreview',
					imageWidth: '@',
					imageHeight: '@'
				},
				link: function(scope, elm, attrs) {
					var
						src = scope.src, //image source
						$container,
						$body,
						$mask,
						imageWidth = parseInt(scope.imageWidth) ? scope.imageWidth : 800,
						imageHeight = parseInt(scope.imageHeight) ? scope.imageHeight : 600;

					elm.on('click', function() {
						$body = angular.element(document.body);
						$container = angular.element('<div class="rd-image-preview-conta"><img src="' + src.replace(/w\/[\d]+\/h\/[\d]+$/, 'w/' + imageWidth + '/h/' + imageHeight) + '" /></div>');
						$mask = angular.element('<div class="rd-mask"></div>').off('click').on('click', function() {
							$mask.remove();
							$container.remove();
						});
						$body.append($mask);
						$body.append($container);
					})

				}
			}
		}).directive('rdImagesPreview', function() { //for image array
			function build(scope, elm, attrs) {
				var
					src = scope.src, //image source
					$container,
					$body,
					$mask,
					$prev, //previous button
					$next, // next button
					$images,
					imageWidth = parseInt(scope.imageWidth) ? scope.imageWidth : 800,
					imageHeight = parseInt(scope.imageHeight) ? scope.imageHeight : 600;

				$images = elm.find('img');

				function clear() {
					if ($mask) {
						$mask.remove();
						$container.remove();
						$mask = null;
					}
				}

				function showItem(item, index) {
					$body = angular.element(document.body);
					$container = angular.element('<div class="rd-image-preview-conta"><img src="' + item.attr('src').replace(/w\/[\d]+\/h\/[\d]+$/, 'w/' + imageWidth + '/h/' + imageHeight) + '" /></div>');
					$mask = angular.element('<div class="rd-mask"></div>').off('click').on('click', function() {
						clear();
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
					$body.append($container);
				}
				angular.forEach($images, function(item, i) {
					item = angular.element(item);
					item.on('click', function() {
						showItem(item, i);
					})
				})
			}
			return {
				scope: {
					items: '=',
					imageWidth: '@',
					imageHeight: '@'
				},
				link: function(scope, elm, attrs) {

					scope.$watch('items', function() {

						if (typeof scope.items == 'object' && scope.items.length)
							build(scope, elm, attrs);

					})
				}
			}
		})
	}
});