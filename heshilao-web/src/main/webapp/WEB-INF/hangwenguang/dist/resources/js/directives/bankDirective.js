define([angular],function(){return function(e,t,n,s){"use strict";e.directive("bankCode",["$http",function(e){return{scope:{jsonUrl:"@jsonUrl",p2pBank:"=p2pBank"},restrict:"A",template:'<select ng-change="setCity()" class="form-control" ng-model="selected" ng-disabled="opProvinceDis" ng-options="list.dictCode for list in areas"></select>',link:function(t,n,s){e({url:t.jsonUrl,headers:{"Content-Type":"application/x-www-form-urlencoded","x-requested-with":"XMLHttpRequest"}}).success(function(e,n,s,c){t.areas=e,t.selected=t.areas[0],t.p2pBank=t.selected.dictValue,t.setCity=function(){t.p2pBank=t.selected.dictValue}}),t.$watch("selected",[function(e,n){e&&(t.p2pBank=t.selected.dictValue)}])}}}])}});