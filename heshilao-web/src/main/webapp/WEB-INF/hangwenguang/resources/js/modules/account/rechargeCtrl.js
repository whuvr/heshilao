define([
  'angular'
], function(
  angular
) {
  return function(app, elem, attrs, scope) {
    app.controller('rechargeCtrl', ['$scope', 'httpService', '$http', 'cService', '$window', '$state', '$cookieStore', '$timeout', '$location', 'popupDialog',
      function($scope, httpService, $http, cService, $window, $state, $cookieStore, $timeout, $location, popupDialog) {
        'use strict';

        var curUser = $cookieStore.get("curUser");
        $scope.corpBank = 2;
        $scope.tab = {
          on0: true
        };
        $scope.bankList = [];
        $scope.innerData = [];
        $scope.isBank = false;
        $scope.pageSize = 5;
        $scope.page = 1;
        $scope.bankKind = "储蓄卡";
        $scope.formData = {
          cashStr: '',
          rechargeType: '1'
            // bankName:'',
            // id :''
        };
        $scope.formData1 = {
          cashStr: '',
          rechargeType: '0',
          bankCode: '',
          bankName: ''
            // gateId:''
        };
        //选择银行
        $scope.checkBank = function(index) {
            $scope.formData.id = $scope.bankList[index].id;
            var len = $scope.bankList.length
            for (var i = 0; i < len; i++) {
              $scope.tab['on' + i] = false;
            }
            $scope.tab['on' + index] = true;
          }
          //分页
        $scope.pageSerch = function(page) {
          httpService.get({
            url: 'account/recharge/rechargeList',
            params: {
              page: page,
              rows: 5
            }
          }).success(function(data, status, header, config) {
            $scope.innerData = data.rows;
            $scope.total = data.total;
          })
        };
        $scope.pageSerch(1);
        //表单提交前插入加密金额
        $scope.rechargeAmount = function() {
            var ele = angular.element(document.getElementById('recharge-input1'));
            var val = fieldRSA(ele);
            $scope.formData1.cashStr = val;
        };
        $scope.submitForm = function(form2) {
          var opts = document.getElementById('recharge_sel');

          var selectIndex = opts.selectedIndex;
          if (selectIndex >= 0) {
            $scope.formData1.bankName = opts.options[selectIndex].innerHTML;
            $scope.formData1.bankCode = opts.options[selectIndex].value;
          }
          if (form2.$valid) {
            var ele = angular.element(document.getElementById('recharge-input1'));
            var val = fieldRSA(ele);
            $scope.formData1.cash = '';
            ele.val('');
            $scope.formData1.cashStr = val;

            alert("请前往新打开窗口去完成充值操作，充值完成前不要关掉本窗口！", {
              buttons: [{
                type: 'button',
                value: '充值成功',
                callBack: function() {
                  window.location.reload();
                }
              }, {
                type: 'button',
                value: '充值失败',
                callBack: function() {
                  window.location.reload();
                }
              }]
            })
          }
        };

        // 银行卡
        // 如果没有实名，则进行实名
        // 企业或者担保人
        /*--
         * realNameStatus： 实名认证状态
         * 0 未开通
         * 1 已开通,已授权
         * 2 开通失败
         * 3 已开通,待授权
         * 4 待第三方审核（汇付）
         * 5 实名审核通过，但后台未登记信息（双乾企业）
         --*/
        if (curUser.realNameStatus == 3) {
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
        } else if (curUser.userType == 0) { 
	// 个人
          if (curUser.realNameStatus == 0) {
            alert("您尚未实名认证，请先去实名认证", {
              closeBtn: false,
              buttons: [{
                type: "button",
                value: "去实名认证",
                callBack: function() {
                  $state.go('account.payAccount');
                }
              }]
            })
          } else {
            httpService.get({
              url: 'account/recharge/getBank'
            }).success(function(data, status, headers, config) {
              // $scope.fastPay = data.isopenfastPayment;
              $scope.bankList = data.bankList;
              if (data.bankList.length > 0) {
                // $scope.tabIndex = $scope.fastPay ? 0 : 1;
                $scope.formData.id = data.bankList[0].id;
              }
            })
          }
        } else if (curUser.userType == 1 || curUser.userType == 2) { //企业或担保人
          if (curUser.realNameStatus == 5) {
            alert("请等待平台运营人员进行企业信息核实", {
              closeBtn: true
            })
          } else {
            $scope.isBank = true;
            // $scope.fastPay = false;
            // $scope.tabIndex = 1;
            $scope.corp = true;
          }
        }
        // 获取token
        httpService.get({
          url: 'account/recharge/getToken'
        }).success(function(data, status, headers, config) {
          $scope.token = data; // token
        });

        // 获取充值相关信息
        //   balance：可用余额
        //   minRechargeAmount：最小充值金额
        //   canFastRecharge： 0未开通快捷  1可以快捷支付 isFastPay
        //   isBoundCard 0未绑卡 1已绑卡
        var isFastPay;
        httpService.get({
          url: 'account/recharge/getRechargeInfo'
        }).success(function(data, status, headers, config) {
          $scope.balance = data.balanceAvailable;
          $scope.minRechargeAmount = data.minRechargeAmount;
          isFastPay = data.canFastRecharge;
            // 开通快捷支付提示
            if (curUser.realNameStatus == 1&&isFastPay == 0) {
              $scope.rechargeType = function(){
                if ($scope.formData1.rechargeType == 2) {
                  alert("请先绑定具有快捷支付功能的银行卡", {
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
              }
            }
        });

        //显示可用银行列表
        var
          serve,
          corpBank;

        serve = httpService.get({
          url: 'account/recharge/getRechargeBanksB2B'
        })
        serve.success(function(data) {
          serve = data;
          var oSel = document.getElementById('recharge_sel');
          for (var i = 0; i < data.length; i++) {
            var option = "<option></option>";
            if (!((curUser.userType == 1 || curUser.userType == 2) && data[i].typeCode == "bank_type_b2b")) {
              oSel.options.add(new Option(data[i].dictValue, data[i].dictCode));
            }
          }
        });

        // 修改银行列表
        // oCorpVal： 0 个人；4 企业
        $scope.changeCorpBank = function() {
          var oSel = document.getElementById('recharge_sel');
          var oCorpVal = document.getElementById('recharge_corp').value;
          var bankCardList = document.getElementById('bank-card-list');
          oSel.innerHTML = '';

          // 快捷支付隐藏银行卡列表
          if (oCorpVal == 2) {
            bankCardList.style.display = "none";
            // 开通快捷支付提示
            if (curUser.realNameStatus != 1&&isFastPay == 0) {
              alert("您尚未开通快捷支付，请先去开通", {
                closeBtn: false,
                buttons: [{
                  type: "button",
                  value: "开通快捷支付",
                  callBack: function() {
                    $state.go('account.bankCard');
                  }
                }]
              })
            }
          } else {
            bankCardList.style.display = "block";
          };

          if (oCorpVal == 0) {
            for (var i = 0; i < serve.length; i++) {
              var option = "<option></option>";
              if (serve[i].typeCode == "bank_type_b2c") {
                oSel.options.add(new Option(serve[i].dictValue, serve[i].dictCode));
              }
            }
          } else if (oCorpVal == 4) {
            for (var i = 0; i < serve.length; i++) {
              var option = "<option></option>";
              if (serve[i].typeCode == "bank_type_b2b") {
                oSel.options.add(new Option(serve[i].dictValue, serve[i].dictCode));
              }
            }
          }
        }


        // function getQueryString(name) {
        //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        //     var r = window.location.search.substr(1).match(reg);
        //     if (r != null) return r[2]; return null;
        // }
        // function getUrl(name){
        //     var num1 = name.indexOf('?');
        //     var num2 = name.indexOf('#');
        //     var str = name.substr(num1,num2-num1);

        //     return name.substr(0,num1) + name.substr(num2,name.length-num2) + str ;
        // }
        // if(getQueryString('ret_code')&&getQueryString('ret_code')=='0000'){
        //     alert(getUrl($location.absUrl()));
        //     // $window.location.href = getUrl($location.absUrl());
        // }
      }
    ]);
  }
})