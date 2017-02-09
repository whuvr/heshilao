
define( [
    'modules/common/header/headerCtrl',
    'text!htmlModule/common/header/header.html'
], function(
    ctrl,
    html
) {
return function(app, elem, attrs, scope){

      ctrl(app, elem, attrs, scope);
      elem.append(html);
    }
});