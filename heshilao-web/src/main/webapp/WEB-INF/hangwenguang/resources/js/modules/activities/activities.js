define([
    'modules/activities/activitiesCtrl',
    'directives/knobDirective',
    'text!htmlModule/activities/activities.html',
],function(ctrl,knobDirective,html,area){
	return function(app,elem,attrs,scope){
		ctrl(app,elem,attrs,scope);
		knobDirective(app, elem, attrs, scope);
		elem.append(html);
	}
})