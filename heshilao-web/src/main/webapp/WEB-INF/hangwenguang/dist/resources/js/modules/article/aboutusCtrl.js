define(["angular"],function(t){return function(t,e,a,n){t.controller("aboutusCtrl",["$scope","navData","cService",function(t,e,a){"use strict";t.navDate=e[0].subState,t.page=1,t.pageSize=1,a.ajax({method:"post",url:"column/articles/5"}).success(function(e,a,n,o){t.articleData=e.rows[0]}).error(function(t,e,a,n){console.log(t)}),t.a=111,t.b=3}])}});