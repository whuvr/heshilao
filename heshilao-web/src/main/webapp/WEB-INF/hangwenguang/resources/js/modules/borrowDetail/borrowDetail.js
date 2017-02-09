define( [
    'modules/borrowDetail/borrowDetailCtrl',
    'modules/borrowDetail/borrowDetailService',
    'directives/opPagingDirective',
    'directives/knobDirective',
    'text!htmlModule/borrowDetail/borrowDetail.html',
], function(
    ctrl,
    service,
    opPagingDirective,
    knobDirective,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        service(app, elem, attrs, scope);
        opPagingDirective(app, elem, attrs, scope);
        knobDirective(app, elem, attrs, scope);
        elem.append(html);
    }
});