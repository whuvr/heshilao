define([
    'angular'
],function(
    angular
){
    return function(app,elem,attrs,scope){
        app.controller('accountRecordCtrl',['$scope','cService','navData',function($scope,cService,navData){
            'use strict';
            $scope.navDate = navData[0].subState;
            $scope.pageSize = 10;
            $scope.page = 1;
            $scope.time = -1;
            
            $scope.changeTime = function(){
                if($scope.time!=''){
                    $scope.searchDate = false;
                    var oA1 = document.getElementById("startTime");
                    var oA2 = document.getElementById("endTime");
                    oA1.value = "";
                    oA2.value = "";
                }
                else{
                    $scope.searchDate = true;
                }
            }
            
            var date = $scope.time,startTime,endTime;
            $scope.change = function(page,index){
                var oA1 = document.getElementById("startTime");
                var oA2 = document.getElementById("endTime");
                
                //点击页数
                if(index){   
                    
                }else{
                //搜索处理
                    date = $scope.time;
                    startTime = oA1.value;
                    endTime = oA2.value;
                }

                cService.ajax({
                    method:'post',
                    url : 'account/accountlogs',
                    params:{
                       page:page,
                       rows:10,
                       time:date,
                       startTime:startTime,
                       endTime:endTime
                    }
                }).success(function(data, status, header, config){
                    $scope.data = data.rows;
                    $scope.total = data.total;
                    if(index!=1){
                        $scope.page = 1;
                    }
                    for (var i=0;i<$scope.data.length;i++){
                        var str1 = $scope.data[i].remark;
                        var r1 = /([^\[]*?)(\[.*?\])(.*)/;
                        var m1 = r1.exec(str1);
                        if(m1!=null){
                            $scope.data[i].remark1 = m1[1];
                            $scope.data[i].remark2 = m1[2];
                            $scope.data[i].remark3 = m1[3];
                        };
                        var str2 = $scope.data[i].type;
                        var r2 = /^((?!体验金).)*$/;
                        var m2 = r2.exec(str2);
                        if(m2==null){
                        	$scope.data[i].url = true;
                        }else{
                        	$scope.data[i].url = false;
                        }
                    }
                })
            };
            $scope.change(1);

        }]);
    }
});

