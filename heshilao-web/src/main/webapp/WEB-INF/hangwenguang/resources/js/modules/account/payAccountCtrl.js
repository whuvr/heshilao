define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('payAccountCtrl', ['$scope', 'cService', '$rootScope', '$cookieStore', '$interval', 'G', '$window', '$location', 'popupDialog',
            function($scope, cService, $rootScope, $cookieStore, $interval, G, $window, $location, popupDialog) {
                'use strict';
                $scope.formParams = {
                    idNo: $rootScope.user.idNo,
                    realName: $rootScope.user.realName
                        //phone: $rootScope.user.phone

                }
                $scope.url = 'account/paymentaccount';
                var getNamePhoneUrl = 'account/paymentaccount/getNamePhone';
                $scope.webName = '';
                $scope.webPhone = '';
                //双乾授权
                $scope.authorize = {};
                cService.ajax({
                    url: 'account/paymentaccount/getNamePhone'
                }).success(function(data, status, headers, config) {
                    if ($rootScope.corpInfo.tppType == '3' && $rootScope.user.realNameStatus == 3) {
                        var artIdentify = alert('温馨提示：如您未开启投标授权、还款转账授权、二次分配审核授权，</br>请先至第三方页面开启授权；若您已开启授权，无需重复操作。', {
                            closeBtn: false,
                            type: 'info',
                            buttons: [{ //按钮内容，及个数,如为'default'就是默认两个按扭[取消，确定]
                                type: 'button',
                                value: '去授权',
                                callBack: function() {
                                    var w = $window.open(),
                                        url, num = 0;
                                    cService.ajax({
                                        url: 'users/authSign',
                                        method: 'get'
                                    }).success(function(data) {
                                        w.location = data;
                                        alert('温馨提示：如您未开启投标授权、还款转账授权、二次分配审核授权，</br>请先至第三方页面开启授权；若您已开启授权，无需重复操作', {
                                                buttons: [{
                                                    type: 'button',
                                                    value: '授权成功',
                                                    callBack: function() {
                                                        window.location.reload();
                                                    }
                                                }, {
                                                    type: 'button',
                                                    value: '授权失败',
                                                    callBack: function() {
                                                        window.location.reload();
                                                    }
                                                }]
                                            })
                                            // artIdentify.close();

                                        // $scope.empower = true;
                                    }).error(function() {
                                        w.close();
                                    })
                                }
                            }]
                        })
                    }
                    $scope.webName = data.webName;
                    $scope.webPhone = data.webPhone;
                }).error(function(data, status, headers, config) {
                    window.location.reload();
                });
                $scope.submit = function(form) {
                    cService.ajax({
                        url: $scope.url,
                        method: 'post',
                        params: $scope.formParams
                    }).success(function() {

                        alert('绑定账号成功');

                        cService.ajax({
                            url: 'users/userInfo',
                            method: 'get'
                        }).success(function(data) {
                            $rootScope.user = data;
                            $cookieStore.put("curUser", data);
                        }).error(function() {
                            window.location.reload();
                        });
                    })
                }

                //query mobile phone verify code
                $scope.queryVerifyCode = function() {
                        var $phone = $scope.form.phone
                        $phone.$setViewValue($phone.$viewValue);
                        if (!$scope.queried && $phone.$valid) {
                            cService.ajax({
                                url: 'account/paymentaccount/sendCode',
                                method: 'post',
                                params: $scope.formParams
                            }).success(function(data) {

                            })
                            $scope.queried = true;
                            $scope.queryAgainRemain = 60;
                            var timer = $interval(function() {
                                if (--$scope.queryAgainRemain == 0) {
                                    $interval.cancel(timer);
                                    $scope.queried = false;
                                }

                            }, 1000)
                        }
                    }
                    //获取第三方托管账户
                $scope.getTppUrl = function() {
                    var newWindow = window.open('', 'newWindow')
                    cService.ajax({
                        url: "account/paymentaccount/getTppUrl",
                        method: "get"
                    }).success(function(data) {
                        // var newWindow = window.open('','newWindow')
                        newWindow.document.write(data);
                    })
                }

            }
        ])
    }
});