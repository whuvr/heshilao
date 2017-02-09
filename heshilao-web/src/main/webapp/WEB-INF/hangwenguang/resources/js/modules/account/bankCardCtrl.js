define([
    'angular'
], function() {
    return function(app, elem, attrs, scope) {
        app.controller('bankCardCtrl', ['$scope', 'cService', '$rootScope', '$window', '$location', '$state', 'popupDialog', '$cookieStore', function($scope, cService, $rootScope, $window, $location, $state, popupDialog, $cookieStore) {
            var curUser = $cookieStore.get("curUser");

            function getQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return r[2];
                return null;
            }
            $scope.identifyUrl = "";
            $scope.identify_cont = "这里是显示内容";
            $scope.identify_btn_value = "跳到第三方";
            $scope.status5 = false;
            $scope.cardBindding = false;
            $scope.realName = false;
            $scope.payMiddle = '';
            $scope.user = {
                bankNo: '',
                bank: ''
            };
            $scope.tab = {};
            $scope.change = false;
            $scope.formData = {};
            $scope.formData.name = $rootScope.user.realName;
            $scope.formData.province = '北京';
            $scope.formData.city = '海淀区';
            $scope.formData.account = '';
            $scope.formData.bank = 'ICBC';
            $scope.formData.confirmAccount = '';
            $scope.bankListView = false;
            $scope.bankList = [];
            $scope.insertNum = function($event, idnum) {
                var input = document.getElementById(idnum);
                if ($event.keyCode != 39 && $event.keyCode != 37) {
                    input.value = input.value.replace(/[^\d]/g, '');
                }
            }
            $scope.searchBank = function(cardId) {
                    $scope.bankListView = false;
                    cService.ajax({
                        url: "user/cardBind/repaceCard?id=" + cardId,
                        method: "get"
                    }).success(function(data, status, headers, config) {
                        $scope.bankList = data;
                        $scope.formData.bank = $scope.bankList[0].dictCode;
                        var len = $scope.bankList.length
                        for (var i = 0; i < len; i++) {
                            $scope.tab['on' + i] = false;
                        }
                        $scope.tab['on0'] = true;
                    })
                }
                // $scope.searchBank();

            $scope.selectBank = function(elem) {
                $scope.formData.bank = elem.item;
                $scope.bankListView = false;
            }
            $scope.checkBank = function(index) {
                $scope.formData.bank = $scope.bankList[index].dictCode;
                var len = $scope.bankList.length
                for (var i = 0; i < len; i++) {
                    $scope.tab['on' + i] = false;
                }
                $scope.tab['on' + index] = true;
            }
            $scope.setBank = function() {
                console.log($scope.selected);
            }
            $scope.changeBank = function(cardId) {
                $scope.searchBank(cardId);
                // $state.go('account.bankCard.formShow');
                $scope.change = true;
                $scope.selected = '';
            }
            $scope.init = function() {
                cService.ajax({
                    url: "user/cardBind/getBindBank"
                }).success(function(data, status, headers, config) {
                    // $state.go("account.bankCard.formShow")
                    // $scope.bindStatus = data.status;
                    $scope.bankLi = data;
                    if (data.length == 0) {
                        $state.go("account.bankCard.formShow") // $scope.searchBank();
                    } else {
                        $state.go('account.bankCard.cardShow');
                    }
                    cService.ajax({
                        url: 'account/paymentaccount/getNamePhone'
                    }).success(function(data, status, headers, config) {
                        for (var i = 0; i < $scope.bankLi.length; i++){
                            if(data.tppType!=1 && !($scope.bankLi[i].isopenfastPayment == 1 && data.tppType==2)){
                                $scope.hideblank = {"display" : "inline-block"}
                            }else{
                                $scope.hideblank = {"display" : "none"}
                            };
                        }
                    })
                })
            }
            //添加银行卡
            $scope.submitAdd = function() {
                alert("请前往新打开窗口去完成绑卡操作，绑卡完成前不要关掉本窗口！", {
                    buttons: [{
                        type: 'button',
                        value: '绑卡成功',
                        callBack: function() {
                            window.location.reload();
                        }
                    }, {
                        type: 'button',
                        value: '绑卡失败',
                        callBack: function() {
                            window.location.reload();
                        }
                    }]
                })
            }
            $scope.submitReplace = function(cardId, id) {
                if (id == 1) {
                    msg = "请前往新打开窗口去完成更换银行卡操作，更换银行卡完成前不要关掉本窗口！"
                    alert(msg, {
                        buttons: [{
                            type: 'button',
                            value: '绑卡成功',
                            callBack: function() {
                                window.location.reload();
                            }
                        }, {
                            type: 'button',
                            value: '绑卡失败',
                            callBack: function() {
                                window.location.reload();
                            }
                        }]
                    })
                } else if (id == 2) {
                    msg = "请前往新打开窗口去完成解绑银行卡操作，解绑银行卡完成前不要关掉本窗口！"
                    alert(msg, {
                        buttons: [{
                            type: 'button',
                            value: '解绑成功',
                            callBack: function() {
                                window.location.reload();
                            }
                        }, {
                            type: 'button',
                            value: '解绑失败',
                            callBack: function() {
                                window.location.reload();
                            }
                        }]
                    })
                }
            }
            $scope.submit = function(event) {
                    // var w = window.open(),
                    //     url, num = 0,
                    //     bank;
                    if ($scope.change) {
                        cService.ajax({
                            url: "user/cardBind/repaceCard?bank=" + $scope.formData.bank + "&bankNo=" + $scope.formData.account
                                // url:"user/cardBind/repaceCard?bankNo="+$scope.formData.account.replace(/\s/g,'')
                        }).success(function(data, status) {
                            $scope.identifyUrl = data;
                            $scope.identify_cont = "这里是显示内容";
                            $scope.identify_btn_value = "跳到第三方";
                            var artIdentify = popupDialog('template_identify', $scope, {
                                buttons: [],
                                closeBtn: true
                            })
                        }).error(function(data, status) {
                            alert(data.message);
                            w.close();
                        })
                    } else {
                        cService.ajax({
                            url: "user/cardBind/bindCard?bank=" + $scope.formData.bank + "&bankNo=" + $scope.formData.account
                                // url:"user/cardBind/bindCard?bankNo="+$scope.formData.account.replace(/\s/g,'')
                        }).success(function(data, status) {
                            $scope.identifyUrl = data;
                            $scope.identify_cont = "这里是显示内容";
                            $scope.identify_btn_value = "跳到第三方";
                            var artIdentify = popupDialog('template_identify', $scope, {
                                buttons: [],
                                closeBtn: true
                            })
                        }).error(function(data, status) {
                            $scope.identifyUrl = data;
                            $scope.identify_cont = "这里是显示内容";
                            $scope.identify_btn_value = "跳到第三方";
                            var artIdentify = popupDialog('template_identify', $scope, {
                                buttons: [],
                                closeBtn: true
                            })
                        })
                    }
                }
                //更换银行卡
            if (curUser.realNameStatus == 0) {
                $state.go("account.bankCard.formShow");
                alert('您尚未进行实名认证，请先去实名认证', {
                    closeBtn: false,
                    buttons: [{
                        type: 'button',
                        value: '去实名认证',
                        callBack: function() {
                            $state.go('account.payAccount');
                        }
                    }]
                });
            } else if (curUser.realNameStatus == 5 && (curUser.userType == 1 || curUser.userType == 2)) {
                $scope.status5 = true;
            } else if (curUser.realNameStatus == 3) {
                alert("温馨提示：如您未开启投标授权、还款转账授权、二次分配审核授权，</br>请先至第三方页面开启授权；若您已开启授权，无需重复操作。", {
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
            } else {
                $scope.init();
            }
            // $scope.submitReplace(145,1)

            // 开通快捷支付
            $scope.openQuickPayment = function() {
                alert('温馨提示：前往第三方开通快捷支付中，请勿关闭此页面。', {
                    buttons: [{
                        type: 'button',
                        value: '开通成功',
                        callBack: function() {
                            //window.location.reload();
                            $state.go('account.payAccount');
                        }
                    }, {
                        type: 'button',
                        value: '开通失败',
                        callBack: function() {
                            //window.location.reload();
                            $state.go('account.payAccount');
                        }
                    }]
                })
            }


        }])
    }

});
