define(
    [
        'angular',
        'p2pSofa/services/common/commonService'
    ],
    function(angular) {
        mod_services.service('validService', ['commonService', function(cService) {
            var
                service;
            var
                rUsername = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{4,16}$/,
                rInvite = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{4,16}$|^$/,
                rEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/,
                rPassword = /^(?![a-zA-Z]+$)(?!\d+$)[0-9A-Za-z]{8,16}$/,
                rNumber = /^(?!\.)[\d]*[.]?[\d]*$/,
                rPhone = /^1[3|4|5|7|8]\d{9}$/;
            service = {
                validators: {
                    min: function(scope, elem, attrs, ctrl, opts) {
                        opts = angular.extend({
                            errorName: 'cp-valid-min'
                        }, opts || {});
                        var
                            errorName = opts.errorName,
                            attrName = opts.attrName,
                            min;

                        return function(value) {
                            min = scope.$eval(attrName);
                            ctrl.$setValidity(errorName, value >= min);
                            return value;
                        }

                    },
                    max: function(scope, elem, attrs, ctrl, opts) {
                        opts = angular.extend({
                            errorName: 'cp-valid-max'
                        }, opts || {});
                        var
                            errorName = opts.errorName,
                            attrName = opts.attrName,
                            max;

                        return function(value) {
                            max = scope.$eval(attrName);
                            ctrl.$setValidity(errorName, value <= max);
                            return value;
                        }

                    },
                    number: function(scope, elem, attrs, ctrl, opts) {
                        opts = angular.extend({
                            errorName: 'cp-valid-number'
                        }, opts || {});
                        var
                            errorName = opts.errorName;

                        return function(value) {
                            ctrl.$setValidity(errorName, value && value.match(rNumber))
                            return value;
                        }

                    }
                },
                captcha: function(scope, elem, attrs) {
                    function setSrc() {
                        elem[0].setAttribute('src', "validCode?t=" + Math.random());
                    }

                    elem.on('click', function() {
                        setSrc()
                    });

                    setSrc();

                },
                refreshCaptcha: function(dom) {
                    dom.src = 'validCode?t=' + Math.random();
                },
                pattern: function(scope, elem, attrs, ctrl, opts) {
                    var
                        opts = angular.extend({

                        }, opts || {}),
                        reg = opts.reg,
                        errorName = opts.errorName;

                    function validator(value) {
                        value = value || '';
                        if (value.match(reg)) {
                            ctrl.$setValidity(errorName, true);

                        } else {
                            ctrl.$setValidity(errorName, false);
                        }
                        return value;
                    };
                    ctrl.$parsers.push(validator);
                    ctrl.$formatters.push(validator);

                },
                remote: function(scope, elem, attrs, ctrl, opts) {
                    var
                        opts = angular.extend({
                            url: '',
                            method: 'post'
                        }, opts || {}),
                        url = opts.url,
                        method = opts.method,
                        params = opts.params || {},
                        errorName = opts.errorName;
                    elem.on('focus', function() {
                        ctrl.$setValidity(errorName, true);
                    })
                    elem.on('blur', function() {
                        if (ctrl.$valid && ctrl.$viewValue) {
                            newVal = this.value;
                            params[this.name] = ctrl.$viewValue;
                            cService.ajax({
                                url: url,
                                method: method,
                                params: params
                            }).success(function(data) {
                                if (data == 'true' || data == '') {
                                    ctrl.$setValidity(errorName, true);
                                } else {
                                    ctrl.$setValidity(errorName, false);
                                }
                            }).error(function() {
                                ctrl.$setValidity(errorName, false);
                            });
                        }

                    });
                },
                username: function(scope, elem, attrs, ctrl) {
                    this.pattern(scope, elem, attrs, ctrl, {
                        reg: rUsername,
                        errorName: attrs.usernameErrorType || 'cp-valid-username'
                    });

                },
                invite: function(scope, elem, attrs, ctrl) {
                    this.pattern(scope, elem, attrs, ctrl, {
                        reg: rInvite,
                        errorName: attrs.usernameErrorType || 'cp-valid-username'
                    })
                },
                remoteUsername: function(scope, elem, attrs, ctrl) {
                    this.remote(scope, elem, attrs, ctrl, {
                        url: 'users/checkUsername',
                        errorName: attrs.remoteUsernameErrorType || 'cp-valid-remote-username'
                    });

                },
                remoteInvite: function(scope, elem, attrs, ctrl) {
                    this.remote(scope, elem, attrs, ctrl, {
                        url: 'users/checkInviteUser',
                        errorName: attrs.remoteInviteErrorType || 'cp-valid-remote-friend'
                    });
                },
                email: function(scope, elem, attrs, ctrl) {
                    this.pattern(scope, elem, attrs, ctrl, {
                        reg: rEmail,
                        errorName: attrs.emailErrorType || 'cp-valid-email'
                    });

                },
                remoteEmail: function(scope, elem, attrs, ctrl) {
                    this.remote(scope, elem, attrs, ctrl, {
                        url: 'users/checkEmail',
                        errorName: attrs.remoteUsernameErrorType || 'cp-valid-remote-email'
                    });

                },
                password: function(scope, elem, attrs, ctrl) {
                    this.pattern(scope, elem, attrs, ctrl, {
                        reg: rPassword,
                        errorName: attrs.passwordErrorType || 'cp-valid-password'
                    });

                },
                phone: function(scope, elem, attrs, ctrl) {
                    this.pattern(scope, elem, attrs, ctrl, {
                        reg: rPhone,
                        errorName: attrs.phoneErrorType || 'cp-valid-phone'
                    });

                },
                remotePhone: function(scope, elem, attrs, ctrl) {
                    this.remote(scope, elem, attrs, ctrl, {
                        url: 'users/checkPhone',
                        errorName: attrs.remotePhoneErrorType || 'cp-valid-remote-phone'
                    });

                }
            }
            return service;

        }])
    }
);