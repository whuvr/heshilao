define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('artCtrl', ['$scope','navData','cService','$rootScope','$state', function( $scope,navDate,cService,$rootScope,$state) {
        	'use strict';

            var $sharepage = angular.element(document.getElementById('sharepage'));
            $sharepage.css('display','none');
            $scope.$on('$destroy',function(){
                $sharepage.css('display','');
            });

            $scope.jump = function(){
                if($rootScope.user.id){
                    $state.go('account.myaccount');
                }else{
                    $state.go('login');
                }
            }

        }])
    }
});
