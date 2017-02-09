define( [
    'modules/login/modifySucCtrl',
    'text!htmlModule/login/modifySuc.html',
], function(
  ctrl,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
  }
});