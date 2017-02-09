define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('homeCtrl', ['$scope', 'navData', 'cService', '$rootScope', '$cookieStore', '$state', function($scope, navDate, cService, $rootScope, $cookieStore, $state, ngAnimate) {
            'use strict';
            $scope.loginNum = false;  //是否显示验证码
            $scope.serverError = false;
            $scope.sendAgainShow = false;
            $scope.callError = '';
            $scope.user.password = '';
            $scope.navDate = navDate[0].subState;
            $scope.bondData = [];
            $scope.investData = [];
            $scope.company = "";

            //验证码
            $scope.captcha = "validCode?t=" + Math.random();
            //获取验证码
            $scope.validCodeFn = function() {
                $scope.captcha = "validCode?t=" + Math.random();
            };
            //快速登录
            $scope.focus = function() {
                $scope.serverError = false;
                $scope.sendAgainShow = false;
            }
            $scope.validCode = function() {
                if (document.getElementById('reg-validatecode')) {
                    document.getElementById('reg-validatecode').src = 'validCode?t=' + Math.random();
                }
            }
            $scope.sendAgain = function() {
                cService.ajax({
                    url: "users/sentActivateEmail?username=" + $scope.user.username1,
                    method: "get"
                }).success(function(data, status, headers, config) {
                    alert("邮件已发送");
                })
            }
            $scope.submit = function(event) {
                $scope.serverError = false;
                var ele = angular.element(document.getElementById('password'));
                var val = fieldRSA(ele);
                var postUser = {};
                if ($scope.loginNum == false) {
                    postUser = {
                        username: $scope.user.username1,
                        password: val
                    }
                } else {
                    postUser = {
                        username: $scope.user.username1,
                        password: val,
                        validCode: $scope.user.validCode1
                    }
                }

                cService.ajax({
                    url: "users/login",
                    method: "post",
                    params: postUser
                }).success(function(data, status, headers, config) {
                    $scope.loginFalse = false;
                    $scope.loginSucc = true;
                    var lastLockCount = headers('lastlockcount');  //密码错误锁定次数
                    var isLock = headers('isLock');
                    var tempLockCount = parseInt(lastLockCount) + 1;
                    $scope.totalLockCount = $scope.totalLockCount > tempLockCount ? $scope.totalLockCount : tempLockCount;

                    if(headers('count')!=null){
                        $scope.loginNum = true; //显示验证码
                    }
                    if( isLock || lastLockCount != null && lastLockCount <= 0 ){
                        $scope.callError = '密码输错超过' + $scope.totalLockCount + '次，您的账户被锁定';
                        $scope.serverError = true;
                    }else if( lastLockCount && lastLockCount <= $scope.totalLockCount-2 ) {
                        $scope.callError = '您还有' + lastLockCount + '次密码输入机会';
                        $scope.serverError = true;
                    }

                    if (data != '') {
                        $rootScope.user = data;
                        //G.addCookie("curUser",data);
                        $cookieStore.put("curUser", data);

                        $rootScope.login.beforeLogin = false;
                        $rootScope.login.afterLogin = true;

                    } else {
                        if (!$scope.serverError) {
                            $scope.callError = '用户名或者密码错误';
                            $scope.serverError = true;
                        }
                        if (document.getElementById('reg-validatecode')) {
                            $scope.validCode()
                        }
                    }
                    // angular.element(elem).removeClass('disabled');
                }).error(function(data, status, headers, config) {
                    if (data.code == "8004") {
                        $scope.sendAgainShow = true;
                    } else {
                        $scope.validCode();
                        $scope.callError = data.message;
                        $scope.serverError = true;
                    }

                })
            }


            //滚动图片
            cService.ajax({
                url: 'column/scrollImages'
            }).success(function(data, status, headers, config) {
                $scope.data = data.rows;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });

            // 合作伙伴
            cService.ajax({
                url: 'column/partners'
            }).success(function(data, status, headers, config) {
                $scope.data1 = data.rows;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });

            //网站累计数据
            cService.ajax({
                url: 'statistics/count'
            }).success(function(data, status, headers, config) {
                $scope.countData = data;
                $scope.trading = data.sumInvestmentAmount;
                var array = $scope.trading.split(""); //字符分割
                $scope.strs = [];
                for (var i = 0; i < array.length; i++) {
                    $scope.strs.push({
                        value: array[i]
                    })
                }
            }).error(function(data, status, headers, config) {
                console.log(data);
            });

            //首页专区
            cService.ajax({
                url: 'borrows/prefecture'
            }).success(function(data, status, headers, config) {
                $scope.newPalyerData = data.newPalyerBorrow;
                $scope.recommendData = data.recommendBorrow;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });
            //体验金专区
            // cService.ajax({
            //     url: 'expBorrows'
            // }).success(function(data, status, headers, config) {
            //     $scope.expBorrowData = data;
            // }).error(function(data, status, headers, config) {
            //     console.log(data);
            // });
            // 债权列表
            cService.ajax({
                url: 'bond/bonds/bondList',
                params: {
                    status: -3,
                    page: 1,
                    rows: 4
                }
            }).success(function(data, status, headers, config) {
                $scope.bondData = data.rows;

            }).error(function(data, status, headers, config) {
                console.log(data);
            })
            // 投资列表
            cService.ajax({
                url: 'borrows/index'
            }).success(function(data, status, headers, config) {
                $scope.investData = data.rows.slice(0,3);

            }).error(function(data, status, headers, config) {
                console.log(data);
            })
            // 产品分类
            cService.ajax({
                url: 'borrows/selectforRecommendByCategory',
                params: {
                    page: 1,
                    rows: 4
                }
            }).success(function(data, status, headers, config) {
               var  rateYearMinA = [9.80,7.00,9.00,5.00],
                    rateYearMaxA = [11.80,10.00,11.00,10.00];
                var result = [{
                    name: "新手礼遇",
                    borrowName: ""
                }, {
                    name: "艺术品金融",
                    borrowName: ""
                }, {
                    name: "梦想计划",
                    borrowName: ""
                }, {
                    name: "创业车贷",
                    borrowName: ""
                }];

                var dataLength = data.length;
                if ( !data.length ) {
                    dataLength = 4;
                }

               for(var i=0; i< 4; i++){
                    for(var j = 0; j< dataLength; j++){
                        if ( data[j] && data[j].categoryName == result[i].name ){
                            result[i].rateYearMin = rateYearMinA[i];
                            result[i].rateYearMax = rateYearMaxA[i];
                            result[i].borrowName = data[j].borrowName;
                        }else{
                            result[i].rateYearMin = rateYearMinA[i];
                            result[i].rateYearMax = rateYearMaxA[i];
                        }
                    }
               }
                $scope.investData1 = result;
            }).error(function(data, status, headers, config) {
                console.log(data);
            })
            //投资排行榜
            cService.ajax({
                url: 'statistics/investRank'
            }).success(function(data, status, headers, config) {
                $scope.totalRankData = data.totalRank;
                $scope.monthRankData = data.monthRank;
            }).error(function(data, status, headers, config) {
                console.log(data);
            })

            //投资动态
            cService.ajax({
                url: 'investments/dynamiceInvest',
                method: "post"
            }).success(function(data, status, headers, config) {
                $scope.dynamiceData = data;
            }).error(function(data, status, headers, config) {
                console.log(data);
            })

            // 网站公告
            cService.ajax({
                url: 'column/articles/1',
                method: 'post',
                params: {
                    page: 1,
                    rows: 1
            //     columnNumber: '0200',
            //     isNeedContent: false
                }

            }).success(function(data, status, headers, config) {
                $scope.articleData = data.rows;

            }).error(function(data, status, headers, config) {
                console.log(data);
            })

            // 网站公告2
            cService.ajax({
                method: 'post',
                url: 'column/articles/1',
                params: {
                    page: 1,
                    rows: 5
                }
            }).success(function(data, status, headers, config) {
                $scope.articlesData = data.rows;

            }).error(function(data, status, headers, config) {
                console.log(data);
            })

            // 前沿资讯
            cService.ajax({
                method: 'post',
                url: 'column/articles/2',
                params: {
                    page: 1,
                    rows: 3
                }
            }).success(function(data, status, headers, config) {
                $scope.article2Data = data.rows;

            }).error(function(data, status, headers, config) {
                console.log(data);
            })

        }]);


    }
});