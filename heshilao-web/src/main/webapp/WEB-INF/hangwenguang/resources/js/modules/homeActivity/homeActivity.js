define( [
    'modules/homeActivity/homeActivityCtrl',
    'directives/knobDirective',
    'text!htmlModule/homeActivity/homeActivity.html',
], function(
   ctrl,
   knobDirective,
   html) {
    return function(app, elem, attrs, scope){
   
     ctrl(app, elem, attrs, scope);
     knobDirective(app, elem, attrs, scope);
     elem.append(html);

  }
});