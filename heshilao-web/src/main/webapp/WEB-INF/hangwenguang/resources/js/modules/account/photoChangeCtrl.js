define([
    'angular'
], function(
) {
    return function(app, elem, attrs, scope) {
        app.controller('photoChangeCtrl', ['$scope','navData','$rootScope', 'cService','$cookieStore','G',
            function( $scope,navDate,$rootScope,cService,$cookieStore,G) {   
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
        	$scope.face = [];
            $scope.sizeError = false;
        	$scope.getTime = function(){
        		var time = new Date();
        		return time.getTime();
        	}            
            // $scope.dataUrl= ['http://image.baidu.com/search/detail?ct=503316480&tn=baiduimagedetail&statnum=girl&ipn=d&z=0&s=0&ic=0&lm=-1&itg=0&cg=girl&word=%E6%B8%85%E7%BA%AF%E7%BE%8E%E5%A5%B3&ie=utf-8&in=3354&cl=2&st=&pn=13&rn=1&di=0&ln=14456&&fmq=1378374347070_R&se=&sme=0&tab=&face=&&is=0,94828&cs=3158449716,1580665298&adpicid=0&pi=21062216547&os=0&istype=&ist=&jit=&objurl=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fc2fdfc039245d688b7d4e073a0c27d1ed31b2416.jpg&bdtype=-1&gsm=3c0000003c','http://d.hiphotos.baidu.com/image/pic/item/b7003af33a87e950c6c1a1bb14385343faf2b417.jpg','http://g.hiphotos.baidu.com/image/pic/item/ac6eddc451da81cb5734d11a5666d01608243112.jpg']            
            if($rootScope.user.headPortraitUrl){
                $scope.headUrl = $rootScope.user.headPortraitUrl+"?imageView2/1/w/160/h/160/?t="+$scope.getTime();
            }else{
                $scope.headUrl = 'resources/images/default-user.jpg';
            }
        	$scope.hideError = function(){
                document.getElementById('size-error').style.display= 'none'; 
            }
        	$scope.returnKey = {url:'',type:1};
            $scope.returnKey.url = 'corp'+$rootScope.user.corpId+'/user'+$rootScope.user.id; 

	        var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',
                browse_button: 'pickfiles',
                container: 'container',
                drop_element: 'container',
                flash_swf_url: 'resources/plugins/qiniu/demo/js/plupload/Moxie.swf',
                dragdrop: true ,
                max_file_size: '1mb',           //最大文件体积限制
                chunk_size: '1mb',
                uptoken_url: 'uptoken',
                domain: $rootScope.domain,
                unique_names: false,
                save_key: false,        
                auto_start: true,
                filters: {
                    mime_types : [
                        { title : "Image files", extensions : "jpg,gif,png,jpeg" }
                    ]
                },
                init: {

                        'FilesAdded': function(up, files) {	                        	
                        },
                        'BeforeUpload': function(up, file) {
                            document.getElementById('size-error').style.display= 'none'; 
                        },
                        'UploadProgress': function(up, file) {
                        },
                        'UploadComplete': function() {
                        },
                        'FileUploaded': function(up, file, info) {
                            var res = JSON.parse(info);
                            cService.ajax({
                                url:"user/headupdate/updateurl",
                                method:"post",
                                params:{
                                    headPortraitUrl:res.key
                                }                   
                            }).success(function(data,status){
                                
                                if(document.getElementsByClassName){
                                    angular.forEach(document.getElementsByClassName('head-photo'),function(item,index){
                                        if(index==0){
                                            item.innerHTML = '<img src=' +$rootScope.domain+res.key+'?imageView2/1/w/100/h/100/?t='+$scope.getTime()+'>'
                                        }else{
                                            item.innerHTML = '<img src=' +$rootScope.domain+res.key+'?imageView2/1/w/160/h/160/?t='+$scope.getTime()+'>'
                                        }                                            
                                    })   
                                }else{
                                    $rootScope.user.headPortraitUrl = $rootScope.domain+res.key;
                                    $cookieStore.put("curUser",$rootScope.user);
                                    $scope.headUrl = $rootScope.domain+res.key+'?imageView2/1/w/100/h/100/?t='+$scope.getTime();
                                }
                                $rootScope.user.headPortraitUrl = $rootScope.domain+res.key;
                                $cookieStore.put("curUser",$rootScope.user);
                                $cookieStore.put("curUser1",$rootScope.user);
                            }) 
                        },
                        'Error': function(up, err, errTip) {   
                        document.getElementById('size-error').style.display= 'block';          
                        },
                        'Key': function(up, file) {
                            var key = "", date = new Date();                       
                            key = $scope.returnKey.url+'/'+date.getTime()+'/'+guid();
                            return key;
                        }
                    }
                });
                
                var imgLink = Qiniu.watermark({
                    mode: 1,  // 图片水印
                    image: 'http://www.erongdu.com/templets/rongdu/bg/logo.png', // 图片水印的Url，mode = 1 时 **必需**
                    dissolve: 50,          // 透明度，取值范围1-100，非必需，下同
                    gravity: 'SouthWest',  // 水印位置，为以下参数[NorthWest、North、NorthEast、West、Center、East、SouthWest、South、SouthEast]之一
                    dx: 100,  // 横轴边距，单位:像素(px)
                    dy: 100   // 纵轴边距，单位:像素(px)
                });  
                function guid() {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                        return v.toString(16);
                    });
                }
              
                function getElement(root,className,tagName){
                	var tag= root.getElementsByTagName(tagName);    //获取指定元素
                	// alert(tag.length);
			        var tagAll = [];                                    //用于存储符合条件的元素
			        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
			            for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
			                if(n[j]==className){
			                    tagAll.push(tag[i]);
			                    break;
			                }
			            }
			        }
			        return tagAll;
                }
        	
        }])
    }
});