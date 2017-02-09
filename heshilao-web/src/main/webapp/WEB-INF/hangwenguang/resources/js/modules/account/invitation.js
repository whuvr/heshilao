define( [
    'modules/account/invitationCtrl',
    'modules/account/invitationService',
    'text!htmlModule/account/invitation.html',
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
