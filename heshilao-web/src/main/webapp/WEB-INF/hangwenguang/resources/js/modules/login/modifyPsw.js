define([
	'modules/login/modifyPswCtrl',
	'text!htmlModule/login/modifyPsw.html'
], function(
  ctrl,
  html
  ) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
  }
});