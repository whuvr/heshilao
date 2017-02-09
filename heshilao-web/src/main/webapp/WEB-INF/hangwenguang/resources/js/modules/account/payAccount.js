define( [
    'modules/account/payAccountCtrl',
    'modules/account/payAccountService',
    'text!htmlModule/account/payAccount.html',
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