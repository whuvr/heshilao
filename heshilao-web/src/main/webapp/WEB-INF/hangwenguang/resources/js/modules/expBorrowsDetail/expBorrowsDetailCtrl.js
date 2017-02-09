define([
    'angular',
    'services/invest/investRankService'
], function(
    angular,
    investRankService
) {
    return function(app, elem, attrs, scope) {
        app.controller('expBorrowsDetailCtrl', [
            '$state', '$stateParams', '$scope', 'cService', '$location', 'popupDialog', '$rootScope',
            function($state, $stateParams, $scope, cService, $location, popupDialog, $rootScope) {
                $scope.isExist = null; //if the borrow exist according to the stauts of borrow detail.
                $scope.returnWindow = function() {
                    history.go(-1);
                }
                $scope.gotoAnchor = cService.gotoAnchor;
            }
        ])
    }
});