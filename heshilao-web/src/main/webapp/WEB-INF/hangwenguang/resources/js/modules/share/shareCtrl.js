define([
    'angular'
], function(
) {
    return function(app, elem, attrs, scope) {
        app.controller('shareCtrl', ['$scope', '$window','cService',function( $scope,$window,cService) {
            /*计算器*/
            $scope.computer = false;
            $scope.type = 1;
            $scope.formData = {
                amountBorrow:'',
                rateYear:'',
                timeLimit:'',
                timeType:'',
                repayWay:''
            };
            $scope.total_profit = 0.00;
            $scope.capital = 0.00;
            $scope.reset = function(){
                $scope.formData = {
                    amountBorrow:'',
                    rateYear:'',
                    timeLimit:''
                };
                $scope.innerData = [];
                $scope.total_profit = 0.00;
                $scope.capital = 0.00;
                $scope.type = 1;
                document.getElementById('calculator').getElementsByTagName('select')[0].options[0].selected = true;
                document.getElementById('set_radio').checked = true;

            }
            var timer = null;
            $scope.compute = function(form){
                // timer = null;
                var options = document.getElementById('calculator').getElementsByTagName('select')[0].options;
                var index = options.selectedIndex;
                $scope.formData.repayWay = options[index].value;
                var radios = document.getElementsByName('timeType');
                for(var i=0;i<radios.length;i++){
                    if(radios[i].checked){
                        $scope.formData.timeType = i ;
                    }
                }
                if(form.$valid){
                    cService.ajax({
                        url:'repayPlan',
                        method:'post',
                        params:$scope.formData
                    }).success(function(data){
                        $scope.innerData = data;
                        var total = 0;
                        var total1 = 0;
                        for(var i=0;i<data.length;i++){
                            total+=data[i].total;
                            total1+=data[i].interest;
                        }
                        $scope.total_profit = total1.toFixed(2);
                        $scope.capital = total.toFixed(2);
                        // timer = setInterval(scroller(),5000);
                    }).error(function(data){

                    })
                }

            }
            /*滚动条*/
        	// $scope.backTop = document.getElementById('backTop');
        	$scope.goTop = function(){
        		window.scrollTo(0,0);
        	}
        	// angular.element($window).bind('scroll',function(){
        	// 	var scrollDis = window.scrollY || window.pageYOffset||document.documentElement.scrollTop ;
        	// 	if(scrollDis >= 100 ){
        	// 		$scope.backTop.style.display = "block"
        	// 	}else{
        	// 		$scope.backTop.style.display = "none"
        	// 	}
        	// })

        }])
    }
});