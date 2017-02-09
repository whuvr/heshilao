define([angular],function(){
	return function(app, elem, attrs, scope){
		app.directive('p2pUpload',function(){
			
	        return {
	            scope : {
	                p2pUploadWrap: '@p2pUploadWrap',
	                p2pUploadContainer: '@p2pUploadContainer',
	                p2pUploadPicker: '@p2pUploadPicker',
	                p2pUploadDomain: '=p2pUploadDomain',
	                uploadFile: '=uploadFile',
	                uploadKey: '&uploadKey'
	            },            
	            restrict: 'A',
	            template :'<div class="upload-wrap" id=""><div class="img-preview" ng-show="uploadFile.length" ><div class="item" ng-repeat="item in uploadFile"><img ng-src="{{ p2pUploadDomain+item}}?imageView2/1/w/110/h/70"><span ng-click="itemRemove(this,$index)" class="remove">×</span></div></div><div id="container" class="container"><a class="btn btn-default btn-lg pickfiles" id="pickfiles" href="javascript:;"  ><i class="glyphicon glyphicon-plus"></i><sapn>选择文件</sapn></a></div></div>',
	            replace: true,
	            link: function($scope,$element,$attrs,$rootScope){
	            	var uploaderImages =[];	
	            	$scope.uploaderImages =[];
	                $element[0].id = $scope.p2pUploadWrap;
	                $scope.itemRemove = function(dom,index){	
	                	angular.element(dom).parent().remove();
	                	$scope.uploadFile.splice(index,1);
	                	$scope.uploadKey();
	                }
	                $scope.build=function(scope, elm, attrs){
						var src = scope.src,//image source
							$container,
							$body,
							$mask,
							$prev,//previous button
							$next,// next button
							$images;

						$images = elm.find('img');
						function clear(){
							if ($mask){
								$mask.remove();
								$container.remove();
								$mask = null;
							}
						}
						function showItem(item,index){
							$body = angular.element(document.body);
							$container = angular.element('<div class="rd-image-preview-conta"><img src="' + item.attr('src').replace(/\?[\w\W]*/,'') + '" /></div>');
							$mask = angular.element('<div class="rd-mask"></div>').off('click').on('click',function(){
								clear();
							});	
							$prev = angular.element('<a class="prev-btn"></a>').on('click',function(){
								if (index > 0){
									clear();
									showItem(angular.element($images[index - 1]),index - 1);
								}
							});
							$next = angular.element('<a class="next-btn"></a>').on('click',function(){
								if (index < $images.length - 1){
									clear();
									showItem(angular.element($images[index + 1]),index + 1);
								}
							});
							index > 0 && $container.append($prev);
							index < $images.length - 1 && $container.append($next);						
							$body.append($mask);
							$body.append($container);
						}
						angular.forEach($images,function(item,i){
							item = angular.element(item);
							item.on('click',function(){
								showItem(item,i);
							})
						})
					}
	                if(document.getElementsByClassName){
	                	$element[0].getElementsByClassName('container')[0].id = $scope.p2pUploadContainer;
	                	$element[0].getElementsByClassName('pickfiles')[0].id = $scope.p2pUploadPicker;
	                }else{
	                	getElement($element[0],'container','div')[0].id = $scope.p2pUploadContainer;
	                	getElement($element[0],'pickfiles','a')[0].id = $scope.p2pUploadPicker;
	                	// $element[0].id = $scope.p2pUploadContainer;
	                	// $element[0].getElementsByTagName('a').id = $scope.p2pUploadPicker;
	                }
	                var domain = $scope.p2pUploadDomain;	                
	                var uploader = Qiniu.uploader({
	                    runtimes: 'html5,flash,html4',
	                    browse_button: $scope.p2pUploadPicker,
	                    container: $scope.p2pUploadContainer,
	                    drop_element: $scope.p2pUploadContainer,
	                    flash_swf_url: 'resources/plugins/qiniu/demo/js/plupload/Moxie.swf',
	                    dragdrop: true,
	                    max_file_size : '2mb',
	                    chunk_size: '2mb',
	                    uptoken_url: 'uptoken',
	                    domain: $scope.p2pUploadDomain,
	                    unique_names: false,
	                    save_key: false,        
	                    auto_start: true,
	                    filters: {
	                    	max_file_size : '2mb',
							mime_types : [
								{ title : "Image files", extensions : "jpg,gif,png,jpeg" }
							]
		                },
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
	                        		// $element[0].firstChild.style.display = 
	                        	}
	                            
	                        },
	                        'FileUploaded': function(up, file, info) {
	                        	var res = JSON.parse(info);
	                        	uploaderImages.push(res.key);	                        	
	                        	$scope.uploaderImages2=uploaderImages;
	                        	var pos = $scope.uploadFile.length;  
	                        	$scope.$eval('uploadFile = uploaderImages2'); 
	                        	$scope.$apply(); 
	                        	$scope.uploadKey();
	                        	if(document.getElementsByClassName){
	                        		elem = $element[0].getElementsByClassName('img-preview')[0];	                        		
	                        	}else{
	                        		elem = getElement($element[0],'img-preview','div')[0];
	                        		// elem = document.getElementById()
	                        	}	
	                        	$scope.build($scope,$element,$attrs);          
	                        },
	                        'Error': function(up, err, errTip) {   
	                        	if(err.message=='File size error.'){
	        	            		alert("图片大小过大，请选择2M以内的图片！");
	        	            	}else if(err.message=='File extension error.'){
	        	            		alert("图片的格式错误，请按要求传入正确格式的图片！");
	        	            	} 
	                        },
	                        'Key': function(up, file) {
	                            var key = "", date = new Date();
	                            // do something with key
//	                            key = 'corp'+'id'+'/borrow'+'id'+'/'+date.getTime()+guid();
	                            if($scope.$parent.returnKey.type==1){
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
	                function getIndex (dom){
						var i = 0;							
						while( (dom = dom.previousSibling) != null ){								
							dom.nodeType == 1 && i++;
						} 
						return i;
					}
	                
	            },
	           //  controller: function($scope,$element,$attrs){                
	   

	           //  }
	        }
	    })
	}
})