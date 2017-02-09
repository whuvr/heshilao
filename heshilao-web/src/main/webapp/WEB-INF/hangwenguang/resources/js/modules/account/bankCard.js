define( [
    'modules/account/bankCardCtrl',        
    'text!htmlModule/account/bankCard.html',
    'directives/areaDirective',
    'directives/bankDirective'
], function(
    ctrl,
    html,
    area,
    bank) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        elem.append(html);
        area(app, elem, attrs, scope);
        bank(app, elem, attrs, scope);
    }
});