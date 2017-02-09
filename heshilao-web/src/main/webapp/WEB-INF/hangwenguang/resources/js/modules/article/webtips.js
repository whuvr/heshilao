define( [
    'modules/article/webtipsCtrl',
    'modules/article/webtipsService',
    'directives/opPagingDirective',
    'text!htmlModule/article/webtips.html',
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