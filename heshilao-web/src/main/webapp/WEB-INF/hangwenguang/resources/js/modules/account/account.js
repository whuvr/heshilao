define( [
    'modules/account/accountCtrl',
    'directives/opPagingDirective',
    'text!htmlModule/account/account.html',
], function(
  ctrl,
  opPagingDirective,
  html) {
  return function(app, elem, attrs, scope){ 
    opPagingDirective(app, elem, attrs, scope);
    elem.append(html);
    ctrl(app, elem, attrs, scope);
  }
});