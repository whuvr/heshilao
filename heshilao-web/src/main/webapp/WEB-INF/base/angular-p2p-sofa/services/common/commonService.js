/**
 * @name commonService
 * @description
 * services often used  such as sending ajax request
 **/
define(
    [
        'angular'
    ],
    function(angular) {

        mod_services.service('commonService', ['$http', '$q', '$location', '$anchorScroll', '$compile', '$templateCache', '$window', '$rootScope', '$cookieStore',
            function($http, $q, $location, $anchorScroll, $compile, $templateCache, $window, $rootScope, $cookieStore) {
                var
                    service,
                    _dialog;
                service = {
                    /**
                     * @name getIndex
                     * @description
                     * get the position of the specified dom relative its siblings
                     * @param {object dom} the dom to get its index
                     * @param {number deep} you can specify the deep to get the index of the dom's ancestors. default: 1
                     * for example: getIndex(dom,2) will get index of the dom's parent or getIndex(dom,3) gets the grandpa's and so on.
                     * @return {number} index of the specified dom
                     * @usage
                     * commonService.getIndex(dom,[deep])
                     **/
                    getIndex: function(dom, deep) {
                        var i = 0;
                        deep = deep || 1;
                        for (var j = 1; j < deep; j++) {
                            dom = dom.parentNode;
                        }
                        while ((dom = dom.previousSibling) != null) {
                            dom.nodeType == 1 && i++;
                        }
                        return i;
                    },
                    /**
                     * @name getBrowser
                     * @description
                     * get the type and version of current browser
                     * @return {object} object consisted of type and version
                     * @usage
                     * var browser = commonService.getBrowser(),
                     *     browserType = browser.type,
                     *     browserVersion = browser.version
                     **/
                    getBrowser: function() {
                        // Useragent RegExp
                        var rwebkit = /(webkit)[ \/]([\w.]+)/,
                            ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                            rmsie = /(msie) ([\w.]+)/,
                            rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;

                        function uaMatch(ua) {
                            ua = ua.toLowerCase();

                            var match = rwebkit.exec(ua) ||
                                ropera.exec(ua) ||
                                rmsie.exec(ua) ||
                                ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
                                [];

                            return {
                                browser: match[1] || "",
                                version: match[2] || "0"
                            };
                        };

                        var userAgent = $window.navigator.userAgent;
                        return uaMatch(userAgent);
                    },
                    /**
                     * @name isIE8
                     * @description
                     * determing if current browser is IE8
                     * @return {boolean}
                     **/
                    isIE8: function() {
                        var browser = this.getBrowser();
                        if (browser.browser == 'msie' && browser.version == '8.0') return true;
                        else return false;
                    },
                    /**
                     * @name GetCurrentStyle
                     * @description
                     * get the value of a computed style property for the dom
                     * @param {object obj} the dom to get its style property
                     * @param {number deep} the style property name
                     * @return {string} the value of the specified style property
                     * @usage
                     * commonService.GetCurrentStyle(dom,prop)
                     **/
                    GetCurrentStyle: function(obj, prop) {
                        if (obj.currentStyle) { //IE
                            prop = prop.replace(/\-(\w)/g, function(all, letter) {
                                return letter.toUpperCase();
                            });
                            return obj.currentStyle[prop];
                        } else if (document.defaultView && document.defaultView.getComputedStyle) {
                            var propprop = prop.replace(/([A-Z])/g, "-$1");
                            propprop = prop.toLowerCase();
                            return document.defaultView.getComputedStyle(obj, null)[propprop];
                        }
                        return null;
                    },
                    /**
                     * @name getElementAbsPos
                     * @description
                     * get absolute position of the dom relative window
                     * @param {object dom} the dom to get its absolute position
                     * @return {object} consisted of left and top
                     * @usage
                     * commonService.getElementAbsPos(dom)
                     **/
                    getElementAbsPos: function(dom) {
                        var t = dom.offsetTop;
                        var l = dom.offsetLeft;
                        while (dom = dom.offsetParent) {
                            t += dom.offsetTop;
                            l += dom.offsetLeft;
                        }
                        return {
                            left: l,
                            top: t
                        };
                    },
                    /**
                     * @name removeInlineStyle
                     * @description
                     * remove dom's inline style
                     * @param {object dom} the dom to remove inline style
                     * @param {array arr} the array of the style property names to be removed
                     * @usage
                     * commonService.removeInlineStyle(dom, ['left','border'])
                     **/
                    removeInlineStyle: function(dom, arr) {
                        var
                            i = 0,
                            j = 0,
                            tempName,
                            direction = ['-left', '-top', '-right', '-bottom'];
                        if (typeof arr == 'string') arr = [arr];
                        for (i; i < arr.length; i++) {
                            if (dom.style.removeProperty) {
                                dom.style.removeProperty(arr[i]);
                            } else {

                                if (arr[i].match(/border/)) {
                                    for (j; j < direction.length; j++) {
                                        tempName = arr[i].replace(/(border)/, '$1' + direction[j]);
                                        tempName = tempName.replace(/\-(\w)/g, function(all, letter) {
                                            return letter.toUpperCase();
                                        });
                                        dom.style.removeAttribute(tempName);
                                    }
                                } else {
                                    arr[i] = arr[i].replace(/\-(\w)/g, function(all, letter) {
                                        return letter.toUpperCase();
                                    });
                                    dom.style.removeAttribute(arr[i]);
                                }
                            }
                        }

                    },
                    /**
                     * @name addCookie
                     * @description
                     * add cookie
                     * @param {string key} the name of cookie
                     * @param {any value} the value of cookie
                     * @param [{number expires}]  the expire of cookie, and the unit is hour
                     * @usage
                     * commonService.addCookie(name,value,24)
                     **/
                    addCookie: function(key, value, expires) { //add cookie with expires

                        $cookieStore.put(key, value);
                        expires || (expires = 0.5);
                        value = angular.toJson(value);
                        var str = key + "=" + value;
                        if (expires > 0) {
                            var date = new Date();
                            var ms = expires * 3600 * 1000;
                            date.setTime(date.getTime() + ms);
                            str += "; expires=" + date.toGMTString();
                        }
                        document.cookie = str;

                    },
                    /**
                     * @name deepExtend
                     * @description
                     * deep extend.because angularjs doesn't surpport deep extend
                     * @param {object destination} target object
                     * @param {object source} source object
                     * @return {object} merged object
                     * @usage
                     * commonService.addCookie(target, source)
                     **/
                    deepExtend: function(destination, source) {
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
                    /**
                     * @name ajax
                     * @description
                     * send ajax request
                     * @param {object opts} ajax options
                     * @return {object}promise
                     * @usage
                     * commonService.ajax({url: 'remoteUrl'}).then(resolve,reject)
                     **/
                    ajax: function(opts) {
                        var
                            singletonButtonList = $rootScope.singletonButtonList || [],
                            button,
                            oriHtml,
                            oriValue,
                            i = 0;
                        for (; i < singletonButtonList.length; i++) {

                            if (singletonButtonList[i].status == 'ready') {
                                button = singletonButtonList[i];
                                button.status = 'running';
                                oriHtml = button.oriHtml;
                                oriValue = button.oriValue;
                                break;
                            }
                        }


                        var defaultOptions = {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'x-requested-with': 'XMLHttpRequest'
                            }
                        }
                        opts = service.deepExtend(defaultOptions, opts);

                        function reset() {
                            if (button) {
                                button.status = 'pending';
                                oriHtml ? button.html(oriHtml) : button.val(oriValue);
                                button[0].disabled = false;
                            };

                        }
                        return $http(opts).success(function() {
                            reset();
                        }).error(function() {
                            reset();
                        });



                    },
                    /**
                     * @name gotoAnchor
                     * @description
                     * gotoAnchor is used to anchor link because the angular-router has prevented the default behavior of the anchors.
                     * @param {string anchor} the name of anchor linking to
                     * @usage
                     * commonService.gotoAnchor(anchorName)
                     **/
                    gotoAnchor: function(anchor) {
                        $location.hash(anchor);
                        $anchorScroll();
                    },
                    /**
                     * @name popupDialog
                     * @description
                     * popup a dialog by dialog component, please use this method after loading the dialog component
                     * @param {string template} the template name chached in the $templateCached
                     * @param {string scope} the scope of the directives from template
                     * @param {string args} the dialog component's parameter
                     * @param {string delay} the dialog component's parameter
                     * @usage
                     * commonService.popupDialog(template,scope,args,delay)
                     **/
                    popupDialog: function(template, scope, args, delay) {
                        template = template && $templateCache.get(template) ? $templateCache.get(template) : template;
                        var opts = angular.extend({
                            wait: true,
                            type: 'no-icon'
                        }, args || {});
                        if (opts.wait) {
                            scope.alert_wait = true;
                            template = '<i ng-show="alert_wait">loading...</i><div ng-show="!alert_wait">' + template + '</div>';
                        }
                        var html = $compile(template)(scope);

                        //show dialog

                        var $dialog = alert('<div id="popupDialog" class="' + opts.wrapClass + '"></div>', opts, delay);

                        var $container = angular.element(document.getElementById('popupDialog')).append(html);

                        if (!scope.$$phase) {
                            scope.$apply();
                        }

                        //css
                        opts.css && $container.css(opts.css)
                        // ajax request
                        if (typeof opts.ajax == 'function') {
                            opts.ajax.call($container).then(function() {
                                scope.alert_wait = false;
                            }, function() {
                                $dialog.close($dialog);
                            });
                        } else {
                            scope.alert_wait = false;
                        }
                        _dialog = $dialog;
                        return $dialog;
                    },
                    /**
                     * @name removePopupDialog
                     * @description
                     * remove dialog created by commonService.popupDialog
                     * @param {string delay} the dialog component's parameter
                     * @usage
                     * commonService.removePopupDialog()
                     **/
                    removePopupDialog: function() {
                        try {
                            _dialog.close(_dialog);
                            _dialog = null;
                        } catch (e) {

                        }
                    },
                    /**
                     * @name updateUserMessage
                     * @description
                     * update the amount of the  messages of the current user
                     * commonService.updateUserMessage()
                     **/
                    updateUserMessage: function(scope, elm, attrs, opts) {
                        return this.ajax({
                            url: 'user/message',
                            method: 'get'

                        }).success(function(amount) {
                            $rootScope.user.isNotReadedMessage = amount;
                            var userData = $rootScope.user;
                            $cookieStore.put('curUser', userData);
                        });
                    }
                }
                return service;

            }
        ])
    }
);