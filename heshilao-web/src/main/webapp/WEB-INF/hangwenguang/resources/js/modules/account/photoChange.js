define( [
    'modules/account/photoChangeCtrl',
    'text!htmlModule/account/photoChange.html'
    // 'jsCommon/photoSlideDirective'
], function(
  ctrl,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    elem.append(html);
    // photoSlide(app, elem, attrs, scope);
  }
});