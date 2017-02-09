define([angular],function(){
	return function(app, elem, attrs, scope){
		'use strict';
		app.directive('p2pArea',['$http',function($http){
			return{
				scope:{
					jsonUrl:'@jsonUrl',
					p2pProvince:'=p2pProvince',
					p2pCity: '=p2pCity'
				},
				restrict:'A',
				template: '<select ng-change="setCity( )" class="form-control" ng-model="selected" ng-disabled="opProvinceDis" ng-options="list.p for list in areas"></select><select id="city" class="form-control" ng-disabled="opCityDis" ng-model="selected1" ng-options="list.n for list in selected.c"></select>',
				link: function($scope,$element,$attrs){	
					$http({
						url:$scope.jsonUrl,
						headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
					}).success(function(data, status, headers, config) {
					    $scope.areas = data.citylist;
					    $scope.selected = $scope.areas[0];
					    $scope.selected1 = $scope.selected.c[0];
					    $scope.setCity = function(){
					    	$scope.selected1 = $scope.selected.c[0];
					    }					    
					})
					$scope.$watch("selected1",function(newValue,oldValue){
						if(newValue){
							$scope.p2pProvince = $scope.selected.p;
							$scope.p2pCity = $scope.selected1.n;
						}
					})
				}
			}
		}])
	}
})