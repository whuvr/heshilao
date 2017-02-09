define( [
    'modules/article/recruitCtrl',
    'modules/article/recruitService',
    'text!htmlModule/article/recruit.html',
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