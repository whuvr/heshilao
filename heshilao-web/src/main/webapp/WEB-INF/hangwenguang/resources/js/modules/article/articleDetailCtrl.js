define([
    'angular',
    
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('articleDetailCtrl',[
            '$state',
            '$stateParams',
            '$scope',
            'cService',
            '$location',
            '$rootScope',
            function( $state,$stateParams,$scope,cService,$location,$rootScope) {
        	// 'use strict';
           
            $scope.id = $stateParams.id;
            // $scope.webtipsid = $location.$$search.id;
            // $scope.webtipscorpId = $location.$$search.corpId;
            $scope.page = 1;
            $scope.pageSize = 1;
        	cService.ajax({  
                url: 'column/articles/'+$scope.id,      
            }).success(function(data, status, headers, config){
                $scope.articleData = data;
                
            }).error(function(data, status, headers, config){
                console.log(data);
            })
            $scope.page=function(id){
                cService.ajax({  
                    url: 'column/articles/'+id,      
                }).success(function(data, status, headers, config){
                    $scope.articleData = data;


                }).error(function(data, status, headers, config){
                    console.log(data);
                })
            }
            
                   
        }])
    }
});
