define([
    'angular'
], function(angular) {
    return function(app, elem, attrs, scope) {
        app.controller('rechargeAndCashCtrl', ['$scope', 'navData', 'cService', 'G', 'httpService', '$state', '$cookieStore', function($scope, navData, cService, G, httpService, $state, $cookieStore) {
            var curUser = $cookieStore.get("curUser");
            //分页参数
            $scope.page1 = 1;
            $scope.page2 = 1;
            $scope.pageSize = 5;
            $scope.formData1 = {
                status: '',
                time: '-1'
            };
            $scope.formData2 = {
                    status: '',
                    time: '-1'
                }
                //账户余额
            httpService.get({
                url: 'account/getBalanceAvailable'
            }).success(function(data, status, headers, config) {
                $scope.balanceAvailable = parseInt(data);

                var tem = (data - $scope.balanceAvailable).toFixed(2);
                $scope.balanceAvailable_decimal = tem.substr(tem.indexOf('.') + 1, 2);
            });
            //充值提现按钮
            $scope.jump = function(num) {
                    if (curUser.realNameStatus == 5 && (curUser.userType == 1 || curUser.userType == 2)) {
                        alert("请等待平台运营人员进行企业信息核实", {
                            closeBtn: true
                        })
                    } else if (num == 1) {
                        $state.go('account.recharge');
                    } else {
                        $state.go('account.withdrawals');
                    }
                }
                //自定义时间
            $scope.changeTime1 = function() {
                if ($scope.formData1.time == '')
                    $scope.searchDate1 = true;
                else {
                    $scope.searchDate1 = false;
                    var oA1 = document.getElementById("startTime");
                    var oA2 = document.getElementById("endTime");
                    oA1.value = "";
                    oA2.value = "";
                }
            }
            $scope.changeTime2 = function() {
                if ($scope.formData2.time == '')
                    $scope.searchDate2 = true;
                else {
                    $scope.searchDate2 = false;
                    var oA1 = document.getElementById("cash-startTime");
                    var oA2 = document.getElementById("cash-endTime");
                    oA1.value = "";
                    oA2.value = "";
                }
            }

            //分页
            var date = $scope.formData1.time,
                startTime, endTime;
            var date1 = $scope.formData2.time,
                startTime1, endTime1;
            $scope.change1 = function(page) {
                var page_index = arguments[1];
                var oA1 = document.getElementById('startTime');
                var oA2 = document.getElementById('endTime');

                //点击页数
                if (page_index) {

                } else {
                    //搜索处理
                    date = $scope.formData1.time;
                    startTime = oA1.value;
                    endTime = oA2.value;
                }

                cService.ajax({
                    url: 'account/recharge/rechargeList',
                    params: {
                        page: page,
                        rows: 5,
                        status: $scope.formData1.status,
                        time: date,
                        startTime: startTime,
                        endTime: endTime
                    }
                }).success(function(data, status, header, config) {
                    $scope.innerData1 = data.rows;
                    $scope.total1 = data.total;
                    if (page_index != 1) { //如果不是点击分页 页码就会跳转到第一页
                        $scope.page1 = 1;
                    }
                })
            }
            $scope.change1(1);
            $scope.change2 = function(page) {
                var page_index = arguments[1];
                var oA1 = document.getElementById('cash-startTime');
                var oA2 = document.getElementById('cash-endTime');

                //点击页数
                if (page_index) {

                } else {
                    //搜索处理
                    date1 = $scope.formData2.time;
                    startTime1 = oA1.value;
                    endTime1 = oA2.value;
                }

                cService.ajax({
                    url: 'account/cash/cashList',
                    params: {
                        page: page,
                        rows: 5,
                        status: $scope.formData2.status,
                        time: date1,
                        startTime: startTime1,
                        endTime: endTime1
                    }
                }).success(function(data, status, header, config) {
                    // 测试数据 2016-10-18 wyk@erongdu.com
                    // data = {"page":1,"rows":[{"token":null,"id":192,"corpId":13,"corpName":"杭文投","userId":6544,"username":"db02","realName":"殷素素","bankNo":"","bank":"","cash":1000.00,"receivedCash":1000.00,"fee":0.00,"status":1,"addTime":1476153987000,"addIP":"192.168.3.55","tradeNo":"1610110943303210","feeOwner":1,"type":null,"remark":null,"terminalType":"0","canCashAmount":null}],"total":1,"totalPage":1,"length":5,"offset":1};
                    $scope.innerData2 = data.rows;
                    $scope.total2 = data.total;
                    if (page_index != 1) {
                        $scope.page2 = 1;
                    }
                })
            }
            $scope.change2(1);
        }])
    }
})