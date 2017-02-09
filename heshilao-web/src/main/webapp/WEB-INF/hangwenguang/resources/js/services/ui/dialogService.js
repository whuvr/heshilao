define([
	'angular'
], function(angular) {
	var service = {
		confirm: function(mgs,fn){
			dialog = alert(mgs,{
	 			type: "prompt",
				buttons: [{			
					value: '确定',
					callBack: function() {
						typeof fn == 'function' && fn();								
					}
				},
				{
					value: '取消',
					className:'cancel'
				}],
				closeBtn : false
			})
		}
	}
	globalApp.service('dialogService', [function(cService) {
		
		return service;
	}]);
	
	return service;
});