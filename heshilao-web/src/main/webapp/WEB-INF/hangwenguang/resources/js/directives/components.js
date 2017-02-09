//定义App模块
angular.module('components', []).config(['$compileProvider', '$controllerProvider', '$provide', '$filterProvider', function($compileProvider, $controllerProvider, $provide, $filterProvider) {
	var cache = {};
	var app = {};
	var ngMap = {
		controller: $controllerProvider,
		directive: $compileProvider,
		provider: $provide,
		factory: $provide,
		service: $provide,
		constant: $provide,
		value: $provide,
		decorator: $provide,
		filter: $filterProvider
	};

	window.globalApp = app;

	for(var key in ngMap){
		app[key] = (function(key){
			return function(name, fn){
				return wapper(key, name, arguments);
			}
		})(key);
	}

	function wapper(key, name, args){
		var hasKey = 'has' + key.replace(/^[a-z]/, function(a){
			return a.toUpperCase();
		});

		if(!cache[hasKey]){
			cache[hasKey] = {};
		}

		if(!cache[hasKey][name]){
			cache[hasKey][name] = true;
			if(key === 'controller' || key === 'filter'){
				return ngMap[key]['register'].apply(ngMap[key], args);
			}

			return ngMap[key][key].apply(ngMap[key], args);
		}

	}

	$compileProvider.directive('ngComponent', ['$compile','$rootScope',
		function($compile,$rootScope) {
			// console.log('my----ngController')

			return {
				scope: true,
				priority: 500,
				link: function(scope, elem, attrs) {
					var componentUrl = attrs.ngComponent;

					if('ngLoading' in attrs){
						elem.html('<div class="sk-spinner sk-spinner-wave"> <div class="sk-rect1"></div> <div class="sk-rect2"></div> <div class="sk-rect3"></div> <div class="sk-rect4"></div> <div class="sk-rect5"></div> </div> </div>');
					}

					try {
						var componentFn = require(componentUrl);

						if(componentFn){
							componentExec(componentFn);
						}else{
							console.error('组件返回为空--组件地址:' + componentUrl);
						}
					} catch (e) {
						require([componentUrl], function(componentFn) {
							componentExec(componentFn);
						});
					}

					function componentExec(componentFn){
						var $currScope = scope.$parent;

						if(!angular.isFunction(componentFn)){
							console.error('目前约定组件返回地址应该函数--组件地址:' + componentUrl);
						}
						elem.html('');
						componentFn(app, elem, attrs, $currScope);
						$compile(elem.contents())($currScope);
						if(!scope.$$phase) {
				         	scope.$apply();
				        }
				        try{
							var componentName = getComponentName(componentUrl);
					        _G.myScope = _G.myScope || {};
					        _G.myScope[componentName] = $currScope.$$childTail;
					        $currScope.$$childTail.$$componentName = componentName;
					        // console.log(componentName, _G.myScope[componentName]);
				        }catch(e){

				        }

					}

					function getComponentName(componentUrl){
						var last = componentUrl.lastIndexOf('/');
						var componentName = componentUrl.substr(last + 1);
						return componentName;
					}
				}

			};
		}
	]);
}]);
