define( [
    'modules/account/creditorRightCtrl',
    'modules/account/creditorRightService',
    'text!htmlModule/account/creditorRight.html',
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