define( [
    'modules/article/securityCtrl',
    'modules/article/securityService',
    'text!htmlModule/article/security.html',
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