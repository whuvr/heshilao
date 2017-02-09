/*
 * 	调用1:
 * 	alert('msg...');
 *
 * 	调用2:
 * 	confirm('msg...', {
		title: '头部标题', 	//可为空，不显示头部
		isCover: true,		//遮罩层，默认为true
		closeBtn: true,     //是否显示关闭按钮，默认为true 
		isMiddle: true,		//是否在WINDOW中上面居中显示。默认为true
		type: "confirm",    //"confirm" 确认框 ，"prompt" 询问框，"error" 错误提示框 ，"info" 信息提示,"no-icon" 没有图标
		buttons: [{			//按钮内容，及个数,如为'default'就是默认两个按扭[取消，确定]
			type:'button',
			value: '放弃',
			callBack: function() {
				setTimeout(function() {alert(11)},0);
				//...
			}
		},
		{
			type:'submit',
			value: '确定'
		}]
	}, 2000);	//"2000" -- 2秒后自动关闭(可为空，不自动半闭)
 * 
 */

(function(window) {

var ALERT = null;
Alert = function(options) {
	this.isHasDisplay = false;
	this.callBackName = 0;
	this.isAndroid = navigator.userAgent.indexOf('Android') > 0 ? true : false;
	this.returnVal = false;
}
	
Alert.prototype = {	
	getButtons: function() {
		var args = this.args,
			btn;
		this.buttonsDiv = this.buttonsDiv || document.createElement('div');
		this.buttonsDiv.className = 'ui_alert_button';
		this.buttonsDiv.innerHTML = '';
		if(args.buttons) {
			var defBtn = args.buttons;
			var i, k, buttons = args.buttons;
			buttons = buttons === 'default' ? [{
				// type: 'button',
				value: '取消'
			},
			{
				// type: 'submit',
				value: '确定'
			}] : buttons;
			for(i = 0, k = buttons.length; i < k; i++) {
				btn = document.createElement('button');
				// btn.type = buttons[i].type;
				if(buttons[i].className){
					btn.className = buttons[i].className;
				}
				btn.innerHTML = buttons[i].value;
				this.buttonsDiv.appendChild(btn);
				if(defBtn == 'default'&& i==1 ){
					this.bindCallBack(btn, args.callBack);
				}else{
					this.bindCallBack(btn, buttons[i].callBack);
				}
			}
		}
		else {			
			btn = document.createElement('button');
			btn.className = 'ui_alert_btn';
			// btn.type = 'submit';
			btn.innerHTML = '确定';			
			this.bindCallBack(btn, args.callBack);					
			this.buttonsDiv.appendChild(btn);
		}
		return this.buttonsDiv;
	},

	bindCallBack: function(btn, callBack) {
		if(callBack && 'function' === typeof callBack) {
			++this.callBackName;
			this.callBack[this.callBackName] = callBack;
			//this.callBacks[btn] = 
			btn.callBack = this.callBackName;
		}
	},

	getTemplate: function() {
		var args = this.args;
		// this.box = this.box || document.createElement('div');
		// this.box = this.box || document.createElement('div');
		this.box = document.createElement('div');
		this.box.className = this.className;
		
		//title
		if(args.title) {
			this.title = this.title || document.createElement('h1');
			this.title.innerHTML = args.title;
			if(!this.isHasDisplay) {
				this.box.appendChild(this.title);
			}
			this.title.style.display = '';
		}
		else {
			if(this.title) {
				this.title.style.display = 'none';
			}
		}
		
		
		
		//close
		if(args.closeBtn) {
			this.closeBtn = this.closeBtn || document.createElement('button');
			this.closeBtn.className = 'close';
			this.closeBtn.innerHTML = '×';
			if(!this.isHasDisplay) {
				this.box.appendChild(this.closeBtn);
			}
			this.closeBtn.style.display = '';
		}
		else {
			if(this.closeBtn) {
				this.closeBtn.style.display = 'none';
			}
		}
		
		//content
		this.content = this.content || document.createElement('p');
		this.content.className = 'default'
		this.content.id = 'content';
		var typeDom = document.createElement('div');
			typeDom.id = args.type||"info";
			this.content.appendChild(typeDom);	
		var contenInner = document.createElement('div');
			contenInner.id="contDetail"
			contenInner.innerHTML = this.msg || '';
			this.content.appendChild(contenInner);	
		// if(navigator.appName == 'Microsoft Internet Explorer'){
		// 	var contenInner = document.createElement('div');
		// 	contenInner.id="contDetail"
		// 	contenInner.innerHTML = this.msg || '';
		// 	this.content.appendChild(contenInner);
		// }else{

		// 	this.content.innerHTML = this.msg || '';
		// }		
		if(!this.isHasDisplay) {
			this.box.appendChild(this.content);
		}
		
		this.buttonsDiv = this.getButtons();
		if(!this.isHasDisplay) {
			this.box.appendChild(this.buttonsDiv);
		}
		
		if(!this.isHasDisplay) {
			document.body.appendChild(this.box);
		}
		
		if(false !== this.isCover) {
			if(!document.getElementById(this.coverClassName)){
				this.cover = this.cover || document.createElement('div');
				this.cover.id = this.coverClassName
				this.cover.className = this.coverClassName;
				if(!this.isHasDisplay) {
					document.body.appendChild(this.cover);
				}				
			}else{
				this.cover = document.getElementById(this.coverClassName);
			}
			this.cover.style.height = window.screen.height >= document.body.clientHeight ? window.screen.height : document.body.clientHeight + 'px';
		}
	},
	
	bindEvents: function() {
		var _this = this;
		this.box.onclick = function(event) {

			var event = event || window.event;
			var target = event.srcElement||event.target ;

			if(target.tagName === 'BUTTON') {
				var callBackName = target.callBack;
				if(callBackName && _this.callBack[callBackName]) {
					var callBack = _this.callBack[callBackName](_this);
					if(false === callBack) {
						return;
					}
				}
				_this.close(_this);
			}
		}
	},
	
	close: function(obj) {
		if(navigator.appName == 'Microsoft Internet Explorer'){
			obj.box.removeNode(true);
		}else if(navigator.appName == "Netscape"){
			obj.box.parentNode.removeChild(obj.box);
		}else{
			obj.box.remove()
		}
		
		// obj.box.style['top'] = '-50%';
		obj.removeClass(obj.box, obj.showClassName);
		// obj.removeClass(obj.cover, obj.coverClassName);
		obj.cover.style.height = '0px';
		return false;
	},
	setPosition: function(obj){
		if(obj.content.innerHTML!=''&&obj.content.innerText!=''){
			var winH = document.documentElement.clientHeight,
		    	boxH = obj.box.clientHeight;
		    obj.box.style['position'] = 'fixed';
		    obj.box.style['top'] = '50%';

		    if(winH&&winH>boxH){
		    	// obj.box.style['marginTop'] = (-boxH/2 ) + 'px';
		    	obj.box.style['top'] = (winH - boxH) * 382 / 1000+'px';
		    }else{
		    	obj.box.style['top'] = 0 + 'px';
		    }			
			obj.box.style['marginLeft'] = '-' + obj.box.clientWidth/2 + 'px';
			
			clearInterval(obj.showInterval);
		}
	},
	reset: function(){
		var _this = this;
		window.onresize = function(){
			_this.setPosition(_this);
		}
	},
	show: function(options) {
		this.msg = options.msg;
		this.args = options.args || {};
		this.showClassName = this.args.showClassName || 'ui_alert_show';
		this.className = this.args.className || 'ui_alert';
		this.coverClassName = this.args.coverClassName || 'ui_alert_cover';
		this.callBack = {};
		this.delay = options.delay;
		this.isCover = this.args.isCover;
		this.isMiddle = this.args.isMiddle;
			
		this.getTemplate();
		if(!this.isHasDisplay) {

			this.bindEvents();
		}
		this.isHasDisplay = true;
		
		this.addClass(this.box, this.showClassName)
		// if(false !== this.isMiddle) {
		// 	this.box.style['marginTop'] = '-' + this.box.clientHeight/2 + 'px';
		// 	this.box.style['marginBottom'] = '-' + this.box.clientHeight/2 + 'px';
		// 	this.box.style['marginLeft'] = '-' + this.box.clientWidth/2 + 'px';
		// }
		var _this = this;	
		this.showInterval = setInterval(function(){_this.setPosition(_this);_this.reset();},'200')	
		clearTimeout(this.timeoutValue);
		this.timeoutValue = null;
		if(this.delay) {
			this.timeoutValue = setTimeout(function() {
				clearTimeout(this.timeoutValue);
				this.timeoutValue = null;
				_this.close(_this);
			}, this.delay);
		}
	},

	addClass: function($el, className) {
		var classNames = $el.className;
		if(classNames === className || classNames.indexOf(' ' + className) >= 0 || classNames.indexOf(className + ' ') >= 0) {
		
		}
		else{
			if(classNames) {
				$el.className = classNames + ' ' + className;
			}
			else {
				$el.className = className;
			}
		}
		
	},

	removeClass: function($el, className) {
		var classNames = $el.className;
		if(classNames === className) {
			$el.className = '';
		}
		else if(classNames.indexOf(' ' + className) >= 0) {
			$el.className = classNames.replace(' ' + className, '');
		}
		else if(classNames.indexOf(className + ' ') >= 0) {
			$el.className = classNames.replace(className + ' ', '');
		}
	}
}
function deepExtend (newObj, original) {
    for(var ele in original){
        if(typeof(original[ele]) == "object"){
            newObj[ele] = deepExtend(original[ele]);
        }else{
            newObj[ele] = original[ele];
        }
    }
    return newObj;	
};

window.alert = function(msg, args, delay) {	
	var defArgs = {
		title: ' ',
		closeBtn : true
	}
	var args = deepExtend (defArgs, args);	
	if(!ALERT) {
		var ALERT = new Alert();
	};
	ALERT.show({
		msg: msg,
		args: args,
		delay: delay
	});
	return ALERT;
};
window.confirm = function(msg, args, delay) {
	var defArgs = {
		title: ' ',
		closeBtn : true
	}
	var args = deepExtend (defArgs, args);

	if(!ALERT) {
		var ALERT = new Alert();
	};
	return ALERT.show({
		msg: msg,
		args: args,
		delay: delay
	});	
};

}(window));