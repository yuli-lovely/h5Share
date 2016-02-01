(function() {
	if(navigator.userAgent.search(/opera/ig)!=-1) window.location="http://wap.huanqiu.com";
})();
function bind(fn,cen) {
	return function() {
		return fn.apply(cen,arguments);
	}
}
Object.prototype.classFn = function(val,type) {
	if(!val||typeof val!="string") return false;
	if(this.nodeType==1) {
		var classNames = _classArr(this.className),
			manipulateClassNames = _classArr(val);
		if(type=="add") {
			var findItems = manipulateClassNames,
				targetItems = classNames;
		}else if(type=="remove"){
			var findItems = classNames,
				targetItems = manipulateClassNames,
				newClassNames = [];
		}
		for(var i=0,l=findItems.length;i<l;i++) {
			var item = findItems[i],
				c = false;
			for(var loop=0,itemsL=targetItems.length;loop<itemsL;loop++) {
				if(item==targetItems[loop]) c=true;
			}
			if(!c) newClassNames?newClassNames.push(item):targetItems.push(item);
		}
		var classArr = newClassNames?newClassNames:targetItems;
		this.className = classArr.join(" ").replace(/^\s+|\s+$/g,'');
	}
	function _classArr(str) {
		return str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,',').split(",");
	}
}
Object.prototype.addClass = function(val) {
	this.classFn(val,"add");
}
Object.prototype.removeClass = function(val) {
	this.classFn(val,"remove");
}
Array.prototype.each  = _each;
Object.prototype.each = _each;
Object.prototype.eq   = function(i) {
	return this[i];
}
function _each(fn) {
	for(var i=0,l=this.length;i<l;i++) {
		this[i].fn = fn;
		this[i].fn(i);
	}
}


	
	
	

function LazyLoad(con,ele) {
	if(!con) return;
	this.con     = con;
	this.client  = common.getClient();
	this.windowH = this.client.clientH;
	this.windowW = this.client.clientW;
	this.n       = 0;
	var _this    = this;
	function onScroll(){
		_this.loadimg();
	}
	this.el = ele?ele:window;
	common.addHandler(this.el,"scroll",onScroll);
	common.addHandler(this.el,"touchend",onScroll);
	this.loadimg();
}

LazyLoad.prototype.loadimg=function() {
	var _this = this,
		st    = (this.el.nodeType==1?this.el.scrollTop:common.getClient().scrollT)+this.windowH;
	this.li      = typeof this.con=="string"?common.getElementsByClassName(this.con):this.con;
	this.li.each(function(i) {
		var ot = this.offsetTop,
			ol = this.offsetLeft;
		if(st>=ot&&ol<=_this.windowW*2&&!this.getAttribute("loaded")) {
			_this.n++;
			this.setAttribute("loaded",true);
			if(common.getElementsByClassName("HQlazy",this).length) {
				common.getElementsByClassName("HQlazy",this).each(function() {
					var ori  = this.getAttribute("original");
					this.src = ori;
				});
			}
		}
	});
};



