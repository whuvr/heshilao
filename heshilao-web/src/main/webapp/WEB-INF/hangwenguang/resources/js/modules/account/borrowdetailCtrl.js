define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('borrowdetailCtrl', ['$scope','$rootScope','navData','cService','popupDialog', function( $scope,$rootScope,navDate,cService,popupDialog) {
          'use strict';
          $scope.navDate = navDate[0].subState;
          var selectedInvest = null;
          /*cService.ajax({
                    url: 'borrows/myBorrows',
                    params:{
                            userId:$rootScope.user.id,
                            page:1,
                            rows:10
                        }
            }).success(function(data, status, headers, config){
                $scope.data = data.rows;
                $scope.page = 1;
                $scope.total = data.total;
                $scope.pageSize = 10;
            }).error(function(data, status, headers, config){
                console.log(data);
            })*/

          $scope.status="";
          $scope.time=-1;

            //自定义时间
            $scope.changeTime =function(){
                if($scope.time=='')
                    $scope.searchDate = true;
                else{
                    $scope.searchDate = false;
                    var oA1 = document.getElementById("startTime");
                    var oA2 = document.getElementById("endTime");
                    oA1.value = "";
                    oA2.value = "";
                  }
            }
            var date = $scope.time,startTime,endTime;
            $scope.change = function(page,index){
                var oA1 = document.getElementById('startTime');
                var oA2 = document.getElementById('endTime');

                //点击页数
                if(index){   
                    
                }else{
                //搜索处理
                    date = $scope.time;
                    startTime = oA1.value;
                    endTime = oA2.value;
                }
                
               /* cService.ajax({
                        url: 'borrows/myBorrows',
                        params:{
                            userId:$rootScope.user.id,
                            page:page,
                            rows:10,
                            status:$scope.status,
                            timeSearch:date,
                            startTime:startTime,
                            endTime:endTime
                        }
                }).success(function(data, status, headers, config){
                    $scope.data = data.rows; 
                    $scope.total = data.total;  
                    if(index!=1){
                        $scope.page = 1;
                    }                   
                }).error(function(data, status, headers, config){
                    console.log(data);
                })*/

            }
            //查看
            $scope.seeDetail= function(invest){
                selectedInvest = invest;
                popupDialog('template_detail',$scope,{
                    type:"no-icon",
                    buttons: [],
                    css: {
                        width:'1000px'
                    },
                    ajax: function(){
                        var $dialog =  this;
                        return  cService.ajax({
                                    url : 'borrows/borrowProtocolPreview',
                                    method : 'get',
                                    params : {            
                                        borrowId: selectedInvest.id,
                                        isBorrowProtocol:1
                                    }
                                }).success(function(response){
                                    $dialog.prepend('<div id="protocol">' + response + '</div>');
                                    // $scope.protocolText = response;
                                    $scope.investmentId=selectedInvest.id
                                })
                    },
                    wrapClass: 'payment'
                });
            }
 
           
        }])
    }
});
