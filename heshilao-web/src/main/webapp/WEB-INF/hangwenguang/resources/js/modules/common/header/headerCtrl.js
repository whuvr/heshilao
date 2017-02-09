define([
	'angular'
], function(
	angular
) {

	return function(app, elem, attrs, scope) {
		app.controller('headerCtrl', ['$scope', '$rootScope', 'cService', '$state', '$cookieStore', '$http','$window', function($scope, $rootScope, cService, $state, $cookieStore, $http, $window) {
			cService.ajax({
				url: 'corp/QRCodeUrl',
				type: 'get'
			}).success(function(data) {
				$scope.headerLogo = data;
			})
			$scope.totalAmountFlag = false;

			// $scope.$on('$stateChangeSuccess', function () {
			//     console.log('$stateChangeSuccess');
			//     angular.element(document.getElementById('content')).css('background-image', 'none');
			// })


			$scope.register = function() {
				$scope.loginFalse = true;
				$scope.loginSucc = false;
				$rootScope.login.beforeLogin = true;
				$rootScope.login.afterLogin = false;
				$rootScope.user = {};
				$cookieStore.remove("curUser");
				$cookieStore.remove("curUser1");
				$state.go('register', {}, {
					reload: true
				});
			}
			cService.ajax({
				url: "corp/logourl"
			}).success(function(data, status, headers, config) {
				$scope.corpLogo = data
			})

			$scope.logout = function() {
				var dialog = alert("确认要退出系统?", {
					type: "prompt",
					buttons: [{ //按钮内容，及个数,如为'default'就是默认两个按扭[取消，确定]
						type: 'submit',
						value: '确定',
						callBack: function() {
							// dialog.close();
							cService.ajax({
								url: "users/logout"
							}).success(function(data, status, headers, config) {
								$scope.loginFalse = true;
								$scope.loginSucc = false;
								$rootScope.login.beforeLogin = true;
								$rootScope.login.afterLogin = false;
								$rootScope.user = {};
								$cookieStore.remove("curUser");
								$cookieStore.remove("curUser1");
								$state.go('login');
								$rootScope.user.headPortraitUrl = "resources/images/account-head.png";
							})
						}
					}, {
						type: 'submit',
						value: '取消',
						className: 'cancel'
					}],
					closeBtn: false
				})

			}
			$scope.showWechat = function() {
				$scope.wechat = true;
				$scope.microblog = false;
			}
			$scope.hideWechat = function() {
				$scope.wechat = false;
			}
			$scope.showMicroblog = function() {
				$scope.microblog = true;
				$scope.wechat = false;
			}
			$scope.hideMicroblog = function() {
				$scope.microblog = false;
			}
			$scope.showQQ = function() {
				$scope.QQ = true;
			}
			$scope.hideQQ = function() {
				$scope.QQ = false;
			}
			$scope.getAmount = function() {
				if ($rootScope.login.afterLogin && $scope.totalAmountFlag == false) {
					cService.ajax({
						url: 'account/getBalanceAvailable',
						type: 'get'
					}).success(function(data) {
						$scope.totalAmount = parseFloat(data).toFixed(2);
						$scope.totalAmountFlag = true;
					})
				}
			}
			$scope.resetAmount = function() {
				$scope.totalAmountFlag = false
			}
			$scope.subShow_myaccount = function() {
				$state.go('account.myaccount',null,{
				    reload:true
				});
			}
			$scope.subshow_accountSet = function() {
				$state.go('account.accountSet',null,{
				    reload:true
				});
			}
			$scope.subshow_accountRecord = function() {
				$state.go('account.accountRecord',null,{
				    reload:true
				});
			}

			/**
			 * [browserDetector 检测浏览器]
			 * @author wyk@erongdu.com
			 */
			function browserDetector() {
				//由客户机发送服务器的 user-agent 头部的值
				//Mobile Chrome MicroMessenger
				//Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
				var UA = navigator.userAgent;
				//浏览器的名称
				var appName = navigator.appName;
				//运行浏览器的操作系统平台
				var platform = navigator.platform;
				//浏览器的平台和版本信息
				//5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36
				var VER = navigator.appVersion;
				var isMobile = /Mobile/.test(UA);

				if ( !isMobile ) {
					$window.location.href = 'weixin';
				}
			}
			// browserDetector();

		}])
	}
});