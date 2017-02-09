define( [
    'modules/newuser/newuserCtrl',
    'modules/newuser/newuserService',
    'text!htmlModule/newuser/newuser.html',
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