var common = {
	v:navigator.userAgent.search(/AppleWebKit/gi) != -1,
	$:function() { return document.getElementById(arguments[0]) },
	addHandler:function(element,type,handler) { 
		if(element.addEventListener) {
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,handler);
		}else {
			element['on'+type] = handler;
		}
	},
	removeHandler:function(element,type,handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent) {
			element.detachEvent('on'+type,handler);
		}else {
			element['on'+type] = null;
		}
	},
	getUrlAtt:function() {
		var qs      = window.location.search.length?window.location.search.substring(1):'',
			args    = {},
			items   = qs.length ? qs.split('&'):[],
			item    = null,
			arr     = [];
		for (var i=0,o=items.length;i<o;i++) {
			item    = items[i].split('=');
			name    = item[0];
			value   = item[1];
			if(name.length) args[name] = value;
		}
		return args;
	},
	getElementsByClassName:function(className, element) {
		var children = (element || document).getElementsByTagName('*');
		if(!className) return;
		var elements = [];
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(' ');
			for (var j = 0; j < classNames.length; j++) {
				if (classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	},
	deldzl:function() {
		window.scrollTo(0,1);
	},
	formateTime:function(timespan) {
		var newDate = new Date(timespan * 1e3),
			y = newDate.getFullYear(),
			m = _doubleNum(newDate.getMonth() + 1),
			d = _doubleNum(newDate.getDate()),
			h = _doubleNum(newDate.getHours()),
			min = _doubleNum(newDate.getMinutes());
		return y + "-" + m + "-" + d + " " + h + ":" + min;
		function _doubleNum(num) {
			if (num < 10) {
				return "0" + num;
			}
			return num;
		}
	},
	interception:function(str,size) {  //截字
		var newStr = '',
			num = 0;
		for(var i=0;i<str.length;i++){
			num = str.charCodeAt(i)<=255?num+1:num+2;
			newStr+=str.slice(i,(i+1));
			if(num>=size) break;
		}
		if(newStr.length<str.length) newStr+='...';
		return  newStr;
	},
	setCookie:function(name,value,expiry,path,domain,secure){
		
		var nameString = name + "=" + value;
		var expiryString = "";
		if (expiry != null) {
			try {
				expiryString = ";expires=" + new Date(expiry).getTime().toGMTString();
			} 
			catch (e) {
				if (expiry) {
					var lsd = new Date();
					lsd.setTime(lsd.getTime() + expiry * 1000);
					lsd.setTime(lsd.getTime()+expiry);
					expiryString = ";expires=" + lsd.toGMTString();
					
				}
			}
		}else {
			alert('setCookie方法没有设置过期时间！');
			return;
		}
		var pathString = (path == null) ? ";path=/" : ";path=" + path;
		var domainString = (domain == null) ? ";domain=" + window.location.host : ";domain=" + domain;
		var secureString = (secure) ? ";secure=" : "";
		document.cookie = nameString + expiryString + pathString + domainString + secureString;
	},
	getCookie:function(name) {
		var i, aname, value, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			aname = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			value = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			aname = aname.replace(/^\s+|\s+$/g, "");
			if (aname == name) {
				return unescape(value);
			}
		}
		return '';
	},
	mtgotoTop:function() {
		var gotoT           = document.createElement("div");
		gotoT.addClass("gotoTop");
		gotoT.id            = "gotoTop";
		gotoT.style.cssText = "width:35px;height:35px;position:fixed;right:10px;bottom:100px;";
		gotoT.innerHTML     = "<img src=\"http://himg2.huanqiu.com/www/mt/mobiletouch/images/goTop.png\" width=\"35\" />";
		document.body.appendChild(gotoT);
		var t = this.getClient().scrollT;
		if(t<10) gotoT.style.display="none";
		common.addHandler(window,"scroll",function() {
			t = common.getClient().scrollT;
			if(t<10) gotoT.style.display="none";
			else gotoT.style.display="";
		});
		gotoT.onclick=function() {
			if(common.v) {
				document.body.scrollTop = 0;
			}else {
				document.documentElement.scrollTop = 0;
			}
		};
	},
	headerController:function(type) {
		if(type=="channel") {
			var val  = 40,
				down = "-45px";
			if(common.version()=="ios") {
				common.addHandler(window,"touchmove",common.navT);
				common.addHandler(window,"scroll",function() {
					if(!common.s) clearTimeout(common.s);
					common.s = setTimeout(common.navT,60);
				});
			}else {

				common.addHandler(window,"scroll",common.navT);
			}	
			
			if(this.v) {
				common.channelScroll = new iScroll('naviLi');
				common.$("navis").style.zIndex = 30;
				common.$("navis").style.left   = 0;
				
			}else {
				common.$("naviLi").parentNode.style.overflow = "auto";
				
			}
			
			
			
		}else {
			var val  = 0,
				down = "45px";
		}

		common.$("swiper-slide-visible").each(function(i){
			var _this=this;
		  var time=parseInt(_this.attr("data-delay"));
		  setTimeout(function(){
		     _this.addClass("swiper-slide");
		  },time);
		});
	
		
		// var menu                  = this.getElementsByClassName('menuBox')[0],
		// 	_this                 = this,
		// 	menuH                 = menu.clientHeight+val, //获取导航高度
		// 	menuSwitch            = false;
		// 	menu.style.visibility = "visible";
			
			
		// if(this.v) {
		// 	menu.style.cssText = !menuSwitch?"-webkit-transform:translate3d(0,"+(-menuH)+"px,0)":"-webkit-transform:translate3d(0,45px,0)";
		// }else {
		// 	menu.style.cssText = !menuSwitch?"display:none;":"display:;";
		// }
		// menu.style.top = -menuH+"px";
		// // this.getElementsByClassName('menu')[0].onclick=function() {
		// // 	menuSwitch?_this._menuUp():_this._menuDown();
		// // };
		
		
		// if(this.getElementsByClassName('backOn').length) {
		// 	this.getElementsByClassName('backOn')[0].onclick=function() {
		// 		window.history.back();
		// 	};
		// }
		
		// this._menuUp = function() {
		// 	if(type=="channel") {
		// 		common.$("drawer").removeClass("open");
		// 		common.$("drawer").addClass("close");
		// 	}
		// 	if(this.v) {
		// 		menu.style.cssText = "-webkit-transform:translate3d(0,"+(-menuH)+"px,0)";
		// 		setTimeout(function() {
		// 			common.removeHandler(document.documentElement,'touchmove',common.scrollFn);
		// 		},300);
		// 	}else {
		// 		menu.style.display = "none";
		// 		common.removeHandler(document.documentElement,'touchmove',common.scrollFn);
		// 	}
		// 	common.createMark(false);
		// 	menuSwitch = false;
		// }
		// this._menuDown = function() {
		// 	if(type=="channel") {
		// 		common.$("drawer").removeClass("close");
		// 		common.$("drawer").addClass("open");
		// 	}
		// 	menu.style.cssText = this.v?"-webkit-transform:translate3d(0,"+down+",0)":"display:;top:0;padding-top:0;";
		// 	common.addHandler(document.documentElement,'touchmove',common.scrollFn);
		// 	common.createMark(true);
		// 	menuSwitch = true;
		// }
	},
	createMark:function(switchF) {
		var _this = this;
		if(!switchF) {
			if(common.$("mark")) document.body.removeChild(common.$("mark"));
			common.removeHandler(window,"orientationchange",_markH);
		}else {
			var mark          = document.createElement("div"),
				markH         = this.getClient().clientH + 100;
			with(mark) {
				id            = "mark";
				style.cssText = 'height:'+markH+'px;width:100%;position:fixed;top:0;left:0;opacity:0.5;background:#000;';
			}
			
			document.body.appendChild(mark);
			common.addHandler(mark,'click',function() {
				_this._menuUp();
			});
			common.addHandler(mark,'touchmove',function() {

				_this._menuUp();
			});
			common.addHandler(window,"orientationchange",_markH);
		}
		function _markH() {
			markH = _this.getClient().clientH+100;
			mark.style.height = markH+"px";
		}
	},
	navT:function() {
		var getClient = common.version()=="ios"?window.scrollY:common.getClient().scrollT,
			nav       = common.$("navis"); // 导航
		if(getClient >= 45) {

			nav.style.top = 0;
			nav.style.display  = "block";
			nav.style.position = "fixed";
			nav.style.zIndex   = "3";
		}else {

			if(nav.style.position=="relative") return;
			nav.style.position = "relative";
			nav.style.display  = "none";
			//setTimeout(function() {
				nav.style.display  = "block";
			//},100);
		}
	},
	version:function() {
		var version       = navigator.appVersion.search(/Linux/ig) != -1?"android":"ios"; //判断系统
		return version;
	},
	scrollFn:function(e) {  //mousewheel/DOMMouseScroll
		e=e||window.event;
		var a = e.target || e.srcElement;
		if(a.getAttribute("scroll")) return;
		if (e&&e.preventDefault){ 
			e.preventDefault();
			e.stopPropagation();
		}else{ 
			e.returnvalue=false;  
			return false;     
		}
	},
	orientation:function() {
		// if(window.orientation==0||typeof window.orientation=="undefined"){
		// 	setTimeout(function() {
		// 		common.$('menuBox').addClass('sp');
		// 		common.$('menuBox').removeClass('hp');
		// 	},500);
			
		// }else{ 
		// 	setTimeout(function() {
		// 		common.$('menuBox').addClass('hp');
		// 		common.$('menuBox').removeClass('sp');
		// 	},500);
		// }
	},
	dbshare:function() {
		var ele     = document.getElementsByTagName("*"),
			title   = encodeURIComponent(document.title),
			url     = encodeURIComponent(location.href);
		
		ele.each(function(i) {
			var db = this.getAttribute("data-cmd");
			if(db) {
				var share  = this,
					urlStr = null;
				switch(db) {
					case "qzone":
						urlStr = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'&title='+title;
						break;
					case "tqq":
						urlStr = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+url+'&appkey=558715709&title='+title;
						break;
					case "tsina":
						urlStr = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&source=bookmark';
						break;
					case "renren":
						urlStr = 'http://widget.renren.com/dialog/share?resourceUrl='+url+'&srcUrl='+url+'&title='+title+'&description=';
						break;
					case "douban":
						urlStr = 'http://www.douban.com/share/service?bm=&image=&href='+url+'&updated=&name='+title;
						break;
				}
				share.onclick=function() {
					window.open(urlStr,'_blank');
				};
			}
		});
	},
	getClient:function() {
		var json     = {};
		json.scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		json.scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
		json.scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
		json.clientH = document.documentElement.clientHeight;
		json.clientW = document.documentElement.clientWidth;
		return json;
	},
	loadPosition:function() {
		var _this                      = this,
			p                          = this.getClient(),
			h                          = Math.abs(parseInt(p.clientH/2-80));
		if(this.$('loading')) this.$('loading').style.paddingTop = h+"px";
		setTimeout(function() {
			var clientH                = _this.getClient().clientH;
			if(_this.$("mark")) _this.$("mark").style.height           = clientH+100 + "px";
		},300);
		
	}
};