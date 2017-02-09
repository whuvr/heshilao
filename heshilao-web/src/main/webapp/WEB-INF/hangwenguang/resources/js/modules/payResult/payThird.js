define( [
    'modules/payResult/payThirdCtrl',
    'text!htmlModule/payResult/payThird.html'
], function(
  ctrl,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
  }
});