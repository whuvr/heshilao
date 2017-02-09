define([angular],function(){
	return function(app, elem, attrs, scope){
		app.directive('p2pUpload',function(){
	        return {
	            scope : {
	                p2pUploadWrap: '@p2pUploadWrap',
	                p2pUploadContainer: '@p2pUploadContainer',
	                p2pUploadPicker: '@p2pUploadPicker',
	                p2pUploadDomain: '@p2pUploadDomain',
	                uploadFile: '=uploadFile',
	                uploadKey: '&uploadKey'
	            },            
	            restrict: 'A',
	            template :'<div class="upload-wrap" id=""><div class="img-preview"></div><div id="container" class="container"><a class="btn btn-default btn-lg pickfiles" id="pickfiles" href="javascript:;"  ><i class="glyphicon glyphicon-plus"></i><sapn>选择文件</sapn></a></div></div>',
	            replace: true,
	            link: function($scope,$element,$attrs){	
	                $element[0].id = $scope.p2pUploadWrap;
	                if(document.getElementsByClassName){
	                	$element[0].getElementsByClassName('container')[0].id = $scope.p2pUploadContainer;
	                	$element[0].getElementsByClassName('pickfiles')[0].id = $scope.p2pUploadPicker;
	                }else{
	                	getElement($element[0],'container','div')[0].id = $scope.p2pUploadContainer;
	                	getElement($element[0],'pickfiles','a')[0].id = $scope.p2pUploadPicker;
	                }
	                var domain = $scope.p2pUploadDomain;
	                alert($scope.$parent.returnKey.url);
	                var uploader = Qiniu.uploader({
	                    runtimes: 'html5,flash,html4',
	                    browse_button: $scope.p2pUploadPicker,
	                    container: $scope.p2pUploadContainer,
	                    drop_element: $scope.p2pUploadContainer,
	                    max_file_size: '100mb',
	                    flash_swf_url: 'js/plupload/Moxie.swf',
	                    dragdrop: true,
	                    chunk_size: '4mb',
	                    uptoken_url: '/uptoken',
	                    domain: domain,
	                    unique_names: false,
	                    save_key: false,        
	                    auto_start: true,
	                    init: {
	                        'FilesAdded': function(up, files) {	                        	
	                        },
	                        'BeforeUpload': function(up, file) {
	                        },
	                        'UploadProgress': function(up, file) {
	                        },
	                        'UploadComplete': function() {
	                        	if(document.getElementsByClassName){
	                        		$element[0].getElementsByClassName('img-preview')[0].style.display= "block";
	                        	}else{
	                        		getElement($element[0],'img-preview','div')[0].style.display = "block";
	                        	}
	                            
	                        },
	                        'FileUploaded': function(up, file, info) {
	                        	$scope.uploadKey();
	                        	var res = JSON.parse(info);
	                        	if(document.getElementsByClassName){
	                        		elem = $element[0].getElementsByClassName('img-preview')[0];	                        		
	                        	}else{
	                        		elem = getElement($element[0],'img-preview','div')[0];
	                        	}		                        	
	                        	$scope.uploadFile.push(res.key);
	                            var html = '<div class="item"><img src="'+ domain+res.key+'?imageView2/1/w/100/h/100"><span onclick="javascript:this.parentElement.remove()" class="remove">×</span></div>'
	                            elem.innerHTML = elem.innerHTML+ html;                
	                        },
	                        'Error': function(up, err, errTip) {           
	                        },
	                        'Key': function(up, file) {
	                            var key = "", date = new Date();
	                            // do something with key
//	                            key = 'corp'+'id'+'/borrow'+'id'+'/'+date.getTime()+guid();
	                            if($scope.$parent.returnKey.type==1){
	                            	console.log(1)
	                            	key = $scope.$parent.returnKey.url;
		                            return key;
	                            }else{
	                            	key = $scope.$parent.returnKey.url+'/'+date.getTime()+'/'+guid();
		                            return key;
	                            }
	                            
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
	                function itemRemove(elem){
	                    elem.parentElement.remove();
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
				        // alert(tagAll[0]);
				        return tagAll;

	                }
	                
	            },
	           //  controller: function($scope,$element,$attrs){                
	   

	           //  }
	        }
	    })
	}
})