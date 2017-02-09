define([
	'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
		app.factory('userData', [function() {
			return {
			name: 'qian'
			};
		}]);
	}
});