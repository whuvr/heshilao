define( [
    'modules/register/activateEmailSuccCtrl',
    'text!htmlModule/register/activateEmailSucc.html',
], function(
    ctrl,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        elem.append(html);
    }
});