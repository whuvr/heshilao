define(["angular"],function(){return function(e,t,r,o){e.controller("materialCtrl",["$rootScope","$scope","cService","G",function(e,t,r,o){function a(){var e="融云p2p网络借贷系统";navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Opera")<0&&(document.title=e,document.attachEvent("onpropertychange",function(t){t=t||window.event,"title"===t.propertyName&&document.title!==e&&setTimeout(function(){document.title=e},1)}))}t.domain=e.domain,t.returnKey={url:"",type:2},t.returnKey.url="corp"+e.user.corpId+"/user"+e.user.id,t.show={form:!1,card:!1,verify:[{show:!1,imgUrl:[],status:["等待审核中","审核通过","审核失败"]},{show:!1,imgUrl:[],status:["等待审核中","审核通过","审核失败"]},{show:!1,imgUrl:[],status:["等待审核中","审核通过","审核失败"]},{show:!1,imgUrl:[],status:["等待审核中","审核通过","审核失败"]},{show:!1,imgUrl:[],status:["等待审核中","审核通过","审核失败"]}]},t.upload=[{imageUrl:[],type:1},{imageUrl:[],type:2},{imageUrl:[],type:3},{imageUrl:[],type:4},{imageUrl:[],type:5}],r.ajax({url:"user/certifications",method:"get"}).success(function(e,r){angular.forEach(e.rows,function(e,r){for(var o=0;5>o;o++)e.type==o+1&&2!=e.status&&(t.show.verify[o].show=!0,t.show.verify[o].imgUrl=e.imageUrl,t.show.verify[o].status=t.show.verify[o].status[e.status])})}),t.uploadKey=function(e,o){r.ajax({url:"user/certifications",method:"post",params:t.upload[e]}).success(function(e,t){})},t.deleteUploadItem=function(e,r){var a=o.getIndex(e);e.parentElement.remove(),t.upload[r].imageUrl.splice(a)},a()}])}});