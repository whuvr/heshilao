define(["angular"],function(t){return function(t,n,c,o){t.controller("contactusCtrl",["$scope","navData","cService",function(t,n,c){"use strict";t.navDate=n[0].subState,c.ajax({method:"post",url:"column/articles/6"}).success(function(n,c,o,e){t.articleData=n.rows[0]}).error(function(t,n,c,o){console.log(t)})}])}});