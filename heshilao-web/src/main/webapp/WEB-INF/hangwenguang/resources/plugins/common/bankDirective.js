define([angular],function(){
	return function(app, elem, attrs, scope){
		'use strict';
		app.directive('bankCode',['$http',function($http){
			return{
				scope:{
					jsonUrl:'@jsonUrl',
					p2pBank:'=p2pBank'
				},
				restrict:'A',
				template: '<select ng-change="setCity()" class="form-control" ng-model="selected" ng-disabled="opProvinceDis" ng-options="list.dictCode for list in areas"></select>',
				link: function($scope,$element,$attrs){	
					$http({
						url:$scope.jsonUrl,
						headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
					}).success(function(data, status, headers, config) {
					    $scope.areas = data;
					    $scope.selected = $scope.areas[0];
					    $scope.p2pBank = $scope.selected.dictValue;	
					    $scope.setCity = function(){
					    		$scope.p2pBank = $scope.selected.dictValue;				    	
					    }					    
					})
					$scope.$watch("selected",[function(newValue,oldValue){
						if(newValue){
							$scope.p2pBank = $scope.selected.dictValue;
						}
					}])
				}
			}
		}])
	}
})