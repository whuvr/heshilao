define( [
    'modules/account/rechargeCtrl',
    // 'modules/account/accountRechargeDirective',
    // 'modules/account/navDate.account',
    'modules/account/rechargeService',
    'text!htmlModule/account/recharge.html',
], function(
  ctrl,
  // directive,
  // navDate,
  service,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    // directive(app, elem, attrs, scope);
    // navDate(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    elem.append(html);
  }
});