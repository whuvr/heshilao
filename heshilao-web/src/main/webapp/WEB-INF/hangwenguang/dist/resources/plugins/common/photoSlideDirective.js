define([angular],function(){
	return function(app, elem, attrs, scope){
		app.directive('photoSlide',function(){
	        return {
	            scope : {
	                dataUrl: '=dataUrl',
	            },            
	            restrict: 'A',
	            template :'<div class="photo-slide"><div class="img-wrap"><img ng-repeat="item in dataUrl" ng-src="item"/></div><div class="btn-wrap"><a ng-repeat="item in dataUrl" ng-click="slide($index)"></a></div></div>',
	            replace: true,
	            link: function($scope,$element,$attrs,$rootScope){	
	                console.log($scope.dataUrl);
	                
	            },
	        }
	    })
	}
})