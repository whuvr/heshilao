define([
    'angular'
], function(
    angular
) {
    return function(app, elem, attrs, scope) {
        app.controller('invitationCtrl', ['$scope','navData','cService', function( $scope,navDate,cService) {
        	'use strict';
        	$scope.navDate = navDate[0].subState;
            // 定义一个新的复制对象
            var clip = new ZeroClipboard( document.getElementById("d_clip_button"), {
              moviePath: "views/account/ZeroClipboard.swf"
            } );
            // 复制内容到剪贴板成功后的操作
            clip.on( 'complete', function(client, args) {
               alert('复制成功，复制内容为：'+ args.text);
               document.title = "杭文投-专注于文创产业及创业助力金融项目";
            } );
            document.title = "杭文投-专注于文创产业及创业助力金融项目";
            //ie8兼容title
            function fixTitle(){
                var originalTitle = '杭文投-专注于文创产业及创业助力金融项目';
                if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
                    document.title = originalTitle;
                    document.attachEvent('onpropertychange', function (evt) {
                        evt = evt || window.event;
                        if(evt.propertyName === 'title' && document.title !== originalTitle) {
                            setTimeout(function () {
                               document.title = originalTitle;
                            }, 1);
                        }
                    });
                }
            }
            fixTitle();
        	$scope.inviteDataPageSearch = function(page){
        		cService.ajax({
	                    url: 'userInvite',
                        method:'post',
                        params:{
                            page:page,
                            rows:10
                        }
	            }).success(function(data, status, headers, config){
	                $scope.data = data.rows;
	            }).error(function(data, status, headers, config){
	                console.log(data);
	            })

        	}
        }])
    }
});