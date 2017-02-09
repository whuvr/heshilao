define([
    'angular'
], function() {
    return function(app, elem, attrs, scope) {
        app.controller('accountCtrl', ['$scope', 'navData', '$rootScope', 'cService', '$cookieStore', 'G', function($scope, navDate, $rootScope, cService, $cookieStore, G) {
            'use strict';
            if ($rootScope.user.isNotReadedMessage) {
                $scope.isNotReadedMessage = $rootScope.user.isNotReadedMessage
            }
            $scope.navDate = [];

            var bPath;//判断充值和提现页面

            $scope.getTime = function() {
                var time = new Date();
                return time.getTime();
            }
            //4 表示拥有子菜单的选项的数量
            $scope.subHide = function() {
                for (var i = 1; i <= 4; i++) {
                    var elem = angular.element(document.getElementById("item-" + i));
                    elem.removeClass("active");
                    elem.removeClass("sub-show");
                    document.getElementById("has-sub-" + i).style.display = "none"
                }
            }
            $scope.setClass = function(index) {
                var elem = angular.element(document.getElementById("item-" + index));
                for (var i = 1; i <= 4; i++) {
                    var elem1 = angular.element(document.getElementById("item-" + i));
                    elem1.removeClass("sub-show");
                }
                elem.addClass("sub-show");
                elem.addClass("active");
                document.getElementById("has-sub-" + index).style.display = "block";
            }
            $scope.subShow = function(index) {
                for (var i = 1; i <= 4; i++) {
                    var elem = angular.element(document.getElementById("item-" + i));
                    elem.removeClass("active");
                    document.getElementById("has-sub-" + i).style.display = "none"
                }
                angular.element(document.getElementById("item-" + index)).addClass("active");
                document.getElementById("has-sub-" + index).style.display = "block";
            }
            $scope.init = function() {
                var elems = G.getElement(document.getElementById("main-nav"), "child-item", "a");
                // var elems = document.getElementsByClassName("child-item");
                for (var i = 0; i < elems.length; i++) {
                    if (elems[i].getAttribute("ui-sref") == $rootScope.$state.current.name) {
                        elems[i].click();
                    }
                }
            }
            $scope.$on('$viewContentLoaded', function() {
                setTimeout(function() {
                    $scope.init();
                }, "500");
            });

            if (!$rootScope.user.id && !!$cookieStore.get("curUser")) {
                $rootScope.user = $cookieStore.get("curUser");
            }

            // 最近登录
            cService.ajax({
                url:'users/getLastLoginTime'
            })
            .success(function (data) {
                $rootScope.user.lastLoginTime = data;
            });

            //已开通借款
            cService.ajax({
                url:'account/paymentaccount/getNamePhone',
                type:'get'
            }).success(function(data){
                $rootScope.corpInfo = data;
                if ($rootScope.user.canBorrow) {
                    angular.forEach(navDate[0].subState, function(item, index) {
                        var curArr = item.className.split(' ');
                        if (curArr.indexOf('borrow') != -1) {
                            item.className = "borrow"
                        }
                        // 判断企业账号
                        if ((item.name == "好友邀请" || item.name == "我的优惠" || item.name == "投资管理") && $rootScope.user.userType == 1) {
                            item.className = "hide";
                        }
                        // 担保人只能进行担保还款，不能投资，不能借款
                        // 已开通借款，隐藏担保管理
                        // if ( item.name == "担保管理" ) {
                        //     item.className = "hide";
                        // }
                        // if (curArr.indexOf('guarantee') != -1) {
                        //     item.className = "guarantee hide"
                        // }

                        // 联动不需要绑卡，隐藏银行卡页面
                        if (item.name == "资金管理" && $rootScope.corpInfo.tppType ==1 && ($rootScope.user.userType == 1 || $rootScope.user.userType == 2 )) {
                            angular.forEach(item.subState, function(subItem, index) {
                                if (subItem.name == "银行卡") {
                                    subItem.className = "hide";
                                }
                            })
                        }
                        if ((item.name == "好友邀请" || item.name == "我的优惠" || item.name == "投资管理") && $rootScope.user.userType == 0) {
                            item.className = "";
                        }
                        if (item.name == "资金管理" && $rootScope.user.userType == 0) {
                            angular.forEach(item.subState, function(subItem, index) {
                                if (subItem.name == "银行卡") {
                                    subItem.className = "";
                                }
                            })
                        }
                        if (item.name == "资金管理" && $rootScope.user.userType == 2 && $rootScope.corpInfo.tppType ==1) {
                            angular.forEach(item.subState, function(subItem, index) {
                                if (subItem.name == "银行卡") {
                                    subItem.className = "hide";
                                }
                            })
                        }
                    })
                    $scope.navDate = navDate[0].subState;
                } else {
                // 未开通借款账户
                    angular.forEach(navDate[0].subState, function(item, index) {

                        var curArr = item.className.split(' ');
                        if (item.name == "好友邀请" || item.name == "我的优惠" || item.name == "投资管理") {
                            if ( $rootScope.user.userType == 1 || $rootScope.user.userType == 2 ) {
                                item.className = "hide";
                            }else if($rootScope.user.userType == 0){
                                item.className = "";
                            }
                        }
                        // 隐藏担保管理
                        // if ( item.name == "担保管理" && $rootScope.user.userType != 2 ) {
                        //     item.className = "hide";
                        //     if (curArr.indexOf('guarantee') != -1) {
                        //         item.className = "guarantee hide"
                        //     }
                        // }
                        // // 担保账户隐藏借款管理
                        // if (item.name == "借款管理" && $rootScope.user.userType == 2) {
                        //     item.className = "hide";
                        // }

                        if (curArr.indexOf('borrow') != -1) {
                            item.className = "borrow hide"
                        }
                        // 联动不需要绑卡，隐藏银行卡页面
                        if (item.name == "资金管理") {
                            angular.forEach(item.subState, function(subItem, index) {
                                if (subItem.name == "银行卡") {
                                    if ($rootScope.corpInfo.tppType ==1  &&  ($rootScope.user.userType == 1 || $rootScope.user.userType == 2) ) {
                                        subItem.className = "hide";
                                    }else if ( $rootScope.user.userType == 0 ) {
                                        subItem.className = "";
                                    }
                                }
                            })
                        }
                    })
                    $scope.navDate = navDate[0].subState;
                }
                // 隐藏担保管理
                angular.forEach(navDate[0].subState, function(item, index) {
                    var curArr = item.className.split(' ');
                    if ( item.name == "担保管理" && $rootScope.user.userType != 2 ) {
                        item.className = "hide";
                        if (curArr.indexOf('guarantee') != -1) {
                            item.className = "guarantee hide"
                        }
                    }
                })
                $scope.navDate = navDate[0].subState;
            })
            $scope.navDate = navDate[0].subState;

        }])
    }
});