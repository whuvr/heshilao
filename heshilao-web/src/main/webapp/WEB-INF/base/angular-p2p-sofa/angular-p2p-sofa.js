/**
 * @ name angular-p2p-sofa based AngularJS v1.2.27
 * @ description
 * sofa is consist of one html file named templates.html and
 * three angular modules including mod_directives(storing all directives),
 * mode_services(storing all services) and mod_filters(storing all filters).
 * it's used to componentize angular webapp by the directives
 * and make the angular webapp development process incredible high and stable.
 * @ contributors: yang/chen/ren/jia
 * @ version V1.0.0
 * @ date April 15 2016
 * @ mark 目前组件化最高的模板是wenguang,可以作为开发时的参考 2016-4-15
 *
 */


//define module mod_directives
window.mod_directives = angular.module( 'mod_directives', ['ng'] );

//define module mod_services
window.mod_services = angular.module( 'mod_services', ['ng'] ).run(['$rootScope', 'commonService', 'validator',
    'nullModifier', function($rootScope, cService, validator, nullModifier ){

  /**
   * [gotoAnchor is used to anchor link because the angular-router has prevented the default behavior of the anchors]
   * @usesage: <a ng-click="gotoAnchor(anchorName)">go to anchorName</a>
   */
	$rootScope.gotoAnchor = cService.gotoAnchor;

	//Used to reload current page
	$rootScope.reload = function(){location.reload();};
	$rootScope.reload_corp = function(){
		cService.ajax({
		    url: 'ufx/queryCorpRegisterStatus',
		    method: 'get',
		    params: {
		        type: 10
		    }
		}).success(function(data){
			location.reload();
		})

	};

	//Used to remove dialog created by commonService.popupDialog
	$rootScope.removeDialog = cService.removePopupDialog;
	$rootScope.removeDialog_corp = function(){
		cService.ajax({
		    url: 'ufx/queryCorpRegisterStatus',
		    method: 'get',
		    params: {
		        type: 10
		    }
		});
		cService.removePopupDialog;
	}

	//register the nullModifier for the angular-auto-validate,for detail http://jonsamwell.github.io/angular-auto-validate/
	validator.registerDomModifier(nullModifier.key, nullModifier);
    //validator.setDefaultElementModifier(nullModifier.key);

    //forbidding the backspace key down exclude tag input because it will cause browser's navigation back
    angular.element(document).on('keydown', function(e){
        var
        	code = e.keyCode || e.which,
        	tagName = e.target.tagName.toLowerCase();
        if (code == 8 &&  tagName != 'input' && tagName != 'textarea') {
            e.preventDefault();
            return false;
        }
    });
}]);

//define module mod_filters
window.mod_filters = angular.module( 'mod_filters', ['ng'] );

//define angular-p2p-sofa and bootstrap
define( [
	'angular',
	'p2pSofa/directives/common/commonDirectives',
	//'p2pSofa/directives/common/onPagingDirective',
	'p2pSofa/directives/list/listDirectives',
	'p2pSofa/directives/form/formDirectives',
	'p2pSofa/directives/valid/validDirectives',
	'p2pSofa/directives/do/doDirectives',
	'p2pSofa/directives/info/infoDirectives',
	'p2pSofa/directives/ui/uiDirectives',
	'p2pSofa/directives/upload/uploadDirectives',
	'p2pSofa/filters/filters'
], function(angular) {

	return function(app) {

	}
});
