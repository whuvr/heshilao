define([
    'modules/borrow/borrowCtrl',
    'text!htmlModule/borrow/borrow.html',
    'directives/areaDirective',
],function(ctrl,html,area){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
		area(app,elem,attrs,scope);
	}
})