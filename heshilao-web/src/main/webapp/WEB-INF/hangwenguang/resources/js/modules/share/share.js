define( [
    'modules/share/shareCtrl',
    'text!htmlModule/share/share.html',
], function(
    ctrl,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        elem.append(html);
    }
});