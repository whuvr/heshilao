define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('newsCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
        	'use strict';
        	$scope.navDate = navDate[0].subState;
            $scope.page = 1;
            $scope.pageSize = 10;
            ($scope.pageSerch = function(page){
                cService.ajax({
                        method: 'post',
                        url: 'column/articles/2',
                        params:{
                            page: page,
                            rows: $scope.pageSize
                        }
                }).success(function(data, status, headers, config){
                    $scope.articleData = data.rows; 
                    $scope.total = data.total;                   
                }).error(function(data, status, headers, config){
                    console.log(data);
                })

            })(1)
        	
            
                   
        }])
    }
});
