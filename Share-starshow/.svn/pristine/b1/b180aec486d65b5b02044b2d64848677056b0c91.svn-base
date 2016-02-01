

var photos = {
	init:function() {
		this.urlAtt = common.getUrlAtt(); //获取地址属性
		// if(!this.urlAtt.id) {
		// 	this.error();
		// 	return;
		// }
		
		
		var _this = this;
		this.clientSize = null;
		this.scrollSwitch = true;
		this.version     = navigator.appVersion.search(/Linux/ig) != -1?"android":"ios"; //判断系统
		if(this.version == "ios") this.ios = navigator.appVersion.search(/os 6_/ig) != -1?6:7; //判断ios 版本
		common.addHandler(window,"load",function() {
			_this.clientSize = setTimeout(function() {
				photos.getClient();
			},1000);
		});
		
		common.addHandler(window,"touchmove",function() {
			_this.scrollSwitch = false;
		});
		
		var ot = null;
		common.addHandler(window,"orientationchange",function() {
			_this.scrollSwitch = true;
			if(ot) clearTimeout(ot);
			ot = setTimeout(function() {
				photos.getClient();
			},250);
		});
		common.addHandler(window,"resize",function() {
			clearTimeout(_this.clientSize);
			_this.clientSize = setTimeout(function() {
				photos.getClient();
			},1000);
		});
		
		this.content     = common.$("content");  //内容容器
		this.header      = common.$("header");
		this.imagesInfo  = common.$("imagesInfo");
		this.screenLock  = false;
		this.loadTimeout = false;
		// this.headerTitle = this.header.getElementsByClassName("title").eq(0);
		// this.totle       = this.imagesInfo.getElementsByClassName("totle").eq(0),
		// this.desBox      = this.imagesInfo.getElementsByClassName("des").eq(0);
		this.titleSize   = 16; //标题长度控制 像素
		
		this.clear       = true; //标题 描述显示状态
		//this.url         = 'http://db0.huanqiu.com/hqcms/getId?param={"id":"'+this.urlAtt.id+'","type":"hqPicnews","app":"hqNewsTouch","sign":"hqdb03rdApp","return":"jsonp","func":"photos.showImgData"}';
		//this.url         = 'http://db0.huanqiu.com/hqcms/getId?param={"id":"2734281","type":"hqPicnews","app":"hqNewsTouch","sign":"hqdb03rdApp","return":"jsonp","func":"photos.showImgData"}';
		this.url         = photosUrl;
		common.getElementsByClassName('back').eq(0).onclick=function() {
			window.history.back();
		};
		common.getElementsByClassName('comment').eq(0).onclick=function() {
			window.location = "/vision/sjzx.html";
		};
		
		_this.getClient(); //初始化HTML
	},
	getClient:function(e) {
		var getClient     = common.getClient();
		photos.clientW    = getClient.clientW;
		photos.clientH    = getClient.clientH;
		photos.proportion = photos.clientW/photos.clientH;
		if(photos.ios==6&&!/(qq|uc|crios)+/ig.test(navigator.userAgent)) photos.clientH = photos.clientH + 60;
		if(!common.$('picBox')) {
			photos.picBox = document.createElement('section');
			photos.picBox.style.cssText = "width:"+photos.clientW+"px;height:"+this.clientH+"px;background: url('../public/images/picbg.jpg') 0 0 no-repeat;overflow:hidden;";
			photos.picBox.id = "picBox";
			photos.picBox.className = "picBox";
			
			photos.content.insertBefore(photos.picBox,this.imagesInfo);
		}else {
			photos.picBox.style.width  = photos.clientW + "px";
			photos.picBox.style.height = photos.clientH + "px";
			if(photos.pictureurls&&photos.pictureurls.length) {
				var list = photos.picList.getElementsByTagName("li");
				list.each(function(i) {
					this.style.width      = photos.clientW + "px";
					this.style.lineHeight = photos.clientH + "px";
					var pic = common.getElementsByClassName("HQlazy",this);
					for(var i=0,l=pic.length;i<l;i++) {
						if(pic.eq(i)) photos.getPicSize(pic.eq(i));
					}
				});
			}
			
		}
		photos.poolT = photos.clientH/2-77+"px";
		//if(common.$("pool")) common.$("pool").style.top = photos.poolT;
		if(common.$("picMenu")) common.$("picMenu").style.height = photos.clientH+"px";
		if(photos.picsMore) photos.more();
		if(common.$("db")) photos.db(true);
		if(common.$("mark")) {
			common.$("mark").style.height = photos.clientH+"px";
			common.$("mark").style.width  = photos.clientW+"px";
		}
		var infoT = photos.clientH-80;
		photos.imagesInfo.style.top = infoT+"px";
		if(photos.scrollSwitch) setTimeout(function() {window.scrollTo(0,1);},100);
		if(!common.$("data")) this.getJson();
		else photos.slideEnd(true);
	},
	getJson:function() {
		var copy_this = this;
		var obj = document.createElement('script');
		obj.src = this.url;
		obj.id  = "data";
		this.content.appendChild(obj);
	},
	showImgData:function(data) {
		var _this = this;
		this.json = data;
		if(data.info.attach[0]) {
			this.pictureurls = data.info;
		}else {
			alert("暂无数据！");
			return;
		}
		// var titleW          = this.headerTitle.clientWidth;
		// this.titleMaxLength = Math.abs(parseInt(titleW/this.titleSize));
		// if(data.shorttitle.length>this.titleMaxLength) {
		// 	this.headerTitle.style.cssText = "font-size:14px;text-align:left;";
		// }
		// this.headerTitle.innerHTML = data.shorttitle;
		// document.title             = data.shorttitle;
		this.picBox.innerHTML = '<ul class="picList" id="picList"></ul><div id="pool"></div>';
		// if(/firefox/ig.test(navigator.userAgent)) {
		// 	this.firefox = true;
		// 	common.$("pool").style.display = "none";
		// }
		//common.$("pool").style.top = this.poolT;
		var imgs  = [];
		this.thumb = [];
		for(var i=0,l=this.pictureurls.attach.length;i<l;i++) {
			var p = this.pictureurls.attach[i];
			imgs.push('<li class="picsContent" style="width:'+this.clientW+'px;line-height:'+this.clientH+'px;text-align:center;"><img class="HQlazy"  src="http://himg2.huanqiu.com/www/mt/mobiletouch/images/loading.gif" original="'+p.url+'" align="absmiddle" /></li>');
			this.thumb.push('<li class="show textContent"><img class="HQlazy" height="85" width="130" src="'+p.thumb+'" original="'+p.thumb+'" /></li>');
		}
		var picsMoveW = Math.min(photos.clientW,photos.clientH);//屏幕的宽度
		var picsMoveH = Math.max(photos.clientW,photos.clientH);//屏幕的高度
		imgs.push('<li class="picsContent" style="width:'+this.clientW+'px;line-height:'+this.clientH+'px;text-align:center;"><div style="margin:50px auto 0 auto;width:'+picsMoveW+'px;overflow:hidden;" id="picsMore"></div></li>');
		this.picList = common.$("picList");
		this.picList.innerHTML = imgs.join("");
		
		
		this.r = this.json.relation&&this.json.relation.length?true:false;
		if(this.r) {
			var picMove = [];
			for(var i=0,l=this.json.relation.length;i<l;i++) {
				if(i>3) break;
				picMove.push('<div style="width:50%;height:125px;float:left;color:#fff;background:url(http://himg2.huanqiu.com/www/mt/mobiletouch/test/images/vibity.png) no-repeat center 20px;"><a href="/photos/index.html?id='+this.json.relation[i].newsId+'"><img class="HQlazy" picMove="true" src="http://himg2.huanqiu.com/www/mt/mobiletouch/images/vibityP.png" style="width:130px;height:85px;" original="'+this.json.relation[i].thumb.replace(/([\w\-]+){1}(\.){1}(jpg|png|gif){1}/g,'thumb_130_85_$1.$3')+'" /><span class="picSpan">'+this.json.relation[i].shorttitle+'</span></a></div>');
			}
			this.picsMore           = common.$("picsMore");
			var text                = common.$("ad")?picMove.join("")+"<div id=\"baiduAD\" style=\"width:100%;float:left;margin-top:20px;\"></div>":picMove.join("");
			this.picsMore.innerHTML = text;
			common.$("baiduAD").innerHTML = common.$("ad").innerHTML;
			this.more();
		}
		
		this.picLength = this.json.relation?this.pictureurls.attach.length+1:this.pictureurls.attach.length;
		// common.addHandler(this.picList,"click",function(event) {
		// 	if(common.$("db")) return;
		// 	var event  = arguments[0] || window.event,
		// 		node   = event.target || event.srcElement;
		// 	if(node.nodeName.toLowerCase()=="a"||node.parentNode.nodeName.toLowerCase()=="a") return;
			
			
		// 	_this.clearScreen(true);
			
		// });
		//this.thumbFn();
		this.picRoot = 0;
		this.lazyLoad();
		this.writeText();
		this.touchmoveFn();
		
		//common.addHandler(common.$("shareBox"),'click',this.db);
		
	},
	thumbFn:function() {
		common.addHandler(window,"orientationchange",function() {
			if(common.$("picMenu")) _close(common.$("pool"));
		});
		
		var first                      = true,
			pool                       = false,
			thumbBox                   = null;
		common.addHandler(common.$("pool"),"click",function() {
			!pool?_open(this):_close(this);
		});
		function _open(obj) {
			window.scrollTo(0,1);
			thumbBox                   = document.createElement("div");
			thumbBox.id                    = "picMenu";
			thumbBox.style.height          = photos.clientH+"px";
			thumbBox.innerHTML             = "<ul id=\"thumbBox\">"+photos.thumb.join("")+"</ul>";
			photos.content.appendChild(thumbBox);
			var thumbUlBox = common.$("thumbBox");
			var li = thumbUlBox.getElementsByTagName("li");
			li.each(function(i) {
				common.addHandler(this,"click",function() {
					photos.picRoot = i;
					li.each(function() {
						this.getElementsByTagName("img").eq(0).style.opacity = "1";
					});
					this.getElementsByTagName("img").eq(0).style.opacity = "0.3";
					photos.slideEnd(true);
					setTimeout(function() {
						_close(common.$("pool"));
					},300);
				});
				if(photos.picRoot==i) this.getElementsByTagName("img").eq(0).style.opacity = "0.3";
			});
			
			if(thumbUlBox.clientHeight>photos.clientH) {
				
				var scrollT = photos.picRoot*102;
				if(scrollT>thumbUlBox.clientHeight-photos.clientH) {
					scrollT = thumbUlBox.clientHeight-photos.clientH;
				}
				var seaScroll = new iScroll('thumbBox',{position:{x:0,y:-scrollT}});
			}
			
			obj.style.webkitTransform = "translate3d(-156px,0,0)";
			obj.style.backgroundPosition = "left top";
			thumbBox.style.webkitTransform = "translate3d(0,0,0)";
			common.addHandler(document.documentElement,'touchmove',common.scrollFn);
			var mark = document.createElement("div");
			mark.id  = "mark";
			mark.style.cssText = "background:#000;opacity:0.5;position:absolute;z-index:90;top:0;left:0";
			photos.content.appendChild(mark);
			mark.onclick = function() {
				_close(common.$("pool"));
			};
			mark.style.height = photos.clientH+"px";
			mark.style.width  = photos.clientW+"px";
			if(photos.clear) photos.clearScreen();
			pool = true;
			
			
		}
		function _close(obj) {
				common.$("thumbBox").style.cssText = "";
				obj.style.webkitTransform = "translate3d(0,0,0)";
				obj.style.backgroundPosition = "right top";
				thumbBox.style.webkitTransform = "translate3d(156px,0,0)";
				common.removeHandler(document.documentElement,'touchmove',common.scrollFn);
				if(common.$("mark"))  photos.content.removeChild(common.$("mark"));
				setTimeout(function() {
					if(thumbBox) photos.content.removeChild(thumbBox);
					if(!photos.clear) photos.clearScreen();
				},210);
				pool = false;	
		}
	},
	more:function() {
		var h  = this.json.relation.length>2?120:80,
			ch = this.clientH;
		this.picsMore.style.marginTop = ch/2-h+"px";
	},
	lazyLoad:function() {
		var num     = (photos.picRoot+1<=photos.picLength)?photos.picRoot+1:photos.picRoot,
			loadNum = 3,
			list = photos.picList.getElementsByTagName("li");
			
		while(loadNum) {
		
			loadNum--;
			
			var base = num-loadNum+1;
			if(base>=0&&base<list.length) {
				var p = list[base].getElementsByTagName("img");
				p.each(function(loop) {
					
					if(!this.getAttribute("loaded")) {
						//this.style.visibility = "hidden";
						this.setAttribute("loaded",true);
						
						
						photos.getPicSize(this);
					}
				});
			}
		}
		
		
		
		
		
	},
	getPicSize:function(pic) {
		
		if(!pic.getAttribute("loaded")) return;
		if(!pic.getAttribute("load")) {
			var obj = new Image();
			var ori  = pic.getAttribute("original");
			obj.src = ori;
			pic.src = ori;
		}else {
			var loadOk = true;
		}
		if(loadOk||obj.complete) {
			_loadOk();
		}else {
			obj.onload = function(){ 
				_loadOk();
			}
		}
		function _loadOk() {
			if(!loadOk) {
				pic.src = ori;
				pic.setAttribute("load","true");
				pic.setAttribute("w",pic.clientWidth);
				pic.setAttribute("h",pic.clientHeight);
			}
			if(pic.getAttribute("picMove")) return;
			if(parseInt(pic.getAttribute("h"))<photos.clientH&&parseInt(pic.getAttribute("w"))<photos.clientW) {
				pic.style.height = "auto";
				pic.style.width  = "auto";
			}else if(pic.clientWidth/pic.clientHeight>=photos.proportion) {
				pic.style.height = "auto";
				pic.style.width  = "100%";
			}else {
				pic.style.height = photos.clientH + "px";
				pic.style.width  = "auto";
			}
			if(common.$('loadingMark')) {
				document.body.removeChild(common.$('loadingMark'));
				common.removeHandler(document.documentElement,'touchmove',common.scrollFn);
			}
		}
	},
	clearScreen:function(o) {
		if(this.screenLock) return;
		if(this.clear) {
			this.header.style.webkitTransform = "translate3d(0,-40px,0)";
			this.imagesInfo.style.top = (photos.clientH-40)+"px";
			if(o) {
				this.picBox.style.position = "relative";
				common.$("pool").style.webkitTransform = "translate3d(25px,0,0)";
			}
			this.clear = false;
		}else if(!this.clear){
			this.header.style.webkitTransform = "translate3d(0,0,0)";
			this.imagesInfo.style.top = (photos.clientH-80)+"px";
			if(o) {
				this.picBox.style.position = "static";
				common.$("pool").style.webkitTransform = "translate3d(0,0,0)";
			}
			this.clear = true;
		}
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
	slideEnd:function(o) {
		
		var poor = parseInt(photos.moveX-photos.startX);
		if(!o&&Math.abs(poor)>50) {
			if(poor>0&&photos.picRoot) {
				photos.picRoot--;
			}else if(photos.picRoot!=photos.picLength-1&&poor<0) {
				photos.picRoot++;
			}
			window.scrollTo(0,1);
		}
		
		var o = o?o:false;
		photos.sliderEnd(o);
		
	},
	sliderEnd:function(o) {
		if(photos.loadTimeout) clearTimeout(photos.loadTimeout);
		photos.loadTimeout = setTimeout(photos.lazyLoad,400);
		
		var css = o?"":"-webkit-transition: -webkit-transform .2s ease-out;-ms-transition: -ms-transform .2s ease-out;transition: transform .2s ease-out;";
		photos.picList.style.cssText = "-webkit-transform:translate3d("+-photos.picRoot*(photos.clientW+10)+"px,0,0);" + css;
		if(photos.r) {
			if((photos.picLength-1)!=photos.picRoot) {
				photos.imagesInfo.style.display = "";
				if(!photos.firefox) common.$("pool").style.display = "";
				photos.headerTitle.innerHTML    = photos.json.shorttitle;
				photos.writeText();
				if(!photos.clear) photos.header.style.webkitTransform = "translate3d(0,-40px,0)";
				photos.screenLock = false;
			}else {
				photos.imagesInfo.style.display = "none";
				common.$("pool").style.display = "none";
				photos.headerTitle.innerHTML    = "相关图集";
				if(!photos.clear) photos.header.style.webkitTransform = "translate3d(0,0,0)";
				photos.screenLock = true;
			}
		}else {
			photos.writeText();
		}
	},
	bind:function(e) {
		photos.slide(e);
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
		
		if((!this.picRoot&&this.moveX>this.startX)||(this.picRoot==photos.picLength-1&&this.moveX<this.startX)) {
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
	writeText:function() {
		//var artContent = !this.pictureurls[this.picRoot].alt?this.json.content:this.pictureurls[this.picRoot].alt;
		//artContent     = artContent.replace(/\[page\]/g, "").replace(/(<[^<>]+>)*=*分页符=*(<[^<>]+>)*/g, "");
		//artContent     = artContent.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<p.+>(.+nbsp;)+<\/p>/g, "").replace(/(<p>|<\/p>)*/g,"");
		//this.totle.innerHTML = (this.picRoot+1)+' / '+this.pictureurls.length+'P';
		//this.desBox.innerHTML   = artContent;
		
	},
	db:function(o) {
		var e = typeof o;
		if(e=="object") {
			var o    = arguments[0] || window.event,
				node = o.target || o.srcElement;
			if(node.getAttribute("data-cmd")) return;
		}
		if(e=="object"&&common.$("db")) {
			photos.content.removeChild(common.$('db'));
			photos.content.removeChild(common.$('dbList'));
			common.addHandler(common.$("shareBox"),'click',photos.db);
			common.removeHandler(photos.content,"click",photos.db);
			common.removeHandler(photos.content,"touchmove",photos.db);
		}else {
			if(!common.$("db")) {
				common.removeHandler(common.$("shareBox"),'click',photos.db);
				var db           = document.createElement("div"),
					dbList       = document.createElement("div");
				db.id            = "db";
				dbList.id        = "dbList";
				dbList.innerHTML = '<ul><li data-cmd="qzone" class="qzone"></li><li data-cmd="tqq" class="tqq"></li><li data-cmd="tsina" class="tsina"></li><li data-cmd="renren" class="renren"></li><li data-cmd="douban" class="douban"></li></ul>';
				photos.content.appendChild(db);
				photos.content.appendChild(dbList);
				common.dbshare();
				setTimeout(function() {
					common.addHandler(photos.content,"click",photos.db);
					common.addHandler(photos.content,"touchmove",photos.db);
				},100);
			}
			var db     = common.$("db"),
				dbList = common.$("dbList"),
				css    = "top:"+(photos.clientH/2-db.clientHeight/2)+"px;left:"+(photos.clientW/2-db.clientWidth/2)+"px;";
			
			db.style.cssText = css;
			dbList.style.cssText = css;
		}
		
	},
	error:function() {
		alert(1);
		//window.location.href = "http://mt.huanqiu.com/m_404.html";
	}
};

photos.init();


