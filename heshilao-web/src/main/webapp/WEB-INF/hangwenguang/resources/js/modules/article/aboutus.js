define( [
    'modules/article/aboutusCtrl',
    'modules/article/aboutusService',
    'text!htmlModule/article/aboutus.html',
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