define(["angular"],function(e){return function(t,r,a,o){t.controller("activitiesCtrl",["$rootScope","$scope","cService","$state","$cookieStore","$location","$interval",function(t,r,a,o,s,n,d){r.formData={username:"",phone:"",password:"",isAgree:"",validCode:"",userInviteCode:"",imageCode:"",userType:0},r.$parent.formData1={phone:"",username:""};var l=n.search().code;l&&(r.formData.sourceCode=l);var c=n.search().leid;c&&(r.formData.leid=c);var m=n.search().luid;m&&(r.formData.luid=m),r.serverError=!1,r.callError="",r.hideError=function(){r.serverError=!1};var u,f=document.getElementById("getcode"),g=!1;r.$on("$viewContentLoaded",function(){f=document.getElementById("getcode")}),r.validImg=function(){var e=0;r.formData.imageCode&&(e=r.formData.imageCode.length),r.serverError=!1,f.setAttribute("disabled","disabled"),f.setAttribute("class","register-getcode  disabled"),e>=4&&a.ajax({url:"users/checkImageCode",method:"post",params:{imageCode:r.formData.imageCode}}).success(function(e){""==e&&0==g?(f.removeAttribute("disabled"),f.setAttribute("class","register-getcode")):(f.setAttribute("disabled","disabled"),f.setAttribute("class","register-getcode  disabled"))}).error(function(e,t,a,o){f.setAttribute("disabled","disabled"),f.setAttribute("class","register-getcode  disabled"),"3005"==e.code&&(r.callError=e.message,r.serverError=!0)})},r.valid="validCode?t="+Math.random(),r.validCode=function(){r.valid="validCode?t="+Math.random()},r.getCode=function(e){var t=e.phone;t.$setViewValue(t.$viewValue),t.$valid&&a.ajax({url:"users/sendCode",method:"post",params:{phone:r.formData.phone,imageCode:r.formData.imageCode}}).success(function(e,t,a,o){f.setAttribute("disabled","disabled"),f.setAttribute("class","register-getcode  disabled"),f.value="60秒后重新获取",f.setAttribute("disabled",!0),g=!0;var s=59;u=setInterval(function(){0==s?(g=!1,clearInterval(u),f.value="获取验证码",f.removeAttribute("disabled"),f.setAttribute("class","register-getcode")):(f.value=s+"秒后重新获取",s--)},1e3),r.callError="",r.serverError=!1}).error(function(e,t,a,o){f.setAttribute("disabled","disabled"),f.setAttribute("class","register-getcode  disabled"),"3005"==e.code&&(r.callError=e.message,r.serverError=!0)})},r.submit=function(o,n){var d=document.getElementById("register_button");if(d.setAttribute("disabled",!0),13==n.keyCode)return n.keyCode=0,!1;if(o.$valid){""==r.formData.userInviteCode&&delete r.formData.userInviteCode,r.formData_encryption={};var l=e.element(document.getElementById("password")),c=fieldRSA(l);for(i in r.formData)r.formData_encryption[i]=r.formData[i];r.formData_encryption.password=c,a.ajax({url:"users/register",method:"post",params:r.formData_encryption}).success(function(e){clearInterval(u),t.user=e,s.put("curUser",e),t.login={beforeLogin:!1,afterLogin:!0},d.removeAttribute("disabled"),r.$parent.formData1.email=r.formData.email,r.$parent.formData1.username=r.formData.username,r.formData={username:"",phone:"",password:"",isAgree:1,validCode:"",userInviteCode:"",userType:0},r.confirmPassword="",window.location.href="#/register/activateEmailSucc"}).error(function(e){d.removeAttribute("disabled")})}return!1},a.ajax({url:"borrows/prefecture"}).success(function(e,t,a,o){r.newPalyerData=e.newPalyerBorrow,r.recommendData=e.recommendBorrow}).error(function(e,t,r,a){console.log(e)});var v=(e.element(document.getElementById("username")),e.element(document.getElementById("phone"))),b=e.element(document.getElementById("password"));e.element(document.getElementById("password2"));v.on("blur",function(e){e.preventDefault(),r.formData.username="a"+v.val()}),b.on("blur",function(e){e.preventDefault(),r.formData.password=b.val()});var p=e.element(document.getElementById("header")),y=e.element(document.getElementById("footerWrap")),D=e.element(document.getElementById("sharepage")),C=e.element(document.getElementById("content"));p.css("display","none"),y.css("display","none"),D.css("display","none"),C.css("padding-bottom","0"),r.$on("$destroy",function(){p.css("display",""),y.css("display",""),D.css("display","")})}])}});