define([
	'angular'
], function(angular) {
	return function(app, elem, attrs, scope) {
		app.factory('myaccount', [function() {
			return {
			name: 'qian'
			};
		}]);
	}
});