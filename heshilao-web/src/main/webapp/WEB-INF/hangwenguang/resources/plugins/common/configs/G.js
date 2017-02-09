define( [
	'angular'
], function(angular) {
	return function(app) {
		app.run(['$rootScope', '$state', '$stateParams','$location',function($rootScope, $state, $stateParams,$location) {
	        $rootScope.$on('$locationChangeStart',function(event){
	        	if (!Array.prototype.indexOf){
	              Array.prototype.indexOf = function(elt /*, from*/)
	              {
	                var len = this.length >>> 0;
	                var from = Number(arguments[1]) || 0;
	                from = (from < 0)
	                     ? Math.ceil(from)
	                     : Math.floor(from);
	                if (from < 0)
	                  from += len;
	                for (; from < len; from++)
	                {
	                  if (from in this &&
	                      this[from] === elt)
	                    return from;
	                }
	                return -1;
	              };
	            }
	            if( $state.includes('account')){
	            	if($rootScope.user.name==""){
	            		// $state.go('login');
	            	}
	            }
	        })
	    }]).run(['validator', 'defaultErrorMessageResolver', function(validator, defaultErrorMessageResolver) {
			defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
          		errorMessages['required'] = '必填项';
          		errorMessages['minlength'] = '输入不能少于{0}个字符';
          		errorMessages['maxlength'] = '输入不能多于{0}个字符';
          		errorMessages['pattern'] = '格式不正确';
          		errorMessages['email'] = '邮箱格式不正确';
          		errorMessages['number'] = '输入必须是数字';
          		errorMessages['url'] = '格式不正确';
          		errorMessages['min'] = "输入不能小于{0}";
          		errorMessages['max'] = "输入不能大于{0}";
          		errorMessages['dymin'] = "输入不能小于{0}";
          		errorMessages['dymax'] = "输入不能大于{0}";
          		errorMessages['loginError'] = "用户名或者密码错误";
          		errorMessages['validateError'] = "验证码不能为空";
          		errorMessages['repeat'] = "两次密码不一致";
          		errorMessages['repeatCode'] = "两次账号不一致";
          		errorMessages['investValidate'] = "余额不足{0}<a>请充值</a>";
          		errorMessages['ProtocolError'] = "请勾选协议";
          		errorMessages['UserError'] = "请输入4-16位字符,由英文字母、数字组成,且不能为纯数字";
          		errorMessages['EmailError'] = "请输入正确的邮箱";
          		errorMessages['PhoneError'] = "请输入正确的手机号码";
          		errorMessages['PasswordError'] = "请输8~16位数字及英文字母，其中至少包含一个字母和一个数字";
          		errorMessages['remote-user'] = "该用户名已被注册，请重新输入";
          		errorMessages['remote-email'] = "该邮箱已被绑定，请重新输入";
          		errorMessages['remote-phone'] = "该手机号码已被注册，请重新输入";
          		errorMessages['WithdrawError'] = "请输入正确的金额，金额最多带两位小数";
          		errorMessages['RechargeError'] = "请输入正确的金额，金额为整数";
          		errorMessages['Integer'] = "请输入一个整数";
          		errorMessages['Float'] = "只能输入数字，最多带两位小数";
          		errorMessages['realName'] = "格式不正确，请输入真实姓名";
          		errorMessages['MonthInteger'] = "请输入一个不超过36的月份数";
				errorMessages['DayInteger'] = "请输入一个3位以内的天数";
				errorMessages['loginRequired1'] = "用户名不能为空";
				errorMessages['loginRequired2'] = "密码不能为空";
        	});
        	validator.setValidElementStyling(false);
		}]).factory('G', ['$rootScope','$window','$injector','$location','$cookieStore',function($rootScope,$window,$injector,$location,$cookieStore) {
			function G() {
				this.interfaceType = 1; //真实接口1， 模拟接口0，默认为1
				this.user = {};
			}
			G.prototype = {
				construtor: G,
				init: function(user, $rootScope, $compile) {

				},
				useMockInterface: function(type){
					this.interfaceType = type;
				},
				jumpLoginPage: function(){

					var $state = $injector.get('$state');
					$rootScope.login.beforeLogin = true;
					$rootScope.login.afterLogin = false;
					$state.go('login');
					return false;
				},
				jumpErrorPage: function(ajaxError){
					var $state = $injector.get('$state');
					$state.go('error',{status: ajaxError.status});
					return false;
				},
				index: function(item,group){//require the index of dom from siblings
					for (var i = 0; i < group.length; i++){
						if (group[i] == item) return i;
					}
					return null;
				},
				getIndex: function(dom){
					var i = 0;
					while( (dom = dom.previousSibling) != null ){
						dom.nodeType == 1 && i++;
					}
					return i;
				},
				getElement: function (root,className,tagName){
                	var tag= root.getElementsByTagName(tagName);    //获取指定元素
			        var tagAll = [];                                    //用于存储符合条件的元素
			        for (var i = 0; i < tag.length; i++) {                //遍历获得的元素
			            for(var j=0,n=tag[i].className.split(' ');j<n.length;j++){    //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
			                if(n[j]==className){
			                    tagAll.push(tag[i]);
			                    break;
			                }
			            }
			        }
			        return tagAll;

                },
                reSetNav : function(){
                	var mainNavEle = document.getElementById('main-nav'),
           	   		canBorrows = this.getElement(mainNavEle,'borrow','li');
           	       	if($rootScope.user.id&&$rootScope.user.canBorrow){
           	       		for(var i = 0; i < canBorrows.length ; i++){
           	       			canBorrows[i].style.display = 'block';
           	       		}
           	       	}else{
           	       		for(var i = 0; i < canBorrows.length ; i++){
           	       			canBorrows[i].style.display = 'none';
           	       		}
           	       	}
                },
                getBrowser: function(){
                	// Useragent RegExp
					var rwebkit = /(webkit)[ \/]([\w.]+)/,
					ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
					rmsie = /(msie) ([\w.]+)/,
					rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
					function uaMatch( ua ) {
						ua = ua.toLowerCase();

						var match = rwebkit.exec( ua ) ||
							ropera.exec( ua ) ||
							rmsie.exec( ua ) ||
							ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
							[];

						return { browser: match[1] || "", version: match[2] || "0" };
					};

                	var userAgent = $window.navigator.userAgent;
			        return uaMatch(userAgent);
                },
                isIE8: function(){
                	var browser = this.getBrowser();
                	if (browser.browser == 'msie' && browser.version == '8.0') return true;
                	else return false;
                },
                updateMessageAmount: function(){
                	var cService = $injector.get('cService');
                	cService.ajax({
	                    url :  'user/message',
	                    method: 'get'
	                }).success(function(amount){
	                	$rootScope.user.isNotReadedMessage = amount;
	                	var userData = $rootScope.user;
	                	$cookieStore.put('curUser',userData);
	                });
                },
                GetCurrentStyle: function(obj, prop){
				    if (obj.currentStyle){//IE
				    	prop = prop.replace(/\-(\w)/g, function(all, letter){
					      	return letter.toUpperCase();
					    });
				        return obj.currentStyle[prop];
				    }
				    else if (document.defaultView && document.defaultView.getComputedStyle){
				       	var propprop = prop.replace (/([A-Z])/g, "-$1");
				        propprop = prop.toLowerCase ();
				        return document.defaultView.getComputedStyle(obj,null)[propprop];
				    }
				    return null;
			   	},
			   	getElementAbsPos: function(dom){
				    var t = dom.offsetTop;
				    var l = dom.offsetLeft;
				    while(dom = dom.offsetParent)
				    {
				        t += dom.offsetTop;
				    	l += dom.offsetLeft;
				    }

				    return {left:l,top:t};
				},
				removeInlineStyle: function(dom,arr){
					var
						i = 0,
						j = 0,
						tempName,
						direction = ['-left','-top','-right','-bottom'];
					if (typeof arr == 'string') arr = [arr];
					for (i; i < arr.length; i ++){
						if (dom.style.removeProperty){
							dom.style.removeProperty(arr[i]);
						}else{

							if (arr[i].match(/border/)){
								for (j; j < direction.length; j ++){
									tempName = arr[i].replace(/(border)/,'$1' + direction[j]);
									tempName = tempName.replace(/\-(\w)/g, function(all, letter){
								      	return letter.toUpperCase();
								    });
									dom.style.removeAttribute(tempName);
								}
							}else{
								arr[i] = arr[i].replace(/\-(\w)/g, function(all, letter){
							      	return letter.toUpperCase();
							    });
								dom.style.removeAttribute(arr[i]);
							}
						}
					}

				},
			   	addCookie: function (key,value,expires){//add cookie with expires
				   /*	try{
						value = JSON.stringify(value);
					} catch (e) {}
					value = encodeURIComponent(value);*/
					//$cookieStore.put(key,value);
					$cookieStore.put(key,value);
					expires || (expires = 0.5);
					value = angular.toJson(value);
	                var str = key + "=" + value;
	                if(expires > 0){
	                    var date = new Date();
	                    var ms = expires*3600*1000;
	                    date.setTime(date.getTime() + ms);
	                    str += "; expires=" + date.toGMTString();
	                }
	                document.cookie = str;

	            }

			};
			var GObj = new G();
			window._G = GObj;
			return GObj;
		}]).directive('rdSwitch',function(){
			/*
			*用法：
				<ul rd-switch
				switch-type="switchType"
				switch-action="switchAction(switchType)">
					<li class="active" switchType="-1">不限</li>
					<li switchType="0">招标中</li>
					<li switchType="1">还款中</li>
					<li switchType="2">完成</li>
				</ul>
			*/
			function setScopeValues(scope, attrs) {
                attrs.switchType = attrs.switchType || 'type';
                attrs.activeClass = attrs.activeClass || 'active';
               	scope.switchAction = scope.switchAction || function(){};


            }

			return {

				scope:{
					activeType: '@',
					switchAction : '&'
				},
				link: function(scope, elm, attrs){

					setScopeValues(scope,attrs);
					var $switchs = elm.children();
					//initialize the active element
					if (scope.activeType != undefined){
						angular.forEach($switchs,function(item){
							var $item = angular.element(item);
							if ($item.attr(attrs.switchType) == scope.activeType){
								$switchs.removeClass(attrs.activeClass);
								$item.addClass(attrs.activeClass);
							}
						})
					}

					$switchs.on('click',function(){
						var _this = angular.element(this);
						$switchs.removeClass(attrs.activeClass);
						_this.addClass(attrs.activeClass);
						var o = {};
						o[attrs.switchType] = _this.attr(attrs.switchType);
						scope.switchAction(o);
					});

				}
			}
		}).directive('confirmInsert',function(){
			return {
				require: 'ngModel',

				link: function(scope, elm, attrs, ctrl) {

					var triggerValue;
					scope.$watch(attrs.confirmInsert, function(){
		                triggerValue && ctrl.$setViewValue(triggerValue);
		            });
					ctrl.$parsers.push(function(value){
		                ctrl.$setValidity("repeatCode", value == scope.$eval(attrs.confirmInsert));
		                triggerValue = value;
		            });

				}
			};
		}).directive('formatNum',function(){
			return {
				require: 'ngModel',
				scope: {
		            formatValue: "&formatValue"
		        },
				link: function(scope, elm, attrs, ctrl) {
					elm[0].onkeyup = function(){
						scope.formatValue()
					}
				}
			};
		}).directive('remoteValidation',['$http',function($http){
			//远程验证 Chen Qiu
            return {
                require:'ngModel',
                link:function(scope,elem,attrs,ctrl){
                    var remote = attrs.remote.split("/");
                    var user = {};
                    elem.bind('focus',function(){
                    	ctrl.$setValidity(remote[1],true);
                    })
                    elem.bind('blur',function(){
                        if(scope.$eval(attrs.ngModel)){
                            user[remote[0]] = scope.$eval(attrs.ngModel);
                            $http({
                            method:'post',
                            url: attrs.remoteValidation,
                            params:user,
                            headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                            }).success(function(data){
                                if (data == 'true'){
                                    ctrl.$setValidity(remote[1],true);
                                }else{
                                    ctrl.$setValidity(remote[1],false);
                                }
                            }).
                            error(function(data,status,headers,config){
                                ctrl.$setValidity(remote[1],false);
                            })
                        }
                    })
                }
            }
        }]).directive('popTipbox',function(){
			function hover(elem){
                elem.on('mouseleave',function(){
                	elem.children()[1].style.display = "none";
                });
                elem.on('mouseenter',function(){
                	elem.children()[1].style.display = "block";
                })
			}
			return{
				restrict: 'A',
				transclude: true,
				template: '<span ng-transclude></span><div class="poptip"><p class="poptipMain"></p><p class="poptipArrow"></p></div>',
				link:function(scope,elem,attr,ctrl){
					elem.css('position','relative');
					elem[0].children[1].children[0].innerHTML = attr.popTipbox;
                    //初始化
					var parentDiv = elem.children()[1],width1,width2;
					if(attr.index==1){   //三小图标
						parentDiv.style.bottom = "27px";
						parentDiv.children[0].style.whiteSpace = "nowrap";
					}else if(attr.index==2){  // 表格
						if(attr.popTipbox.length*13.5>250){
							parentDiv.style.width = 250 + 'px';
						}else{
							parentDiv.style.width = attr.popTipbox.length*13.5;
						}
						width1 = parentDiv.offsetWidth;
						parentDiv.style.bottom = "40px";
					}else{
						parentDiv.children[0].style.whiteSpace = "nowrap";
					}

					width1 = parentDiv.offsetWidth;
					width2 = elem[0].offsetWidth;
					//设置位置
					if(attr.index==2){
						parentDiv.style.left = (width2-width1)/2 -80 +'px';
					}else{
				        parentDiv.style.left = (width2-width1)/2 +'px';
					}
				    parentDiv.children[1].style.left = (width1/2-7) +'px';
					elem.children()[1].style.display = "none";
				    hover(elem);
				}
			}
		})
	}
});
