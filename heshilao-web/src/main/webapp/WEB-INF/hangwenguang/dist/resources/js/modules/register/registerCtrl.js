define(["angular"],function(e){return function(t,r,o,a){t.controller("registerCtrl",["$scope","$rootScope","$state","$window","cService","$location","popupDialog","$cookieStore",function(t,r,o,a,s,d,n,l){t.emailbox=!1,t.formData={username:"",phone:"",password:"",isAgree:"",validCode:"",userInviteCode:"",imageCode:"",userType:0},t.$parent.formData1={phone:"",username:""},t.bUserInviteCode=!1;var c=d.search().ui;c&&(t.formData.userInviteCode=c,t.bUserInviteCode=!0);var u=d.search().code;u&&(t.formData.sourceCode=u);var m=d.search().leid;m&&(t.formData.leid=m);var f=d.search().luid;f&&(t.formData.luid=f),t.serverError=!1,t.callError="",t.hideError=function(){t.serverError=!1};var v,g=document.getElementById("getcode"),p=!1;t.$on("$viewContentLoaded",function(){g=document.getElementById("getcode")}),t.validImg=function(){var e=0;t.formData.imageCode&&(e=t.formData.imageCode.length),t.serverError=!1,g.setAttribute("disabled","disabled"),g.setAttribute("class","register-getcode  disabled"),e>=4&&s.ajax({url:"users/checkImageCode",method:"post",params:{imageCode:t.formData.imageCode}}).success(function(e){""==e&&0==p?(g.removeAttribute("disabled"),g.setAttribute("class","register-getcode")):(g.setAttribute("disabled","disabled"),g.setAttribute("class","register-getcode  disabled"))}).error(function(e,r,o,a){g.setAttribute("disabled","disabled"),g.setAttribute("class","register-getcode  disabled"),"3005"==e.code&&(t.callError=e.message,t.serverError=!0)})},t.valid="validCode?t="+Math.random(),t.validCode=function(){t.valid="validCode?t="+Math.random()},t.userProtocol=function(){s.ajax({url:"users/getRegisterProtocolContext/"+t.formData.userType,type:"get"}).success(function(e){alert('<div style="height:450px;width:800px;overflow-y:scroll;text-align:left">'+e+"</div>",{title:'<h1 id="register-protocol-title">协议内容</h1>',buttons:[],type:"no-icon"})})},t.getCode=function(e){var r=e.phone;r.$setViewValue(r.$viewValue),r.$valid&&s.ajax({url:"users/sendCode",method:"post",params:{phone:t.formData.phone,imageCode:t.formData.imageCode}}).success(function(e,r,o,a){g.setAttribute("disabled","disabled"),g.setAttribute("class","register-getcode  disabled"),g.value="60秒后重新获取",g.setAttribute("disabled",!0),p=!0;var i=59;v=setInterval(function(){0==i?(p=!1,clearInterval(v),g.value="获取验证码",g.removeAttribute("disabled"),g.setAttribute("class","register-getcode")):(g.value=i+"秒后重新获取",i--)},1e3),t.callError="",t.serverError=!1}).error(function(e,r,o,a){g.setAttribute("disabled","disabled"),g.setAttribute("class","register-getcode  disabled"),"3005"==e.code&&(t.callError=e.message,t.serverError=!0)})},t.submit=function(o,a){var d=document.getElementById("register_button");if(d.setAttribute("disabled",!0),13==a.keyCode)return a.keyCode=0,!1;if(o.$valid){""==t.formData.userInviteCode&&delete t.formData.userInviteCode,t.formData_encryption={};var n=e.element(document.getElementById("password")),c=fieldRSA(n);for(i in t.formData)t.formData_encryption[i]=t.formData[i];t.formData_encryption.password=c,s.ajax({url:"users/register",method:"post",params:t.formData_encryption}).success(function(e){clearInterval(v),r.user=e,l.put("curUser",e),r.login={beforeLogin:!1,afterLogin:!0},d.removeAttribute("disabled"),t.$parent.formData1.email=t.formData.email,t.$parent.formData1.username=t.formData.username,t.formData={username:"",phone:"",password:"",isAgree:1,validCode:"",userInviteCode:"",userType:0},t.confirmPassword="",window.location.href="#/register/activateEmailSucc"}).error(function(e){d.removeAttribute("disabled")})}return!1}}]),t.directive("ngTipbox",function(){return{restrict:"A",template:'<div id="tipBox"><p id="tipContent"></p><p id="tipArrow"></p></div>',link:function(e,t,r,o){t.css("display","none"),t.children().children()[0].innerHTML=r.ngTipbox;var a=t.parent().find("input");a.on("focus",function(){t.css("display","block")}),a.on("blur",function(){t.css("display","none")})}}})}});