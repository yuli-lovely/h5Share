/**
 * Created by cx on 2015/7/30.
 */
var viewHeight = document.documentElement.clientHeight;
$('.container').css('height',viewHeight + 'px');

/**
 * 跳转至视频
 */
var ringbacktone;
$('.landing').click(function() {
    createjs.Sound.stop();
    ringbacktone = document.createElement('video');
    ringbacktone.setAttribute('src','./js/sm.mp4');
    ringbacktone.setAttribute('id','video');
    ringbacktone.setAttribute('width','100%');
    ringbacktone.setAttribute('height','1080');
    ringbacktone.setAttribute('autoplay','autoplay');
    ringbacktone.setAttribute('webkit-playsinline','true');
    ringbacktone.setAttribute('x-webkit-airplay','true');
    /*ringbacktone.muted = true;*/
    var videoDIV = document.getElementsByClassName('video');
    videoDIV[0].appendChild(ringbacktone);
    $('span#audio1').stop().fadeOut(200);
    ringbacktone.addEventListener('ended', endPlay);
    $('.page2').stop().fadeIn(200, function () {
        $('.page1').hide();
    });
    ringbacktone.play();
})

/**
 * 挂断
 */
$('.hangup,.hangupV').click(function(){
    // window.location.href = 'http://bznew.createapp.cn/api/h6/2015showlla0731/index.html?v=ssfghdddddj';
     window.location.href = 'http://share.xingxiu.tv/yqh2/h5';
})

/**
 * 静音
 */
$('.audioV').click(function(){
    $(this).find('span').stop().toggleClass('audio1');
    /*if(ringbacktone.muted){
        ringbacktone.muted = false;
        $('span#audio0').stop().fadeIn(200,function(){
            $('span#audio1').stop().fadeOut(200);
        });
    }else{
        ringbacktone.muted = true;
        $('span#audio1').stop().fadeIn(200,function(){
            $('span#audio0').stop().fadeOut(200);
        });
    }*/
})

/**
 * 上传
 */
$('.uploadV').click(function(){
    $('#_file').click();
});

/**
 * 监听视频播放结束
 * @type {HTMLElement}
 */
function endPlay()
{
   // alert("视频介绍");
   window.location.href = 'http://share.xingxiu.tv/yqh2/h5';
}




