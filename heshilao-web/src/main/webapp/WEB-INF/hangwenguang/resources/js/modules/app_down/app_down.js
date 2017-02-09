define([
    'modules/app_down/app_downCtrl',
    'text!htmlModule/app_down/app_down.html',
],function(ctrl,html,area){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
	}
})