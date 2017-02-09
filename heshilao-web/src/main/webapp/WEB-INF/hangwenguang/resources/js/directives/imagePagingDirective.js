
define([
    'angular'
    ],function(){
        return function(app, elem, attrs, scope){
            app.directive("imagePaging",function(){

                // Assign null-able scope values from settings
                function setScopeValues(scope, attrs) {
                  
                    scope.page = parseInt(scope.page) || 1;
                    scope.pageSize = parseInt(scope.pageSize) || 3;
                    scope.total = parseInt(scope.total) || 0;
                    attrs.prevClass = attrs.prevClass || 'prev';
                    attrs.prevDisabledClass = attrs.prevDisabledClass || 'prev-disabled';
                    attrs.nextClass = attrs.nextClass || 'next';
                    attrs.nextDisabledClass = attrs.nextDisabledClass || 'next-disabled';

                }

                // Click Action
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

                   
                }
               
                function addPrev(scope,attrs, pageCount) {
  
                    // Calculate the previous page and if the click actions are allowed
                    // blocking and disabling where page <= 0
                    var disabled = scope.page - 1 <= 0;
                    var prevPage = scope.page - 1 <= 0 ? 1 : scope.page - 1;

                   
                    var prev = {
                        
                        iclass: disabled ? attrs.prevDisabledClass : attrs.prevClass,
                        action: function () {
                            if(!disabled) {
                                internalAction(scope, prevPage);
                            }
                        }
                    };
                    scope.List.push(prev);
                }


                // Adds the next, last text if desired
                function addNext(scope,attrs, pageCount) {

                    
                    // Calculate the next page number and if the click actions are allowed
                    // blocking where page is >= pageCount
                    var disabled = scope.page + 1 > pageCount;
                    var nextPage = scope.page + 1 >= pageCount ? pageCount : scope.page + 1;


                    var next = {
                        
                        iclass: disabled ? attrs.nextDisabledClass : attrs.nextClass,
                        action: function () {
                            if(!disabled){
                                internalAction(scope, nextPage);
                            }
                        }
                    };

                    scope.List.push(next);
                }
                // Main build function
                function build(scope,element, attrs) {
                    // Block divide by 0 and empty page size
                    if (!scope.pageSize || scope.pageSize < 0 || scope.total <= 0 || scope.pageSize >= scope.total) {
                        return;
                    }
                    scope.List = [];
                    pageCount = Math.ceil(scope.total / scope.pageSize);
                    addPrev(scope,attrs,pageCount);
                    addNext(scope,attrs,pageCount);

                    //

                }

                return {
                    scope: {
                        page: '=',
                        pageSize: '=',
                        total: '=',
                        pagingAction: '&'
                    },
                    template:   '<a ng-repeat="Item in List"'+
                                    'ng-click="Item.action()"' + 
                                '><i ng-class="Item.iclass" ></i></a>',
                    link: function (scope, element, attrs) {
                        setScopeValues(scope, attrs);
                       
                        scope.$watch('page', function() {
                            
                            build(scope,element, attrs);
                        });
                        scope.$watch('total', function() {
                            build(scope,element, attrs);
                        });
                    }

                }
            })
        }
})

