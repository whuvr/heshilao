define( [
	'angular'
], function (angular) {
    var ajaxbuttons = [];
	return function(app){
		app.factory('httpService', ['$rootScope', '$http', function($rootScope, $http) {
			return{
				post: function(obj){
                    var posts = transformJson(posts);                    
                    return $http({
                        method: 'post',
                        url: obj.url,
                        data: obj.data,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                    });
                },
                get: function(obj) {
                    return $http({
                        method: 'get',
                        url: obj.url,
                        params: obj.params,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                    });
                }
			}

			function transformJson(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
		}]).factory('cService',['$http','$q','$location', '$anchorScroll',function($http,$q,$location, $anchorScroll){

            
            var service = {
                deepExtend : function(destination, source) {
                    for (var property in source) {
                        if (source[property] && source[property].constructor &&
                            source[property].constructor === Object) {
                            destination[property] = destination[property] || {};
                            arguments.callee(destination[property], source[property]);
                        } else {
                          destination[property] = source[property];
                      }
                  }
                  return destination;
                },
                ajax : function(opts){
                    var motionObj = null;//element sending the ajax request
                    var originalHtml = '';
                    var originalVal = '';
                    var loading = '<span>...</span>';//show '...' tag when ajax request is running
                    for (var i = 0; i < ajaxbuttons.length; i ++){
                        var obj = ajaxbuttons[i];
                        if (obj.url == opts.url){
                            motionObj = obj;                      
                            motionObj.status = 'running';
                            motionObj.elm.attr('disabled','disabled');
                            originalHtml = motionObj.elm.html();
                            originalVal = motionObj.elm.val();
                            
                            originalHtml && motionObj.elm.html(originalHtml + loading);
                            originalVal && motionObj.elm.val(originalVal + '...');                                                
                            break;
                        }
                    }
                    
                   
                   var defaultOptions = {
                        method: 'get', 
                        headers: {'Content-Type': 'application/x-www-form-urlencoded',
                            'x-requested-with':'XMLHttpRequest'}
                    }
                    opts = service.deepExtend(defaultOptions,opts);
                    function reset(){
                        if (motionObj){
                            motionObj.status = 'pending'; 
                            originalHtml && motionObj.elm.html(originalHtml);
                            originalVal && motionObj.elm.val(originalVal);
                            motionObj.elm.attr('disabled','');
                        };
                      
                    }
                    return $http(opts).success(function(){
                        reset();
                    }).error(function(){
                        reset();
                    }); 
                    
                        
                    
                },
                gotoAnchor: function(anchor){
                    $location.hash(anchor);
                    $anchorScroll();
                }
            }
            return service;
        }]).directive('ajaxbutton', function() {
            return {
                priority: 100,
                terminal: true,
                link: function(scope, elm, attrs, ctrl) {
                    var obj = {
                        elm: elm,
                        status: 'pending',
                        url: scope.$eval(attrs.ajaxbutton) ? scope.$eval(attrs.ajaxbutton) : attrs.ajaxbutton
                    }
                    ajaxbuttons.push(obj);
                    elm.on('click',function(e){
                       if (obj.status == 'running'){

                           
                       }else{  
                        
                            var clickAction = attrs.ngClick;
                            scope.$eval(clickAction);
                       }
                    })
                }
            };
        });

	}
});

