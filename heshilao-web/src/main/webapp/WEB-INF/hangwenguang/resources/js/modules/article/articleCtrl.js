define([
    'angular'
], function(angular) {
  
    return function(app, elem, attrs, scope) {
        app.controller('articleCtrl',['$scope','cService','navData','$state','$rootScope',function($scope,cService,navData,$state,$rootScope) {
            'use strict';
            $scope.subNavs = [];

            angular.forEach(navData,function(item,i){
                if (item['state'] == 'article'){
                    $scope.subNavs = item.subState;
                }
            })
            // var
            //     stateColumn = $state.params.column,
            //     stateId = $state.params.id,
            //     stateItem = null;
            // $scope.navs = [];
            // $scope.column = '';
            // $scope.columnLevel1 = -1;
            // $scope.columnName = '';
            // $scope.columnType = 0;
            // $scope.articlesPage = 1;
            // $scope.articlesPageSize = 10;
            // $scope.articlesTotal = 0;
            // $scope.articles = [];
            // $scope.showDetail = false;
            // $scope.articleDetail = {};

            // $scope.navClick = function(clickItem, navs, selectFirst/*for router*/){
            //     var
            //         itemNumber;
               
            //     $scope.showDetail = false;
            //     angular.forEach(navs, function(item, key){
            //         if(item.hasChild){
            //             $scope.navClick(clickItem,item.children);
            //         }
            //         if(clickItem != item){
            //             item.open = false;
            //             item.selected = false;
            //         }else{
            //             item.selected = true;                                                                      
            //             if(item.hasChild){
            //                 item.open = !item.open;
            //             }else{
            //                 $scope.column = item.number;
            //                 $scope.columnLevel1 = item.number.substring(0,2);
            //                 $scope.columnName = item.name;
            //                 $scope.columnType = item.displayType;
            //                 //ajax
            //                 $scope.getColumnArticles(1, item.number, item.displayType);
            //             }
                        
            //         }
                    
            //     }) 

            //     if(selectFirst && clickItem.children && clickItem.children.length){
            //         $scope.navClick(clickItem.children[0], clickItem.children);
            //     }              
            // }

            // $scope.getColumnArticles = function(page, columnNumber, columnType, isNeedContent){
            //     $scope.articles = [];
            //     cService.ajax({
            //         url : 'column/articles/listPage',
            //         method : 'post',
            //         params : {
            //             page : page,
            //             rows : $scope.articlesPageSize,
            //             columnNumber: columnNumber,
            //             isNeedContent: isNeedContent || $scope.columnLevel1 == '04'|| $scope.columnLevel1 == '05' ? true : false
            //         }
            //     }).success(function(response){
            //         $scope.articles = response.rows;
            //         $scope.articlesTotal = response.total;
            //         if(columnType == 1 && $scope.articles && $scope.articles.length){
            //             getAticleDetail( $scope.articles[0].id);
            //         }
            //     })
            // }

            // $scope.showArticleDetail = function(id){
            //     $scope.showDetail = true;
            //     $scope.column = -1;
            //     $scope.columnLevel1 = -1;
            //     $scope.columnType = -1;
            //     $scope.columnName = '内容详情';               
            //     getAticleDetail(id);
            // }



            // function getAticleDetail(id){
            //     $scope.articleDetail = {};
            //     cService.ajax({
            //         url : 'column/articles/findContext',
            //         method : 'post',
            //         params : {
            //             id: id
            //         }
            //     }).success(function(response){
            //         $scope.articleDetail = response;
            //     })
            // }

            
            // (function getColumns(){
            //     cService.ajax({
            //         url : 'column/listPage',
            //         method : 'post'
            //     }).success(function(response){
            //        var navs = response.rows || [];
            //        angular.forEach(navs, function(item, key){
            //             var
            //                 pNumber = item.number.substring(0,2);
            //             if(item.number == stateColumn){
            //                 stateItem = item;
            //             }
            //             if(item.level == 1){
            //                 item.hasChild = false;
            //                 item.children = [];
            //                 angular.forEach(navs, function(item2, key){
            //                     if (item2.level == 2 && item2.number.substring(0,2) == pNumber ){
            //                         item.hasChild = true;                                
            //                         item.children.push(item2);
            //                     }
            //                 })
            //                 $scope.navs.push(item);
            //             }
            //        })
            //        if(stateItem){
            //             $scope.navClick(stateItem, $scope.navs, true);
            //             stateId && $scope.showArticleDetail(stateId)
            //        }

            //     })
            // })()
            

        }])
    }
});