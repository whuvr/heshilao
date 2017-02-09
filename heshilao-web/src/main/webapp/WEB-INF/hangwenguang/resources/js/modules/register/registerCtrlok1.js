define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('registerCtrl', ['$scope','$rootScope','$state','$window','cService','$location','popupDialog','$cookieStore',function( $scope,$rootScope,$state,$window,cService,$location,popupDialog,$cookieStore)  {
            $scope.emailbox = false;
            $scope.formData = {
                username:'',
                phone:'',
                password:'',
                isAgree:'',
                validCode:'',
                userInviteCode:''
            };
            $scope.$parent.formData1 = {
                phone:'',
                username:''
            }
            var str = window.location.hash;
            if(str.indexOf('ui')>0){
                $scope.formData.userInviteCode = str.substr(str.indexOf('=')+1);
            }
            //错误信息配置
            $scope.serverError  = false;
            $scope.callError = '';
            $scope.hideError = function(){//隐藏提示
                $scope.serverError  = false;
            }

            // $scope.captcha = "validCode?t=" + Math.random();
            // var index;    //email-tip作索引

            //邮箱弹出的提示框
            // $scope.inputChange = function($event){
            //     var oInput = document.getElementById('emailBox');
            //     if(oInput.value.length==0){
            //         $scope.emailbox = false;
            //     }
            //     else{
            //         if(oInput.value.indexOf('@')<0){
            //             $scope.emailbox = true;
            //         }
            //         else{
            //             $scope.emailbox = false;
            //         }
            //     }

            // };
            
            //点击填充邮箱

            // $scope.fillEmail = function(postfix){
            //     if($scope.formData.email.replace(/\s+/,"")==""){
            //          $scope.formData.email = postfix;
            //     }
            //     else{
            //         $scope.formData.email = $scope.formData.email + postfix;
            //     }
            //     $scope.emailbox = false;
            // }
            // /*失去焦点时消失*/
            // angular.element(window).on('click',function(){        
            //     /*失去焦点时移除所有的active*/
            //     if( $scope.emailbox){
            //         var oEmailboxs =document.getElementById('email-tip').children;  //点击按钮时也会触发
            //         var $oEmailboxs = angular.element(oEmailboxs);
            //         for(var i=0;i<$oEmailboxs.length;i++ ){
            //             $oEmailboxs.eq(i).removeClass('active');
            //         }

            //         $scope.$apply('emailbox=false');
            //     }
                
            // })
            // /*按键*/
            // $scope.keydownFill = function($event){
            //     if($scope.emailbox){
            //         var oEmailboxs =document.getElementById('email-tip').children;
            //         var $oEmailboxs = angular.element(oEmailboxs);
            //         //往上移动
            //         if($event.keyCode==38){
            //             index = 6;
            //             for(var i=0;i<$oEmailboxs.length;i++){
            //                 if($oEmailboxs.eq(i).hasClass('active')){
            //                     index = i;
            //                     break;
            //                 }
            //             }
            //             if(index==0){
            //                 return;
            //             }
            //             else if(index<$oEmailboxs.length){
            //                 $oEmailboxs.eq(index).removeClass('active');
            //             }
            //             $oEmailboxs.eq(--index).addClass('active');
            //         }
            //         //往下移动
            //         else if($event.keyCode==40){
            //             index=-1;
            //             for(var i=0;i<$oEmailboxs.length;i++){
            //                 if($oEmailboxs.eq(i).hasClass('active')){
            //                     index = i;
            //                     break;
            //                 }
            //             }
            //             if(index>=$oEmailboxs.length-1){
            //                 return;
            //             }
            //             else if(index>-1){
            //                 $oEmailboxs.eq(index).removeClass('active');
            //             }
            //             $oEmailboxs.eq(++index).addClass('active');
            //         }
            //         //确定按钮
            //         else if($event.keyCode==13){
            //             var postfix;
            //             switch(index){
            //                 case 0: postfix = '@qq.com';
            //                         break;
            //                 case 1: postfix = '@163.com';
            //                         break;
            //                 case 2: postfix = '@126.com';
            //                         break;
            //                 case 3: postfix = '@sohu.com';
            //                         break;
            //                 case 4: postfix = '@sina.com';
            //                         break;
            //                 case 5: postfix = '@gmail.com';
            //                         break;
            //             };
            //             $scope.fillEmail(postfix);
            //         }

            //     }
            // }


            //获取验证码
            //  $scope.validCodeFn = function(){
            //     $scope.captcha = "validCode?t=" + Math.random();
            // };
            //$scope.validCode();
            //图片验证码
            $scope.validImg =function(){
                var len = $scope.formData.imgCode.length;
                $scope.serverError = false;
                if ( len >= 4 ) {
                    cService.ajax({
                        url:'users/checkImageCode',
                        method:'post',
                        params:{
                            imageCode:$scope.formData.imgCode
                        }
                    }).success(function(data){
                        var dom = document.getElementById("getcode");
                        if(data==""){
                            dom.removeAttribute('disabled');
                            dom.setAttribute('class','register-getcode');
                        }else{
                            dom.setAttribute('disabled','disabled');
                            dom.setAttribute('class','register-getcode  disabled');
                        }
                    }).error(function(data, status, headers, config) {
                        // console.log(data + status + headers + config)
                        if ( data.code == "3005") {
                            $scope.callError = data.message;
                            $scope.serverError = true;
                        } else {};
                    });;
                };
            }
            $scope.valid='validCode?t='+Math.random();
            $scope.validCode = function(){
                $scope.valid='validCode?t='+Math.random();
            }

            //注册协议点击
            $scope.userProtocol = function(){
                cService.ajax({
                    url:'users/getRegisterProtocolContext',
                    method:'get'
                }).success(function(data){
                    alert('<div style="height:450px;width:800px;overflow-y:scroll;text-align:left">'+data+'</div>',{
                        title:'<h1 id="register-protocol-title">协议内容</h1>',
                        buttons:[],
                        type:"no-icon"
                    });
                })
            }

            //getvalidcode
            $scope.getCode = function(form){
                var $phone = form.phone;
                $phone.$setViewValue($phone.$viewValue);
                var timer;
                if($phone.$valid){
                    cService.ajax({
                        url:'users/sendCode',
                        method:'post',
                        params:{
                            phone:$scope.formData.phone
                        }
                    }).success(function(data){

                    })
                    var oDiv = document.getElementById("getcode");
                    oDiv.value = "60秒后重新获取";
                    oDiv.setAttribute("disabled",true);
                    var i = 59;
                    timer = setInterval(function(){
                        if(i==0){
                            clearInterval(timer);
                            oDiv.value = "获取验证码";
                            oDiv.removeAttribute("disabled");
                        }else{
                            oDiv.value = i + '秒后重新获取';
                            i--;
                        }
                    },1000);
                }
            }

            //提交 
            $scope.submit = function(form,$event){
                // 禁止按钮
                var reg_btn = document.getElementById("register_button");
                reg_btn.setAttribute('disabled',true);
                //  禁止回车表单
                if($event.keyCode==13){
                    $event.keyCode=0;
                    return false;
                }
                if(form.$valid){
                    if($scope.formData.userInviteCode == ''){
                        delete $scope.formData.userInviteCode;
                    }
                    $scope.formData_encryption = {};
                    var ele = angular.element(document.getElementById('password'));   
                    var val = fieldRSA(ele);  
                    for(i in $scope.formData){
                        $scope.formData_encryption[i] = $scope.formData[i];
                    } 
                    $scope.formData_encryption.password = val;
                    console.log($scope.formData_encryption);
                    cService.ajax({
                        url:'users/register',
                        method:'post',
                        params:$scope.formData_encryption
                    }).success(function(data){
                        $rootScope.user = data;
                        $cookieStore.put("curUser",data);
                        $rootScope.login = {
                            beforeLogin: false,
                            afterLogin: true
                        }
                        reg_btn.removeAttribute('disabled');
                        $scope.$parent.formData1.email = $scope.formData.email;
                        $scope.$parent.formData1.username = $scope.formData.username;
                        $scope.formData = {
                            username:'',
                            phone:'',
                            password:'',
                            isAgree:1,
                            validCode:'',
                            userInviteCode:''
                        };
                        $scope.confirmPassword = "";
                        window.location.href =  '#/register/activateEmailSucc';
                    }).error(function(data){
                        reg_btn.removeAttribute('disabled');
                        // $scope.validCodeFn();
                    });
                }
                return  false;
            };

            
        }])

        // app.directive('ignorePattern', function() {
        //     return {
        //         restrict: 'A',
        //         require: 'ngModel',
        //         link: function(scope, elem, attr, ctrl) {
                    
        //             var validator = function(value) {
        //                 var reg = new RegExp(attr.ignorePattern);
        //                 var btrue = value && value.match(reg) ;                                        
        //                 ctrl.$setValidity('pattern', btrue);                                              
        //                 return value;
        //             };

        //             ctrl.$parsers.push(validator);
        //             ctrl.$formatters.push(validator);
        //         }
        //     };
        // });
        app.directive('ngTipbox',function(){
            return {
                restrict:'A',
                //require:'ngModel', 
                template:'<div id="tipBox"><p id="tipContent"></p><p id="tipArrow"></p></div>',
                link:function(scope,elem,attr,ctrl){
                    elem.css('display','none');
                    elem.children().children()[0].innerHTML = attr.ngTipbox;
                    var oInput = elem.parent().find('input');
                    oInput.on('focus',function(){
                        elem.css('display','block');
                    });
                    oInput.on('blur',function(){
                        elem.css('display','none');
                    }); 
                }
            }

        });
        


    }
});