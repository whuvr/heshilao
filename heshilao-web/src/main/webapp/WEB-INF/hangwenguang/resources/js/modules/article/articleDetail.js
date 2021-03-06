define( [
    'modules/article/articleDetailCtrl',
    'modules/article/articleDetailService',
    'text!htmlModule/article/articleDetail.html'
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