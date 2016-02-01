 $(function(){




          function getTz(dtUrl){ 
            $.getJSON(dtUrl,function(data){
                 if (data.goods.pictures!=undefined)
                 {
                     for (var i = 0; i < data.goods.pictures.length; i++) {
                      var pic=""
                          pic+=''
                          +'<li class="focusPicLi"><div class="focusLiListPic"><a href="#"><img width="100%" src="'+data.goods.pictures[i].url+'"></a></div></li>'
                      var nav=''
                           nav+=''
                          +'<li><a href="#"></a></li>'

                      $(".focusPicList").append(pic);
                      if(data.goods.pictures.length>1)
                      {
                            $("#pagenavi1").append(nav);
                            $("#pagenavi1 a").eq(0).addClass("active");
                      }
                     
                     }
                 }else
                 {
                      $(".focusPicList").append('<li class="focusPicLi"><div class="focusLiListPic"><a href="#"><img width="100%" src="'+data.goods.default_pic+'"></a></div></li>');
                     
                 }
                 
                 $("#cximg").attr("src",data.goods.brand.thumb_url);
                 $("#cxauthor").html(data.goods.title);
                 $("#itemAction").html(data.goods.brand.price);
                 $("#pinp").html(data.goods.brand.brand);
                 $(".gobuy").attr("data",data.goods.brand.gobuy);
                  $(".thinkbuy em").html(data.goods.brand.buy);

                 var _this=$(".content");
                 $.each(data.goods.content,function(i, item) { 
                    if(item.tag=="P")
                    {
                        _this.append(item.value);
                    }else if(item.tag=="IMG")
                    {
                         _this.append("<img src=\"../public/images/mtu.png\" picurl=\""+item.value+"\"/>");
                    }else if(item.tag=="H1")
                    {
                         _this.append("<p style='font-size: 20px;font-weight: bolder;padding-bottom: 5px;'>|"+item.value+"</p>");
                    }else if(item.tag=="H3")
                    {
                         _this.append("<p style='font-size:12px;font-weight: bolder;padding-bottom: 5px;'>"+item.value+"</p>");
                    }
                    else if(item.tag=="JZVIDEO")
                    {
                         _this.append(item.value);
                    }
                 }); 

                  $.getJSON('http://test-trendsapi.bazaarstar.cn/wxshare/sign?url='+encodeURIComponent(location.href)+'&returntype=jsonp&jsonpcallback=?',function(d){
                    if(d.status){
                        wx.config({
                        appId: d.appId,
                        timestamp: d.timestamp,
                        nonceStr: d.nonceStr,
                        signature: d.signature,
                        jsApiList: [
                          'onMenuShareTimeline',
                          'onMenuShareAppMessage',
                          'onMenuShareQQ',
                          'onMenuShareWeibo',
                        ]
                        });
                        wx.ready(function () {
                        // 在这里调用 API
                          wx.onMenuShareAppMessage({
                            title: data.goods.title,
                            desc: data.goods.desc,
                            link: location.href,
                            imgUrl: data.goods.share_pic,
                            trigger: function (res) {
                            },
                            success: function (res) {
                            // alert('已分享');
                            },
                            cancel: function (res) {
                            // alert('已取消');
                            },
                            fail: function (res) {
                            // alert(JSON.stringify(res));
                            }
                          });
                          wx.onMenuShareTimeline({
                            title: data.goods.title,
                            link: location.href,
                            imgUrl: data.goods.share_pic,
                            trigger: function (res) {
                            },
                            success: function (res) {
                            // alert('已分享');
                            },
                            cancel: function (res) {
                            // alert('已取消');
                            },
                            fail: function (res) {
                            // alert(JSON.stringify(res));
                            }
                          });
                        });
                    } else {
                      // alert(d.status);
                    }
                  })


               
                
            });
                
          }
        // getTz(dtUrl);

function startScroll(){
    var l = 0,
        slength = $(".cItem").length;
    setInterval(function() {
        if (l < slength) {
            var pitem = $(".cItem").eq(l),
                gtime = getRandomNum(7, 11) * 1000;
            animateFun(pitem, gtime)(); 
            setInterval(animateFun(pitem, gtime), gtime);
            l++;
        }
    },1500)    
}

         var _winScrollTop = 0;
$(window).on('scroll',function(){
    _winScrollTop = $(window).scrollTop();
    totalheight = parseFloat($(window).height()) + parseFloat(_winScrollTop);
    
    if ( $("body").scrollTop() > $(window).height()/2) {        
        startScroll()       
    }
    
    lazyImgFun();
});

window.onload = function(){
  lazyImgFun();  
}
function lazyImgFun() {
    $(".lazyImg img").each(
        function(){
            var _this = $(this);
            var scrollTop = $(window).scrollTop();
            var _winHeight = $(window).height();
            if(_this.offset().top < _winHeight){
                _this.attr("src", _this.attr("picurl"));
            }           
            if (_this.attr("src") == _this.attr("picurl")) {            
                return true
            }else if(_this.offset().top - 20 <= _winHeight + _winScrollTop){
                if (_this.attr("picurl") != undefined || _this.attr("picurl") != "undefined") {                    
                    _this.attr("src", _this.attr("picurl"));
                    _this.fadeTo(1000, 1.00);
                }
            } 
        } 
    )
}

          function piclb()//滑动轮播
          {
              for(n=1;n<2;n++){
                var page='pagenavi'+n;
                var mslide='slider'+n;
                var mtitle='emtitle'+n;
                // arrdiv = 'arrdiv' + n;
                var as=document.getElementById(page).getElementsByTagName('a');
                var tt=new TouchSlider({id:mslide,'auto':'-1',fx:'ease-out',direction:'left',speed:500,timeout:5000,'before':function(index){
                    var as=document.getElementById(this.page).getElementsByTagName('a');
                    as[this.p].className='';
                    as[index].className='active';
                    this.p=index;
                    var txt=as[index].innerText;
                    $("#"+this.page).parent().find('.emtitle').text(txt);
                    var txturl=as[index].getAttribute('href');      
                    var turl=txturl.split('#');
                    $("#"+this.page).parent().find('.go_btn').attr('href',turl[1]);
                }});
                tt.page = page;
                tt.p = 0;
                //console.dir(tt); console.dir(tt.__proto__);
                for(var i=0;i<as.length;i++){
                    (function(){
                        var j=i;
                        as[j].tt = tt;
                        as[j].onclick=function(){
                            this.tt.slide(j);
                            return false;
                        }
                    })();
                }
            }
          }
           piclb();
          $(".gobuy").click(function(){

              var hr=$(this).attr("data");
              window.location=hr;
          });
 });
 