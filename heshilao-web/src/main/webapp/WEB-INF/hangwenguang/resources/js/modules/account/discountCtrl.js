define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('discountCtrl', ['$scope', 'navData', 'cService', function($scope, navDate, cService) {
            'use strict';
            $scope.navDate = navDate[0].subState;


            //红包
            // cp-list-my-red-packet指令已实现
            // $scope.packagePage = 1;
            // $scope.packagePageSize = 10;
            // $scope.packagePageSearch = function(page) {
            //     cService.ajax({
            //         method: "post",
            //         url: 'user/myfavourable',
            //         params: {
            //             page: page,
            //             rows: 10
            //         }
            //     }).success(function(data, status, headers, config) {
            //         $scope.packageData = data.rows;
            //         $scope.packageTotal = data.total;
            //         $scope.nowtime = new Date().getTime();
            //     }).error(function(data, status, headers, config) {
            //         console.log(data);
            //     })

            // }
            // $scope.x = -1;
            // $scope.y = -1;
            // $scope.change = function() {
            //         cService.ajax({
            //             method: "post",
            //             url: 'user/myfavourable',
            //             params: {
            //                 type: $scope.x,
            //                 usedStatus: $scope.y
            //             }
            //         }).success(function(data) {
            //             $scope.packageData = data.rows;
            //             $scope.packageTotal = data.total;
            //         })
            //     }
            // $scope.packagePageSearch(1);

            // 测试数据 2016-10-18 wyk@erongdu.com
            // var data = {"page":1,"rows":[{"id":1880,"corpId":13,"name":"好友邀请","userId":6510,"username":"tz06","amount":50,"type":1,"usedStatus":0,"addTime":1474371661000,"expiredTime":null,"time":0,"rate":100.00,"borrowType":null,"categoryId":null,"timeLimit":0,"useTime":1474371661000,"investId":null,"investType":0,"activityType":7,"usedStatusString":"未使用","activityTypeString":"邀请好友","typeString":"现金红包"},{"id":1874,"corpId":13,"name":"好友邀请","userId":6510,"username":"tz06","amount":5,"type":0,"usedStatus":0,"addTime":1474370862000,"expiredTime":1476962862000,"time":30,"rate":5.00,"borrowType":null,"categoryId":null,"timeLimit":0,"useTime":null,"investId":null,"investType":0,"activityType":7,"usedStatusString":"未使用","activityTypeString":"邀请好友","typeString":"虚拟红包"},{"id":1357,"corpId":13,"name":"每次投资","userId":6013,"username":"ldys01","amount":20,"type":1,"usedStatus":5,"addTime":1470639015000,"expiredTime":null,"time":0,"rate":100.00,"borrowType":null,"categoryId":null,"timeLimit":0,"useTime":1470639015000,"investId":null,"investType":0,"activityType":8,"typeString":"现金红包","usedStatusString":"参数异常","activityTypeString":"投资活动"},{"id":1828,"corpId":13,"name":"好友邀请","userId":6510,"username":"tz06","amount":50,"type":0,"usedStatus":5,"addTime":1474176387000,"expiredTime":1476768387000,"time":30,"rate":5.00,"borrowType":null,"categoryId":null,"timeLimit":0,"useTime":1476670989000,"investId":1965,"investType":0,"activityType":7,"usedStatusString":"参数异常","activityTypeString":"邀请好友","typeString":"虚拟红包"}],"total":7,"totalPage":1,"length":10,"offset":1};
            // $scope.packageData1 = data.rows; //packageData1

        }])
    }
});