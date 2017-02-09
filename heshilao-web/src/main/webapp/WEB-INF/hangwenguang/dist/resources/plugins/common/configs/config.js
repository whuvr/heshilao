define( [
	'angular',
	'jsCommon/configs/navData',
	'jsCommon/configs/router',
	'jsCommon/configs/G',
	'jsCommon/configs/interceptor',
	'jsCommon/configs/httpService',
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

