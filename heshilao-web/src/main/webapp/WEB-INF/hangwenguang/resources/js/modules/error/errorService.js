define([
	'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
		app.factory('errorService', [function() {
			return {
			name: 'qian'
			};
		}]);
	}
});