define(
    [
        'angular',
        'p2pSofa/services/common/commonService'
    ],
    function(angular) {
        mod_services.service('listService', ['commonService', '$parse', '$templateCache', '$compile', '$rootScope', '$cookieStore',
            function(cService, $parse, $templateCache, $compile, $rootScope, $cookieStore) {
                var
                    service,
                    _page = 1,
                    _pageSize = 10;
                service = {
                    listAjax: function(scope, elem, attrs, opts) {
                        typeof opts != 'object' && (opts = {});
                        typeof opts.params != 'object' && (opts.params = {});

                        opts.params = angular.extend({                                      //参数配置
                            page: attrs.page || _page,                                      //当前页
                            rows: attrs.pageSize || _pageSize                               //总页数
                        }, opts.params, attrs.params ? scope.$eval(attrs.params) : {});
                        var
                            data = scope.$eval(attrs.data) || opts.data,                    //数据源
                            url = attrs.url || opts.url,
                            pagination = attrs.pagination || opts.pagination,
                            varName = attrs.varName || opts.varName,                        //实例化的名称，当前使用名
                            bShowPage = pagination != false && varName,
                            method = attrs.method || opts.method || 'get',
                            success = attrs.success || opts.success,
                            fail = attrs.fail || opts.fail,
                            params = opts.params,
                            ajaxParams = {},
                            paramKey,
                            paramVal,
                            watches = attrs.watches ? scope.$eval(attrs.watches) : opts.watches,
                            varTree = [],
                            i;
                        if (url == undefined && !data) return;
                        if (varName) {
                            varTree = varName.split('.');
                            varName = varTree[varTree.length - 1];
                        }

                        function netWork(params) {
                            var
                                dPage = params.page,
                                dPageSize = params.rows,
                                di,
                                result;
                            if (data) {
                                result = [];
                                for (di = (dPage - 1) * dPageSize; di < dPage * dPageSize; di++) {
                                    if (!data[di]) break;
                                    result.push(data[di]);

                                }
                                scope[varName] = result;
                                bShowPage && showPage({
                                    offset: dPage,
                                    total: data.length
                                });
                            } else {
                                return cService.ajax({
                                    method: method,
                                    url: url,
                                    params: params
                                }).success(function(data, status, headers, config) {
                                    if ($parse(success)(scope, {
                                            data: data,
                                            status: status,
                                            headers: headers,
                                            config: config
                                        }) == false) return;
                                    for (i = 0; i < varTree.length - 1; i++) {
                                        if (varTree[i] != '') {
                                            data = data[varTree[i]];
                                        }
                                    }
                                    if (varName) {
                                        if (data.rows) {
                                            scope[varName] = data.rows;
                                        } else {
                                            scope[varName] = data instanceof Array ? data : (data ? [data] : []);
                                        }
                                        scope[varName].reload = function(params) {
                                            params = params || {};
                                            if (!params.remainPage) {
                                                params.page = 1;
                                            }
                                            netWork(angular.extend(ajaxParams, params));
                                        };
                                    }

                                    bShowPage && showPage(data);
                                }).error(function(data, status, headers, config) {
                                    if (!$parse(fail)(scope, {
                                            data: data,
                                            status: status,
                                            headers: headers,
                                            config: config
                                        })) return;
                                })
                            }

                        }
                        //when the watched variable changed,
                        //send ajax request to get new data and render the page bar again
                        function setWatches(watches) {
                            var
                                watchIndex,
                                watchKey,
                                watchVal;
                            for (watchIndex = 0; watchIndex < watches.length; watchIndex++) {
                                watchKey = watches[watchIndex];
                                watchVal = varName + watchKey.replace(/^[\w]/, function(letter) {
                                    return letter.toUpperCase();
                                });
                                scope[watchVal] = params[watchKey];
                                scope.$watch(watchVal, (function(watchKey) {
                                    return function(newVal, oldVal) {
                                        if (newVal != oldVal) {
                                            ajaxParams['page'] = 1;
                                            ajaxParams[watchKey] = newVal;
                                            netWork(ajaxParams);
                                        }

                                    }
                                })(watchKey));
                            }
                        }
                        //show the page bar
                        if (bShowPage) {
                            scope[varName + 'Page'] = params.page;
                            scope[varName + 'PageSize'] = params.rows;
                            scope[varName + 'Total'] = 0;
                            scope[varName + 'PageSearch'] = function(page) {
                                ajaxParams.page = page;
                                netWork(ajaxParams);
                            }
                        }

                        function showPage(data) {
                            scope[varName + 'Page'] = data.offset;
                            scope[varName + 'Total'] = data.total;
                        }

                        for (paramKey in params) {
                            paramVal = params[paramKey];
                            ajaxParams[paramKey] = paramVal;
                        }
                        watches && setWatches(watches);
                        return netWork(ajaxParams);
                    },
                    investList: function(scope, elm, attrs, opts) {
                        // 列表页 投资列表
                        //  name 标名称
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrows/invest',
                            params: {
                                status: attrs.status != undefined ? attrs.status : -1,
                                type: attrs.type != undefined ? attrs.type : -1,
                                categoryId: attrs.categoryId != undefined ? attrs.categoryId : -1,
                                timeLimitSearch: attrs.timeLimitSearch != undefined ? attrs.timeLimitSearch : -1,
                                rateYearSearch: attrs.rateYearSearch != undefined ? attrs.rateYearSearch : -1
                            },
                            watches: ['status', 'type', 'rateYearSearch', 'timeLimitSearch', 'categoryId']
                        }, opts));
                    },
                    bondList: function(scope, elm, attrs, opts) {
                        // 列表页 债权列表
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/bonds/bondList',
                            params: {
                                status: attrs.status != undefined ? attrs.status : -1,
                                // type: attrs.type != undefined ? attrs.type : -1,
                                rateYearSearch: attrs.rateYearSearch != undefined ? attrs.rateYearSearch : -1
                            },
                            watches: ['status', 'rateYearSearch']
                        }, opts));
                    },
                    // 推荐标列表
                    recommendList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrows/index'
                        }, opts));
                    },
                    accountRecommendList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrows/recommend'
                        }, opts));
                    },
                    rechargeList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'account/recharge/rechargeList'
                        }, opts));
                    },
                    withdrawList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'account/cash/cashList'
                        }, opts));
                    },
                    myinvestList: function(scope, elm, attrs, opts) {
                        //投资项目(暂时没用到)
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'investments/investItem'
                        }, opts));
                    },
                    myinvestRecordList: function(scope, elm, attrs, opts) {
                        //投资记录
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'investments',
                            params: {
                                status: attrs.status != undefined ? attrs.status : 0,
                            },
                            watches: ['status']
                        }, opts));
                    },
                    borrowCollectionList: function(scope, elm, attrs, opts) {
                        // 回款计划
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrowCollections',
                            method: 'post'
                        }, opts));
                    },
                    myRedPacketList: function(scope, elm, attrs, opts) {
                        // 我的红包
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'user/myfavourable',
                            method: 'post',
                            params: {
                                type: '-1',
                                activityType: '-1',
                                usedStatus: '-1'
                            },
                            watches: ['type', 'activityType', 'usedStatus']
                        }, opts));
                    },
                    userInviteList: function(scope, elm, attrs, opts) {
                        // 好友邀请
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'userInvite',
                            method: 'post'
                        }, opts));
                    },
                    userInviteLinkList: function(scope, elm, attrs, opts) {
                        // 好友邀请链接
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'userInvite'
                        }, opts));
                    },
                    myBorrowList: function(scope, elm, attrs, opts) {
                        //账户中心 借款详情
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrows/myBorrows',
                            method: 'get',
                            params: {
                                status: '',
                                timeSearch: '-1',
                                startTime: '',
                                endTime: ''
                            },
                            watches: ['status', 'timeSearch']
                        }, opts));
                    },
                    repaymentList: function(scope, elm, attrs, opts) {
                        // 账户中心 还款详情
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'repayments',
                            method: 'get',
                            params: {
                                status: '',
                                time: '-1'
                            },
                            watches: ['status']
                        }, opts));
                    },
                    accountlogsList: function(scope, elm, attrs, opts) {
                        //资金记录
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'account/accountlogs',
                            method: 'post',
                            params: {
                                time: '-1',
                                startTime: '',
                                endTime: ''
                            }
                        }, opts));
                    },
                    creditApplyList: function(scope, elm, attrs, opts) {
                        //信用额度
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'user/creditapply',
                            method: 'get'
                        }, opts));
                    },
                    saleableBondList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/saleableBondList',
                            method: 'get'
                        }, opts));
                    },
                    sellingBond: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/sellingBond',
                            method: 'get'
                        }, opts));
                    },
                    soldBondList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/soldBondList',
                            method: 'get'
                        }, opts));
                    },
                    boughtBondList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/boughtBondList',
                            method: 'get'
                        }, opts));
                    },
                    soldBondDetailList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/sellBondDetail',
                            method: 'get'
                        }, opts));
                    },
                    boughtBondDetailList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/boughtBondDetail',
                            method: 'get'
                        }, opts));
                    },
                    stopBondRecordList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/userBonds/bondRemoveRecord',
                            method: 'get'
                        }, opts));
                    },
                    linksList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'column/links',
                            method: 'get',
                            pagination: false
                        }, opts));
                    },
                    borrowInvestmentRecordList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'investments/borrow',
                            method: 'get'
                        }, opts));
                    },
                    borrowInvestmentRankList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'investments/rankings',
                            method: 'get'
                        }, opts));
                    },
                    borrowCollectionsList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'borrowCollections',
                            method: 'post'
                        }, opts));
                    },
                    userMessageList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'user/message',
                            method: 'post',
                            success: function(scope, args) {
                                cService.updateUserMessage();
                            }
                        }, opts || {}));
                    },
                    //bond repay plan
                    bondRepayPlanList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/bonds/borrowCollectionList',
                            method: 'get'
                        }, opts || {}));
                    },
                    //bond transfer record
                    bondTransferRecordList: function(scope, elm, attrs, opts) {
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'bond/bonds/investmentList',
                            method: 'get'
                        }, opts || {}));
                    },
                    industryInformationList: function(scope, elm, attrs, opts) {
                        //资讯
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'column/articles/2',
                            method: 'post'
                        }, opts));
                    },
                    websiteAnnouncementList: function(scope, elm, attrs, opts) {
                        //公告
                        return this.listAjax(scope, elm, attrs, angular.extend({
                            url: 'column/articles/1',
                            method: 'post'
                        }, opts));
                    }
                }
                return service;

            }
        ])
    }
);