//---wx sign-start----
$(document).ready(function(){

   // if(!$.url().param("wxid"))
     //{
        //location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaa2bd7672f8a94bf&redirect_uri=http://bznew.createapp.cn/api/best/wx2.ashx&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
   //  }else{
        /**
         * 加载来电铃音
         */
        createjs.Sound.addEventListener("fileload", handleLoadComplete);
        createjs.Sound.registerSound({src:"./dodo.mp3", id:"sound"});
        function handleLoadComplete(event) {
            createjs.Sound.play("sound",{loop:-1});
        }
   // }

    if($.url().param("headimg"))
    {
        $("#headimg").attr("src", $.url().param("headimg"));
    }


    $.getJSON('http://api.xingxiu.tv/index.php?app=mobile&mod=WeChat&act=sign&url='+encodeURIComponent(location.href)+'&returntype=jsonp&callback=?',function(d){
                   //console.log(d.info.appId+"+"+d.info.timestamp+"+"+d.info.nonceStr+"+"+d.info.signature);
                    if(d.info.status){
                        wx.config({
                        debug: false,
                        appId: "wxff356e127c0ecb9e",
                        timestamp: d.info.timestamp,
                        nonceStr: "xingxiu2015",
                        signature: d.info.signature,
                        jsApiList: [    
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'hideMenuItems',
                            'showMenuItems',
                            'hideAllNonBaseMenuItem',
                            'showAllNonBaseMenuItem',
                            'translateVoice',
                            'startRecord',
                            'stopRecord',
                            'onRecordEnd',
                            'playVoice',
                            'pauseVoice',
                            'stopVoice',
                            'uploadVoice',
                            'downloadVoice',
                            'chooseImage',
                            'previewImage',
                            'uploadImage',
                            'downloadImage',
                            'getNetworkType',
                            'openLocation',
                            'getLocation',
                            'hideOptionMenu',
                            'showOptionMenu',
                            'closeWindow',
                            'scanQRCode',
                            'chooseWXPay',
                            'openProductSpecificView',
                            'addCard',
                            'chooseCard',
                            'openCard'
                        ]
                        });
  
                       wx.ready(function(){                        
                        // 在这里调用 API
                          wx.onMenuShareAppMessage({
                            title: "来自苏芒的时尚星秀年度星秀人物盛典邀请",
                            desc: "时尚星秀年度星秀人物邀请函",
                            link: "http://star.xingxiu.tv/oauth2",
                             imgUrl: "http://share.xingxiu.tv/yqh/ship/images/icon.jpg",
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
                            title: "来自苏芒的时尚星秀年度星秀人物盛典邀请",
                            link: "http://star.xingxiu.tv/oauth2",
                             imgUrl: "http://share.xingxiu.tv/yqh/ship/images/icon.jpg",
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

    //$.getJSON('http://api.xingxiu.tv/index.php?app=mobile&mod=WeChat&act=sign&url='+encodeURIComponent(location.href)+'&returntype=jsonp&callback=?',function(ret){
        
        // /eval("ret="+resu);
        //$("#tbcounter").html(ret.message);
       // if (ret.error == 0) {
            //start

            // if ($.url().param("from") == "groupmessage") {
            //      alert(22);
            //     wx.config({
            //         debug: false,
            //         appId: 'wxd115cbc215788fe6',
            //         timestamp: ret.timestamp,
            //         nonceStr: 'weixin',
            //         signature: ret.sign1,
            //         jsApiList: [
            //             // 所有要调用的 API 都要加到这个列表中
            //             'checkJsApi',
            //             'onMenuShareTimeline',
            //             'onMenuShareAppMessage',
            //             'onMenuShareQQ',
            //             'onMenuShareWeibo',
            //             'hideMenuItems',
            //             'showMenuItems',
            //             'hideAllNonBaseMenuItem',
            //             'showAllNonBaseMenuItem',
            //             'translateVoice',
            //             'startRecord',
            //             'stopRecord',
            //             'onRecordEnd',
            //             'playVoice',
            //             'pauseVoice',
            //             'stopVoice',
            //             'uploadVoice',
            //             'downloadVoice',
            //             'chooseImage',
            //             'previewImage',
            //             'uploadImage',
            //             'downloadImage',
            //             'getNetworkType',
            //             'openLocation',
            //             'getLocation',
            //             'hideOptionMenu',
            //             'showOptionMenu',
            //             'closeWindow',
            //             'scanQRCode',
            //             'chooseWXPay',
            //             'openProductSpecificView',
            //             'addCard',
            //             'chooseCard',
            //             'openCard'
            //         ]
            //     });
            // }
            // else if ($.url().param("from") == "timeline") {
            //     wx.config({
            //         debug: false,
            //         appId: 'wxd115cbc215788fe6',
            //         timestamp: ret.timestamp,
            //         nonceStr: 'weixin',
            //         signature: ret.sign2,
            //         jsApiList: [
            //             // 所有要调用的 API 都要加到这个列表中
            //             'checkJsApi',
            //             'onMenuShareTimeline',
            //             'onMenuShareAppMessage',
            //             'onMenuShareQQ',
            //             'onMenuShareWeibo',
            //             'hideMenuItems',
            //             'showMenuItems',
            //             'hideAllNonBaseMenuItem',
            //             'showAllNonBaseMenuItem',
            //             'translateVoice',
            //             'startRecord',
            //             'stopRecord',
            //             'onRecordEnd',
            //             'playVoice',
            //             'pauseVoice',
            //             'stopVoice',
            //             'uploadVoice',
            //             'downloadVoice',
            //             'chooseImage',
            //             'previewImage',
            //             'uploadImage',
            //             'downloadImage',
            //             'getNetworkType',
            //             'openLocation',
            //             'getLocation',
            //             'hideOptionMenu',
            //             'showOptionMenu',
            //             'closeWindow',
            //             'scanQRCode',
            //             'chooseWXPay',
            //             'openProductSpecificView',
            //             'addCard',
            //             'chooseCard',
            //             'openCard'
            //         ]
            //     });
            // }
            // else if ($.url().param("from") == "singlemessage") {
            //     wx.config({
            //         debug: false,
            //         appId: 'wxd115cbc215788fe6',
            //         timestamp: ret.timestamp,
            //         nonceStr: 'weixin',
            //         signature: ret.sign3,
            //         jsApiList: [
            //             // 所有要调用的 API 都要加到这个列表中
            //             'checkJsApi',
            //             'onMenuShareTimeline',
            //             'onMenuShareAppMessage',
            //             'onMenuShareQQ',
            //             'onMenuShareWeibo',
            //             'hideMenuItems',
            //             'showMenuItems',
            //             'hideAllNonBaseMenuItem',
            //             'showAllNonBaseMenuItem',
            //             'translateVoice',
            //             'startRecord',
            //             'stopRecord',
            //             'onRecordEnd',
            //             'playVoice',
            //             'pauseVoice',
            //             'stopVoice',
            //             'uploadVoice',
            //             'downloadVoice',
            //             'chooseImage',
            //             'previewImage',
            //             'uploadImage',
            //             'downloadImage',
            //             'getNetworkType',
            //             'openLocation',
            //             'getLocation',
            //             'hideOptionMenu',
            //             'showOptionMenu',
            //             'closeWindow',
            //             'scanQRCode',
            //             'chooseWXPay',
            //             'openProductSpecificView',
            //             'addCard',
            //             'chooseCard',
            //             'openCard'
            //         ]
            //     });
            // }
            // else {
            //     wx.config({
            //         debug: false,
            //         appId: 'wxd115cbc215788fe6',
            //         timestamp: ret.timestamp,
            //         nonceStr: 'weixin',
            //         signature: ret.sign4,
            //         jsApiList: [
            //             // 所有要调用的 API 都要加到这个列表中
            //             'checkJsApi',
            //             'onMenuShareTimeline',
            //             'onMenuShareAppMessage',
            //             'onMenuShareQQ',
            //             'onMenuShareWeibo',
            //             'hideMenuItems',
            //             'showMenuItems',
            //             'hideAllNonBaseMenuItem',
            //             'showAllNonBaseMenuItem',
            //             'translateVoice',
            //             'startRecord',
            //             'stopRecord',
            //             'onRecordEnd',
            //             'playVoice',
            //             'pauseVoice',
            //             'stopVoice',
            //             'uploadVoice',
            //             'downloadVoice',
            //             'chooseImage',
            //             'previewImage',
            //             'uploadImage',
            //             'downloadImage',
            //             'getNetworkType',
            //             'openLocation',
            //             'getLocation',
            //             'hideOptionMenu',
            //             'showOptionMenu',
            //             'closeWindow',
            //             'scanQRCode',
            //             'chooseWXPay',
            //             'openProductSpecificView',
            //             'addCard',
            //             'chooseCard',
            //             'openCard'
            //         ]
            //     });
            // }
            // wx.ready(function () {
               
            //     //分享给好友
            //     wx.onMenuShareAppMessage({
            //         title: '周一见，秀爱之夜 等你赴约',
            //         desc: '快来订制专属于你的芭莎封面',
            //         link: 'http://bznew.createapp.cn/api/h6/index.html',
            //         imgUrl: 'http://7xi58e.com1.z0.glb.clouddn.com/sm/images/icon.png',
            //         trigger: function (res) {

            //         },
            //         success: function (res) {

            //         },
            //         cancel: function (res) {

            //         },
            //         fail: function (res) {

            //         }
            //     });

            //     //分享到朋友圈
            //     wx.onMenuShareTimeline({
            //         title: '周一见，秀爱之夜 等你赴约',
            //         link: 'http://bznew.createapp.cn/api/h6/index.html',
            //         imgUrl: 'http://7xi58e.com1.z0.glb.clouddn.com/sm/images/icon.png',
            //         trigger: function (res) {

            //         },
            //         success: function (res) {

            //         },
            //         cancel: function (res) {

            //         },
            //         fail: function (res) {

            //         }
            //     });
            // });
            //end+
        // }
        // else {

        // }
   // });
});
//---wx sign ed-----