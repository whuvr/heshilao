define(["angular"],function(){return function(e,t,r,n){e.controller("photoChangeCtrl",["$scope","navData","$rootScope","cService","$cookieStore","G",function(e,t,r,n,o,i){function a(){var e="杭文投-专注于文创产业及创业助力金融项目";navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Opera")<0&&(document.title=e,document.attachEvent("onpropertychange",function(t){t=t||window.event,"title"===t.propertyName&&document.title!==e&&setTimeout(function(){document.title=e},1)}))}function u(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,r="x"==e?t:3&t|8;return r.toString(16)})}a(),e.face=[],e.sizeError=!1,e.getTime=function(){var e=new Date;return e.getTime()},r.user.headPortraitUrl?e.headUrl=r.user.headPortraitUrl+"?imageView2/1/w/160/h/160/?t="+e.getTime():e.headUrl="resources/images/default-user.jpg",e.hideError=function(){document.getElementById("size-error").style.display="none"},e.returnKey={url:"",type:1},e.returnKey.url="corp"+r.user.corpId+"/user"+r.user.id;Qiniu.uploader({runtimes:"html5,flash,html4",browse_button:"pickfiles",container:"container",drop_element:"container",flash_swf_url:"resources/plugins/qiniu/demo/js/plupload/Moxie.swf",dragdrop:!0,max_file_size:"1mb",chunk_size:"1mb",uptoken_url:"uptoken",domain:r.domain,unique_names:!1,save_key:!1,auto_start:!0,filters:{mime_types:[{title:"Image files",extensions:"jpg,gif,png,jpeg"}]},init:{FilesAdded:function(e,t){},BeforeUpload:function(e,t){document.getElementById("size-error").style.display="none"},UploadProgress:function(e,t){},UploadComplete:function(){},FileUploaded:function(t,i,a){var u=JSON.parse(a);n.ajax({url:"user/headupdate/updateurl",method:"post",params:{headPortraitUrl:u.key}}).success(function(t,n){document.getElementsByClassName?angular.forEach(document.getElementsByClassName("head-photo"),function(t,n){0==n?t.innerHTML="<img src="+r.domain+u.key+"?imageView2/1/w/100/h/100/?t="+e.getTime()+">":t.innerHTML="<img src="+r.domain+u.key+"?imageView2/1/w/160/h/160/?t="+e.getTime()+">"}):(r.user.headPortraitUrl=r.domain+u.key,o.put("curUser",r.user),e.headUrl=r.domain+u.key+"?imageView2/1/w/100/h/100/?t="+e.getTime()),r.user.headPortraitUrl=r.domain+u.key,o.put("curUser",r.user),o.put("curUser1",r.user)})},Error:function(e,t,r){document.getElementById("size-error").style.display="block"},Key:function(t,r){var n="",o=new Date;return n=e.returnKey.url+"/"+o.getTime()+"/"+u()}}}),Qiniu.watermark({mode:1,image:"http://www.erongdu.com/templets/rongdu/bg/logo.png",dissolve:50,gravity:"SouthWest",dx:100,dy:100})}])}});