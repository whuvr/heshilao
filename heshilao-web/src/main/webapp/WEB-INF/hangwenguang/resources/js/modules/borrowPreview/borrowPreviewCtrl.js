define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {


        app.controller('borrowPreviewCtrl', ['$state','$stateParams','$scope','cService','$location','popupDialog','$rootScope',function($state,$stateParams,$scope,cService,$location,popupDialog,$rootScope) {          	
          	 //query the borrow id from the location.search object
            // var id = $location.$$search.id;
            var id = $stateParams.id
            var userId = $location.$$search.userId;

            // var CONSTANT_REDPACKETPLACEHOLDER = '请选择红包';

            var borrowDetailUrl = 'borrows' + '/' + id+ '?preview=preview';
            var investmentListUrl = 'investments?preview=preview';
            var investBorrowUrl = 'investments?preview=preview';
            var borrowProtocolPreviewUrl = 'borrows/borrowProtocolPreview?preview=preview';
            //get the borrow detail
            (function(){
                cService.ajax({
                    url : borrowDetailUrl,
                    method : 'get'
                }).success(function(response){
                    $scope.borrowData = response;
                    //$scope.investmentList = response.borrowInvestmentRes ? response.borrowInvestmentRes : [];

                    if(response.status >= 3){
                        $scope.investStatus = 2;
                    }else if ($rootScope.user.id == response.userBaseInfoRes.userId){
                        $scope.investStatus = 3;
                    }else{
                        $scope.investStatus = 1;
                    }
                    //$scope.canInvest = response.status < 3;
                    $scope.userinfo = response.userBaseInfoRes ? response.userBaseInfoRes : {};
                    $scope.borrowImageList = response.borrowImageList ? response.borrowImageList : [];
                    $scope.imagePagingAction(1);

                    $scope.headPortraitUrl =  
                        ($scope.userinfo.headPortraitUrl != 'default-protrait.png' 
                            ? $rootScope.domain + $scope.userinfo.headPortraitUrl + '?imageView2/1/w/90/h/90&t='  +  new Date().getTime() 
                            : 'resources/images/user-portrait.gif') + '?t=' + new Date().getTime();

                    //if remain account less than the min invest value, disabled user input and set 'investValue' to be as much as remain account
                    if ($scope.borrowData.amountBorrow - $scope.borrowData.amountInvested <= $scope.borrowData.investMin){
                        $scope.disabledInput = true;
                        $scope.investValue = $scope.borrowData.amountBorrow - $scope.borrowData.amountInvested;
                    }
                })

            })();


            //display borrow image list
            $scope.imagePageSize = 3;  
            $scope.imageData = [];        
            $scope.imagePagingAction = function(page){ 
                $scope.imageData = [];             
                for(var i = (page - 1) * $scope.imagePageSize; i < page * $scope.imagePageSize ; i++){
                    if (!$scope.borrowImageList[i]) break;
                    $scope.imageData.push($scope.borrowImageList[i]);
                }  
                $scope.imageTotal = $scope.borrowImageList.length; 

            }


            //dispaly invest record
            $scope.recordPage = 1;
            $scope.recordPageSize = 10; 
            $scope.recordTotal = 0;                                
            ($scope.getInvestmentList = function(page){
                cService.ajax({
                    url : investmentListUrl,
                    method : 'get',
                    params : {
                        page : page,
                        rows : $scope.recordPageSize,
                        borrowId: id
                    }
                }).success(function(response){
                    $scope.investmentList = response.rows;
                    $scope.recordTotal = response.total;
                    console.log(response.rows)
                })
            })(1);

            $scope.reload = function(){
                location.reload();
            }
            $scope.returnWindow = function(){
               history.go(-1);
            }

            $scope.gotoAnchor = cService.gotoAnchor;

        }])
    }
});