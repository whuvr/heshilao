function move(obj, sName, target, time)
{
	alert(1);
	var start=parseFloat(getStyle(obj, sName));
	var dis=target-start;
	var count=Math.ceil(time/30); 
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		if (sName == 'opacity')
		{
			obj.style[sName]=start+dis*n/count;
		}
		else
		{
			obj.style[sName]=start+dis*n/count+'px';
		}
		
		
		if (n == count)
		{
			clearInterval(obj.timer);
		}
	}, 30);
}

function getStyle(obj, sName)
{
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}