define([
    'angular'
], function(
) {
    return function(app, elem, attrs, scope) {
        app.controller('materialCtrl', ['$rootScope','$scope','cService', 'G',function( $rootScope,$scope,cService,G) {
        	$scope.domain = $rootScope.domain;        	
        	$scope.returnKey = {url:'',type:2};
        	$scope.returnKey.url = 'corp'+$rootScope.user.corpId+'/user'+$rootScope.user.id; 
        	$scope.show = {
        			form: false,
        			card: false,
        			verify:[ {
        					show:false,
        					imgUrl: [],
        					status: ["等待审核中","审核通过","审核失败"]
        				},
        				{
        					show:false,
        					imgUrl: [],
        					status: ["等待审核中","审核通过","审核失败"]
        				},
        				{
        					show:false,
        					imgUrl: [],
        					status: ["等待审核中","审核通过","审核失败"]
        				},
        				{
        					show:false,
        					imgUrl: [],
        					status: ["等待审核中","审核通过","审核失败"]
        				},
        				{
        					show:false,
        					imgUrl: [],
        					status: ["等待审核中","审核通过","审核失败"]
        				}]
        	}
            $scope.upload = [
        			{
        				imageUrl:[],
                		type: 1
        			},
        			{
        				imageUrl:[],
                		type: 2
        			},
        			{
        				imageUrl:[],
                		type: 3
        			},
        			{
        				imageUrl:[],
                		type: 4
        			},
        			{
        				imageUrl:[],
                		type: 5
        			}
            ];
            cService.ajax({
    			url:"user/certifications",
    			method:"get"
    		}).success(function(data,status){
    			angular.forEach(data.rows,function(item,index){
    				for(var i = 0; i<5 ; i++){
    					if(item.type==i+1&&item.status!=2){   
        					$scope.show.verify[i].show = true;
        					$scope.show.verify[i].imgUrl = item.imageUrl;
        					$scope.show.verify[i].status = $scope.show.verify[i].status[item.status];
        				}
    				}

    			})
    			
    		})
        	$scope.uploadKey = function(num,event){ 
        		cService.ajax({
        			url:"user/certifications",
        			method:"post",
        			params:$scope.upload[num]        			
        		}).success(function(data,status){
        			       			
        		})
        	}
            $scope.deleteUploadItem = function(item,num){
            	var index = G.getIndex(item);
            	item.parentElement.remove();
            	$scope.upload[num].imageUrl.splice(index);
            }
            //ie8兼容title
            function fixTitle(){
                var originalTitle = '融云p2p网络借贷系统';  
                if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
                    document.title = originalTitle;
                    document.attachEvent('onpropertychange', function (evt) {
                        evt = evt || window.event;
                        if(evt.propertyName === 'title' && document.title !== originalTitle) {
                            setTimeout(function () {
                               document.title = originalTitle;
                            }, 1);
                        }
                    });   
                }
            } 
            fixTitle();
        }])
    }
});