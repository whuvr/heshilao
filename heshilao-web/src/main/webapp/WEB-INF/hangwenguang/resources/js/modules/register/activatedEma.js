define([
    'modules/register/activatedEmaCtrl',
    'text!htmlModule/register/activatedEma.html'
],function(ctrl,html){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
	}
})