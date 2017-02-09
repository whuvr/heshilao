define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('contactusCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
        	'use strict';
        	$scope.navDate = navDate[0].subState;
            cService.ajax({
                    method: 'post',
                    url: 'column/articles/6',
            }).success(function(data, status, headers, config){
                $scope.articleData = data.rows[0];
            }).error(function(data, status, headers, config){
                console.log(data);
            })
            
                   
        }])
    }
});
