define(["angular"],function(t){return function(a,n,c,e){a.controller("withdrawlsCtrl",["$scope","httpService","cService","$window","$location","$cookieStore","$state","popupDialog",function(a,n,c,e,o,s,u,i){"use strict";a.identifyUrl="",a.tab={on0:!0},a.bankList=[],a.formData={cash:""};var r=s.get("curUser");0==r.userType?a.corp=!0:a.corp=!1,a.pageSize=5,a.checkBank=function(t){a.formData.bankId=a.bankList[t].id;for(var n=a.bankList.length,c=0;c<n;c++)a.tab["on"+c]=!1;a.tab["on"+t]=!0},a.cashAmount=function(){var n=t.element(document.getElementById("withdraw-input")),c=fieldRSA(n);a.formData.cashStr=c},a.pageSerch=function(t){c.ajax({url:"account/cash/cashList",params:{page:t,rows:5}}).success(function(t,n,c,e){a.data=t.rows,a.total=t.total})},a.pageSerch(1),n.get({url:"account/cash/getToken"}).success(function(t,n,c,e){a.token=t}),0==r.userType?0==r.realNameStatus?alert("您尚未实名认证，请先去实名认证",{closeBtn:!1,buttons:[{type:"button",value:"去实名认证",callBack:function(){u.go("account.payAccount")},closeBtn:!1}]}):c.ajax({url:"account/cash/getBank",method:"get"}).success(function(t){a.bankList=t,a.bankList.length>0?(a.isBank=!0,a.formData.bankId=a.bankList[0].id):alert("您尚未绑定银行卡，请先去绑定银行卡",{closeBtn:!1,buttons:[{type:"button",value:"去绑定银行卡",callBack:function(){u.go("account.bankCard")}}]})}):1!=r.userType&&2!=r.userType||(5==r.realNameStatus&&alert("请等待平台运营人员进行企业信息核实",{closeBtn:!0}),c.ajax({url:"account/paymentaccount/getNamePhone",type:"get"}).success(function(t){a.corpInfo=t,3==a.corpInfo.tppType&&c.ajax({url:"account/cash/getBank",method:"get"}).success(function(t){a.bankList=t,a.bankList.length>0?(a.isBank=!0,a.formData.bankId=a.bankList[0].id):alert("您尚未绑定银行卡，请先去绑定银行卡",{closeBtn:!1,buttons:[{type:"button",value:"去绑定银行卡",callBack:function(){u.go("account.bankCard")}}]})})})),n.get({url:"account/getBalanceAvailable"}).success(function(t,n,c,e){a.balanceAvailable=t}),n.get({url:"account/cash/getCashInfo"}).success(function(t,n,c,e){t.minCashAoumnt==-1?a.minCashAoumnt=1.01:t.minCashAoumnt<=0?a.minCashAoumnt=.01:a.minCashAoumnt=t.minCashAoumnt,a.isCheckCashAmount=t.isCheckCashAmount!=-1&&t.isCheckCashAmount})}])}});