define([
    'modules/account/rechargeAndCashCtrl',
    'directives/opPagingDirective',
    'text!htmlModule/account/rechargeAndCash.html'
],function(ctrl,opPagingDirective,html){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		elem.append(html);
	}
})