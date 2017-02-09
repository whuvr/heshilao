define( [
    'modules/home/homeCtrl',
    'directives/knobDirective',
    'text!htmlModule/home/home.html',
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