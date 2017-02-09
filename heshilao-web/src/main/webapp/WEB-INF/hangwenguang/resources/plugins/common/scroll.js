// 通过样式名获取DOM
function getByClass(obj, oclass){
	var tagName = obj.getElementsByTagName("*");
	var arr = [];
	for(var i=0; i<tagName.length; i++){
		if(tagName[i].className == oclass){
			arr.push(tagName[i]);
		}
	};
	return arr;
};
//读取外链样式
function getStyle(obj, name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
};
//点击后移动函数
function move(obj, json){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var name in json){
			var cur = parseInt(getStyle(obj,name));
			var suDu = (json[name]-cur)/5;
			suDu = suDu>0?Math.ceil(suDu):Math.floor(suDu);
			if(cur==json[name]){
				clearInterval(obj.timer);
			}else{
				obj.style[name]=cur+suDu+"px";
			};
		};
	},30);
};

function scroller(){
	var oDiv = document.getElementById("conDiv");
	var oCon = document.getElementById("innermain");
	var oScr = document.getElementById("scroll");
	var oSbtn = getByClass(oScr, "sBtn")[0];
	var oStop = getByClass(oScr, "sTop")[0];
	var oSbtm = getByClass(oScr, "sBtm")[0];
	
    // var aa=document.getElementById('aaa');
    
    var dValue = oDiv.offsetHeight - oCon.offsetHeight
	if(dValue > 0){
		oScr.style.display = 'block';
		oSbtn.style.height = (dValue < oScr.offsetHeight -50 ? oScr.offsetHeight -40 - dValue : 50) + 'px';
		console.log(dValue < oScr.offsetHeight -50 ? oScr.offsetHeight - dValue : 50);
	}
	oSbtn.onmousedown=function(ev){
		var oEvent = ev || event;
		var sheng = oEvent.clientY - oSbtn.offsetTop;
		// aa.innerHTML ="sheng:" +sheng+ '<br>'
		// + "oEvent.clientY:" +oEvent.clientY + '<br>'
		// + "oSbtn.offsetTop:" +oSbtn.offsetTop 
		document.onmousemove=function(ev){
			var oEvent = ev || event;
			var top = oEvent.clientY - sheng;
			now = top;
			if(now<oStop.offsetHeight){
				now=oStop.offsetHeight;
			}else if(now>oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight/2){
				now=oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight/2
			}
			
			oSbtn.style.top=now+"px";
			var biLi = (now-20)/(oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight*2);
			oDiv.style.top=-biLi*(oDiv.offsetHeight - oCon.offsetHeight)+"px";
			//
            // aa.innerHTML = "oEvent.clientY:" +oEvent.clientY + '<br>' 
            //                + "oSbtn.offsetTop:" +oSbtn.offsetTop + '<br>'
            //                + "sheng:" +sheng + '<br>'
            //                + "top:" +top + '<br>'
            //                + "now:" +now + '<br>'
            //                + "biLi:" +biLi + '<br>'
            //                + "oSbtm.offsetHeight:" +oSbtm.offsetHeight + '<br>'
            //                + "oStop.offsetHeight:" +oStop.offsetHeight + '<br>'
            //                + "oScr.offsetHeight:" +oScr.offsetHeight + '<br>'
            //                + "oSbtn.offsetHeight:" +oSbtn.offsetHeight + '<br>'
            //                + "oDiv.style.top:" +oSbtn.offsetHeight + '<br>'
            //                + "oDiv.style.height:" +oDiv.offsetHeight + '<br>'
			//
		};
		document.onmouseup=function(){
			document.onmousemove = document.onmouseup = null;
			oSbtn.releaseCapture();
		};
		return false;
	};
	oSbtm.onclick=function(){
		var now = oSbtn.offsetTop;
		now+=30;
		if(now>oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight/2){
			now=oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight/2
		}
		move(oSbtn,{top:now})
		var biLi = (now-20)/(oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight*2);
		oDiv.style.top=-biLi*(oDiv.offsetHeight - oCon.offsetHeight)+"px";
	}
	oStop.onclick=function(){
		var now = oSbtn.offsetTop;
		now-=30;
		if(now<oStop.offsetHeight){
			now=oStop.offsetHeight
		}
		move(oSbtn,{top:now})
		var biLi = (now-20)/(oScr.offsetHeight-oSbtn.offsetHeight-oSbtm.offsetHeight*2);
		oDiv.style.top=-biLi*(oDiv.offsetHeight - oCon.offsetHeight)+"px";
	}
};


