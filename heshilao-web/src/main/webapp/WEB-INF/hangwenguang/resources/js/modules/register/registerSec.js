define( [
    'modules/register/registerSecCtrl',
    'text!htmlModule/register/registerSec.html',
], function(
    ctrl,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        elem.append(html);
    }
});