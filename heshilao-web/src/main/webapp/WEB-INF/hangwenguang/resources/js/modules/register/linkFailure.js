define([
	'modules/register/linkFailureCtrl',
	'text!htmlModule/register/linkFailure.html'
],function(ctrl,html){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
	}
})