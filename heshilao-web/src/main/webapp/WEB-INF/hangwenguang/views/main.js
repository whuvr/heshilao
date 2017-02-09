require.config({
	baseUrl: "./",
	paths: {
		angular: "resources/plugins/angular/angular",
		ngCookies: "resources/plugins/angular/angular-cookies",
		ngAnimate: "resources/plugins/angular/angular-animate",
		uiRouter: "resources/plugins/angular-ui-router/release/angular-ui-router",
		components: 'resources/js/directives/components',
		autoValidate: 'resources/plugins/angular-auto-validate/dist/jcs-auto-validate',
		text: 'resources/plugins/requirejs/text',
		dialog: 'resources/js/common/dialog',
		plupload: 'resources/plugins/qiniu/demo/js/plupload/plupload.full.min',
		qiniu: 'resources/plugins/qiniu/demo/js/qiniu',
		echarts: 'resources/plugins/echarts/echarts-plain-original',
		// placeholders: 'resources/plugins/common/placeholders',
		excanvas: 'resources/js/common/excanvas',
		rsa: 'resources/js/common/RSA_ready',
		WdatePicker:'resources/plugins/My97DatePicker/WdatePicker',
		angularP2pSofa: 'base/angular-p2p-sofa/angular-p2p-sofa'
	},
	packages: [
		{name: "common",location:"resources/js/common"},
		{name: "services",location: 'resources/js/services'},
		{name: "directives",location: 'resources/js/directives'},
		{name: "modules",location: 'resources/js/modules'},
		{name: "configs",location: 'resources/js/configs'},
		{name: "interface",location:"resources/interface"},
		{name: "htmlModule" ,location:"views"},
		{name: "appCommon" ,location:"resources/js/common"},
		{name: "p2pSofa" ,location:"base/angular-p2p-sofa"}
	],

	urlArgs:"v=1457612997727",
	waitSeconds: 0,
	shim:{
		angular: {
			exports:"angular"
		},
		ngCookies: {
			deps: ['angular']
		},
		uiRouter: {
			deps: ['angular'],
			exports: 'uiRouter'
		},
		components: {
			deps: ['angular']
		},
		ngAnimate:{
			deps: ['angular']
		},
		autoValidate: {
			deps: ['angular']
		},
		angularP2pSofa: {
			deps: ['angular']
		}
	}
});

require(['htmlModule/app'],function(app){
	'use strict';

	app.start();

//	_G.useMockInterface(0);
})

