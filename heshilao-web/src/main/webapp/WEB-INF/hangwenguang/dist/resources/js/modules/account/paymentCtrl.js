define(["angular"],function(o){return function(o,t,a,n){o.controller("paymentCtrl",["$scope","navData","cService",function(o,t,a){"use strict";o.navDate=t[0].subState,o.hidePage=!1,o.page=1,o.pageSize=10;var n=o.tab={cont1:!0,cont2:!1};o.pageSearch=function(t,e){n.cont1=!0,n.cont2=!1,a.ajax({method:"post",url:"borrowCollections",params:{status:0,page:t,rows:10}}).success(function(t,a,n,e){o.total=t.total,o.data=t.rows}).error(function(o,t,a,n){console.log(o)})},o.pageSearchback=function(t,e){n.cont1=!1,n.cont2=!0,a.ajax({method:"post",url:"borrowCollections",params:{status:1,page:t,rows:10}}).success(function(t,a,n,e){o.total=t.total,o.data=t.rows}).error(function(o,t,a,n){console.log(o)})},o.pageSearch(1,0)}])}});