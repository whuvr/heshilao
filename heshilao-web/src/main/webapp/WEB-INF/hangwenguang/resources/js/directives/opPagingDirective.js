define([
    'angular'
], function() {
    return function(app, elem, attrs, scope) {
        app.directive("paging", function() {

            // Assign null-able scope values from settings
            function setScopeValues(scope, attrs) {

                scope.List = [];
                scope.Hide = false;
                scope.page = parseInt(scope.page) || 1;
                scope.total = parseInt(scope.total) || 0;
                scope.dots = scope.dots || '...';
                scope.ulClass = scope.ulClass || 'pagination';
                scope.adjacent = parseInt(scope.adjacent) || 2;
                scope.activeClass = scope.activeClass || 'active';
                scope.disabledClass = scope.disabledClass || 'disabled';

                scope.scrollTop = scope.$eval(attrs.scrollTop);
                scope.hideIfEmpty = scope.$eval(attrs.hideIfEmpty);
                scope.showPrevNext = scope.$eval(attrs.showPrevNext);
                scope.bShowValue = scope.$eval(attrs.showValue) != false;

            }


            // Validate and clean up any scope values
            // This happens after we have set the
            // scope values
            function validateScopeValues(scope, pageCount) {

                // Block where the page is larger than the pageCount
                if (scope.page > pageCount) {
                    scope.page = pageCount;
                }

                // Block where the page is less than 0
                if (scope.page <= 0) {
                    scope.page = 1;
                }

                // Block where adjacent value is 0 or below
                if (scope.adjacent <= 0) {
                    scope.adjacent = 2;
                }

                // Hide from page if we have 1 or less pages
                // if directed to hide empty
                if (pageCount <= 1) {
                    scope.Hide = scope.hideIfEmpty;
                }
            }



            // Internal Paging Click Action
            function internalAction(scope, page) {

                // Block clicks we try to load the active page
                if (scope.page == page) {
                    return;
                }

                // Update the page in scope and fire any paging actions
                scope.page = page;
                scope.pagingAction({
                    page: page
                });

                // If allowed scroll up to the top of the page
                if ( scope.$eval(scope.scrollTop) ) {
                    scrollTo(0, 0);
                }
            }


            // Add Range of Numbers
            function addRange(start, finish, scope) {

                var i = 0;
                for (i = start; i <= finish; i++) {

                    var item = {
                        value: i,
                        title: 'Page ' + i,
                        liClass: scope.page == i ? scope.activeClass : '',
                        action: function() {
                            internalAction(scope, this.value);
                        }
                    };

                    scope.List.push(item);
                }
            }


            // Add Dots ie: 1 2 [...] 10 11 12 [...] 56 57
            function addDots(scope) {
                scope.List.push({
                    value: scope.dots
                });
            }


            // Add First Pages
            function addFirst(scope) {
                addRange(1, 2, scope);
                addDots(scope);
            }


            // Add Last Pages
            function addLast(pageCount, scope) {
                addDots(scope);
                addRange(pageCount - 1, pageCount, scope);
            }


            // Adds the first, previous text if desired   
            function addPrev(scope, pageCount) {

                // Ignore if we are not showing
                // or there are no pages to display
                if (!scope.showPrevNext || pageCount < 1) {
                    return;
                }

                // Calculate the previous page and if the click actions are allowed
                // blocking and disabling where page <= 0
                var disabled = scope.page - 1 <= 0;
                var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

                var first = {
                    value: '首页',
                    title: 'First Page',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function() {
                        if (!disabled) {
                            internalAction(scope, 1);
                        }
                    }
                };

                var prev = {
                    value: '上一页',
                    title: 'Previous Page',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function() {
                        if (!disabled) {
                            internalAction(scope, prevPage);
                        }
                    }
                };

            }


            // Adds the next, last text if desired
            function addNext(scope, pageCount) {

                // Ignore if we are not showing 
                // or there are no pages to display
                if (!scope.showPrevNext || pageCount < 1) {
                    return;
                }

                // Calculate the next page number and if the click actions are allowed
                // blocking where page is >= pageCount
                var disabled = scope.page + 1 > pageCount;
                var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;

                var last = {
                    value: '最后一页',
                    title: 'Last Page',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function() {
                        if (!disabled) {
                            internalAction(scope, pageCount);
                        }
                    }
                };

                var next = {
                    value: '下一页',
                    title: 'Next Page',
                    liClass: disabled ? scope.disabledClass : '',
                    action: function() {
                        if (!disabled) {
                            internalAction(scope, nextPage);
                        }
                    }
                };

            }


            // Main build function
            function build(scope, attrs) {
                // Block divide by 0 and empty page size
                if (scope.total == 0) {
                    scope.noData = true;
                } else {
                    scope.noData = false;
                }
                if (!scope.pageSize || scope.pageSize < 0) {
                    return;
                }

                // Assign scope values
                setScopeValues(scope, attrs);

                // local variables
                var start,
                    size = scope.adjacent * 2,
                    pageCount = Math.ceil(scope.total / scope.pageSize);

                // Validate Scope
                validateScopeValues(scope, pageCount);

                // Calculate Counts and display
                addPrev(scope, pageCount);
                if (pageCount <= (5 + size)) {

                    start = 1;
                    addRange(start, pageCount, scope);

                } else {

                    var finish;

                    if (scope.page <= (1 + size)) {

                        start = 1;
                        finish = 2 + size + (scope.adjacent - 1);

                        addRange(start, finish, scope);
                        addLast(pageCount, scope);

                    } else if (pageCount - size > scope.page && scope.page > size) {

                        start = scope.page - scope.adjacent;
                        finish = scope.page + scope.adjacent;

                        addFirst(scope);
                        addRange(start, finish, scope);
                        addLast(pageCount, scope);

                    } else {

                        start = pageCount - (1 + size + (scope.adjacent - 1));
                        finish = pageCount;

                        addFirst(scope);
                        addRange(start, finish, scope);

                    }
                }
                addNext(scope, pageCount);

            }

            return {

                restrict: 'EA',
                scope: {
                    page: '=',
                    pageSize: '=',
                    total: '=',
                    dots: '@',
                    hideIfEmpty: '@',
                    ulClass: '@',
                    // noData: '@',
                    activeClass: '@',
                    disabledClass: '@',
                    adjacent: '@',
                    scrollTop: '@',
                    showPrevNext: '@',
                    pagingAction: '&'
                },
                template: '<div ng-show="noData" class="no-data" ng-class="noData">暂时没有数据</div>' +
                    '<ul style="float: right" ng-hide="Hide" ng-class="ulClass">' +
                    '<li ' +
                    'ng-class="Item.liClass" ' +
                    'ng-click="Item.action()" ' +
                    'ng-repeat="Item in List"> ' +
                    '<span style="cursor:pointer" ng-show="bShowValue != false" ng-bind="Item.value"></span> ' +
                    '</ul>',
                link: function(scope, element, attrs) {

                    var temp = scope,
                        tempattrs = attrs;
                    scope.noData = true;
                    scope.$watch('page', function(newvalue) {
                        temp.page = newvalue;
                        build(temp, tempattrs);
                    });
                    scope.$watch('total', function(newvalue) {
                        temp.total = newvalue;
                        build(temp, tempattrs);
                    });
                }

            }
        })
    }
})