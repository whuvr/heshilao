define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('aboutusCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
        	'use strict';
        	$scope.navDate = navDate[0].subState;
            $scope.page = 1;
            $scope.pageSize = 1;
        	cService.ajax({
                    method: 'post',
                    url: 'column/articles/5',
            }).success(function(data, status, headers, config){
                $scope.articleData = data.rows[0];
            }).error(function(data, status, headers, config){
                console.log(data);
            })
            
            $scope.a = 111;
            $scope.b = 3;
                   
        }])

        /*app.directive('test1', function() {
            return {
                priority: 1,
                scope: {
                    
                },
                //template: '<p ng-transclude>{{a}}</p>',
                //transclude: true,
                link: function(scope, elm, attrs) {
                    scope.a = 2222;
                   //console.log(scope.a)
                }
            };
        })
        app.directive('test2', function() {
            return {
                priority: 2,
                link: function(scope, elm, attrs) {
                    //console.log(scope.a)
                }
            };
        })*/
    }
});
