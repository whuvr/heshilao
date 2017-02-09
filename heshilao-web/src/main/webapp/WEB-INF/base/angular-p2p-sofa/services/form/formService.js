define(
	[
		'angular',
        'p2pSofa/services/common/commonService'
	],
	function(angular) {
		mod_services.service('formService',['commonService', '$parse', 'validationManager', function( cService, $parse, validationManager ) {
            var
                service;
            service = {
                formAjax: function( scope, elem, attrs, form, opts ) {
                    var
                        events = [ 'beforeSubmit', 'submitSuccess', 'submitFail' ],
                        event,
                        actions = [],
                        bAjax = attrs.action == undefined,
                        url = attrs.url || opts.url,
                        method = attrs.ajaxMethod || opts.method || 'post' ,//the method default value of ie form is get
                        ajaxParams = opts.ajaxParams || { },
                        i = 0;
                    for ( ; i < events.length; i ++ ) {
                        event = events[ i ];
                        actions[ event ] = attrs[ event ] || opts[ event ];
                    }
                    function setParams( ) {
                        var
                            types = [ 'input', 'select', 'textarea' ],
                            $inputs,
                            input,
                            name,
                            i,
                            j;
                        for ( i = 0; i < types.length; i ++) {
                            $inputs = elem.find( types[ i ] );
                            for ( j = 0; j < $inputs.length; j ++ ) {
                                input = $inputs[ j ];
                                name = input.getAttribute( 'name' );
                                if ( name != undefined && input.value ) {
                                    // ajaxParams[ name ] = input.value;
                                    if ( name == 'capitalStr'||name == 'investCapitalStr' ) {//2016-4-26 modified wyk@erongdu.com
                                        ajaxParams[ name ] = fieldRSA(angular.element(input));
                                    } else {
                                        ajaxParams[ name ] = input.value;
                                    }
                                }
                            }
                        }
                    }
                    elem[ 0 ].setAttribute( 'novalidate', true );//关闭html5校验

                     //disable enter submit form
                    if (attrs.disableEnter != undefined){
                        elem.on('keypress', function(e){
                            var code = e.keyCode || e.which;
                            if (code == 13) {
                                e.preventDefault();
                                return false;
                            }
                        });
                    }


                    elem.on( 'submit', function( e ) {

                        if ( form.$valid ) {
                            //return if function beforeSubmit return false
                            if ( $parse( actions[ 'beforeSubmit' ] )( scope, {
                                form: form
                            } ) == false ) {
                                return;
                            }

                            if ( bAjax ){
                                setParams( );
                                cService.ajax( {
                                    method : method,
                                    url: url,
                                    params: ajaxParams
                                } ).success(function( data, status, headers, config ) {
                                    $parse( actions[ 'submitSuccess' ] )( scope, {
                                        data: data,
                                        status: status,
                                        headers: headers,
                                        config: config
                                    } );
                                } ).error(function( data, status, headers, config ) {
                                    $parse( actions[ 'submitFail' ] )( scope, {
                                        data: data,
                                        status: status,
                                        headers: headers,
                                        config: config
                                    } );
                                } );
                            }
                            //标详情页判断提交按钮，禁止双击
                            if(scope.investBorrowForm){
                                console.log(scope.investBorrowForm);
                                var input = document.getElementsByTagName("input");
                                if (input.length > 0) {
                                    for (var key in input) {
                                        var typeValue = document.getElementsByTagName("input")[key].type;
                                        if (typeValue == "submit") {
                                            document.getElementsByTagName("input")[key].disabled = true;
                                        }
                                    }
                                }
                            }
                        } else {
                            validationManager.validateForm( elem );
                            e.preventDefault ? e.preventDefault() : e.returnValue = false;
                        }

                    } );
                },
                register: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: 'users/register'
                    },opts || {}))
                },
                investBorrow: function( scope, elem, attrs, form, opts ){
                    /*this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: 'investments'
                    },opts || {}))*/
                	elem.on('submit', function(e) {
						if (form.$valid) {
							scope.paid = false;
							scope.formUrl = 'investments';
							var ele = angular.element(document.getElementById('investFunds'));
			                var val = fieldRSA(ele);
							scope.capitalStr = val;
			                var modelValue;
			                if(form.passwordDirect && form.passwordDirect.$modelValue){
			                	scope.passwordDirect = form.passwordDirect.$modelValue;
			                }
			                cService.ajax({
			                    url: "investments/investCheck",
			                    method: "post",
			                    params: {
                                    capitalStr:scope.capitalStr,
                                    borrowId:scope.borrowData.id,
                                    redPacketIds:scope.redPacketIds,
                                    passwordDirect:scope.passwordDirect,
                                    token:scope.borrowData.token
                                }
			                }).success(function(data, status, headers, config) {
								cService.removePopupDialog();
								cService.popupDialog('template_investPay',scope,{
				                    buttons: [],
			                    	closeBtn: false,
			                    	wait:false
								});
			                })
						} else {
                            validationManager.validateForm( elem );
                            e.preventDefault ? e.preventDefault() : e.returnValue = false;
                        }
					})
                },
                investBond: function( scope, elem, attrs, form, opts ){
                    /*this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: 'bond/userBonds/investBond'
                    },opts || {}))*/
                	elem.on('submit', function(e) {
						if (form.$valid) {
							scope.paid = false;
							scope.formUrl = 'bond/userBonds/investBond';
							var ele = angular.element(document.getElementById('investFunds'));
			                var val = fieldRSA(ele);
							scope.capitalStr = val;
							if(form.passwordDirect && form.passwordDirect.$modelValue){
								scope.passwordDirect = form.passwordDirect.$modelValue;
							}
			                cService.ajax({
			                    url: "bond/userBonds/investBondCheck",
			                    method: "post",
                                params: {
                                    investCapitalStr: scope.capitalStr,
                                    id: scope.bondData.bond.id,
                                    userId: scope.bondData.bond.userId,
                                    token: scope.bondData.bond.token
                                }
			                }).success(function(data, status, headers, config) {
								cService.removePopupDialog();
								cService.popupDialog('template_bond_investPay',scope,{
				                    buttons: [],
			                    	closeBtn: false,
			                    	wait:false
								});
			                })
						} else {
                            validationManager.validateForm( elem );
                            e.preventDefault ? e.preventDefault() : e.returnValue = false;
                        }
					})
                },
                expBorrows: function( scope, elem, attrs, form, opts ){
                	elem.on('submit', function(e) {
//						if (form.$valid) {
//							console.log(scope.expborrowTotal);
                		if (scope.expborrowTotal>0) {
							var expIds = document.getElementById('expIds').value;
			                cService.ajax({
			                    url: "expBorrows/invest",
			                    method: "post",
			                    params: {expBorrowId:scope.expborrowsData.id, expIds:expIds}
			                }).success(function(data, status, headers, config) {
								if(data==1){
									alert("投资成功", {
                                        buttons: [{
                                            type: 'button',
                                            value: '确定',
                                            callBack: function() {
                                                window.location.reload();
                                            }
                                        }]
                                    });
								}
			                })
						} else {
							alert("请选择体验金！", {
                                buttons: [{
                                    type: 'button',
                                    value: '确定',
                                    callBack: function() {
                                        window.location.reload();
                                    }
                                }]
                            });
                        }
					})
                },
                login: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url:"users/login",
                        method: "post"
                    },opts || {}))
                },
                recharge: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "account/recharge/recharge",
                        method: "get"
                    },opts || {}))
                },
                withdraw: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "account/cash/cashform",
                        method: "get"
                    },opts || {}))
                },
                publishBond: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "bond/userBonds/publishBond",
                        method: "post"
                    },opts || {}))
                },
                Credit: function( scope, elem, attrs, form, opts ){
                    //信用额度申请
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "user/creditapply",
                        method: "post"
                    },opts || {}))
                },
                getbackFirst: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/getPassword",
                        method: "post"
                    },opts || {}))
                },
                getbackSecond: function( scope, elem, attrs, form, opts ){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/checkCode",
                        method: "post"
                    },opts || {}))
                },
                getbackModifyPsw: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/modifyPassword",
                        method: "post"
                    },opts || {}))
                },
                borrow: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "borrows/borrowApply",
                        method: "post"
                    },opts || {}))
                },
                modifyPsw: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/updatePassword",
                        method: "post"
                    },opts || {}))
                },
                bindEmail: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/emailAuth",
                        method: "post"
                    },opts || {}))
                },
                modifyEmailFirst: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/checkCode",
                        method: "post"
                    },opts || {}))
                },
                modifyEmailSecond: function( scope, elem, attrs, form, opts){
                    this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "users/modifyEmail",
                        method: "post"
                    },opts || {}))
                },
                paymentAccount: function( scope, elem, attrs, form, opts){
                    /*this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "account/paymentaccount",
                        method: "post"
                    },opts || {}))*/
                	elem.on('submit', function() {
                		if (form.$valid) {
                			scope.identified = false;
                            cService.ajax({
                                url: "account/paymentaccount/paymentAccountCheck",
                                method: "post",
                                params: {realName:scope.formParams.realName, idNo:scope.formParams.idNo}
                            }).success(function(data, status, headers, config) {
                                cService.removePopupDialog();
                                cService.popupDialog('template_accountIdentify',scope,{
                                    buttons: [],
                                    wait:false
                                })
                            })
                		}
					})
                },
                paymentAccountCorp: function( scope, elem, attrs, form, opts){
                    /*this.formAjax( scope, elem, attrs, form, angular.extend({
                        url: "companyRegister",
                        method: "post"
                    },opts || {}))*/
                	elem.on('submit', function() {
                		if (form.$valid) {
                			scope.identified = false;
                            cService.ajax({
                                url: "account/paymentaccount/paymentAccountCheck",
                                method: "post",
                                params: {corpName:scope.formParams.corpName, businessLicenceCode:scope.formParams.businessLicenceCode}
                            }).success(function(data, status, headers, config) {
                            cService.removePopupDialog();
                            cService.popupDialog('template_accountIdentify',scope,{
                                buttons: [],
                                wait:false
                            })
                            })
                		}
					})
                },
                modifyPhoneFirst: function(scope, elem, attrs, form, opts){
                    this.formAjax(scope, elem, attrs, form, angular.extend({
                        url: "users/phoneAuth",
                        method: "post"
                    },opts || {}))
                },
                modifyPhoneSecond: function(scope, elem, attrs, form, opts){
                    this.formAjax(scope, elem, attrs, form, angular.extend({
                        url: "users/phoneModify",
                        method: "post"
                    },opts || {}))
                },
                withdrawalsPay: function( scope, elem, attrs, form, opts ){
                	elem.on('click', function(e) {
                        if (scope.form1.$valid) {
                            var xmlHttpRequest = null;
                            if (window.ActiveXObject) { //如果是IE浏览器
                                xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                            } else if (window.XMLHttpRequest) { //非IE浏览器
                                xmlHttpRequest = new XMLHttpRequest();
                            }
                            xmlHttpRequest.onreadystatechange = function() {
                                if (xmlHttpRequest.readyState == 4) {
                                    if (xmlHttpRequest.status == 200) {
                                        document.form1.submit();
                                        alert("<div id='popupDialog'>请前往新打开窗口去完成提现操作，提现完成前不要关掉本窗口！</div>", {
                                            buttons: [{
                                                type: 'button',
                                                value: '提现成功',
                                                callBack: function () {
                                                    window.location.reload();
                                                }
                                            }, {
                                                type: 'button',
                                                value: '提现失败',
                                                callBack: function () {
                                                    window.location.reload();
                                                }
                                            }]
                                        });
                                    } else {
                                    	var json = eval('(' + xmlHttpRequest.responseText + ')');
                                        alert(json.message);
                                    }
                                }
                            }
                            var url = 'cashStr=' + scope.formData.cashStr+'&token='+scope.token
                            if(scope.formData.bankId){
                                url += '&bankId='+scope.formData.bankId;
                            }
                            xmlHttpRequest.open("POST", "account/cash/cashCheck?"+url,false);
                            xmlHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xmlHttpRequest.send(null);
                        }
					})
                },rechargePay: function( scope, elem, attrs, form, opts ){
                	elem.on('click', function(e) {
                        if (scope.form2.$valid) {
                            var xmlHttpRequest = null;
                            if (window.ActiveXObject) { //如果是IE浏览器
                                xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                            } else if (window.XMLHttpRequest) { //非IE浏览器
                                xmlHttpRequest = new XMLHttpRequest();
                            }
                            xmlHttpRequest.onreadystatechange = function() {
                                if (xmlHttpRequest.readyState == 4) {
                                    if (xmlHttpRequest.status == 200) {
                                        document.form2.submit();
                                      alert("<div id='popupDialog'>请前往新打开窗口去完成充值操作，充值完成前不要关掉本窗口！</div>", {
                                      buttons: [{
                                        type: 'button',
                                        value: '充值成功',
                                        callBack: function() {
                                          window.location.reload();
                                        }
                                      }, {
                                        type: 'button',
                                        value: '充值失败',
                                        callBack: function() {
                                          window.location.reload();
                                        }
                                      }]
                                    })
                                    } else {
                                    	var json = eval('(' + xmlHttpRequest.responseText + ')');
                                        alert(json.message);
                                    }
                                }
                            }
                            xmlHttpRequest.open("POST",'account/recharge/rechargeCheck?cashStr=' + scope.formData1.cashStr+'&rechargeType='+scope.formData1.rechargeType+'&token='+scope.token,false);
                            xmlHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                            xmlHttpRequest.send(null);
                        }
					})
                }
            }
			return service;
		} ] )
	}
);