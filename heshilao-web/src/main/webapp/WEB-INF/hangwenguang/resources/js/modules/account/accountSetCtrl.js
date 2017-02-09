define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('accountSetCtrl', ['$scope','$rootScope','$state','$window','cService','$cookieStore', '$location',function( $scope,$rootScope,$state,$window,cService,$cookieStore,$location) {

            // 隐藏邮箱
            function addX(num){
                var i,z;
                for(i=0,z='';i<num;i++){
                    z+= '*';
                }
                return z;
            }
            function hide(str,start,num){
                var i,str1;
                str1 = str.substr(0,start);
                return str1 + addX(num) + str.substr((num + str1.length));
            }
            function hideEmail(str){
                var num = str.indexOf('@');
                str1 = str.substr(0,num);
                return hide(str1,1,str1.length-2) + str.substr(num);
            }
            function getCodeButton(oA,value,timer){
                oA.setAttribute("disabled","true");
                var i=60;
                oA.value = "60秒后重新获取";
                oA.style.background = "#f8b651";
                timer.key = setInterval(function(){
                    i--;
                    oA.value = i + "秒后重新获取" ;
                    if(i==0){
                        clearInterval(timer.key);
                        oA.value = value;
                        oA.removeAttribute("disabled");
                        oA.style.background = "#ff7d00";
                    }
                },1000);
            }
            function cancelTimer(id,value,timer){
                clearInterval(timer.key);
                var oA = document.getElementById(id);
                oA.value = value;
                oA.removeAttribute("disabled");
                oA.style.background = "#ff7d00";
            }

            //initialization
            $scope.MobileModify = true;
            $scope.showPsw = false;
            $scope.bindEma = false;
            $scope.showEma = false;

            var curUser = $cookieStore.get("curUser");
            $scope.curUser = $cookieStore.get("curUser");
            $scope.email = curUser.email;
            if($scope.email == undefined || $scope.email == ''){
                $scope.isEmail = false;
            }else{
                $scope.isEmail = true;
            }
            if($scope.isEmail){
                $scope.email = hideEmail($scope.email);
            }
            if(curUser.realName){
                var num = curUser.realName.length;
                var z = hide(curUser.realName,1,num-1);
                $scope.idNo =z + '    ' + curUser.idNo;
            }
            $scope.phone = hide(curUser.phone,3,4);
            /**
             * 0 未认证
             * 1 已认证
             * 2 认证不通过
             * 3 已实名未授权
             * 4 正在审核中
             * 5 已认证待后台登记
             */
            if($rootScope.user.realNameStatus==1){
                $scope.idIdentify = 1;
                $scope.score = "100";
                $scope.grade="高";
                $scope.modifyMob = false;
                document.getElementById("progress").style.backgroundPosition="0px -15px";
                document.getElementById("safety-color").style.color="#70bc31";
            }else if($rootScope.user.realNameStatus==3){
                $scope.idIdentify = 3;
                $scope.grade="中";
                $scope.score = "75";
                $scope.modifyMob = true;
                document.getElementById("progress").style.backgroundPosition="0px 0px";
                document.getElementById("safety-color").style.color="#f39800";

            }else if($rootScope.user.realNameStatus==4){
                $scope.idIdentify = 4;
                $scope.grade="中";
                $scope.score = "75";
                $scope.modifyMob = true;
                document.getElementById("progress").style.backgroundPosition="0px 0px";
                document.getElementById("safety-color").style.color="#f39800";
            }else if($rootScope.user.realNameStatus==0){
                $scope.idIdentify = 0;
                $scope.grade="中";
                $scope.score = "75";
                $scope.modifyMob = true;
                document.getElementById("progress").style.backgroundPosition="0px 0px";
                document.getElementById("safety-color").style.color="#f39800";
            }else if($rootScope.user.realNameStatus==5){
                $scope.idIdentify = 5;
                $scope.grade="中";
                $scope.score = "75";
                $scope.modifyMob = true;
                document.getElementById("progress").style.backgroundPosition="0px 0px";
                document.getElementById("safety-color").style.color="#f39800";
            }else{
                $scope.idIdentify = 2;
                $scope.grade="中";
                $scope.score = "75";
                $scope.modifyMob = true;
                document.getElementById("progress").style.backgroundPosition="0px 0px";
                document.getElementById("safety-color").style.color="#f39800";
            }

            var timer1={
                key:''
            },
            timer2={
                key:''
            },
            timer3={
                key:''
            },
            timer4={
                key:''
            },
            timer5={
                key:''
            };
            $scope.formData = {
                password:'',
                newPassword:''
            };
            $scope.formData1 = {
                validCode:''
            };
            $scope.formData2 ={
                email:'',
                validCode:''
            };
            $scope.formData3 = {
                validCode:'',
                phone:curUser.phone
            };
            $scope.formData4 = {
                validCode:'',
                phone:''
            }
            $scope.formData5 = {
                email:'',
                validCode:''
            }
            $scope.formData7 = {
                corpName:'',
                businessLicenceCode:''
            }
            /***修改手机***/
            $scope.getcodeMob1 = function(){
                cService.ajax({
                    url:'users/sendPhoneCode',
                    method:'post',
                    params:{
                        phone:curUser.phone
                    }
                }).success(function(data){

                });
                var oA = document.getElementById('getcodeMob1');
                getCodeButton(oA,"获取验证码",timer1);
            };
            $scope.submit1 = function(form){
                if(form.$valid){
                    cService.ajax({
                    url:"users/phoneAuth",
                    method:"post",
                    params:$scope.formData3
                    }).success(function(data,status){
                        $scope.formData3 = {
                            validCode:'',
                            phone:''
                        };
                        $scope.MobileModify = false;
                        cancelTimer('getcodeMob1','获取验证码',timer1);
                    })
                }
            };
            $scope.getcodeMob2 = function(form){
                form.phone.$setViewValue(form.phone.$viewValue);
                if(form.phone.$valid){
                    cService.ajax({
                        url:'users/sendPhoneCode',
                        method:'post',
                        params:{
                            phone:$scope.formData4.phone
                        }
                    }).success(function(data){

                    });
                    var oA = document.getElementById('getcodeMob2');
                    getCodeButton(oA,"获取验证码",timer2);
                }
            };
            $scope.submit2 = function(form){
                if(form.$valid){
                    cService.ajax({
                    url:"users/phoneModify",
                    method:"post",
                    params:$scope.formData4
                    }).success(function(data,status){
                        cancelTimer('getcodeMob2','获取验证码',timer2);

                        $rootScope.user.phone = $scope.formData4.phone;
                        $cookieStore.put('curUser',$rootScope.user);
                        $scope.phone = hide($scope.formData4.phone,5,4);
                        $scope.formData3.phone = $scope.formData4.phone;
                        $scope.formData4 = {
                            phone:'',
                            validCode:''
                        };

                        $scope.MobileModify = true;
                        $scope.showMob = false;
                        confirm("手机号码修改成功！",{});
                    })
                }
            };


            /***修改密码***/
            $scope.submit3 = function(form){
                if(form.$valid){
                    var ele = angular.element(document.getElementById('password')),ele1 = angular.element(document.getElementById('passwordnew'));
                    var val = fieldRSA(ele),val1 = fieldRSA(ele1);
                    cService.ajax({
                    url:"users/updatePassword",
                    method:"post",
                    data:'password='+val+'&newPassword='+val1
                    // params:$scope.formData
                    }).success(function(data,status){
                        $scope.formData = {
                            password:'',
                            newPassword:''
                        };
                        $scope.newPsaaword2='';
                        $scope.showPsw = false;
                        confirm('修改登录密码成功',{

                        },2000);
                    })
                }
            };


            /***修改邮箱***/
            $scope.getcodeEma1 = function(){
                //发送验证码的代码
                cService.ajax({
                    url:'users/sendCheckCode',
                    method:'post',
                }).success(function(data){

                });

                var oA = document.getElementById('getcodeEma1');
                getCodeButton(oA,"发送验证邮件",timer3);
            };

            $scope.getcodeEma2 = function(form5){
                form5.email.$setViewValue(form5.email.$viewValue);
                if(form5.email.$valid){
                    cService.ajax({
                        url:'users/sendCheckCodeSecond',
                        method:'post',
                        data:'email='+$scope.formData2.email
                    }).success(function(){

                    });

                    var oA = document.getElementById('getcodeEma2');
                    getCodeButton(oA,"发送验证邮件",timer4);
                }
            };
            $scope.submit4 = function(form){
                if(form.$valid){
                    cService.ajax({
                    url:"users/checkCode",
                    method:"post",
                    data:"validCode="+$scope.formData1.validCode
                    }).success(function(data,status){
                        if(data){
                            cancelTimer('getcodeEma1','发送验证邮件',timer3);

                            $scope.emailFir=true;
                            $scope.emailSec=true;
                            $scope.formData1 = {
                                validCode:''
                            };
                        }

                    })
                }
            };

            $scope.submit5 = function(form){
                if(form.$valid){
                    cService.ajax({
                    url:"users/modifyEmail",
                    params:$scope.formData2,
                    method:"post"
                    }).success(function(data,status){
//                        clearInterval(timer);
//                        var oA = document.getElementById('getcodeEma2');
//                        oA.value = "发送验证邮件";
//                        oA.removeAttribute("disabled");
//                        oA.style.background = "#ff7d00";
                        cancelTimer('getcodeEma2','发送验证邮件',timer4);

                        $scope.emailFir = false;
                        $scope.emailSec = false;
                        $scope.showEma = false;

                        $rootScope.user.email = $scope.formData2.email;
                        var userData = $rootScope.user;
                        $cookieStore.put('curUser',userData);

                        $scope.email = hideEmail($scope.formData2.email);

                        //清空email和验证码框
                        $scope.formData2 ={
                            email:'',
                            validCode:''
                        }
                        confirm("修改邮箱成功",{});

                    })
                }
            };

            /***绑定邮箱***/
            $scope.getcodeEma3 = function(form){
                form.email.$setViewValue(form.email.$viewValue);
                if(form.email.$valid){
                    cService.ajax({
                        url:'users/sendBindCode',
                        method:'post',
                        data:'email='+$scope.formData5.email
                    }).success(function(){

                    });

                    var oA = document.getElementById('getcodeEma3');
                    getCodeButton(oA,"发送验证邮件",timer5);
                }
            };
            $scope.submit6 = function(form){
                if(form.$valid){
                    cService.ajax({
                    url:"users/emailAuth",
                    params:$scope.formData5,
                    method:"post"
                    }).success(function(data,status){
                        // clearInterval(timer);
                        // var oA = document.getElementById('getcodeEma3');
                        // oA.value = "发送验证邮件";
                        // oA.removeAttribute("disabled");

                        // oA.style.background = "#ff7d00";
                        cancelTimer('getcodeEma3','发送验证邮件',timer5);

                        $scope.bindEma = false;
                        $scope.isEmail = true;

                        $rootScope.user.email = $scope.formData5.email;
                        $rootScope.user.emailStatus = true;
                        var userData = $rootScope.user;
                        $cookieStore.put('curUser',userData);

                        $scope.email = hideEmail($scope.formData5.email);

                        //清空email和验证码框
                        $scope.formData5 ={
                            email:'',
                            validCode:''
                        }
                        confirm("邮箱绑定成功",{});

                    })
                }
            };
            $scope.submit7 = function(form){
                console.log(form.$valid);
                var w = $window.open(),url,num=0;
                if(form.$valid){
                    cService.ajax({
                    url:"/companyRegister",
                    method:"post",
                    params:$scope.formData7
                    }).success(function(data,status){
                        w.location = data;
                        // window.open(url+'?'+d);
                        alert("请前往新打开窗口去完成开通企业借款，开通企业借款完成前不要关掉本窗口！",{
                            buttons:[{
                                type:'button',
                                value: '开通成功',
                                callBack: function(){
                                    window.location.reload();
                                }
                            },{
                                type:'button',
                                value: '开通失败',
                                callBack: function(){
                                    window.location.reload();
                                }
                            }
                            ]
                        })


                    })
                }
            };
        }])
    }
});