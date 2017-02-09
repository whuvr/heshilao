define( [
    'modules/account/guaranteeBorrowCtrl',
    'modules/account/guaranteeBorrowService',
    'text!htmlModule/account/guaranteeBorrow.html',
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
