define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('creditCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
        	'use strict';
        	$scope.navDate = navDate[0].subState;
            $scope.submitParams={
                amount : '',
                content: ''
            }
            $scope.submit = function(){
                     cService.ajax({
                            method:"post",
                            url: 'user/creditapply',
                            params: $scope.submitParams
                     }).success(function(data, status, headers, config){
                         $scope.data = data.rows;
                         alert('申请成功',{ 
                                buttons: [{                               
                                    type:'button',
                                    value: '确定',
                                    callBack: function(){ 
                                        location.reload(); 
                                        // $scope.submitParams = {amount: '', content: ''};
                                        // $scope.$apply();
                                    }
                                }]
                            });
                         reload();
                     }).error(function(data, status, headers, config){
                         console.log(data);
                     })
                
            } 
            $scope.page = 1;
            $scope.pageSize = 10;
        	$scope.pageSerch = function(page){
        		cService.ajax({
	                    url: 'user/creditapply',
                        params:{
                            page:page,
                            rows:10
                        }
	            }).success(function(data, status, headers, config){
	                $scope.data = data.rows;	                
	            }).error(function(data, status, headers, config){
	                console.log(data);
	            })

        	}
            function reload(){
                cService.ajax({
                    url: 'user/creditapply',
                    params:{
                        page:1,
                        rows:10
                    }
                }).success(function(data, status, headers, config){
                    $scope.data = data.rows;
                    $scope.total = data.total;
                    
                }).error(function(data, status, headers, config){
                    console.log(data);
                })
            }
        	reload();
        }])
    }
});