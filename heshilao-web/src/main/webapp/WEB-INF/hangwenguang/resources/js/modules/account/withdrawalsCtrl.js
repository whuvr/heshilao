define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('withdrawlsCtrl', ['$scope', '$rootScope', 'httpService', 'cService', '$window', '$location', '$cookieStore', '$state', 'popupDialog', function($scope, $rootScope, httpService, cService, $window, $location, $cookieStore, $state, popupDialog) {
            'use strict';
            $scope.identifyUrl = "";
            $scope.tab = {
                on0: true
            };
            $scope.bankList = [];
            $scope.formData = {
                cash: ''
            };
            var curUser = $cookieStore.get('curUser');
            if (curUser.userType == 0) {
                $scope.corp = true;
            } else {
                $scope.corp = false;
            }
            $scope.pageSize = 5;
            //选择银行
            $scope.checkBank = function(index) {
                $scope.formData.bankId = $scope.bankList[index].id;
                var len = $scope.bankList.length
                for (var i = 0; i < len; i++) {
                    $scope.tab['on' + i] = false;
                }
                $scope.tab['on' + index] = true;
            }
            //表单提交前插入加密金额
            $scope.cashAmount = function() {
                var ele = angular.element(document.getElementById('withdraw-input'));
                var val = fieldRSA(ele);
                $scope.formData.cashStr = val;
            };
                //分页
            $scope.pageSerch = function(page) {
                cService.ajax({
                    url: 'account/cash/cashList',
                    params: {
                        page: page,
                        rows: 5
                    }
                }).success(function(data, status, header, config) {
                    $scope.data = data.rows;
                    $scope.total = data.total;
                })
            };
            $scope.pageSerch(1);

            // 获取token
            httpService.get({
                url: 'account/cash/getToken'
            }).success(function(data, status, headers, config) {
                $scope.token = data; // token
            });

            /*是否绑卡或者实名*/
            if (curUser.userType == 0) {
                if (curUser.realNameStatus == 0) {
                    alert("您尚未实名认证，请先去实名认证", {
                        closeBtn: false,
                        buttons: [{
                            type: "button",
                            value: "去实名认证",
                            callBack: function() {
                                $state.go('account.payAccount');
                            },
                            closeBtn: false
                        }]
                    })
                } else {
                    cService.ajax({
                        url: 'account/cash/getBank',
                        method: 'get',
                    }).success(function(data) {
                        $scope.bankList = data;
                        if ($scope.bankList.length > 0) {
                            $scope.isBank = true;
                            // $scope.tabIndex = $scope.fastPay ? 0 : 1;
                            $scope.formData.bankId = $scope.bankList[0].id;
                        } else {
                            alert("您尚未绑定银行卡，请先去绑定银行卡", {
                                closeBtn: false,
                                buttons: [{
                                    type: "button",
                                    value: "去绑定银行卡",
                                    callBack: function() {
                                        $state.go('account.bankCard');
                                    }
                                }]
                            })
                        }
                    })
                }
            }else if (curUser.userType == 1 || curUser.userType == 2) {
                if ( curUser.realNameStatus == 5 ) {
                    alert("请等待平台运营人员进行企业信息核实", {
                        closeBtn: true
                    })
                }

                if ( $rootScope.corpInfo.tppType == 3) {
                    cService.ajax({
                        url: 'account/cash/getBank',
                        method: 'get',
                    }).success(function(data) {
                        $scope.bankList = data;
                        if ($scope.bankList.length > 0) {
                            $scope.isBank = true;
                            $scope.formData.bankId = $scope.bankList[0].id;
                        } else {
                            alert("您尚未绑定银行卡，请先去绑定银行卡", {
                                closeBtn: false,
                                buttons: [{
                                    type: "button",
                                    value: "去绑定银行卡",
                                    callBack: function() {
                                        $state.go('account.bankCard');
                                    }
                                }]
                            })
                        }
                    })
                }
            }

            //账户余额
            httpService.get({
                url: 'account/getBalanceAvailable'
            }).success(function(data, status, headers, config) {
                $scope.balanceAvailable = data;
            });

            // 提现相关信息
            //  dayCountLimit 每日提现次数
            //  monthCountLimit 每月提现次数
            //  minCashAoumnt 最低提现金额
            //  maxDayCashAmount 每日最高提现金额
            //  isCheckCashAmount 是否开启可提现金额 0：未开启 1：开启 -1：未配置
            //  canCashAmount 剩余可提现金额
            httpService.get({
                url: 'account/cash/getCashInfo'
            }).success(function(data, status, headers, config) {
                if (data.minCashAoumnt == -1) {
                    $scope.minCashAoumnt = 1.01;
                } else {
                    if(data.minCashAoumnt <= 0){
                        $scope.minCashAoumnt = 0.01
                    }else{
                        $scope.minCashAoumnt = data.minCashAoumnt;
                    }
                }
                $scope.isCheckCashAmount = data.isCheckCashAmount == -1 ? false : data.isCheckCashAmount;
                // if ($scope.isCheckCashAmount) {
                //     $scope.canCashAmount = data.canCashAmount;
                // } else {
                //     $scope.canCashAmount = $scope.balanceAvailable;
                // }
            });


            // function getQueryString(name) {
            //       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            //       var r = window.location.search.substr(1).match(reg);
            //       if (r != null) return r[2]; return null;
            // }
            // if(getQueryString('ret_code')&&getQueryString('ret_code')=='0000'){
            //     alert('提现成功',{
            //         buttons:[{
            //             title:'提现',
            //             value:'确定',
            //             callBack:function(){
            //                 $window.location.href = 'http://localhost:8080/#/account/myaccount';
            //             }
            //         }
            //         ]
            //     });

            // }
            // else if(getQueryString('ret_code')){
            //     alert('提现失败');
            // }
        }])
    }
});