define( [
    'modules/login/corpBorrowCtrl',
    'text!htmlModule/login/corpBorrow.html',
], function(
  ctrl,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
  }
});