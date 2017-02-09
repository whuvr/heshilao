define( [
    'modules/account/myaccountCtrl',
    'modules/account/myaccountService',
    'text!htmlModule/account/myaccount.html',
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