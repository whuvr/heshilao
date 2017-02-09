define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('corpBorrowCtrl', ['$scope','$rootScope','$state','$stateParams','$window','cService' ,'$location','$cookieStore','G',function( $scope,$rootScope,$state,$stateParams,$window,cService,$location,$cookieStore,G) {
            $scope.formData = {}
            $scope.formData.username = $stateParams.id;
            $scope.formData.activeUrl = $stateParams.uid;
            $scope.submit = function(){
                var ele = angular.element(document.getElementById('password'));  
                var val = fieldRSA(ele); 
                 cService.ajax({
                    url:"users/initPassword",
                    method: "post",                    
                    params: {
                        username:$scope.formData.username,
                        activeUrl:$scope.formData.activeUrl,
                        password:val
                    }
                }).success(function(data,status,headers,config){
                    $state.go('login'); return false;   
                })
            }  
        }])
        app.directive('ngTipbox',function(){
            return {
                restrict:'A',
                //require:'ngModel', 
                template:'<div id="tipBox"><p id="tipContent"></p><p id="tipArrow"></p></div>',
                link:function(scope,elem,attr,ctrl){
                    elem.css('display','none');
                    elem.children().children()[0].innerHTML = attr.ngTipbox;
                    var oInput = elem.parent().find('input');
                    oInput.on('focus',function(){
                        elem.css('display','block');
                    });
                    oInput.on('blur',function(){
                        elem.css('display','none');
                    }); 
                }
            }

        });
    }
});