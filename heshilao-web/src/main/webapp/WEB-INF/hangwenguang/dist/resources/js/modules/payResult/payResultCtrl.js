define(["angular"],function(e){return function(s,c,a,t){s.controller("payResultCtrl",["$scope","$interval","cService","$location",function(s,c,a,t){"use strict";function o(e){var t=c(function(){s.showCount++,s.showCount>3?c.cancel(t):a.ajax({url:"ufx/queryCorpRegisterStatus",method:"get",params:{type:i}}).success(function(e){s.message=e.message,s.loading=!1,s.operateSuccess=!0,s.succ=!0,1!=e.status&&-1!=e.status||c.cancel(t),1==e.status&&(s.message=e.message,s.succ=!0,s.error=!1),-1==e.status&&(s.messageError=e.message,s.succ=!1,s.error=!0)})},2e3)}var r=e.element(document.getElementById("header")),n=e.element(document.getElementById("footerWrap")),u=e.element(document.getElementById("footer2")),l=t.$$search.ret_code,i=t.$$search.type,g=t.$$search.orderId,d=t.$$search.message;if(r.css("display","none"),n.css("display","none"),u.css("display","none"),s.loading=!0,s.showCount=0,s.messageError="操作失败！",d&&d.length>0&&(s.messageError=d),"0000"==l)if(2==i)s.message="操作申请成功",s.loading=!1,s.operateSuccess=!0,s.succ=!0;else if(4==i)s.message="申请提现成功",s.loading=!1,s.operateSuccess=!0,s.succ=!0;else if(7==i)s.message="申请还款成功",s.loading=!1,s.operateSuccess=!0,s.succ=!0;else if(10==i||8==i||0==i)o();else var m=c(function(){s.showCount++,s.showCount>30?(s.loading=!1,c.cancel(m),s.succ=!0,s.operateSuccess=!0,s.message="操作处理中"):a.ajax({url:"ufx/orderStatus",method:"get",params:{orderId:g,type:i}}).success(function(e){s.message=e.message,s.succ=!0,1!=e.status&&-1!=e.status||(s.operateSuccess=!0,s.loading=!1,c.cancel(m)),1==e.status&&(s.succ=!0,s.error=!1),-1==e.status&&(s.succ=!1,s.error=!0)})},2e3);else"0002"==l?(s.message="操作处理中",4==i&&(s.message="申请提现成功"),s.loading=!1,s.operateSuccess=!0,s.succ=!0):"0003"==l?(s.message="操作审核中",s.loading=!1,s.operateSuccess=!0,s.succ=!0):8==i?o():(s.loading=!1,s.operateErr=!0);s.closeWindow=function(){window.close()},s.$on("$destroy",function(){r.css("display",""),n.css("display",""),u.css("display","")})}])}});