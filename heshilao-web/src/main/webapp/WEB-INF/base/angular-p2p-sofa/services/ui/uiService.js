define(
    [
        'angular',
        'p2pSofa/services/common/commonService'
    ],
    function(angular) {
        mod_services.service('uiService', ['commonService', '$parse', function(cService, $parse) {
            var
                service;
            service = {
                switchTo: function(scope, elem, attrs, opts) {
                    var
                        opts = angular.extend({}, opts || {}),

                        varName = attrs.varName || opts.varName,
                        switchAction = attrs.switchAction || opts.switchAction,
                        activeClass = attrs.activeClass || opts.activeClass || 'active',
                        initIndex = scope.$eval(attrs.initIndex || opts.initIndex) || 0,
                        $switches = opts.$switches,
                        deep = attrs.deep || opts.deep,
                        excludeValue = scope.$eval(attrs.excludeValue) || '';

                    $switches.on('click', function(e) {
                        activeSwitch(cService.getIndex(this, deep));
                    });
                    if (attrs.initValue) {
                        scope.$watch(attrs.initValue, function(newVal, oldVal) {
                            if (newVal != excludeValue) {
                                activeSwitch(getIndexFromVal(newVal));
                            }

                        });
                    } else if (attrs.initIndex) {
                        scope.$watch(attrs.initIndex, function(newVal, oldVal) {
                            activeSwitch(scope.$eval(attrs.initIndex) || 0);
                        });
                    } else {
                        activeSwitch(initIndex);
                    }

                    function getIndexFromVal(val) {
                        var
                            index = 0;
                        angular.forEach($switches, function(item, i) {
                            if (item.getAttribute('value') == val) {
                                index = i;
                                return false;
                            }
                        });
                        return index;
                    }

                    function activeSwitch(index) {
                        var
                            val = $switches[index].getAttribute('value'); //this.value will not available in <a>
                        $switches.removeClass(activeClass);
                        $switches.eq(index).addClass(activeClass);
                        $parse(switchAction)(scope, {
                            index: index,
                            value: val
                        });
                        if (varName) {
                            scope[varName] = val;
                            if (!scope.$$phase) {
                                scope.$apply();
                            }

                        }
                    }
                },
                /**
                 * [animate 动画效果]
                 * @param  {[obj]}    obj    [description]
                 * @param  {[string]} sName  [css样式名，移动方向]
                 * @param  {[type]}   target [每次移动的距离，为元素的宽或者高]
                 * @param  {[type]}   time   [动画时间]
                 * @param  {Function} fn     [回调]
                 * @param  {number}   index  [传入当前索引用于判断是否是头尾]
                 * @param  {boolean}  direc  [true转到第一个，false转到最后一个]
                 * @return {[type]}          [description]
                 */
                animate: function move(obj, sName, target, time, fn, index, clockWise) {
                    var
                        rOpacity = sName == 'opacity',
                        start = parseFloat(cService.GetCurrentStyle(obj, sName)),
                        dis,
                        //count=Math.ceil(time/(cService.isIE8() ? 90 : 30)),
                        //count 每个动画执行次数，越高越顺滑，但是比较费资源
                        count = time / 20,
                        cIndex =  index,
                        clockWise =  clockWise || undefined,
                        oLength = obj.children.length,
                        n = 0;

                    !start && (start = 0);
                    rOpacity && cService.isIE8() && !start && (start = 100);
                    rOpacity && !cService.isIE8() && (target /= 100);

                    dis = target - start;

                    function finish() {
                        clearInterval(obj.timer);
                        obj.timer = null;
                        if (rOpacity) {
                            if (cService.isIE8()) {
                                obj.style['filter'] = 'alpha(opacity=' + (start + dis) + ')';
                            } else {
                                obj.style[sName] = start + dis;
                            }
                        } else {
                            obj.style[sName] = start + dis + 'px';
                        }
                        typeof fn == 'function' && fn();
                    }

                    if (obj.timer) {
                        clearInterval(obj.timer);
                        obj.timer = null;
                    }
                    obj.timer = setInterval(function() {
                        n++;

                        if (rOpacity) {
                            if (cService.isIE8()) {
                                obj.style['filter'] = 'alpha(opacity=' + (start + dis * n / count) + ')';
                            } else {

                                obj.style[sName] = start + dis * n / count;
                            }
                        }else if ( (cIndex == 0 && clockWise == 'CW') || cIndex == oLength - 1 && clockWise == 'CCW') {
                            obj.style[sName] = start + dis + 'px';
                        }else {
                            obj.style[sName] = start + dis * n / count + 'px';
                        }
                        n >= count && obj.timer && finish();
                    }, 5);
                }
            }
            return service;

        }])
    }
);