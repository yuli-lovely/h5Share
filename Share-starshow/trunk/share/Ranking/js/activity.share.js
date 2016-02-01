/*0724众筹活动微信分享*/
function getString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}   //取url里面参数
var mobile = getString('mobile');
var projectId = getString('projectId');

$(function(){
    var telnum = $('#mobile');
    var projectId = $('#projectId');
    var joinNow = $('#joinNow');
    telnum.on('input',function(){
        var num = telnum.val();
        if(num.length == 11){
            joinNow.addClass('bjff');
        }
    });
    joinNow.tap(function(){
        if(joinNow.hasClass('bjff')){
            $('.alert1').hide();
            $('.alert2').show();
            $('.plane1').show();

            var idArray = {
                    17081 : '我想要ZINI智能内衣，我想摸摸大！刷脸求支持！',
                    18577 : '我想要心麦智能戒指，别人炫钻戒我能炫格调！刷脸求支持！',
                    19189 : '我想要Xbox游戏机，从此笑傲朋友圈！刷脸求支持！',
                    16978 : '我想要GOGO智能耳机，我想跑步不被耳机线束缚！刷脸求支持！'
                };
            
            $.ajax({
                type:'POST',
                url:'http://ms.jr.jd.com/jrmserver/zc/activity/getActivityShareLinkByMobile',
                data:{
                    mobile:telnum.val(),
                    projectId:projectId.val()
                },
                success:function(data){
                    if(data.resultCode == 0){
                        var linkUrl = data.resultData;
                        var dataForWeixin = {
                            "appId": "",
                            "imgUrl": "http://ms.jr.jd.com/share/static/images/activity/"+projectId.val()+"share.jpg",//分享图片
                            "link": linkUrl,    //分享链接
                            "desc": "Xbox One、GOGO耳机等每天40个京东众筹数码IN品白拿",//分享内容
                        	"title": (function(){
                                return idArray[projectId.val()];
                            })()
                        };
                        WeixinApi.ready(function (Api) {
                            var wxCallbacks = {
                                ready: function () {},
                                cancel: function (resp) {},
                                fail: function (resp) {},
                                confirm: function (resp) {  //分享成功
                                    $('.alert1').hide();
                                    $('.alert2').hide();
                                    $('.alertFinish').show();
                                    $('.plane1').hide();
                                },
                                all: function (resp) {}
                            };
                            Api.shareToFriend(dataForWeixin, wxCallbacks);
                            Api.shareToWeibo(dataForWeixin, wxCallbacks);
                            Api.shareToTimeline(dataForWeixin, wxCallbacks);
                        });
                    }else{
                    	$('.errorOut').show();
                    }
                },
                error:function(){
                	$('.errorOut').show();
                }
            });
        }
    });//马上参加按钮
});



