define([
	'angular'
], function(angular) {
	
	globalApp.service('investRankService', ['cService',function(cService) {
		service = {
			getList: function(opts){
				var
					$scope,
					name
				opts = angular.extend({
					url: opts.isSingle ? 'investments/rankings' : 'statistics/investRank',
					total: false,//total rank or month rank 
				},opts);
				$scope = opts.scope;
				name = opts.name;
				return cService.ajax(opts).success(function(data, status, headers, config){
	                if (angular.isObject($scope) && angular.isString(name)){
	                	$scope[name] = opts.isSingle ? data : (opts.total ? data.monthRank :  data.totalRank);
	                }
	                 
	            });
			}
		}
		return service;
	}]);
	
	return null;
});