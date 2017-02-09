define([
    'angular'
], function(angular) {
  
    return function(app, elem, attrs, scope) {
        app.controller('payThirdCtrl',['$scope','$interval','cService','$location',function($scope,$interval,cService,$location) {
        	'use strict'; 


            var params = $location.$$search;
            var url = decodeURIComponent(params);
            
            for(var key in params){
                //alert($location.search()[key]);
                url = key;
            }

            //alert(href);

            var params = $location.$$search.params;
            // var orderId = $location.$$search.orderId;

            var formPay = document.getElementById('formPay');
            // var params = window.location.
            var params = location.href;
            params = params.substring(params.indexOf('?')+1);
            //alert(decodeURIComponent(params));
            //var href = decodeURIComponent(params);

             formPay.action = url;
             formPay.submit();

            // $scope.loading = true;
            // $scope.showCount = 0;
            // if (ret_code == '0000'){
            //     if(type==2){
            //         $scope.message="申请换卡成功";
            //         $scope.loading = false;
            //         $scope.operateSuccess = true;
            //         $scope.succ = true;
            //     }else if(type==4){
            //         $scope.message="申请提现成功";
            //         $scope.loading = false;
            //         $scope.operateSuccess = true;
            //         $scope.succ = true;
            //     }else if(type==7){
            //         $scope.message="申请还款成功";
            //         $scope.loading = false;
            //         $scope.operateSuccess = true;
            //         $scope.succ = true;
            //     }else{
            //         var timer = $interval(function(){
            //             $scope.showCount++;
            //             if($scope.showCount>3){
            //                 $interval.cancel(timer)
            //             }else{
            //                cService.ajax({
            //                     url :  'ufx/orderStatus',
            //                     method: 'get',
            //                     params:{
            //                         orderId:orderId,
            //                         type:type
            //                     }
            //                 }).success(function(data){
            //                     $scope.message=data.message;
            //                     $scope.loading = false;
            //                     $scope.operateSuccess = true;
            //                     $scope.succ = true;
            //                     if(data.status == 1 || data.status == -1){
            //                         $interval.cancel(timer)
            //                     }
            //                     if(data.status == 1){
            //                         $scope.succ = true;
            //                         $scope.error = false;
            //                     }
            //                     if(data.status == -1){
            //                         $scope.succ = false;
            //                         $scope.error = true;
            //                     }
            //                 }); 
            //             }
            //         },2000);
            //     }
                
            // }else{
            //     $scope.loading = false;
            //     $scope.operateErr = true;
            // }

        
            $scope.closeWindow = function(){
                //location.href="about:blank";
                window.close();
            }

            $scope.$on('$destroy',function(){
                $header.css('display','');
                $footer.css('display','');
                $footer2.css('display','');
            });
        }])


    }
});