define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {

        app.controller('investCtrl', ['$state','$stateParams','$scope','cService','$location',function( $state,$stateParams,$scope,cService,$location) {

        	'use strict';
            $scope.investData=[];
            $scope.bondData=[];
            $scope.expBorrowsData=[];
            $scope.investType = $stateParams.type != undefined ? $stateParams.type : 0;

        	//$scope.navDate = navDate[0].subState;

            // 投资列表
        	$scope.investPage = 1;
            $scope.investPageSize = 12;
            $scope.investTotal = 0;
            $scope.value1 = $stateParams.status != undefined ? $stateParams.status : -1;
            $scope.value2=-1;
            $scope.value3=-1;
            $scope.value6=-1;
            $scope.value9=5;
            $scope.categoryId=-1;
            $scope.borrowCategories ={};
            cService.ajax({
                    method : 'get',
                    url: 'corp/borrowCategories'

            }).success(function(data, status, headers, config){
                $scope.borrowCategories = data;
            }).error(function(data, status, headers, config){
                console.log(data);
            })
        	$scope.investPageSearch = function(page){
                cService.ajax({
                        method : 'get',
                        url: 'borrows/invest',
                        params:{
                            page:page,
                            rows:12,
                            status:$scope.value1,
                            type:$scope.value2,
                            categoryId:$scope.categoryId,
                            rateYearSearch:$scope.value3,
                            timeLimitSearch:$scope.value6
                        }
                }).success(function(data, status, headers, config){
                    $scope.investData = data.rows;
                    $scope.investTotal = data.total;
                }).error(function(data, status, headers, config){
                    console.log(data);
                })

            }
            $scope.investPageSearch(1);
            $scope.switchAction1 = function(value){
                $scope.value1 = value;
                $scope.investPageSearch(1);
                // console.log(1);
            }
            $scope.switchAction2 = function(value){
                $scope.value2 = value;
                $scope.investPageSearch(1);
                // console.log(2);
            }
            $scope.switchAction3 = function(value){
                $scope.value3 = value;
                $scope.investPageSearch(1);
                // console.log(3);
            }
            $scope.switchAction6 = function(value){
                $scope.value6 = value;
                $scope.investPageSearch(1);
                // console.log(6);
            }
            $scope.switchAction9 = function(value){
                $scope.categoryId = value;
                $scope.investPageSearch(1);
                console.log(9);
            }

            // 债权列表
            $scope.bondPage = 1;
            $scope.bondPageSize = 12;
            $scope.bondTotal = 0;
            $scope.value4 = -3;
            $scope.value5 = -1;

            $scope.bondPageSearch = function(page){
                cService.ajax({
                        method : 'get',
                        url: 'bond/bonds/bondList',
                        params:{
                            page:page,
                            rows:12,
                            status:$scope.value4,
                            rateYearSearch:$scope.value5
                        }
                }).success(function(data, status, headers, config){
                    $scope.bondTotal = data.total;
                    $scope.bondData = data.rows;
                }).error(function(data, status, headers, config){
                    console.log(data);
                })

            }
            $scope.bondPageSearch(1);
            $scope.switchAction4 = function(value){
                $scope.value4 = value;
                $scope.bondPageSearch(1);
            }
            $scope.switchAction5 = function(value){
                $scope.value5 = value;
                $scope.bondPageSearch(1);
            }
            $scope.switchAction7 = function(value){
                $scope.value7 = value;
                $scope.investPageSearch(1)
            }
            // 体验标列表
            // $scope.expBorrowsPage = 1;
            // $scope.expBorrowsPageSize = 12;
            // $scope.expBorrowsTotal = 0;
            // $scope.value1 = $stateParams.status != undefined ? $stateParams.status : -1;
            // $scope.value3=-1;
            // $scope.value6=-1;
            // $scope.expBorrowsPageSearch = function(page){
            //     cService.ajax({
            //             method : 'get',
            //             url: 'expBorrows/getAll',
            //             params:{
            //                 page:page,
            //                 rows:12
            //             }
            //     }).success(function(data, status, headers, config){
            //         $scope.expBorrowsData = data.rows;
            //         $scope.expBorrowsTotal = data.total;
            //     }).error(function(data, status, headers, config){
            //         console.log(data);
            //     })

            // }
            // $scope.expBorrowsPageSearch(1);
            // $scope.switchAction1 = function(value){
            //     $scope.value1 = value;
            //     $scope.expBorrowsPageSearch(1);
            //     // console.log(1);
            // }
            // $scope.switchAction3 = function(value){
            //     $scope.value3 = value;
            //     $scope.expBorrowsPageSearch(1);
            //     // console.log(3);
            // }
            // $scope.switchAction6 = function(value){
            //     $scope.value6 = value;
            //     $scope.expBorrowsPageSearch(1);
            //     // console.log(6);
            // }
        }])
    }
});