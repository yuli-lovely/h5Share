
$(function(){
        


          function getactivity(dtUrl){ 
            $.getJSON(dtUrl,function(data){
            if(data.result=="succ")
            {
              formatTime=formatTime2(data.info.pubdate);
                $(".commentI .item-avatar").attr("src",data.info.avatar);
                $(".commentI .item-author").html(data.info.uname+'<em class="itemV"></em>');
                $(".item-action .time").html(formatTime);
                $(".item-action .ad").html('<em></em>'+data.info.city_name);
                var np='',np2='',np3='',np4='';
                for (var i = 0;i<data.info.attach.length; i++) {
                     np+=''
                     //+'<li class="focusPicLi"><div class="focusLiListPic"><a href="#"><img width="100%" src="'+data.info.attach[i].attach_url+'"></a></div></li>'; 
                     +'<li class="focusPicLi"><div class="focusLiListPic"><video style="width:100%;height:300px;" controls="controls"><source src='+'http://starshow-file.b0.upaiyun.com'+data.info.content.split("###***")[1]+' type="video/ogg" /><source src='+'http://starshow-file.b0.upaiyun.com'+data.info.content.split("###***")[1]+' type="video/mp4" /></video></div></li>';                      
                } 
                $("#picList").append(np);
                
                for (var i = 0;i<data.info.diggusers.length; i++) {              
                     np3+=''
                     +'<span><img src="'+data.info.diggusers[i].avatar+'"></span>';
                } 
                $(".dzpic .t").html(np3);
                $(".dzpic .n").html(data.info.digg_count);
                $(".content p").html(data.info.content.split("###***")[0]);
               
               if(data.info.comment!=undefined)
               {
                  for (var i = 0;i<data.info.comment.length;i++) {              
                        np4+=''
                        +'<p><span>'+data.info.comment[i].user.uname+'</span>'+data.info.comment[i].content+'</p>';
                  } 
                  $(".pl").html(np4);
               }
           }
                  
            });
          }
          getactivity(dtUrl);

           function formatTime2(times){
            var d= new Date(parseInt(times) * 1000).toUTCString().split(' ');
            var Year = d[3];
            var Month = d[2];
            var Day = d[1];
            var howTime = Math.round((new Date().getTime()/1000))-times;
            var minute = 60;
            var hour = minute*60;
            var day = hour*24;
            var month = day*30;
            var howTimeText = 0;
            switch(Month){
                case 'Jan':
                    Month = '1'
                break;
                case 'Feb':
                    Month = '2'
                break;
                case 'Mar':
                    Month = '3'
                break;
                case 'Apr':
                    Month = '4'
                break;
                case 'May':
                    Month = '5'
                break;
                case 'Jun':
                    Month = '6'
                break;
                case 'Jul':
                    Month = '7'
                break;
                case 'Aug':
                    Month = '8'
                break;
                case 'Sep':
                    Month = '9'
                break;
                case 'Oct':
                    Month = '10'
                break;
                case 'Nov':
                    Month = '11'
                break;
                case 'Dec':
                    Month = '12'
                break;
            }
            if(howTime/day>=1){
                howTimeText = ''+Year+'年'+Month+'月'+Day+'日';
               // howTimeText = Math.round(howTime/day)+"天前";
            }else if(howTime/hour>=1){
                howTimeText = Math.round(howTime/hour)+"小时前";
            }else if(howTime/minute>=1){
                howTimeText = Math.round(howTime/minute)+"分钟前";
            }else if(howTime/minute<1){
                howTimeText = "刚刚";
            }
            howTimeText = '<span class="time">'+howTimeText+'</span>';
            return howTimeText;
        };

});
	