define( [
    'modules/article/contactusCtrl',
    'modules/article/contactusService',
    'text!htmlModule/article/contactus.html',
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