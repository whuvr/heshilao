define(['angular'], function(angular) {
    return function(app, elem, attrs, scope) {
        app.controller("activitiesCtrl", ['$rootScope', '$scope', 'cService', '$state', '$cookieStore', '$location', '$interval', function($rootScope, $scope, cService, $state, $cookieStore, $location, $interval) {

            $scope.formData = {
                username: '',
                phone: '',
                password: '',
                isAgree: '',
                validCode: '',
                userInviteCode: '',
                imageCode: '',
                userType: 0
            };
            $scope.$parent.formData1 = {
                    phone: '',
                    username: ''
                }
                // 第三方渠道
            var code = $location.search().code;
            if (code) {
                $scope.formData.sourceCode = code;
            }
            var leid = $location.search().leid;
            if (leid) {
                $scope.formData.leid = leid;
            }
            var luid = $location.search().luid;
            if (luid) {
                $scope.formData.luid = luid;
            }
            //错误信息配置
            $scope.serverError = false;
            $scope.callError = '';
            $scope.hideError = function() { //隐藏提示
                $scope.serverError = false;
            }

            //图片验证码
            var dom = document.getElementById("getcode"),
                timer;
            var isStarting = false;
            $scope.$on('$viewContentLoaded', function() {
                dom = document.getElementById("getcode");
            });
            // var dom = angular.element(document.getElementById('getcode'))[0];
            $scope.validImg = function() {
                var len = 0;
                if ($scope.formData.imageCode) {
                    len = $scope.formData.imageCode.length;
                }
                $scope.serverError = false;
                dom.setAttribute('disabled', 'disabled');
                dom.setAttribute('class', 'register-getcode  disabled');
                if (len >= 4) {
                    cService.ajax({
                        url: 'users/checkImageCode',
                        method: 'post',
                        params: {
                            imageCode: $scope.formData.imageCode
                        }
                    }).success(function(data) {
                        if (data == "" && isStarting == false) {
                            dom.removeAttribute('disabled');
                            dom.setAttribute('class', 'register-getcode');
                        } else {
                            dom.setAttribute('disabled', 'disabled');
                            dom.setAttribute('class', 'register-getcode  disabled');
                        }
                    }).error(function(data, status, headers, config) {
                        // console.log(data + status + headers + config)
                        dom.setAttribute('disabled', 'disabled');
                        dom.setAttribute('class', 'register-getcode  disabled');
                        if (data.code == "3005") {
                            $scope.callError = data.message;
                            $scope.serverError = true;
                        };
                    });
                };
            }
            $scope.valid = 'validCode?t=' + Math.random();
            $scope.validCode = function() {
                $scope.valid = 'validCode?t=' + Math.random();
            }

            //getvalidcode
            $scope.getCode = function(form) {
                var $phone = form.phone;
                $phone.$setViewValue($phone.$viewValue);
                if ($phone.$valid) {
                    cService.ajax({
                        url: 'users/sendCode',
                        method: 'post',
                        params: {
                            phone: $scope.formData.phone,
                            imageCode: $scope.formData.imageCode
                        }
                    }).success(function(data, status, headers, config) {
                        dom.setAttribute('disabled', 'disabled');
                        dom.setAttribute('class', 'register-getcode  disabled');
                        dom.value = "60秒后重新获取";
                        dom.setAttribute("disabled", true);
                        isStarting = true;
                        var i = 59;
                        timer = setInterval(function() {
                            if (i == 0) {
                                isStarting = false;
                                clearInterval(timer);
                                dom.value = "获取验证码";
                                dom.removeAttribute("disabled");
                                dom.setAttribute('class', 'register-getcode');
                            } else {
                                dom.value = i + '秒后重新获取';
                                i--;
                            }
                        }, 1000);
                        $scope.callError = "";
                        $scope.serverError = false;
                    }).error(function(data, status, headers, config) {

                        dom.setAttribute('disabled', 'disabled');
                        dom.setAttribute('class', 'register-getcode  disabled');
                        if (data.code == "3005") {
                            $scope.callError = data.message;
                            $scope.serverError = true;
                        }
                    })

                }
            }

            //提交
            $scope.submit = function(form, $event) {
                // 禁止按钮
                var reg_btn = document.getElementById("register_button");
                reg_btn.setAttribute('disabled', true);
                //  禁止回车表单
                if ($event.keyCode == 13) {
                    $event.keyCode = 0;
                    return false;
                }

                if (form.$valid) {

                    if ($scope.formData.userInviteCode == '') {
                        delete $scope.formData.userInviteCode;
                    }
                    $scope.formData_encryption = {};
                    var ele = angular.element(document.getElementById('password'));
                    var val = fieldRSA(ele);
                    for (i in $scope.formData) {
                        $scope.formData_encryption[i] = $scope.formData[i];
                    }
                    $scope.formData_encryption.password = val;
                    cService.ajax({
                        url: 'users/register',
                        method: 'post',
                        params: $scope.formData_encryption
                    }).success(function(data) {
                        clearInterval(timer);

                        $rootScope.user = data;
                        $cookieStore.put("curUser", data);
                        $rootScope.login = {
                            beforeLogin: false,
                            afterLogin: true
                        }
                        reg_btn.removeAttribute('disabled');
                        $scope.$parent.formData1.email = $scope.formData.email;
                        $scope.$parent.formData1.username = $scope.formData.username;
                        $scope.formData = {
                            username: '',
                            phone: '',
                            password: '',
                            isAgree: 1,
                            validCode: '',
                            userInviteCode: '',
                            userType: 0
                        };
                        $scope.confirmPassword = "";
                        window.location.href = '#/register/activateEmailSucc';
                    }).error(function(data) {
                        reg_btn.removeAttribute('disabled');
                        // $scope.validCodeFn();
                    });
                }
                return false;
            };

            //推荐产品
            cService.ajax({
                url: 'borrows/prefecture'
            }).success(function(data, status, headers, config) {
                $scope.newPalyerData = data.newPalyerBorrow;
                $scope.recommendData = data.recommendBorrow;
            }).error(function(data, status, headers, config) {
                console.log(data);
            });

            var $username = angular.element(document.getElementById('username'));
            var $phone = angular.element(document.getElementById('phone'));
            var $password = angular.element(document.getElementById('password'));
            var $password2 = angular.element(document.getElementById('password2'));

            $phone.on('blur', function(event) {
                event.preventDefault();
                $scope.formData.username = 'a' + $phone.val();
            });
            $password.on('blur', function(event) {
                event.preventDefault();
                $scope.formData.password = $password.val();
            });

            var $header = angular.element(document.getElementById('header'));
            var $footer = angular.element(document.getElementById('footerWrap'));
            var $sharepage = angular.element(document.getElementById('sharepage'));
            var $content = angular.element(document.getElementById('content'));

            $header.css('display', 'none');
            $footer.css('display', 'none');
            $sharepage.css('display', 'none');
            $content.css('padding-bottom','0');

            $scope.$on('$destroy', function() {
                $header.css('display', '');
                $footer.css('display', '');
                $sharepage.css('display', '');
            });
        }])
    }
})