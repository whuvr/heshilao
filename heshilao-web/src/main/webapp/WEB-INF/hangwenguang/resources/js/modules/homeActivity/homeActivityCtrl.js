define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('homeActivityCtrl', ['$scope','$stateParams','navData','cService','$rootScope','$location','$cookieStore','$state', function( $scope,$stateParams,navDate,cService,$rootScope,$location,$cookieStore,$state,ngAnimate) {
        	'use strict';

           var id = $stateParams.id;
           //滚动图片
            cService.ajax({
                    url: 'column/scrollImages/getContent/'+id
            }).success(function(data, status, headers, config){
                $scope.data = data;
            }).error(function(data, status, headers, config){
                console.log(data);
            });


        }]);



    }
});