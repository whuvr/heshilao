define( [
    'modules/account/backCtrl',
    'modules/account/backService',
    'text!htmlModule/account/back.html',
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