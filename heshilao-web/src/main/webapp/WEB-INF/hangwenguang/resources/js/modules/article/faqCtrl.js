define([
    'angular'
], function(angular) {
  
    return function(app, elem, attrs, scope) {
        app.controller('faqCtrl',['$scope','cService',function($scope,cService) {
        	'use strict';


            $scope.url = 'column/articles/3';
            $scope.page = 1;
            $scope.pageSize = 10;
            
            ($scope.getRows = function(page){
                
                cService.ajax({
                    url : $scope.url,
                    method : 'post',
                    params : {
                        page : page,
                        rows : $scope.pageSize,
                        keyword: $scope.keyword
                    }
                }).success(function(response){
                    $scope.data = response.rows;
                    $scope.total = response.total;
                })
            })(1);


           

            $scope.expandRow = function(item,expand){
               item.expand = expand;
            }

        }])
        
    }
});