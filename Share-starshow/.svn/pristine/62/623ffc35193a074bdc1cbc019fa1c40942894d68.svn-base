
function getd(murl){ 
    $.getJSON(murl,function(data){
        $("#img").attr("src",data.news.thumb_url);
        $(".artlx").html(data.news.catname.catname);
        $(".artlx").css("color",data.news.catname.style);
        $(".artTitle,#wztitle").html(data.news.title);
        $(".artAuthor img").attr("src",data.news.author.avatar);
        $(".authorName").html(data.news.author.username);
        $(".authorType").html(data.news.author.job);
        var _this=$(".arcArea");
         $.each(data.news.content,function(i, item) { 
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
                            title: data.news.title,
                            desc: data.news.desc,
                            link: location.href,
                            imgUrl: data.news.thumb_url,
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
                            title: data.news.title,
                            link: location.href,
                            imgUrl: data.news.thumb_url,
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

    })
}
 var did=location.search.replace(/\?id=(\d+).*/,'$1');
var arturl = "http://test-trendsapi.bazaarstar.cn/news/detail?appkey=bsf0951685a0df39&secret=3af6b6c2d7fc1591c58dc240d325e464&nid="+did+"&returntype=jsonp&jsonpcallback=?" 
if($(".artCon").length>0){       
    getd(arturl); 
} 
function animateFun(target, gtime) {
    return function() {
        $(target).show().animate({
            left: '-=' + ($(target).width() + artWidth + 100) + 'px'
        },
        gtime, animateFun).queue(function(next) {
            $(target).css("left", (artWidth + 20) + "px");
            next();
        });
    }
}
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
    if (($(document).height() - 20) <= totalheight && islistpage == true) {        
        setTimeout(function(){ajaxReadlist(turl)},1000);
        loadflag = false;        
    } 
    
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
                    //console.log(_this.attr("src"));
                    _this.fadeTo(1000, 1.00);
                }
            } 
        } 
    )
}
/*页尾下载*/

$(".shareDownbtn").click(function() {
    if (ua.indexOf("micromessenger") > -1) {
        window.location.href = "";//http://a.app.qq.com/o/simple.jsp?pkgname=com.happyjuzi.apps.juzi
    }else{
        if (ua.indexOf("iphone") > -1) {
          $(this).attr("href", "");//https://itunes.apple.com/us/app/ju-zi-yu-le/id931179407?ls=1&mt=8
        }else if(ua.indexOf("android") > -1){
          $(this).attr("href", "");//http://files01.happyjuzi.com/juzi/apk/v1.0/juzi-juzi-release.apk
        }        
    }
})


//百度统计
