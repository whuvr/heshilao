define(['angular'],function(angular){
    return function(app,elem,attrs,scope){
        app.controller("app_downCtrl",['$scope','cService','$state','$cookieStore', '$interval', function($scope,cService,$state,$cookieStore,$interval){

            $scope.availH = window.innerHeight > 640 ? window.innerHeight : 640;
            document.getElementById("down_bg").style.height = $scope.availH+"px";
            document.getElementById("down_left").style.top = (window.innerHeight - 315)/2 + "px";
            document.getElementById("down_iphone").style.top = (window.innerHeight - 506)/2 + "px";

            var $header = angular.element(document.getElementById('header'));
            var $footer = angular.element(document.getElementById('footerWrap'));
            var $sharepage = angular.element(document.getElementById('sharepage'));
            var $content = angular.element(document.getElementById('content'));

            $header.css('display','none');
            $footer.css('display','none');
            $sharepage.css('display','none');
            $content.css('padding-bottom','0');

            $scope.$on('$destroy',function(){
                $header.css('display','');
                $footer.css('display','');
                $sharepage.css('display','');
            });
        }])
    }
})