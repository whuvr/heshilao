define([
    'angular'
],function(
   
){
	return function(app,elem,attrs,scope){
        app.controller('modifyPswCtrl',['$scope','httpService','cService','$state',function($scope,httpService,cService,$state){
        	'use strict';
            $scope.formData = {
                newPassword:'',
                email:'',
                phone:'',
                validCode:''
            }
             $scope.submit = function(form){
                // $scope.formData.phone = $scope.$parent.$parent.getback_phone;
                // $scope.formData.email = $scope.$parent.$parent.getback_email;            
                // $scope.formData.validCode = $scope.$parent.$parent.getback_validcode ;
                $scope.formData_encryption = {}
                var ele = angular.element(document.getElementById('password'));   
                var val = fieldRSA(ele);  
                for(i in $scope.formData){
                    $scope.formData_encryption[i] = $scope.formData[i];
                } 
                $scope.formData_encryption.newPassword = val;
                if(form.$valid){
                    cService.ajax({
                        url:'users/modifyPassword',
                        method:'post',
                        params:$scope.formData_encryption
                    }).success(function(){
                        $scope.formData.newPassword = '';
                        $scope.confirmPassword = '' ;
                        $state.go("login.modifySuc") ;
                        
                    });
             	}
             }
        }])
	}
})