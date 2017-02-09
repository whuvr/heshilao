define( [
    'modules/account/messageCtrl',
    'modules/account/messageService',
    'text!htmlModule/account/message.html',
], function(
  ctrl,
  service,
  html) {
  return function(app, elem, attrs, scope){
    ctrl(app, elem, attrs, scope);
    service(app, elem, attrs, scope);
    elem.append(html);
  }
});