var Scroll = function(options){
	this.scrollerWrap = options.scrollerWrap;
    this.scroller = options.scroller;
    this.scrollBar = options.scrollBar;
    this.scrollIndicator = options.scrollIndicator;
    this.defaultShow = options.defaultShow || true;
}
Scroll.prototype = {
    	init : function(){        
    		var scrollIndicator = this.scrollIndicator,
		    scroller = this.scroller,
    		scrollBarH = this.scrollerWrap.clientHeight,
    		scale = scrollBarH/this.scroller.scrollHeight;
    		this.scrollIndicator.style.height = scrollBarH*scale+"px";  
    		console.log(scrollBarH+" "+this.scroller.scrollHeight+" "+scale)
    		if(scale>=1){
    			this.defaultShow = false;
                scrollIndicator.style.display = "none";
    		}else{
                this.defaultShow = true;
                scrollIndicator.style.display = "block";
            }
    		scroller.addEventListener("scroll",function(){
    			// if(!this.defaultShow){
    			// 	scrollIndicator.style.display = "block";
    			// }
                console.log(111);
	            scrollIndicator.style.top = scroller.scrollTop*scale+"px";
	    	})
   	    }
}