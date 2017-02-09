define([
    'angular',
    'excanvas'
    ],function(){

     return function(app, elem, attrs, scope){
     	app.directive("knob",['G',function(G){

     	 	return {

     	 		link: function(scope, element, attrs){
     	 			var w = 58,
     	 			h = 58,
     	 			canvas,
     	 			bgcolor = '#e8e8e8',
     	 			color = '#ef7b1b',
     	 			el = document.createElement('canvas');
				    el.setAttribute('width', w);
				    el.setAttribute('height', h);
				    if (G.isIE8()){
				    	G_vmlCanvasManager.initElement(el);
				    }
				    element.prepend(el);

				    canvas = el.getContext('2d');

				    scope.$watch(attrs.knob,function(){
     	 				draw(scope.$eval(attrs.knob));
     	 			})
                    //if element's parents  use rd-show derective or some like to display and hide, 
                    //draw should be recalled or the percentage circle will not display
                    if (attrs.rdShow){  
                        scope.$watch(attrs.rdShow,function(){
                            draw(scope.$eval(attrs.knob));
                        }) 
                    }

     	 			function draw(degrees){
                        !degrees && (degrees = 0); 
     	 				var radians = degrees * Math.PI / 50;//degrees which means process percent from 0 to 100
     	 				canvas.clearRect(0, 0, w, h);        
				        //Background 360 degree arc
				        canvas.beginPath();
				        canvas.strokeStyle = bgcolor;
				        canvas.lineWidth = 5;    //预填充环的宽度
				        canvas.arc(w/2, h/2, 24, 0, Math.PI*2, false);
				        canvas.stroke();	
				        
                        if (radians != 0){
                            canvas.beginPath();
                            canvas.strokeStyle = color;
                            canvas.lineWidth = 5;
                            canvas.arc(w/2, h/2, 24, 0, radians, false); 
                            canvas.stroke(); 
                        }
				           
     	 			}
				    	 			
     	 		}
     	 	}
     	}]);
     }
})