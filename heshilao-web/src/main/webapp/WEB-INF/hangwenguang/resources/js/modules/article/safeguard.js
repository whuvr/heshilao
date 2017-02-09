define([
	'modules/article/safeguardCtrl',
	'text!htmlModule/article/safeguard.html'
],function(
     ctrl,
     html){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
	}
});