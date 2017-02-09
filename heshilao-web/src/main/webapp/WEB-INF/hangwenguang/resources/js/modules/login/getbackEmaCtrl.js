define([
    'angular'
], function(
) {
    return function(app, elem, attrs, scope) {
        app.controller('getbackEmaCtrl', ['$scope','$rootScope','$state','$window','cService', function( $scope,$rootScope,$state,$window,cService) {
            //initialization
            $scope.getbackEma = true;
            $scope.getbackMob = true;

            $scope.formData1 ={
                email:'',
                validCode:''
            };
            $scope.formData2 ={
                email:'',
                validCode:''
            };
            //邮箱验证获取验证码
            // $scope.valid = "validCode?t=" + Math.random();
             $scope.validCodeFn1 = function(){
                $scope.valid = "validCode?t=" + Math.random();
            };
            $scope.validButton1 = function(){
                var oA = document.getElementById('getcode1');
                oA.setAttribute('disabled','false');
                oA.style.background = "#f8b651";
                oA.value = "60秒后重新获取";
                var str = "秒后重新获取";
                var i = 59;
                var timer= setInterval(function(){
                    oA.value = i + str ;
                    i--;
                    if(i<0){
                        clearInterval(timer);
                        oA.value = "获取验证码" ;
                        oA.removeAttribute('disabled');
                        oA.style.background = "#ff7d00";
                        return ;
                    }
                },1000);
            };
        	$scope.submit1 = function(form){
                var oBtn = document.getElementById("getbackPsw1");
                oBtn.setAttribute("disabled",true);
                if(form.$valid){
                    cService.ajax({
                        url:'users/getPassword',
                        method:'post',
                        params:$scope.formData1
                    }).success(function(){
                        oBtn.removeAttribute('disabled');
                        $scope.formData2.email = $scope.formData1.email;
                        $scope.formData1 ={
                            email:'',
                            validCode:''
                        };
                        $scope.getbackEma = false;
                        $scope.validButton1();
                    }).error(function(data){
                        oBtn.removeAttribute('disabled');
                        $scope.validCodeFn1();
                    });
                }
        	};

            $scope.getCode1 = function(){
                //给出验证码的代码段 ,且禁止按按钮
                cService.ajax({
                    url:'users/getPasswordCode',
                    params:{
                        email:$scope.formData2.email
                    },
                    method:'post'
                });
                $scope.validButton1();
            }
            $scope.submit2 = function(form){
                if(form.$valid){
                    cService.ajax({
                        url:'users/checkCode',
                        method:'post',
                        params:{
                            validCode: $scope.formData2.validCode
                        }
                    }).success(function(){
                        $scope.formData2 = {
                            validCode:''
                        };
                        $state.go("login.modifyPsw");
                    })
                }
            }
            
            //手机验证获取验证码
            $scope.formData3 = {
                phone:'',
                validCode:''
            };
            $scope.formData4 = {
                phone:'',
                validCode:''
            };
            // $scope.captcha = "validCode?t=" + Math.random();
            $scope.validCodeFn2 = function(){
                $scope.valid = "validCode?t=" + Math.random();
            };
            $scope.validButton2 = function(){
                var oA = document.getElementById('getcode2');
                oA.setAttribute('disabled','false');
                oA.style.background = "#f8b651";
                oA.value = "60秒后重新获取";
                var str = "秒后重新获取";
                var i = 59;
                var timer= setInterval(function(){
                    oA.value = i + str ;
                    i--;
                    if(i<0){
                        clearInterval(timer);
                        oA.value = "获取验证码" ;
                        oA.removeAttribute('disabled');
                        oA.style.background = "#ff7d00";
                        return ;
                    }
                },1000);
            };
            $scope.submit3 = function(form){
                var oBtn = document.getElementById("getbackPsw2");
                oBtn.setAttribute("disabled",true);
                if(form.$valid){
                    cService.ajax({
                        url:'users/getPassword',
                        method:'post',
                        params:$scope.formData3
                    }).success(function(){
                        oBtn.removeAttribute('disabled');
                        $scope.formData4.phone = $scope.formData3.phone;
                        $scope.formData3 = {
                            phone:'',
                            validCode:''
                        };
                        $scope.getbackMob = false;
                        $scope.validButton2();
                    }).error(function(data){
                        oBtn.removeAttribute('disabled');
                        $scope.validCodeFn2();
                    });
                }
            };
            

            $scope.getCode2 = function(){
                //给出验证码的代码段 ,且禁止按按钮
                cService.ajax({
                    url:'users/getPasswordCode',
                    params:{
                        phone:$scope.formData4.phone
                    },
                    method:'post'
                });
                $scope.validButton2();
            }
            $scope.submit4 = function(form){
                if(form.$valid){
                    cService.ajax({
                        url:'users/checkCode',
                        method:'post',
                        params:{
                            validCode:$scope.formData4.validCode
                        }
                    }).success(function(){
                        $scope.formData4 = {
                            validCode:''
                        };
                        $state.go("login.modifyPsw");
                    })
                }
            }
        }])
    }
});