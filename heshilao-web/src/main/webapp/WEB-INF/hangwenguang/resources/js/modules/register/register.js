define( [
    'modules/register/registerCtrl',
    'modules/register/registerService',
    'text!htmlModule/register/register.html',
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