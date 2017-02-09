define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('loginCtrl', ['$scope','$rootScope','$state','$window','cService' ,'$location','$cookieStore','G',function( $scope,$rootScope,$state,$window,cService,$location,$cookieStore,G) {

            $scope.loginNum =false;
            $scope.serverError  = false;
            $scope.callError = '';
            $scope.user.password='';

            $scope.hideError = function(){
                $scope.serverError  = false;
            }
            $scope.checkInputIntFloat = function(oInput){
                if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,'')){
                oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
                }
            }

            $scope.valid='validCode?t='+Math.random();
            $scope.validCode = function(){
                if(document.getElementById('reg-validatecode')){
                    $scope.valid='validCode?t='+Math.random();
                }
            }
            cService.ajax({
                url:"users/needValidCode"
            }).success(function(data,status,headers,config){
                if(data=='false'){
                    $scope.loginNum = false;
                }else{
                    $scope.loginNum = true;
                }
                // angular.element(elem).removeClass('disabled');
            })
            $scope.sendAgain = function(){
                cService.ajax({
                    url:"users/sentActivateEmail?username="+ $scope.user.username,
                    method: "get"
                }).success(function(data,status,headers,config){
                    alert("邮件已发送");
                })
            }
            $scope.submit = function(event){
                var ele = angular.element(document.getElementById('password'));
                var val = fieldRSA(ele);
                $scope.serverError  = false;
                var postUser = {};
                if($scope.loginNum==false){
                    postUser ={
                        username: $scope.user.username,
                        password: val
                    }
                }else{
                    postUser ={
                            username: $scope.user.username,
                            password: val,
                            validCode: $scope.user.validCode
                        }
                }
                cService.ajax({
                    url:"users/login",
                    method: "post",
                    params: postUser
                }).success(function(data,status,headers,config){
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

                    if(data!=''){
                        $rootScope.user = data;
                        //G.addCookie("curUser",data);
                        $cookieStore.put("curUser",data);
                        $rootScope.login.beforeLogin = false;
                        $rootScope.login.afterLogin = true;
                        if($rootScope.$state.preState.name&&$rootScope.$state.preState.name.indexOf('article')!=-1||$rootScope.$state.preState.name.indexOf('newuser')!=-1){
                            $state.go('home'); return false;
                        }else if($rootScope.$state.preState.name&&$rootScope.$state.preState.name!='error'&&$rootScope.$state.preState.name.indexOf('login')==-1&&$rootScope.$state.preState.name.indexOf('register')==-1){
                            var state = $rootScope.$state.preState,nxtState = $rootScope.$state.nxtState;
                            if(!$rootScope.user.canBorrow&&(state.name=='account.borrowdetail'||state.name=='account.back'||state.name=='account.credit'||state.name=='account.material')){
                                $state.go('account.myaccount'); return false;
                            }else{
                                if(!$rootScope.$state.change&&(nxtState.name=='borrowDetail'||nxtState.name=='bondDetail')){
                                    $rootScope.$state.change = true;
                                    $state.go(nxtState.name,{ id:nxtState.nextPrams.id,userId:nxtState.nextPrams.userId }); return false;
                                }else{
                                    if($rootScope.user.userType==1&&(state.name.indexOf("account.bankCard")!=-1||state.name=="account.myinvest"||state.name=="account.payment"||state.name=="account.creditorRight"||state.name=="account.invitation"||state.name=="account.discount")){
                                        $state.go('account.myaccount'); return false;
                                    }else{
                                        $state.go(state.name,{ id:state.currentParams.id,userId:state.currentParams.userId }); return false;
                                    }
                                }
                            }
                        }else{
                            $state.go('account.myaccount'); return false;
                        }
                    }else{
                        if(!$scope.serverError){
                            $scope.callError = '用户名或者密码错误';
                            $scope.serverError  = true;
                        }
                        if(document.getElementById('reg-validatecode')){
                            $scope.validCode()
                        }
                    }
                    // angular.element(elem).removeClass('disabled');
                }).error(function(data,status,headers,config){
                    if(data.code == "8004"){
                        // $scope.sendAgainShow = true;
                    }else{
                        $scope.validCode();
                        $scope.callError = data.message;
                        $scope.serverError  = true;
                    }

                })
            }

        }])
    }
});