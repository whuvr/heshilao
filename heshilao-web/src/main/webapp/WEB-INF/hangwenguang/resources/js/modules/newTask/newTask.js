define( [
    'modules/newTask/newTaskCtrl',
    'modules/newTask/newTaskService',
    'text!htmlModule/newTask/newTask.html',
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