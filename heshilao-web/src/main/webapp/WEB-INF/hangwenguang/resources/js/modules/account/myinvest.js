define( [
    'modules/account/myinvestCtrl',
    'modules/account/myinvestService',
    'text!htmlModule/account/myinvest.html',
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
