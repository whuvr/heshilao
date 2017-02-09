define( [
    'modules/account/withdrawalsCtrl',
    'modules/account/withdrawalsService',
    'text!htmlModule/account/withdrawals.html',
], function(
  ctrl,
  // directive,
  service,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    // directive(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    elem.append(html);
  }
});


 