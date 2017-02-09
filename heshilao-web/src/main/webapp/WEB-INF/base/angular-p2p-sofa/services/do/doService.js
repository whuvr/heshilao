/**
 * @name doService
 * @description
 * services for doing something such as going to my email、viewing users' information and so on
**/
define(
	[
		'angular',
        'p2pSofa/services/common/commonService'
	],
	function(angular) {
		mod_services.service('doService',['commonService', '$parse', '$rootScope', function( cService, $parse,$rootScope ) {
            var
                service;
            service = {
                /**
                 * @name doAjax
                 * @description
                 * doing something with ajax request
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object opts} the optional properties of this object including:
                 * varName:  the name of the variable inserted into the scope and assigned by the ajax response data
                 * url: ajax url
                 * method: ajax method
                 * beforeDo: event  before sending ajax request
                 * doSuccess: event after ajax request response successfully
                 * doFail: event after ajax request response failed
                 * @return {promise}
                 * @usage
                 * doService.doAjax(scope, elem, attrs, opts)
                **/
                doAjax: function( scope, elem, attrs, opts ) {

                    typeof opts != 'object' && ( opts = {} );
                    typeof opts.params != 'object' && ( opts.params = {} );
                    opts.params =  angular.extend( opts.params, attrs.params ? scope.$eval( attrs.params ) : {} );
                    var
                        events = [ 'beforeDo', 'doSuccess', 'doFail' ],
                        event,
                        actions = [],
                        url = attrs.url || opts.url,
                        method = attrs.method || opts.method || 'get',
                        params = opts.params,
                        varName = attrs.varName || opts.varName,
                        i = 0;
                    for ( ; i < events.length; i ++ ) {
                        event = events[ i ];
                        actions[ event ] =  attrs[ event ] || opts[ event ];
                    }
                    function network( ) {
                        $parse( actions[ 'beforeDo' ] )(scope, {});
                        return cService.ajax( {
                            method : method,
                            url: url,
                            params: params
                        } ).success(function( data, status, headers, config ) {
                            $parse( actions[ 'doSuccess' ] )( scope, {
                                data: data
                            } );
                            if ( varName ){
                                data.reload = network;
                                scope[ varName ] = data;
                            }

                        } ).error(function( data, status, headers, config ) {
                            cService.removePopupDialog()
                            $parse( actions[ 'doFail' ] )( scope, {
                                data: data
                            } );
                        } );
                    }

                    return network();

                },
                /**
                 * @name gotoEmail
                 * @description
                 * open the email official web in a new window according to the email address
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {string email} any valid email address
                 * @return
                 * @usage
                 * doService.gotoEmail(scope, elem, attrs, 'myemail@126.com')
                 * @mark 跳转去邮箱官方网站
                **/
                gotoEmail: function( scope, elem, attrs, email ) {
                    var
                        emailDomain = email.match(/@([\w\W]*)\./);
                    if ( emailDomain ) {
                        emailDomain = emailDomain[ 1 ];
                        window.open( 'http://mail.' + emailDomain + '.com' )
                    }
                },
                /**
                 * @name sendActivateEmail
                 * @description
                 * send a email to user's mailbox for activating account
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {string username} user name
                 * @return
                 * @usage
                 * doService.sendActivateEmail(scope, elem, attrs, 'username')
                 * @mark 发送激活账户邮件
                **/
                sendActivateEmail: function( scope, elem, attrs, username ) {
                    return this.doAjax( scope, elem, attrs, {
                        url: 'users/sentActivateEmail',
                        method: 'get',
                        params: {
                            username: username
                        }
                    } )
                },
                /**
                 * @name stopBond
                 * @description
                 * stop bond transferring
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object opts} object must be included the bondId property
                 * @return {promise}
                 * @usage
                 * doService.stopBond(scope, elem, attrs, {bondId: 8080})
                 * @mark 撤销债权转让
                **/
                stopBond: function( scope, elem, attrs, opts ) {
                    return this.doAjax( scope, elem, attrs, angular.extend({
                        url: 'bond/userBonds/stopBond' + '/' + opts.bondId,
                        method: 'post'
                    }, opts));
                },
                /**
                 * @name registerProtocol
                 * @description
                 * view register protocol
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object opts}
                 * @return {promise}
                 * @usage
                 * doService.registerProtocol(scope, elem, attrs, {})
                 * @mark 查看注册协议
                **/
                registerProtocol: function( scope, elem, attrs, opts ) {
                    return this.doAjax( scope, elem, attrs, angular.extend({
                        url: 'users/getRegisterProtocolContext',
                        method: 'get'
                    }, opts));
                },
                /**
                 * @name sendCode
                 * @description
                 * send captcha to user's mobile phone
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object params}
                 * @return
                 * @usage
                 * sendCode service will call different method according to the sendcode-type attribute of host element.
                 * for example: if you want to send captcha to user to verify the validity of mobile phone number,just set the sendcode-type attribute to
                 * 'register'
                 * doService.sendCode(scope, elem, attrs)
                 * @mark 注册时发送手机校验码
                **/
                sendCode: function( scope, elem, attrs, params ) {
                    if(attrs.sendcodeType == "borrow"){
                        this.sendBorrowCode(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "register"){
                        this.sendRegisterCode(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "getbackEmail"){
                        params[attrs.cpDoSendCode] = $rootScope.getbackEmail;
                        this.sendGetbackCode(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "getbackPhone"){
                        params[attrs.cpDoSendCode] = $rootScope.getbackPhone;
                        this.sendGetbackCode(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "accountSetBindEmail"){
                        this.sendAccountSetBindEmailCode(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "accountSetModifyEmailFirst"){
                        this.sendAccountSetModifyEmailFirst(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "accountSetModifyEmailSecond"){
                        this.accountSetModifyEmailSecond(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "modifyPhoneFirst"){
                        params[attrs.cpDoSendCode] = $rootScope.user.phone;
                        this.modifyPhoneFirst(scope, elem, attrs, params);
                    }else if(attrs.sendcodeType == "modifyPhoneSecond"){
                        this.modifyPhoneSecond(scope, elem, attrs, params);
                    }
                },
                sendRegisterCode: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend({params:params}, {
                        url: 'users/sendCode',
                        method: 'post'
                    } ) )
                },
                sendGetbackCode: function( scope, elem, attrs, params ) {
                    return this.doAjax( scope, elem, attrs, angular.extend({params:params},{
                        url: 'users/getPasswordCode',
                        method: 'post'
                    } ) )
                },
                sendBorrowCode: function( scope, elem, attrs, params ){
                    params.phone = params[attrs.cpDoSendCode];
                    delete params[attrs.cpDoSendCode];
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'borrows/sendCode',
                        method: 'get'
                    },params || {} ) )
                },

                borrowsPayback: function( scope, elem, attrs, opts ) {
                    //企业直接还款
                    return this.doAjax( scope, elem, attrs, angular.extend( {
                        url: 'repayments/corpRepay?id=' + opts.backId+"&token="+opts.token,
                        method: 'get'
                    },opts ) )
                },
                sendAccountSetBindEmailCode: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'users/sendBindCode',
                        method: 'post'
                    } ) )
                },

                sendAccountSetModifyEmailFirst: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'users/sendCheckCode',
                        method: 'post'
                    } ) )
                },

                accountSetModifyEmailSecond: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'users/sendCheckCodeSecond',
                        method: 'post'
                    } ) )
                },
                /**
                 * @name operateUserMessage
                 * @description
                 * operate user message such as markup 、 delete
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object opts} must be included arr property which means array of processing message's ids and operate property which
                 * 1 means to delete the message
                 * 2 means to markup the message be unread
                 * 3 means to markup the message be read
                 * @return {promise}
                 * @usage
                 * doService.operateUserMessage(scope, elem, attrs)
                 * @mark 操作用户消息，如标记已读、未读、删除等
                **/
                operateUserMessage: function( scope, elem, attrs, opts ) {
                    return this.doAjax( scope, elem, attrs, angular.extend( {
                        url : 'user/message/' + opts.arr.join(',') + '/' + opts.operate,
                        method: 'get'
                    },opts || {} ) )
                },
                /**
                 * @name operateUserMessage
                 * @description
                 * view user's message
                 * @param {object scope} the scope of directive to invoke this service
                 * @param {object elem}  the host element of directive to invoke this service
                 * @param {object attrs} the attrs of the host element of directive to invoke this service
                 * @param {object opts} must be included id property which means id of bond to view

                 * @return {promise}
                 * @usage
                 * doService.operateUserMessage(scope, elem, attrs)
                 * @mark 查看用户消息
                **/
                viewUserMessage: function( scope, elem, attrs, opts ) {
                    return this.doAjax( scope, elem, attrs, angular.extend( {
                        url : 'user/message/' + opts.id,
                        method: 'get'
                    },opts || {} ) )
                },

                modifyPhoneFirst: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'users/sendPhoneCode',
                        method: 'post'
                    } ) )
                },

                modifyPhoneSecond: function( scope, elem, attrs, params ){
                    return this.doAjax( scope, elem, attrs, angular.extend( {params:params},{
                        url: 'users/sendPhoneCode',
                        method: 'post'
                    } ) )
                },
                //bond detail protocol preview
                //@param bondId: the id of bond to be previewed protoool of it
                bondDetailProtocolPreview: function( scope, elem, attrs, opts ){
                    return this.doAjax( scope, elem, attrs, angular.extend({
                        url: 'bond/userBonds/bondProtocolPreviewSell',
                        method: 'get'
                    }, opts || {} ) )
                }

            }
			return service;

		} ] )
	}
);