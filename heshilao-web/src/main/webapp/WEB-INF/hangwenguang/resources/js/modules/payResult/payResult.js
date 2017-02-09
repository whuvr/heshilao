define( [
    'modules/payResult/payResultCtrl',
    'modules/payResult/payResultService',
    'text!htmlModule/payResult/payResult.html',
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