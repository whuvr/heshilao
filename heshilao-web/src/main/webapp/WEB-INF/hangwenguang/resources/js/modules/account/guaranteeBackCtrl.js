define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('guaranteeBackCtrl', ['navData', '$scope', 'cService', '$location', 'popupDialog', function(navData, $scope, cService, $location, popupDialog) {
            'use strict';

            $scope.page = 1;
            $scope.pageSize = 10;

            /*与cp-list-repayment中请求重复了 2016-5-17 wyk@erongdu.com
            cService.ajax({
                url: 'repayments',
                params: {
                    page: 1,
                    rows: 10
                }
            }).success(function(data, status, headers, config) {
                $scope.data = data.rows;
                $scope.total = data.total;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });*/

            $scope.status = "";
            $scope.time = -1;
            //自定义时间
            $scope.changeTime = function() {
                if ($scope.time == '')
                    $scope.searchDate = true;
                else {
                    $scope.searchDate = false;
                    var oA1 = document.getElementById("startTime");
                    var oA2 = document.getElementById("endTime");
                    oA1.value = "";
                    oA2.value = "";
                }
            }

            var date = $scope.time,
                startTime, endTime;
            $scope.change = function(page, index) {
                var oA1 = document.getElementById('startTime');
                var oA2 = document.getElementById('endTime');

                if (index) {

                } else {
                    //搜索处理
                    date = $scope.time;
                    startTime = oA1.value;
                    endTime = oA2.value;
                }

                cService.ajax({
                    url: 'repayments',
                    params: {
                        page: page,
                        rows: 10,
                        status: $scope.status,
                        time: date,
                        startTime: startTime,
                        endTime: endTime
                    }
                }).success(function(data, status, headers, config) {
                    $scope.data = data.rows;
                    $scope.total = data.total;
                    if (index != 1) {
                        $scope.page = 1;
                    }
                }).error(function(data, status, headers, config) {
                    console.log(data);
                })

            }
            var $dialog_zero;
            $scope.backto = function(num, item, id) {
                // $scope.paid=false;
                $scope.actualAmount = item.actualAmount;
                $scope.capital = item.capital;
                $scope.interest = item.interest;
                $scope.overdueInterest = item.overdueInterest;
                $dialog_zero = popupDialog('template_payBack', $scope, {
                    title: '还款提示',
                    closeBtn: false,
                    buttons: [],
                    type: "no-icon",
                    ajax: function() {
                        return cService.ajax({
                            url: 'repayments',
                            method: 'post',
                            params: {
                                id: id
                            }
                        }).success(function(payUrl) {
                            $scope.paid = true;
                            if (payUrl) {
                                $scope.payUrl = payUrl;
                                $scope.payback = function() {
                                    $scope.paid = false;
                                }
                            } else {
                                $scope.payback = function() {
                                    $scope.paid = true;
                                    cService.ajax({
                                        url: 'repayments/corpRepay?id=' + id,
                                    }).success(function(data, status, headers, config) {
                                        $dialog_zero.close($dialog_zero);
                                        var $dialog_one = alert('恭喜您，已成功完成还款！', {
                                            buttons: [{
                                                type: 'button',
                                                value: '确定',
                                                callBack: function() {
                                                    location.reload();
                                                }
                                            }]

                                        });

                                    }).error(function(data, status, headers, config) {
                                        var $dialog_two = alert('抱歉，本次还款失败，请重试！如无法解决，请联系客服（客服热线）！', {
                                            buttons: [{
                                                type: 'button',
                                                value: '确定',
                                                callBack: function() {
                                                    location.reload();
                                                }
                                            }]

                                        });
                                    })
                                }

                            }

                        })
                    }
                });

            }

            $scope.close = function() {
                $dialog_zero.close($dialog_zero);
                // location.reload();
            };
            $scope.reload = function() {
                location.reload();
            }
        }])
    }
});