define( [
    'modules/login/getbackEmaCtrl',
    'text!htmlModule/login/getbackEma.html',
], function(
  ctrl,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
  }
});