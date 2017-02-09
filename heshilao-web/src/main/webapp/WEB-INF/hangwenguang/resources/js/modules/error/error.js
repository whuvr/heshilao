define( [
    'modules/error/errorCtrl',
    'modules/error/errorService',
    'text!htmlModule/error/error.html',
], function(
    ctrl,
    service,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        service(app, elem, attrs, scope);
        elem.append(html);
    }
});