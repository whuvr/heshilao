define([
	'angular',
], function(angular) {
	return function(app) {
		app.config(['$compileProvider', '$controllerProvider', '$provide', '$httpProvider', function($compileProvider, $controllerProvider, $provide, $httpProvider) {
			$httpProvider.interceptors.push('testIntercepter');
			//$httpProvider.defaults.cache = false;//禁用ajax缓存
		}]).factory('testIntercepter', ['$q', 'G', '$rootScope', function($q, G, $rootScope) {
			var testIntercepter = {
				request: function(config) {

					/*this.currentElem = config.elem;
					var angularElem = angular.element(this.currentElem);
					angularElem.css('pointer-events','none');
					angularElem.attr('disabled','disabled');*/
					if (!_G.interfaceType) {
						var pos = config.url.lastIndexOf('/') + 1;
						config.url = 'resources/interface/' + config.url.substr(pos) + '.json';
					}
					//forbid ajax request cache
					var separator = config.url.indexOf('?') === -1 ? '?' : '&';
					config.url = config.url + separator + 'noCache=' + new Date().getTime();

					return config;
				},
				response: function(res) {

					var data = res.data;
					if (res.status == 200) {
						var angularElem = angular.element(this.currentElem);
						angularElem.css('pointer-events', '');
						angularElem.attr('disabled', '');
						if (this.currentElem && this.currentElem.removeAttribute) {
							this.currentElem.removeAttribute('disabled');
						}

					}

					if (data && data.apistatus == 0 && (data.result.errorCode === 40000 || data.result.error_code === 40000)) {

						_G.jumpLogin();
					}


					return res;
				},
				requestError: function(rejection) {

					return $q.reject(rejection);
				},
				responseError: function(rejection) {
					//response Error 404 500 409
					//console.log(rejection)
					var status = rejection.status;
					var data = rejection.data;
					if (status == 500)
						_G.jumpErrorPage(rejection);
					else if (status == 409) {
						if (data.code == -200) {
							_G.jumpLoginPage();
						} else {
							if (data.code && (data.code == "8004" || data.code == "2020" || data.code == "8005" || data.code == "3005")) {
								// return true;
							} else if (data.code == "1031") {
								alert(data.message, {
									type: "error",
									buttons: [{
										type: 'button',
										value: '确定',
										callBack: function() {
											location.href = '/';
										}
									}]
								})
							} else if (data.message) {
								alert(data.message, {
									type: "error"
								});
							} else {
								alert('系统错误', {
									type: "error"
								});
							}
						}
					}
					return $q.reject(rejection);
				}
			};
			return testIntercepter;
		}])
	}
});