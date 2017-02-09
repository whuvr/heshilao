define(
	[
		'angular',
		'p2pSofa/services/form/formService',
		'p2pSofa/services/do/doService',
		'p2pSofa/services/common/commonService'
	],
	function(angular){

    	function addX(num){
            var i,z;
            for(i=0,z='';i<num;i++){
                z+= '*';
            }
            return z;
        }
        function hide(str,start,num){
            var i,str1;
            str1 = str.substr(0,start);
            return str1 + addX(num) + str.substr((num + str1.length));
        }
        function hideEmail(str){
            var num = str.indexOf('@');
            str1 = str.substr(0,num);
            return hide(str1,1,str1.length-2) + str.substr(num);
        }

		mod_directives.directive('cpForm', ['formService', function( formService ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.formAjax( scope, elm, attrs, form, {
						url: attrs.url,
						method: attrs.method
					} );
				}
			};
		}]).directive('cpFormRegister', ['formService','$state','$cookieStore','$rootScope', function( formService,$state,$cookieStore,$rootScope ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.register( scope, elm, attrs, form,{
						submitSuccess: function(scope,data){
							$rootScope.user = data.data;
							$rootScope.login.beforeLogin = false;
							$rootScope.login.afterLogin = true;
							$cookieStore.put('curUser',data.data);
							$state.go('register.activateEmailSucc');
						}
					} );
				}
			};
		}]).directive('cpFormInvestBorrow', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					/*formService.investBorrow( scope, elm, attrs, form,{
						submitSuccess: function(scope,arg){
							scope.payUrl = arg.data;
							cService.popupDialog('template_investPay',scope,{
			                    buttons: [],
		                    	closeBtn: false
							})
						}
					} );*/
					formService.investBorrow(scope, elem, attrs, form);
				}
			};
		}]).directive('cpFormInvestBond', ['formService','commonService', function( formService, cService ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.investBond( scope, elm, attrs, form,{
						submitSuccess: function(scope,arg){
							scope.payUrl = arg.data;
							cService.popupDialog('template_investPay',scope,{
			                    buttons: [],
		                    	closeBtn: false
							})

						}
					} );
				}
			};
		}]).directive('cpFormExpBorrows', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					formService.expBorrows(scope, elem, attrs, form);
				}
			};
		}]).directive('cpFormLogin', ['formService', function( formService ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.login( scope, elm, attrs, form );
				}
			};
		}]).directive('cpFormRecharge', ['formService', function( formService ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.recharge( scope, elm, attrs, form );
				}
			};
		}]).directive('cpFormWithdraw', ['formService', function( formService ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.withdraw( scope, elm, attrs, form );
				}
			};
		}]).directive('cpFormPublishBond', ['formService', '$rootScope', function( formService, $rootScope ) {
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.publishBond( scope, elm, attrs, form,{
						beforeSubmit: function(){
							$rootScope._showSellBondForm = false;
						},
						submitSuccess: function(scope,arg){
							alert('发布成功');
                			$rootScope._sellableBondData && $rootScope._sellableBondData.reload();
						}
					} );
				}
			};
		}]).directive('cpFormCredit', ['formService', function( formService ) {
		//信用额度申请
			return {
			 	require: '?form',
				link: function( scope, elm, attrs, form ) {
					formService.Credit( scope, elm, attrs, form,{
						submitSuccess: function(scope,arg){
	                        alert('申请成功',{
	                            buttons: [{
                                    type:'button',
                                    value: '确定',
                                    callBack: function() {
                                        location.reload();
                                    }
                                }]
	                        });
						}
					} );
				}
			};
		}]).directive('cpFormGetbackEmailFirst', ['formService', '$rootScope','$cookieStore', function( formService, $rootScope,$cookieStore){
			return {
				require: '?form',
			    link: function( scope, elem, attrs, form ){
			    	formService.getbackFirst( scope,elem,attrs,form,{
			    		submitSuccess:function(){
			    			$rootScope.getbackEma = true;
			    			elem.find('img')[0].setAttribute('src', "validCode?t=" + Math.random( ));
			    			$rootScope.getbackEmail = form.email.$viewValue;
 							$cookieStore.put(attrs.cpFormGetbackEmailFirst,60);
			    		},
			    		submitFail:function(){
			    			elem.find('img')[0].setAttribute('src', "validCode?t=" + Math.random( ));
			    		}
			    	} )
			    }
			}
		}]).directive('cpFormGetbackEmailSecond', ['formService', '$rootScope','$state', function( formService, $rootScope, $state){
			return {
				require: '?form',
			    link: function( scope, elem, attrs, form ){
			    	formService.getbackSecond( scope,elem,attrs,form,{
			    		submitSuccess:function(){
			    			$state.go("login.modifyPsw");
			    		}
			    	} )
			    }
			}
		}]).directive('cpFormGetbackPhoneFirst', ['formService', '$rootScope','$cookieStore', function( formService, $rootScope,$cookieStore){
			return {
				require: '?form',
			    link: function( scope, elem, attrs, form ){
			    	formService.getbackFirst( scope,elem,attrs,form,{
			    		submitSuccess:function(){
			    			$rootScope.getbackMob = true;
			    			elem.find('img')[0].setAttribute('src', "validCode?t=" + Math.random( ));
			    			$rootScope.getbackPhone = form.phone.$viewValue;
			    			$cookieStore.put(attrs.cpFormGetbackPhoneFirst,60);
			    		},
			    		submitFail:function(){
			    			elem.find('img')[0].setAttribute('src', "validCode?t=" + Math.random( ));
			    		}
			    	} )
			    }
			}
		}]).directive('cpFormGetbackPhoneSecond', ['formService', '$rootScope','$state', function( formService, $rootScope, $state){
			return {
				require: '?form',
			    link: function( scope, elem, attrs, form ){
			    	formService.getbackSecond( scope,elem,attrs,form,{
			    		submitSuccess:function(){
			    			$state.go("login.modifyPsw");
			    		}
			    	} )
			    }
			}
		}]).directive('cpFormGetbackModifyPsw', ['formService','$state', function(formService, $state){
			return {
				require: '?form',
				link: function(scope, elem, attrs, form ){
					formService.getbackModifyPsw( scope,elem,attrs,form, {
						submitSuccess:function(){
							$state.go("login.modifySuc") ;
						}
					})
				}
			}
		}]).directive('cpFormBorrow', ['formService','$state', function(formService, $state){
			return {
				require: '?form',
				link: function(scope, elem, attrs, form){
					formService.borrow( scope,elem,attrs,form, {
						submitSuccess:function(){
							alert('您好！您的借款申请已成功提交，请耐心等待业务人员联系您!',{
	                            closeBtn:false,
	                            buttons:[{
	                                type:'button',
	                                value:'确定',
	                                callBack:function(){
	                                    $state.go('home');
	                                }
	                            }]
	                        });
						}
					})
				}
			}
		}]).directive('cpFormModifyPsw', ['formService', function(formService){
      		return {
        		require: '?form',
        		link: function(scope, elem, attrs, form){
          			formService.modifyPsw(scope,elem,attrs,form,{
	            		submitSuccess:function(data){
		              		scope.showPsw = false;
		                	confirm('修改登录密码成功',{

		                   	},2000);
		                  	elem[0].reset();
		            	}
                	})
        		}
      		}
	    }]).directive('cpFormBindEmail', ['formService','$rootScope','$cookieStore', function(formService,$rootScope,$cookieStore){
	      	return {
	        	require: '?form',
	        	link: function(scope, elem, attrs, form){
		          	formService.bindEmail(scope,elem,attrs,form,{
		            	submitSuccess:function(data){
		              		scope.bindEma = false;
                          	scope.isEmail = true;

                            var user = $cookieStore.get('curUser');
                            user.email = form.email.$viewValue;
                            user.emailStatus = true;
                            $cookieStore.put('curUser',user);
                            scope.validCode = '';

                          	scope.bindEmail = hideEmail(form.email.$viewValue);
                          	confirm("邮箱绑定成功",{});
		            	}
		          })
		        }
	      	}
    	}]).directive('cpFormModifyEmailFirst', ['formService','$rootScope','$cookieStore', function(formService,$rootScope,$cookieStore){
      		return {
        		require: '?form',
        		link: function(scope, elem, attrs, form){
          			formService.modifyEmailFirst(scope,elem,attrs,form,{
            			submitSuccess:function(data){
              				if(data){
	                          	scope.emailFir=true;
	                          	scope.emailSec=true;
	                          	scope.email = '';
	                          	scope.validCode = '';
                          	}
            			}
          			})
        		}
      		}
	    }]).directive('cpFormModifyEmailSecond', ['formService','$rootScope','$cookieStore', function(formService,$rootScope,$cookieStore){
	      	return {
	        	require: '?form',
	        	link: function(scope, elem, attrs, form){
	          		formService.modifyEmailSecond(scope,elem,attrs,form,{
	            		submitSuccess:function(data){
	             			scope.emailFir = false;
	                      	scope.emailSec = false;
	                      	scope.showEma = false;

	                      	$rootScope.user.email = form.email.$viewValue;
	                      	var userData = $rootScope.user;
	                      	$cookieStore.put('curUser',userData);

	                      	scope.bindEmail = hideEmail(form.email.$viewValue);

	                      	//清空email和验证码框
	                      	scope.email = '';
	                      	scope.validCode = '';

	                      	confirm("修改邮箱成功",{});
	            		}
	          		})
	        	}
	      	}
	    }]).directive('cpFormPaymentAccount', ['formService', 'commonService', '$cookieStore', '$state', '$rootScope', function(formService, cService, $cookieStore, $state, $rootScope){
	    	//FUNCTION:payment account form
	    	//USAGE:
	    	//VERSION: V1.0.0 2016-01-04
	    	//支付账户表单
			return {
				require: '?form',
				link: function(scope, elem, attrs, form){
					/*formService.paymentAccount( scope,elem,attrs,form, {
						submitSuccess:function(scope,arg){
							scope.identifyUrl = arg.data;
							scope.identified = false;
							cService.popupDialog('template_accountIdentify',scope,{
			                    buttons: []
							})
						}
					})*/
					formService.paymentAccount( scope,elem,attrs,form)
				}
			}
		}]).directive('cpFormPaymentAccountCorp', ['formService', 'commonService', '$cookieStore', '$state', '$rootScope', function(formService, cService, $cookieStore, $state, $rootScope){
	    	//FUNCTION:payment account form
	    	//USAGE:
	    	//VERSION: V1.0.0 2016-01-04
	    	//支付账户表单
			return {
				require: '?form',
				link: function(scope, elem, attrs, form){
					/*formService.paymentAccountCorp( scope,elem,attrs,form, {
						submitSuccess:function(scope,arg){
							scope.identifyUrl = arg.data;
							scope.identified = false;
							cService.popupDialog('template_accountIdentify',scope,{
			                    buttons: []
							})
						}
					})*/
					formService.paymentAccountCorp( scope,elem,attrs,form)
				}
			}
		}]).directive('cpFormModifyPhoneFirst',['formService','$rootScope',function(formService,$rootScope){
			return {
				require: '?form',
				link: function(scope, elem, attrs, form){
					formService.modifyPhoneFirst(scope, elem, attrs,form, {
						submitSuccess: function(){
							scope.validCode1 = '';
							scope.MobileModify = false;
						}
					})
				}
			}
		}]).directive('cpFormModifyPhoneSecond',['formService','$rootScope','$cookieStore',function(formService,$rootScope,$cookieStore){
			return {
				require: '?form',
				link: function(scope, elem, attrs, form){
					formService.modifyPhoneSecond(scope, elem, attrs,form, {
						submitSuccess: function(){
							$rootScope.user.phone = scope.phone;
	                        $cookieStore.put('curUser',$rootScope.user);
	                        scope.userPhone = hide(scope.phone,5,4);
							scope.phone = '';
							scope.validCode1 = '';
							form.$setPristine();
							scope.MobileModify = true;
	                        scope.showMob = false;
	                        confirm("手机号码修改成功！",{});
						}
					})
				}
			}
		}]).directive('cpFormWithdrawalsPay', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					formService.withdrawalsPay(scope, elem, attrs, form);
				}
			}
		}]).directive('cpFormRechargePay', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					formService.rechargePay(scope, elem, attrs, form);
				}
			}
		}]).directive('cpFormRealName', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					formService.realName(scope, elem, attrs, form);
				}
			}
		}]).directive('cpFormCorpName', ['formService','commonService', function( formService, cService ) {
			return {
				require: '?form',
				link: function( scope, elem, attrs, form ) {
					formService.corpName(scope, elem, attrs, form);
				}
			}
		}])
	}
)
