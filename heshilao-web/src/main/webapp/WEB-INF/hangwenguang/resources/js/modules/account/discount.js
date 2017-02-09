define( [
    'modules/account/discountCtrl',
    'modules/account/discountService',
    'text!htmlModule/account/discount.html',
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
