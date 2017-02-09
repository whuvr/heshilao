define(['angular'],function(angular){
    return function(app,elem,attrs,scope){
        app.controller("borrowCtrl",['$scope','cService','$state','$cookieStore', '$interval', function($scope,cService,$state,$cookieStore,$interval){
            $scope.formData = {
                borrowType:'0',//0 个人; 1 企业
                companyName:'',
                linkman:'',
                linkmanPhone:'',
                amountBorrow:'',
                timeType:'0',
                timeLimit:'',
                province:'北京',
                city:'海淀区',
                validCode:'',
                imageCode:''
            }

            $scope.fieldSNStart;
            $cookieStore.put('inv-req-valid-code-countdown', 0);
            $scope.countdown =  $cookieStore.get( 'inv-req-valid-code-countdown' ) || 0;
            

            function timer( ) {
                var timer;
                if ($scope.countdown <= 0 ) return;
                timer = $interval(function(){
                    $scope.countdown --;
                    $cookieStore.put( 'inv-req-valid-code-countdown', $scope.countdown );
                    if( $scope.countdown <= 0 ){
                        $interval.cancel(timer);
                    }
                },1000);
            }

            timer();            
            
            $scope.getCode = function(){
                var $phone = $scope.form.phone;
                $phone.$setViewValue($phone.$viewValue);
                if($phone.$valid){
                    cService.ajax({
                        url:'borrows/sendCode',
                        params:{
                            phone:$scope.formData.linkmanPhone,
                            imageCode:$scope.formData.imageCode
                        }
                    }).success(function(data){
                        dom.setAttribute('disabled','disabled');
                        dom.setAttribute('class','register-getcode  disabled');
                        dom.value = "60秒后重新获取";
                        dom.setAttribute("disabled",true);
                        isStarting = true;
                        $scope.countdown = 60;
                        timer( );
                    }).error(function(data){
                        dom.setAttribute('disabled','disabled');
                        dom.setAttribute('class','register-getcode  disabled');
                        if ( data.code == "3005") {
                            $scope.callError = data.message;
                            $scope.serverError = true;
                        }
                    });
                    
                    
                }
                
            }
            $scope.submit = function(form){
                if(form.$valid){
                    cService.ajax({
                        method:'post',
                        url:'borrows/borrowApply',
                        params:$scope.formData
                    }).success(function(data){
                        alert('您好！您的借款申请已成功提交，请耐心等待业务人员联系您!',{
                            closeBtn:false,
                            buttons:[{
                                type:'button',
                                value:'确定',
                                callBack:function(){
                                    $state.go('home');
                                }
                            }]
                        });
         
                    });
                }
            }
            $scope.switchAction = function(index, value){
                $scope.fieldSNStart = -index;
            }
            //图片验证码
            var dom = document.getElementById("getCode"),timer;
            var isStarting = false;
            $scope.$on('$viewContentLoaded', function() {  
                dom = document.getElementById("getCode"); 
            }); 
            $scope.validImg =function(){
                var len = 0;
                if($scope.formData.imageCode){
                    len = $scope.formData.imageCode.length;
                }                
                $scope.serverError  = false;
                dom.setAttribute('disabled','disabled');
                dom.setAttribute('class','register-getcode  disabled');
                if ( len >= 4 ) {
                    cService.ajax({
                        url:'users/checkImageCode',
                        method:'post',
                        params:{
                            imageCode:$scope.formData.imageCode
                        }
                    }).success(function(data){  
                        if(data=="" && isStarting == false){
                            dom.removeAttribute('disabled');
                            dom.setAttribute('class','register-getcode');
                        }else{
                            dom.setAttribute('disabled','disabled');
                            dom.setAttribute('class','register-getcode  disabled');
                        }
                    }).error(function(data, status, headers, config) {
                        // console.log(data + status + headers + config)
                        dom.setAttribute('disabled','disabled');
                        dom.setAttribute('class','register-getcode  disabled');
                        if ( data.code == "3005") {
                            $scope.callError = data.message;
                            $scope.serverError = true;
                        };
                    });;
                };
            }
            $scope.valid='validCode?t='+Math.random();
            $scope.validCode = function(){
                $scope.valid='validCode?t='+Math.random();
            }
            $scope.gotoAnchor = cService.gotoAnchor;

        }])
    }
})