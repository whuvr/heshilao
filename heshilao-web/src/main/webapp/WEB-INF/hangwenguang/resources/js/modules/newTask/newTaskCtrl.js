define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('newTaskCtrl', ['$scope','navData','cService','$rootScope','$state','$http', function( $scope,navDate,cService,$rootScope,$state,$http) {
        	'use strict';
            $scope.user = $rootScope.user;
            $scope.init = {
                step: 0,
                register: 0,
                identify: 0,
                recharge: 0,
                invest: 0,
                invitation: 0
            }
            if($scope.user.id){
                $http({
                    url:"users/newTask",
                    method:"get",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                }).success(function(data,status){
                    $scope.init = data;
                }).error(function(data,status){
                })
            }


        }])
    }
});
