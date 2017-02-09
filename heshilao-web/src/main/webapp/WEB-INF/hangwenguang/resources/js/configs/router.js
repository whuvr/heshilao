define([
	'angular'
], function () {

	return function(app){
		app.config(['$stateProvider', '$urlRouterProvider', 'navData', '$httpProvider', function($stateProvider, $urlRouterProvider, navData, $httpProvider){
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Request-With'];

			var states = [];	
			setState(navData);

			function setState(navData){
				angular.forEach(navData, function(item,index) {
					var setSubState = {};
					setSubState.name = item.name;					
					setSubState.state = item.state;
					setSubState.params = item.params;
					setSubState.url = '/' + item.state;
					for(var p in setSubState.params){
						setSubState.url = setSubState.url+'/:'+p
					}
					setSubState.template = '<div ng-component="modules/'+ item.state +'/'+item.state+'"></div>'	
					states.push(setSubState);

					if(item.subState&&item.subState.length>0){
						angular.forEach(item.subState,function(item,index){
							if(item.state){
								var setsubState_2 = {},indexPos;
								setsubState_2.name = item.name;				
								setsubState_2.state = item.state;
								setsubState_2.params = item.params;
								var indexPos = item.state.indexOf('.')+1;
								setsubState_2.url = '/'+item.state.substr(indexPos).replace(/\./g,'/');
								for(var p in setsubState_2.params){
									setsubState_2.url = setsubState_2.url+'/:'+p
								}
								setsubState_2.template = '<div ng-component="modules/'+ item.state.replace(/\./g,'/') +'"></div>'	
								states.push(setsubState_2);
							}							
							if(item.subState&&item.subState.length>0){
								angular.forEach(item.subState,function(item,index){	
									var setsubState_3 = {},indexPos;
									setsubState_3.name = item.name;				
									setsubState_3.state = item.state;
									setsubState_3.params = item.params;
									var indexPos = item.state.indexOf('.')+1;
									setsubState_3.url = '/'+item.state.substr(indexPos).replace(/\./g,'/');
									for(var p in setsubState_3.params){
										setsubState_3.url = setsubState_3.url+'/:'+p
									}
									setsubState_3.template = '<div ng-component="modules/'+ item.state.replace(/\./g,'/') +'"></div>'	
									states.push(setsubState_3);
								})
							}
						})
					}
			    });	
			}		
		    angular.forEach(states, function(item) {		    	
	    		$stateProvider.state(item.state, {	
	    			name: item.name,    			
					url: item.url,
					template: item.template,
					params:item.params
					// params: item.paramObj ? item.paramObj : {}
				});	
		    });	
		}])
		
	
	}
});