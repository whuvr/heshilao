define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('errorCtrl',['$rootScope','$scope','$location','$stateParams',function($rootScope,$scope,$location,$stateParams) {
        	$scope.status = $stateParams.status;
        }])
    }
});