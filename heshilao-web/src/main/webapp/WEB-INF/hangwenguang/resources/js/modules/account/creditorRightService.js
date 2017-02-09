define([
	'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
		app.factory('creditorRightService', ['cService',function(cService) {
			return {
				sellBondDetail: function(id){
					return cService.ajax({
	                    url: 'bond/userBonds/sellBond',
	                    method: 'get',
	                    params:{
	                    	id: id
	                    }
	                })
				},
				boughtBondDetail: function(id){
					return cService.ajax({
	                    url: 'bond/userBonds/boughtBondDetail/' + id,
	                    method: 'get'
	                })
				}
			};
		}]);
	}
});