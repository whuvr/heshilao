define([
	'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
		app.factory('payAccount', [function() {
			return {
			name: 'qian'
			};
		}]);
	}
});