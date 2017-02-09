define([
    'angular'
], function(angular) {
  
    return function(app, elem, attrs, scope) {
        app.controller('messageCtrl',['$rootScope','$scope','cService','$cookieStore','G',function($rootScope,$scope,cService,$cookieStore,G) {
        	'use strict';
            $scope.url = 'user/message';
            $scope.page = 1;
            $scope.pageSize = 10;
            $scope.getRows = function(page,type){
                cService.ajax({
                    url : $scope.url,
                    method : 'post',
                    params : {
                        page : page,
                        rows : $scope.pageSize
                    }
                }).success(function(response){
                    $scope.messageData = response.rows;
                    $scope.total = response.total;
                    $scope.bAll = false;
                    /*$rootScope.user.isNotReadedMessage = response.total;
                    $cookieStore.put('curUser',$rootScope.user);*/
                    G.updateMessageAmount();
                })
            };

            function getCheckedRows(){
                var arr = [];
                angular.forEach($scope.messageData,function(item,index){
                    if (item.checked){
                        arr.push(item.id);
                    }
                });
                return arr;
            }

           


            $scope.signRow = function(flag){
                var arr = getCheckedRows();
                var title = '';
                switch(flag){
                    case 1:
                        title = '确定要将选中项删除吗？';
                    break;
                    case 2:
                        title = '确定将选中项标记为未读吗？';
                    break;
                    case 3:
                        title = '确定将选中项标记为已读吗？';
                    break;
                    default:
                    break;
                }
                if (arr.length > 0){
                    alert(title,{
                        buttons:[
                            {
                                type:'submit',
                                value: '确定',
                                callBack : function(){
                                    cService.ajax({
                                        url : $scope.url + '/' + arr.join(',') + '/' + flag,
                                        method : 'get'
                                    }).success(function(response){
                                         $scope.getRows($scope.page);
                                         //G.updateMessageAmount();
                                         $scope.bAll = false;
                                    })
                                }
                            },
                            {
                                type:'submit',
                                value: '取消',
                                className:'cancel'
                            }

                        ]
                    })
                     
                }else{
                    alert('至少选择一条消息');
                }
            }
            
            $scope.expandRow = function(item,expand){
               item.expand = expand;
               if (expand && item.isReaded == 1){
                    cService.ajax({
                        url : $scope.url + '/' + item.id
                    }).success(function(response){
                        item.content = response;
                        item.isReaded = 2;
                        G.updateMessageAmount();
                    })
                   
               }
            }
           
            $scope.checkedAll = function(checked){
                angular.forEach($scope.messageData,function(item,index){
                    item.checked = checked;
                })
                $scope.bAll = checked;
             
            }

            //initialize
            $scope.getRows(1);
            
           
        }])
        
    }
});