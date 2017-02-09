define( [
    'modules/borrowPreview/borrowPreviewCtrl',
    'modules/borrowPreview/borrowPreviewService',
    'directives/opPagingDirective',
    'jsCommon/knobDirective',
    'text!htmlModule/borrowPreview/borrowPreview.html',
], function(
    ctrl,
    service,
    opPagingDirective,
    knobDirective,
    html) {
    return function(app, elem, attrs, scope){
        ctrl(app, elem, attrs, scope);
        service(app, elem, attrs, scope);
        opPagingDirective(app, elem, attrs, scope);
        knobDirective(app, elem, attrs, scope);
        elem.append(html);
    }
});