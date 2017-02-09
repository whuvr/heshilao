define( [
    'modules/article/newsCtrl',
    'modules/article/newsService',
    'directives/opPagingDirective',
    'text!htmlModule/article/news.html',
], function(
  ctrl,
  service,
  opPagingDirective,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    opPagingDirective(app, elem, attrs, scope);
    elem.append(html);
  }
});