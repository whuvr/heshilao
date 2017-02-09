define( [
    'modules/account/creditCtrl',
    'modules/account/creditService',
    'text!htmlModule/account/credit.html',
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
