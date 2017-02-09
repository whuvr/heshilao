define([
    'angular'
], function(angular) {

    return function(app, elem, attrs, scope) {
        app.controller('payResultCtrl', ['$scope', '$interval', 'cService', '$location', function($scope, $interval, cService, $location) {
            'use strict';

            var $header = angular.element(document.getElementById('header'));
            var $footer = angular.element(document.getElementById('footerWrap'));
            var $footer2 = angular.element(document.getElementById('footer2'));
            var ret_code = $location.$$search.ret_code;
            var type = $location.$$search.type;
            var orderId = $location.$$search.orderId;
            var message = $location.$$search.message;
            $header.css('display', 'none');
            $footer.css('display', 'none');
            $footer2.css('display', 'none');
            $scope.loading = true;
            $scope.showCount = 0;
            $scope.messageError = "操作失败！";
            if(message && message.length > 0){
            	 $scope.messageError = message;
            }
            if (ret_code == '0000') {
                if (type == 2) {
                    $scope.message = "操作申请成功";
                    $scope.loading = false;
                    $scope.operateSuccess = true;
                    $scope.succ = true;
                } else if (type == 4) {
                    $scope.message = "申请提现成功";
                    $scope.loading = false;
                    $scope.operateSuccess = true;
                    $scope.succ = true;
                } else if (type == 7) {
                    $scope.message = "申请还款成功";
                    $scope.loading = false;
                    $scope.operateSuccess = true;
                    $scope.succ = true;
                } else if (type == 10 || type == 8 || type == 0) {
                    queryCorpRegisterStatus();
                } else {
                    var timer = $interval(function() {
                        $scope.showCount++;
                        if ($scope.showCount > 30) {
                        	$scope.loading = false;
                            $interval.cancel(timer);
                            $scope.succ = true;
                            $scope.operateSuccess = true;
                            $scope.message = "操作处理中";
                        } else {
                            cService.ajax({
                                url: 'ufx/orderStatus',
                                method: 'get',
                                params: {
                                    orderId: orderId,
                                    type: type
                                }
                            }).success(function(data) {
                                $scope.message = data.message;
                                $scope.succ = true;
                                if (data.status == 1 || data.status == -1) {
                                	 $scope.operateSuccess = true;
                                	 $scope.loading = false;
                                    $interval.cancel(timer)
                                }
                                if (data.status == 1) {
                                    $scope.succ = true;
                                    $scope.error = false;
                                }
                                if (data.status == -1) {
                                    $scope.succ = false;
                                    $scope.error = true;
                                }
                            });
                        }
                    }, 2000);
                }
            } else if (ret_code == '0002') {
            	$scope.message = "操作处理中";
                if (type == 4) {
                    $scope.message = "申请提现成功";
                }
                $scope.loading = false;
                $scope.operateSuccess = true;
                $scope.succ = true;
            } else if (ret_code == '0003') {
            	$scope.message = "操作审核中";
                $scope.loading = false;
                $scope.operateSuccess = true;
                $scope.succ = true;
            } else {
                if (type == 8) {
                    queryCorpRegisterStatus();
                }else {
                    $scope.loading = false;
                    $scope.operateErr = true;
                }
            }
            $scope.closeWindow = function() {
                //location.href="about:blank";
                window.close();
            }
            $scope.$on('$destroy', function() {
                $header.css('display', '');
                $footer.css('display', '');
                $footer2.css('display', '');
            });

            function queryCorpRegisterStatus(argument) {
                var timer = $interval(function() {
                    $scope.showCount++;
                    if ($scope.showCount > 3) {
                        $interval.cancel(timer)
                    } else {
                        cService.ajax({
                            url: 'ufx/queryCorpRegisterStatus',
                            method: 'get',
                            params: {
                                type: type

                            }
                        }).success(function(data) {
                            $scope.message = data.message;
                            $scope.loading = false;
                            $scope.operateSuccess = true;
                            $scope.succ = true;
                            if (data.status == 1 || data.status == -1) {
                                $interval.cancel(timer)
                            }
                            if (data.status == 1) {
                                $scope.message = data.message;
                                $scope.succ = true;
                                $scope.error = false;
                            }
                            if (data.status == -1) {
                                $scope.messageError = data.message;
                                $scope.succ = false;
                                $scope.error = true;
                            }
                        });
                    }
                }, 2000);
            }


        }])
    }
});