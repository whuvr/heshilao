define(["angular","services/invest/investRankService"],function(e,a){return function(a,t,o,i){a.controller("borrowDetailCtrl",["$state","$stateParams","$scope","cService","$location","popupDialog","$rootScope","investRankService",function(a,t,o,i,n,r,c,l){var g=(t.id,n.$$search.userId,"请选择红包");o.isExist=null;var d=[],u=null,s=null;o.rRedpAll=!1,o.rInvalidateRatio=!1,o.monthRankData=[],o.imagePageSize=6,o.imageData=[],o.imagePagingAction=function(e){o.imageData=[];for(var a=(e-1)*o.imagePageSize;a<e*o.imagePageSize&&o.borrowImageList[a];a++)o.imageData.push(o.borrowImageList[a])},o.recordPage=1,o.recordPageSize=10,o.recordTotal=0,o.redpacketTotal=0,o.redpacketPlaceholder=g,o.selectRedpacket=function(e,a){var t=a.amount;o.rInvalidateRatio=!1,a.checked?(o.redpacketTotal-=t,a.checked=!1):o.redpacketTotal+t<=o.investValue*o.borrowData.redPacketInvestMaxRatioKey?(o.redpacketTotal+=t,a.checked=!0):(a.checked=!1,o.rInvalidateRatio=!0)},o.openRedp=function(){if(0!=d.length){if(!o.investValue)return void alert("请输入投资金额",{type:"info"});o.rInvalidateRatio=!1,u=r("template_redp",o,{title:"请选择可使用红包",css:{width:"600px",overflow:"auto"},wait:!1,buttons:[]})}},o.clearRedp=function(){o.redpacketTotal>0&&(e.forEach(d,function(e,a){e.checked=!1}),o.rRedpAll=!1,o.redpacketTotal=0)},o.closeRedpDialog=function(){u.close(u)},o.closePayDialog=function(){s&&(s.close(s),s=null)},o.reload=function(){o.closePayDialog(),location.reload()},o.returnWindow=function(){history.go(-1)},o.gotoAnchor=i.gotoAnchor,o.imgPageNext=function(e){0==e&&o.imagePage>1?o.imagePagingAction(--o.imagePage):0!=e&&o.imagePage<o.imagePageCount&&o.imagePagingAction(++o.imagePage)}}])}});