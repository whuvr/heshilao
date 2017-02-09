define( [
    'modules/account/transferCtrl',
    'modules/account/transferService',
    'text!htmlModule/account/transfer.html',
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
