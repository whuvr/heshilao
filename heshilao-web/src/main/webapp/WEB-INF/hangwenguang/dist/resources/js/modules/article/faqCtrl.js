define(["angular"],function(e){return function(e,o,t,n){e.controller("faqCtrl",["$scope","cService",function(e,o){"use strict";e.url="column/articles/3",e.page=1,e.pageSize=10,(e.getRows=function(t){o.ajax({url:e.url,method:"post",params:{page:t,rows:e.pageSize,keyword:e.keyword}}).success(function(o){e.data=o.rows,e.total=o.total})})(1),e.expandRow=function(e,o){e.expand=o}}])}});