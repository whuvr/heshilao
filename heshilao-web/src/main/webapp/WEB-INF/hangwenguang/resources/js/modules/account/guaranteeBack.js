define( [
    'modules/account/guaranteeBackCtrl',
    'modules/account/guaranteeBackService',
    'text!htmlModule/account/guaranteeBack.html',
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