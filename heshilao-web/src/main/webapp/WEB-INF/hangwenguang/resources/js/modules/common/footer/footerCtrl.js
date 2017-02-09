define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('footerCtrl', ['$scope', 'cService',function( $scope,cService) {            
        	$scope.getQuestion = function(){
        		cService.ajax({
        			url:"column/articles/3",
        		}).success(function(data,status,headers,config){
        			
        		})
        	}
        	$scope.legalStatement = function(){
        		cService.ajax({ 
        			url:"column/articles/4",
        		}).success(function(data,status,headers,config){
        			
        		})
        	}
        	$scope.logout = function(){
        		cService.ajax({
        			url:"/users/logout",
        			method: 'get'
        		}).success(function(data,status,headers,config){
        			
        		})
        	}
            $scope.showWechat = function(){
                $scope.wechat = true;
            }
            $scope.hideWechat = function(){
                $scope.wechat = false;
            }  
            $scope.goTop = function(){
                window.scrollTo(0,0);
            }          
        }])
    }
});