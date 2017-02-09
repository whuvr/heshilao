/**
 * @name commonDirectives
 * @description
 * directives often used  such as loading template directive、input placeholder directive and so on

**/

define(
	[
		'angular',
		'p2pSofa/services/common/commonService'
	],
	function(angular){
		mod_directives.directive( 'cpCommonInclude', ['uiService', '$templateCache', '$compile', function( uiService, $templateCache, $compile ) {
			/**
			 * @name cpCommonInclude
			 * @description
			 * loading one or more html parts of  standard components from templates/templates.html
			 * @usage
			 * <div cp-common-include="['c1','c2' ...]"></div>
			 * or
			 * <div cp-common-include="'c1'"></div>
			**/
			return {
				link: function( scope, elem, attrs ) {
					var
						src = scope.$eval(attrs.cpCommonInclude),
						varWatch = attrs.varWatch;

					if (varWatch != undefined){
						scope.$watch(varWatch, function(newVal, oldVal){
							if(newVal)
								setVars();
						})
					}

					compile(src);

					function setVars(){
						var
							vars = scope.$eval(attrs.vars),
							varKey;
						if(typeof vars == 'object'){
							for(varKey in vars){
								scope[varKey] = vars[varKey];
							}
						}
					}

					function compile(src){
						var
							dom,
							$dom,
							$container = angular.element('<div></div>'),
							$content;
							i = 0;
						src = src instanceof Array ? src : [src];
						for (; i < src.length; i ++){
							dom = $templateCache.get(src[i]);
							$dom = angular.element(dom);
							$container.append($dom);
						}
						$content = $container.children();
						elem.html('');
						elem.append($content);
						$compile($content)(scope);

					}
				}
			};

		} ] ).directive('cpUiPlaceholder', [ 'commonService', function( cService ){
			/**
			 * @name cpUiPlaceholder
			 * @description
			 * as same with the placeholder attribute of html5 except for surpporting ie8
			 * @usage
			 * <input cp-ui-placeholder="please enter anything" />
			**/
			return {
				require: 'ngModel',
				link: function(scope, elm, attrs,ctrl) {
					var
						placeholder = attrs.cpUiPlaceholder,
						bFocus = false,
						$placeholder,
						text = ctrl.$viewValue || elm.val();

					elm.parent().css({
						position: 'relative'
					});
					$placeholder = angular.element(document.createElement("input"));
					$placeholder.val(placeholder).css({
						color: '#999',
						display: 'none'
					});
					$placeholder.attr('class',elm.attr('class'));
					$placeholder.attr('size',elm.attr('size'));
					$placeholder.attr('type','text');
					elm[0].parentNode.insertBefore($placeholder[0],elm[0]);
					var height = cService.GetCurrentStyle(elm[0],'height');
					var borderColor = cService.GetCurrentStyle(elm[0],'border-left-color');
					var position = cService.GetCurrentStyle(elm[0],'position');
					var zIndex = cService.GetCurrentStyle(elm[0],'zIndex');
					if (!zIndex || zIndex < 0){
						zIndex = 0;
					}

					function showElm(){
						cService.removeInlineStyle(elm[0],['height','border-color', 'background-color', 'position','z-index']);
						$placeholder.css('display', 'none');
						elm[0].focus();
					}
					function hideElm(){
						elm.css({
							'height': '0px',
							'border-color': 'transparent',
							'background-color': 'transparent',
							'position': 'absolute',
							'left': 0,
							'z-index': -1
						});
						$placeholder.css('display', '');
						/*elm[0].blur();*/
					}

					elm.on('blur',function(e){
						if (!elm.val()){
							hideElm();
						}
						bFocus = false;
					});
					elm.on('keydown',function(e){
						bFocus = true;
					});
					$placeholder.on('focus',function(){
						elm.attr('readonly',false);
						showElm();
					});

					scope.$watch(ctrl.$name,function(){
						if (ctrl.$viewValue){
							showElm();
							!bFocus && elm[0].blur();
						}else if (!bFocus){
							hideElm();
						}
					})
				}
			}
		}]).directive('cpCommonSingletonButton', ['$rootScope', function($rootScope) {
			/**
			 * @name 防止双击重复提交表单
			 * @description The component must be used combination with the ajax service in commonService,
			 * 为了使disabled属性起作用，必须在input标签上使用该指令
			 * @usage <input type="button/submit"  cp-common-singleton-button />
			 **/

			return {
				restrict: 'A',
				priority: 1000,
				require: '?^form',
				link: function(scope, elem, attrs, ctrl) {
					$rootScope.singletonButtonList = $rootScope.singletonButtonList || [];
					$rootScope.singletonButtonList.push(elem);

					var
						type = elem[0].type,
						form;
					if (type == 'submit') {
						form = elem[0];
						while (form = form.parentNode) {
							if (form.tagName.toLowerCase() == 'form') break;
						}

						angular.element(form).on('submit', function(e) {
							ctrl.$valid && setState();
						})
					} else {
						elem.on('click', function(e) {
							setState();
						})
					}

					function setState() {
						if (elem.status == 'ready' || elem.status == 'running') {
							return false;
						}
						elem.status = 'ready';
						if (elem[0].tagName.toLowerCase() == 'input') {
							elem.oriValue = elem.val();
							elem.val(elem.oriValue + '...');
						} else {
							elem.oriHtml = elem.html();
							elem.html(elem.oriHtml + '...');
						}
						elem[0].disabled = true;
						return true;
					}


				}

			};
    }]);
	}
)