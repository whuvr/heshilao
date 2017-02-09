define([
    'angular',
    'ngAnimate',
    'uiRouter',
    'configs/config',
    'autoValidate',
    'components',
    'text!base/templates/templates.html',
    'dialog',
    'plupload',
    'qiniu',
    //'placeholders',
    'ngCookies',
    'angularP2pSofa',
    'rsa'
],function(
    angular,
    ngAnimate,
    uiRouter,
    config,
    autoValidate,
    components,
    templates
){
    'use strict';

    var appName ="investment",
        investmentApp = angular.module(appName, [
            'ui.router',
            'components',
            'jcs-autoValidate',
            'ngCookies',
            'mod_services',
            'mod_directives',
            'mod_filters'
        ]);
    config(investmentApp);
    investmentApp.run(['$rootScope', '$state', '$stateParams', '$compile', 'G','$location','$http','$cookieStore','$window','$cacheFactory'
            ,function($rootScope , $state, $stateParams, $compile,G,$location,$http,$cookieStore,$window,$cacheFactory) {

        //load templates
        $compile(templates);

        $rootScope.footer = true;
        $rootScope.footerSimply = false;
        $rootScope.header = true;
        $rootScope.headerSimply = false;
        $rootScope.$state = $state;
        $rootScope.$state.preState = '';
        $rootScope.$state.nxtState = '';
        $rootScope.$state.change = true;
        $rootScope.$stateParams = $stateParams;
        $rootScope.domain = '';
        $rootScope.login = {
                beforeLogin: true,
                afterLogin: false
        }
        if(!$rootScope.user){
            $rootScope.user = {};
        }

        if(!$rootScope.user.id&&!!$cookieStore.get("curUser")){

            $rootScope.user =  $cookieStore.get("curUser1")&&$cookieStore.get("curUser1").id?$cookieStore.get("curUser1"):$cookieStore.get("curUser");
        };
        $http({
            url:"qiniuDomain",
            method:"get",
            headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
        }).success(function(data,status){
            $rootScope.domain = data;
        }).error(function(data,status){
        })
        $http({
            url:'account/paymentaccount/getNamePhone',
            type:'get',
            headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
        }).success(function(data){
            $rootScope.corpInfo = data;
            var qqStr = data.serviceQQs;
            $rootScope.qqs = qqStr.split(",");
            var qqs =  $rootScope.qqs;
            var len = qqs.length,i;
            for(i=0; i<len;i++){
                qqs[i] = qqs[i].split("#");
            }
            $rootScope.qqs = qqs;
        })
        $rootScope.validate = [];
        $rootScope.$on('$stateChangeStart', function(event, next, nextPrams,current,currentParams) {
            nextPrams['noCache'] = new Date().getTime();
            function setPage(){
                $rootScope.user = {};
                $rootScope.user.headPortraitUrl = "resources/images/account-head.png";
                $cookieStore.put("curUser",{});
                $cookieStore.put("curUser1",{});
                var validate = true;
                if (next.name.indexOf('account') >= 0) validate = false;
                angular.forEach($rootScope.validate,function(item,index){
                    if (next.name == item && !$rootScope.user.id ){
                        validate = false;
                    }
                })

                if (!validate ){
                    $rootScope.$state.change = false;
                    $rootScope.$state.nxtState = next;
                    $rootScope.$state.nxtState.nextPrams = nextPrams;
                    $state.go('login');
                    event && event.preventDefault?event.preventDefault():window.event.returnValue = false;
                    return false;
                }
            }
            if(!$rootScope.user.id){
                setPage()
            }else{
                if(!current.name){
                     $http({
                         url:"canBorrow",
                         method:"get",
                         headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                     }).success(function(data,status){
                         if(data!='true'&&data!='false'){
                            $rootScope.login.beforeLogin = true;
                            $rootScope.login.afterLogin = false;
                            setPage()
                         }else{
                            $rootScope.login.beforeLogin = false;
                            $rootScope.login.afterLogin = true;
                            $http({
                                 url:'user/message',
                                 method:"get",
                                 headers: {'Content-Type': 'application/x-www-form-urlencoded','x-requested-with':'XMLHttpRequest'}
                            }).success(function(data,status){
                                 $rootScope.user.isNotReadedMessage = data;
                            })
                         }
                     })

                }

            }
        })
        $rootScope.$on('$stateChangeSuccess',function(event, next, nextPrams,current,currentParams){
            if((current.name == 'account.bankCard.cardShow'|| current.name == 'account.bankCard.formShow')&& next.name == 'account.bankCard'){
              $state.go(current.name);
            }
            if(next.name == 'register'&&$rootScope.user.id){
                $state.go('account.myaccount');
            }
            if(next.name == 'login' || next.name == 'register'){
                $rootScope.header = true;
                $rootScope.headerSimply = false;
                $rootScope.footer = false;
                $rootScope.footerSimply = true;
                if(next.name == 'login'){
                    $rootScope.stateName = "登录"
                }else{
                    $rootScope.stateName = "注册"
                }

            }else{
                $rootScope.footer = true;
                $rootScope.footerSimply = false;
                $rootScope.header = true;
                $rootScope.headerSimply = false;
            }
            $rootScope.$state.preState = current;
            $rootScope.$state.preState.currentParams = currentParams;
            window.scrollTo(0,0);
        })

    }]).config([ '$stateProvider', '$urlRouterProvider','$locationProvider',"$httpProvider", function ($stateProvider,  $urlRouterProvider , $locationProvider,$httpProvider){
        // $locationProvider.html5Mode(true);
        $stateProvider
        .state('account.bankCard.formShow',{
            url: '/formShow',
            templateUrl: 'views/account/bankCardForm.html'
        })
        .state('account.bankCard.cardShow',{
            url: '/cardShow',
            templateUrl: 'views/account/bankCardCard.html'
        });

        $urlRouterProvider
            .when('', '/home')//默认打开home
            .when('/', '/home')
            .otherwise('/error/404');

    }])


    return {
        start: function(ngAppELem){
            angular.bootstrap(ngAppELem||document, [appName]);
        }
    }
})

