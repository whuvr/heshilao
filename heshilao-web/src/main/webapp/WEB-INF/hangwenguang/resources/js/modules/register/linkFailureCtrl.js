define([
    'angular'
],function(angular){
	return function(app,elem,attrs,scope){
	app.controller('linkFailureCtrl',['$scope','$location','cService',function($scope,$location,cService){
		    var url = $location.absUrl();
		    var num = url.indexOf('?') + 1;
		    var param = url.substr(num,url.length-num);
		    var user_array = param.split('&');
		    var user = {
		    	email:user_array[0].split('=')[1],
		    	username:user_array[1].split('=')[1],
		    	corpId:user_array[2].split('=')[1]
		    }
            $scope.jumpLogin = function(){
                cService.ajax({
                	url:'users/sentActivateEmail',
                	params:user
                }).success(function(){
                	alert('邮件已成功发送，请注意查收！');
                });
            }
		}])
	}
})