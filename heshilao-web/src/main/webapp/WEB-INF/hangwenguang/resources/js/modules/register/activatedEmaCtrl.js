define([
    'angular'
],function(angular){
    return function(app,elem,attrs,scope){
        app.controller('activatedEmaCtrl',['$scope',function($scope){
        	$scope.countdown = 4;
            var timer = setInterval(function(){
                $scope.countdown--;
                $scope.$apply()
                if($scope.countdown==0){
                	clearInterval(timer);
                	window.location.href = "#/login";
                }
            },1000);
            $scope.jumpLogin = function(){
                clearInterval(timer);
                window.location.href = "#/login";
            }
        }])
    }
})