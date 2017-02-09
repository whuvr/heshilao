define([
    'modules/account/accountRecordCtrl',
    'text!htmlModule/account/accountRecord.html',
],function(ctrl,
	html){
	return function(app,elem,attrs,scope){
		ctrl(app, elem, attrs, scope);
	    elem.append(html);
	}
});

