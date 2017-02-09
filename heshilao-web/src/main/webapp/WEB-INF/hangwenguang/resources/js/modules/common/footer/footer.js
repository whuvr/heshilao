
define( [
    'modules/common/footer/footerCtrl',
    'text!htmlModule/common/footer/footer.html'
], function(
    ctrl,
    html
) {
return function(app, elem, attrs, scope){
      ctrl(app, elem, attrs, scope);
      elem.append(html);
    }
});