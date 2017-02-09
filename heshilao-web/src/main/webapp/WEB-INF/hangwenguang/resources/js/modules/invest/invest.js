define( [
    'modules/invest/investCtrl',
    'directives/opPagingDirective',
    'directives/knobDirective',
    'text!htmlModule/invest/invest.html',
], function(
    ctrl,
    opPagingDirective,
    knobDirective,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        opPagingDirective(app, elem, attrs, scope);
        knobDirective(app, elem, attrs, scope);
        elem.append(html);
    }
});