define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('paymentCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
            'use strict';
            var previousState = 1;//prevous tab state
            $scope.navDate = navDate[0].subState;
            $scope.hidePage = false;//hide the pagingDirective
            $scope.page = 1;
            $scope.pageSize = 10;
            var tab = $scope.tab ={
                cont1 : true,
                cont2 : false,
            }
            $scope.pageSearch = function(page,status){
                tab.cont1 = true;
                tab.cont2 = false;
                cService.ajax({
                        method:"post",
                        url: 'borrowCollections',
                        params:{
                            status:0,
                            page:page,
                            rows:10
                        }
                }).success(function(data, status, headers, config){
                    $scope.total = data.total;
                    $scope.data = data.rows;
                }).error(function(data, status, headers, config){
                    console.log(data);
                })

            }
            $scope.pageSearchback = function(page,status){
                tab.cont1 = false;
                tab.cont2 = true;
                cService.ajax({
                        method:"post",
                        url: 'borrowCollections',
                        params:{
                            status:1,
                            page:page,
                            rows:10
                        }
                }).success(function(data, status, headers, config){
                    $scope.total = data.total;
                    $scope.data = data.rows;
                }).error(function(data, status, headers, config){
                    console.log(data);
                })

            }
            $scope.pageSearch(1,0);//初始化显示首页


        }])
    }
});