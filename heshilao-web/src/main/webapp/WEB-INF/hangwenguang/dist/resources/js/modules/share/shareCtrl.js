define(["angular"],function(){return function(e,t,a,o){e.controller("shareCtrl",["$scope","$window","cService",function(e,t,a){e.computer=!1,e.type=1,e.formData={amountBorrow:"",rateYear:"",timeLimit:"",timeType:"",repayWay:""},e.total_profit=0,e.capital=0,e.reset=function(){e.formData={amountBorrow:"",rateYear:"",timeLimit:""},e.innerData=[],e.total_profit=0,e.capital=0,e.type=1,document.getElementById("calculator").getElementsByTagName("select")[0].options[0].selected=!0,document.getElementById("set_radio").checked=!0};e.compute=function(t){var o=document.getElementById("calculator").getElementsByTagName("select")[0].options,r=o.selectedIndex;e.formData.repayWay=o[r].value;for(var n=document.getElementsByName("timeType"),c=0;c<n.length;c++)n[c].checked&&(e.formData.timeType=c);t.$valid&&a.ajax({url:"repayPlan",method:"post",params:e.formData}).success(function(t){e.innerData=t;for(var a=0,o=0,r=0;r<t.length;r++)a+=t[r].total,o+=t[r].interest;e.total_profit=o.toFixed(2),e.capital=a.toFixed(2)}).error(function(e){})},e.goTop=function(){window.scrollTo(0,0)}}])}});