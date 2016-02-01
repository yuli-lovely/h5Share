window.onload = function() {
	//common.deldzl();
	channel.init();
};

var channel = {
	init:function() {
		
		this.urlAtt = common.getUrlAtt(); //获取地址属性
		if(!this.urlAtt.channel) this.urlAtt.channel = "index";
		var _this = this;
		// this.channel = {
		// 	"index":{focus:{c:"1002",p:"0",b:""},list:{c:"1158,1171,1173,1161,966,967,968,970,974,983,412,413,414,428,429,430,441,442,443,448,138,127,1258,1264,293,308,309,285,284,282,1265,371,488,1259,1262,83,88",p:"",b:""}},
		// 	"indexForeign":{focus:{c:"",p:"51",b:""},list:{c:"1258,127",p:"",b:""}},
		// 	"indexChina":{focus:{c:"",p:"28",b:""},list:{c:"1264,85,83,88",p:"",b:""}},
		// 	"military":{focus:{c:"",p:"252",b:""},list:{c:"1008,25,43,21,22,35,1010,16,33,34",p:"",b:""}},
		// 	"seeChina":{list:{c:"490,491,1259",p:"",b:""}},
		// 	"Borland":{focus:{c:"",p:"349",b:""},list:{c:"1158,1161",p:"",b:""}},
		// 	"comment":{focus:{c:"",p:"274",b:""},list:{c:"288,282,284,285,308,309,1265",p:"",b:""}},
		// 	"taiwanStrait":{focus:{c:"",p:"70",b:""},list:{c:"305,291,295,293,1262",p:"",b:""}},
		// 	"Recreation":{focus:{c:"",p:"85",b:""},list:{c:"411,412,413,414,428,429,430,433,440,441,442,443,448",p:"",b:""}},
		// 	"finance":{focus:{c:"",p:"77",b:""},list:{c:"235,205,206,182,184,201,191,236,192",p:"",b:""}},
		// 	"sports":{focus:{c:"",p:"189",b:""},list:{c:"966,967,968,969,970,974,983",p:"",b:""}},
		// 	"technology":{focus:{c:"",p:"340",b:""},list:{c:"612,613,614,51,49,615,616,953,617,618,53,55,56,59,1181,1182",p:"",b:""}},
		// 	"health":{focus:{c:"",p:"344",b:""},list:{c:"520,519,1184,512,513,514,998,524",p:"",b:""}},
		// 	"car":{focus:{c:"",p:"342",b:""},list:{c:"1034,1033,1037,1041,1038,1043,1042,1031,1035,1036,1040,1044,1047,1048",p:"",b:""}},
		// 	"travel":{focus:{c:"",p:"354",b:""},list:{c:"902,901,935,937,938,939,940,942,949,941",p:"",b:""}},
		// 	"fashion":{focus:{c:"",p:"256",b:""},list:{c:"1169,1171,1172,1173",p:"",b:""}},
		// 	"community":{focus:{c:"",p:"350",b:""},list:{c:"1111,1112,1113,1116,1175",p:"",b:""}}
		// };
		this.root          = 0;
		this.picRoot       = 0; //初始化焦点
		this.focusLoadNum  = num; //焦点加载数量
		this.listLoadNum   = 20; //列表加载数量
		this.listLoadIndex = 1;//列表加载页
		this.more          = false;  //更多
		this.nav           = common.$("navis"); // 导航
		this.s             = null;
		this.picList       = common.$("picList");
		//common.headerController("channel");
		// var ot = null;
		// common.addHandler(window,"orientationchange",function() {
		// 	if(ot) clearTimeout(ot);
		// 	ot = setTimeout(function() {
		// 		channel.getClientW();
		// 	},50);
		// });
		// common.addHandler(window,"resize",function() {
		// 	clearTimeout(ot);
		// 	ot = setTimeout(function() {
		// 		channel.getClientW();
		// 	},50);
		// });
		
		
		
		//common.addHandler(common.$("more"),"click",_this.moreFn);
		this.getClientW(true);
		//if(focusTxt) {
			this.lazyLoad();
			this.touchmoveFn();
		//}
		//this.channelTab();
		//common.mtgotoTop();
		//this.contentImages = new LazyLoad('pic');
	},
	getClientW:function(o) {
		var getClient      = common.getClient();
		channel.clientW    = getClient.clientW;
		channel.clientH    = getClient.clientH;
		channel.scrollT    = getClient.scrollT;
		//common.$("navis").style.width = channel.clientW+"px";
		if(!o) channel.sliderEnd(true);
	},
	bind:function(e) {
		channel.slide(e);
	},
	touchmoveFn:function() {
		var _this    = this;
		common.addHandler(this.picList,"touchstart",function(event) {
			var event     = arguments[0] || window.event;
			_this.ol      = this.style.webkitTransform.replace(/(translate3d\()?(px)?(\))?/g,"");
			_this.ol      = !_this.ol?0:parseInt(_this.ol.split(",")[0]);
			if(event.touches) {
				_this.startX  = event.touches[0].clientX;
				_this.startY  = event.touches[0].clientY;
			}else {
				_this.startX  = event.pageX;
				_this.startY  = event.pageY;
			}
			_this.slider  = false;
			common.addHandler(_this.picList,"touchmove",_this.bind);
		});
		
		common.addHandler(this.picList,"touchend",function() {
			common.removeHandler(_this.picList,"touchmove",_this.bind);
			if(!_this.slider) return;
			_this.slideEnd();
		});
	},
	slideEnd:function() {
		
		var poor = parseInt(channel.moveX-channel.startX);
		if(Math.abs(poor)>50) {
			if(poor>0&&channel.picRoot) {
				channel.picRoot--;
			}else if(channel.picRoot!=channel.focusLoadNum-1&&poor<0) {
				channel.picRoot++;
			}
		}

		channel.sliderEnd();
		
	},
	sliderEnd:function(o) {
		if(channel.loadTimeout) clearTimeout(channel.loadTimeout);
		var css = o?"":"-webkit-transition: -webkit-transform .2s ease-out;-ms-transition: -ms-transform .2s ease-out;transition: transform .2s ease-out;";
		channel.picList.style.cssText = "-webkit-transform:translate3d("+-channel.picRoot*(channel.clientW+10)+"px,0,0);" + css;
		channel.lazyLoad();
		common.$("base").getElementsByTagName("span").each(function(i) {
			if(i==channel.picRoot) {
				this.parentNode.childNodes.each(function() {
					this.removeClass("show");
					this.addClass("hide");
				});
				this.addClass("show");
				this.removeClass("hide");
				if(channel.fData) common.$("shorttitle").innerHTML = channel.fData[i].shorttitle;
				// else common.$("shorttitle").innerHTML = focusTxt[i];
			}
		});
	},
	lazyLoad:function() {
		var pic = this.picList.getElementsByTagName("img").eq(this.picRoot);
		if(pic.getAttribute("loaded")) return;
		
		var obj = new Image();
		var ori  = pic.getAttribute("original");
		obj.src = ori;
		
		if(obj.complete) {
			_loadOk();
		}else {
			obj.onload = function(){ 
				_loadOk();
			}
		}
		function _loadOk() {
			pic.setAttribute("load","true");
			pic.src = ori;
		}
		
	},
	slide:function(event) {
		
		var event  = arguments[0] || window.event;
		if(event.touches) {
			this.moveX = event.touches[0].clientX;
			this.moveY = event.touches[0].clientY;
		}else {
			this.moveX = event.pageX;
			this.moveY = event.pageY;
		}
		var poorX  = Math.abs(parseInt(this.moveX-this.startX));
		var poorY  = Math.abs(parseInt(this.moveY-this.startY));
		
		if((!this.picRoot&&this.moveX>this.startX)||(this.picRoot==channel.focusLoadNum-1&&this.moveX<this.startX)) {
			var picOffset = this.ol+(this.moveX-this.startX)/4;
		}else {
			var picOffset = this.ol+this.moveX-this.startX;
		}
		
		if(poorX>poorY||this.slider) {
			this.slider = true;
			event.preventDefault();
			this.picList.style.cssText = "-webkit-transform:translate3d("+picOffset+"px,0,0)";
		}else {
			this.slider = false;
			common.removeHandler(this.picList,"touchmove",this.bind);
		}
	},
	// moreFn:function() {
	// 	channel.more = true;
	// 	channel.listLoadIndex++;
	// 	channel.load();
	// },
	// channelTab:function() {
	// 	var _this = this;
	// 	common.$("naviLi").getElementsByTagName("li").each(function(i) {
	// 		var channel = this.getAttribute("channel");
	// 		channel==_this.urlAtt.channel?(this.addClass("high"),_this.channelV=channel,_this.posi(this)):this.removeClass("high");
	// 		common.addHandler(this,"click",_run);
	// 	});
	// 	common.$("menuBox").getElementsByTagName("a").each(function(i) {
	// 		var channel = this.getAttribute("channel");
	// 		channel==_this.urlAtt.channel?this.addClass("high"):this.removeClass("high");
	// 		common.addHandler(this,"click",_run);
			
	// 	});
		
	// 	common.addHandler(window,"orientationchange",function() {
	// 		if(_this.channelObj) _this.posi(_this.channelObj);
	// 	});
		
	// 	function _run() {
	// 		if(this.className.indexOf("high")!=-1) return;
			
	// 		common._menuUp();
	// 		_this.root = 0;
	// 		_this.more = false;
	// 		_this.channelV = this.getAttribute("channel");
			
			
	// 		common.$("naviLi").getElementsByTagName("li").each(function() {
	// 			_ha(this,true);
	// 		});
	// 		common.$("menuBox").getElementsByTagName("a").each(function() {
	// 			_ha(this);
	// 		});
			
	// 		function _ha(obj,o) {
	// 			var item = obj.getAttribute("channel");
	// 			if(item==_this.channelV) {
	// 				var par = obj.parentNode;
	// 				while(par.className.indexOf("zt")==-1) {
	// 					par = par.parentNode;
	// 				} 
	// 				common.getElementsByClassName("item",par).each(function(i) {
	// 					this.removeClass("high");
	// 				});
	// 				obj.addClass("high");
	// 				if(o) _this.posi(obj);
	// 			}
	// 		}
			
			
			
	// 		window.location.href = window.location.href.replace(/(#){1}([\w:\-\.\%#\?\=&\/\s]*)?/g,"")+'#'+_this.channelV;
	// 		_this.listLoadIndex  = 1;
	// 		if(_this.picRoot) _this.picRoot = 0;
			
	// 		if(!common.$("more")) {
	// 			var more = document.createElement("div");
	// 			more.id  = "more";
	// 			more.addClass("more");
	// 			more.innerHTML = "点击加载更多";
	// 			document.body.insertBefore(more,common.$("fo"));
	// 			common.addHandler(common.$("more"),"click",_this.moreFn);
	// 		}
	// 		_this.load();
	// 	}
	// },
	// posi:function(obj) {
	// 	this.channelObj = obj;
	// 	var l   = obj.offsetLeft,
	// 		nav = common.$("naviLi").parentNode,
	// 		wd  = obj.clientWidth,
	// 		ch  = nav.clientWidth,
	// 		ul  = common.$("naviLi").clientWidth,
	// 		val = Math.abs(parseInt(l-(ch/2-wd/2)));
		
		
	// 	if(l>ch/2&&l<(ul-ch/2)) {
	// 		_run("-"+val);
	// 	}else if(l<ch/2){
	// 		_run(0);
	// 	}else if(l>=(ul-ch/2)){
	// 		_run("-"+(ul-ch));
	// 	}
		
	// 	function _run(val) {
	// 		setTimeout(function() {
	// 			if(common.v) {
	// 				common.$("naviLi").style.webkitTransition = "-webkit-transform 0.2s ease-out";
	// 				common.$("naviLi").style.webkitTransform  = "translate3d("+val+"px, 0px, 0px)";
	// 			}else {
	// 				common.$("naviLi").parentNode.scrollLeft = Math.abs(parseInt(val));
	// 			}
	// 		},500);
	// 	}
		
	// },
	// load:function() {
	// 	var _this = this;
	// 	this.loadMark(true);
	// 	var json = this.channel[this.channelV];
	// 	if(typeof json=="undefined") return;
	// 	if(json.focus&&!this.more) {
	// 		var focusUrl = 'http://db0.huanqiu.com/hqcms/getList?param={"c":"'+json.focus.c+'","weight":0,"p":"'+json.focus.p+'","b":"'+json.focus.b+'","num":'+_this.focusLoadNum+',"order":"listorder","page":1,"type":"hqNews","app":"hqNewsTouch","sign":"hqdb03rdApp","return":"jsonp","func":"channel.getFocusData"}';
	// 		_createJS(focusUrl,"focusId");
	// 	}else if(!json.focus){
	// 		if(common.$("focus")) document.body.removeChild(common.$("focus"));
	// 		_this.loadMark(false);
	// 	}
		
	// 	var thumb = this.channelV=="index"?1:0;
	// 	var listUrl = 'http://db0.huanqiu.com/hqcms/getList?param={"c":"'+json.list.c+'","weight":0,"p":"'+json.list.p+'","b":"'+json.list.b+'","num":'+_this.listLoadNum+',"order":"time","page":'+_this.listLoadIndex+',"type":"hqNews","thumb":'+thumb+',"app":"hqNewsTouch","sign":"hqdb03rdApp","return":"jsonp","func":"channel.getListData"}';
	// 	_createJS(listUrl,"listId");
		
	// 	function _createJS(url,type) {
	// 		if(common.$(type)) document.body.removeChild(common.$(type));
	// 		var js = document.createElement("script");
	// 		js.id  = type;
	// 		js.src = url;
	// 		document.body.appendChild(js);
	// 	}
	// },
	// loadMark:function(o) {
	// 	if(this.more) {
	// 		common.$("more").innerHTML = "正在加载...";
	// 		common.removeHandler(common.$("more"),"click",this.moreFn);
	// 		return;
	// 	}
		
	// 	if(o) {
	// 		if(common.$("loadMark")) return;
	// 		if(common.$("tx")) common.$("tx").style.display = "none";
	// 		var mark          = document.createElement("div"),
	// 			markH         = common.getClient().clientH + 100;
	// 		with(mark) {
	// 			id            = "loadMark";
	// 			style.cssText = 'height:'+markH+'px;width:100%;z-index:2;position:fixed;top:0;left:0;background:#fff;text-align:center;';
	// 			innerHTML     = "<img src=\"http://himg2.huanqiu.com/www/mt/mobiletouch/test/images/loading135.gif\" style=\"margin-top:160px;width:50px;\">";
	// 		}
			
	// 		document.body.appendChild(mark);
	// 		common.addHandler(window,"orientationchange",_markH);
	// 	}else {
	// 		this.root++;
	// 		if(this.root==2) {
	// 			window.scrollTo(0,1);
	// 			document.body.removeChild(common.$("loadMark"));
	// 			common.removeHandler(window,"orientationchange",_markH);
	// 		}
			
	// 	}
		
	// 	function _markH() {
	// 		markH = _this.getClient().clientH;
	// 		mark.style.height = markH+"px";
	// 	}
		
		
	// },
	// getFocusData:function(json) {
	// 	this.fData = json.data;
	// 	var  arr  = [],
	// 		 base = [];
	// 	this.loadMark(false);
	// 	if(!this.fData.length) {
	// 		document.body.removeChild(common.$("focus"));
	// 		return;
	// 	}
	// 	for(var i=0,l=this.fData.length;i<l;i++) {
	// 		var tableType = this.fData[i].tableType=="hqNews"?"/article/index.html":"/photos/index.html";
	// 		arr.push("<li><a href=\""+tableType+"?id="+this.fData[i].id+"\"><img class=\"li\" original=\""+this.fData[i].thumb.replace(/([\w\-]+){1}(\.){1}(jpg|png|gif){1}/g,'thumb_261_147_$1.$3')+"\" src=\"http://himg2.huanqiu.com/www/mt/mobiletouch/test/images/originalFocus.jpg\" /></a></li>");
	// 		base.push(i==0?"<span class=\"show\"></span>":"<span class=\"hide\"></span>");
	// 	}
	// 	if(!common.$("focus")) {
	// 		var focus = document.createElement("div");
	// 		focus.id = "focus";
	// 		focus.addClass("focus");
	// 		document.body.insertBefore(focus,common.$("newsList"));
	// 	}
	// 	common.$("focus").innerHTML = '<ul class="picList" id="picList">'+arr.join("")+'</ul>';
	// 	var text = document.createElement("div");
	// 	text.innerHTML = '<span id="shorttitle">'+this.fData[0].shorttitle+'</span>' +
	// 					'<div class="num" id="base">'+base.join("")+'</div>';
	// 	text.id = "tx";
	// 	text.addClass("text");
	// 	common.$("focus").appendChild(text);
		
	// 	this.picList       = common.$("picList");
	// 	this.touchmoveFn();
	// 	this.lazyLoad();
	// },
	// getListData:function(json) {
	// 	this.loadMark(false);
	// 	var total = json.total;
	// 	if(json.total<=channel.listLoadNum*(channel.listLoadIndex-1)) {
	// 		document.body.removeChild(common.$("more"));
	// 	}
	// 	var data  = json.data;
			
	// 	if(!data.length) {
	// 		common.$("newsList").innerHTML = "<li style=\"text-align:center;\">暂无数据</li>";
	// 		return;
	// 	}
	// 	var obj = common.$("newsList").getElementsByTagName("ul").eq(0);
	// 	if(!this.more) obj.innerHTML = "";
	// 	for(var i=0,l=data.length;i<l;i++) {
	// 		var url     = data[i].tableType=="hqNews"?"/article/index.html?id=":"/photos/index.html?id=",
	// 			arr     = [],
	// 			pic     = data[i].thumb?'<div class="pic" style="'+(this.channelV=="index"?"float:left;":"float:right;")+'"><img class="HQlazy" original="'+data[i].thumb.replace(/([\w\-]+){1}(\.){1}(jpg|png|gif){1}/g,'thumb_130_85_$1.$3')+'" src="http://himg2.huanqiu.com/www/mt/mobiletouch/test/images/original.jpg" width="80" height="52" /></div>':'',
	// 			desc    = this.channelV=="index"?'<div class="desc" style="margin-left:92px">':(pic?'<div class="desc" style="margin-right:92px">':'<div class="desc">'); 
				
	// 		arr.push('<a href="'+url+data[i].id+'">');
	// 		arr.push('<div class="box">');
	// 		arr.push(pic+desc);
	// 		arr.push('<div class="title">'+data[i].shorttitle+'</div>');
	// 		arr.push('<div class="txt">'+data[i].description+'</div>');
	// 		arr.push('</div>');
	// 		arr.push('</div>');
	// 		arr.push('</a>');
	// 		var li  = document.createElement("li");
	// 		li.innerHTML = arr.join("");
	// 		obj.appendChild(li);
	// 	}
	// 	common.addHandler(common.$("more"),"click",this.moreFn);
	// 	common.$("more").innerHTML = "点击加载更多";
		
	// 	this.contentImages.loadimg();
	// },
	// error:function() {
	// 	//window.location.href = "http://mt.huanqiu.com/m_404.html";
	// }
};




