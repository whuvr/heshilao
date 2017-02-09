define( [
	'angular',
	'configs/navData',
	'configs/router',
	'configs/G',
	'configs/interceptor',
	'configs/httpService',
	'directives/common'
], function (angular, navData, router, G, interceptor,httpService,commonDirectives) {

	return function(app){
		G(app);
		navData(app);
		router(app);
		interceptor(app);
		httpService(app);
		commonDirectives(app);
	}
});

