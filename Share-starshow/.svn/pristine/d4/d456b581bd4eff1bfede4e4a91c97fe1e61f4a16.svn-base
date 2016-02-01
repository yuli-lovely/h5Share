
$(function(){
          var onOff = true;
          var times = 0;
          function scrollScreen(plUrl){
            dHeight=parseInt($(document).height());
            sHeight=parseInt($(document).scrollTop());
            if((dHeight-sHeight)<=$(window).height() && onOff){
              getData(dtUrl);
            }
          }
          
          function getData(dtUrl){ 
            times++;
            onOff = false;
            // if(fl==1)
            // {
                  $.getJSON(dtUrl,{page:times},function(data){
                    if(data.result=="succ")
                    {
                      var service=$(".comment-list");
                      if(data.info.list.length>0)
                      { 
                        var pic2=""
                        for(i=0;i<data.info.list.length;i++)
                        {
                           pic2+=''
                               +'<li><a href=""><img src="'+data.info.list[i].attach[0].attach_thumb_url+'" width="100%"></a></li>'  
                          
                        }
                        $(".con ul").append(pic2);
                        $(".con li").css("width",($(window).width()-3)/3+"px");
                         onOff = true;

                      }else
                      {
                         onOff = false;
                      }
                    }
                 
                });
            // }else
            // {
              //   $.getJSON(activity_ph,{page:times},function(data){
              //        var pic3=""
              //        if(data.info.list.length>0)
              //        {
              //            for (var i = 0;i<data.info.list.length; i++) {
              //               pic3+=''
              //               +'<li>'
              //                  +'<span class="n">'+data.info.list[i].grade+'</span>'
              //                  +'<span class="p"><img src="'+data.info.list[i].avatar+'" width="100%"></span>'
              //                  +'<div class="head_t">'
              //                  +'<span class="t">'+data.info.list[i].uname+'</span>'
              //                  +'<span class="c">'+data.info.list[i].content+'</span>'
              //                  +'</div>'
              //                  +'<span class="dn"><em>'+data.info.list[i].digg_count+'</em></span>'
              //                +'</li>'                        
              //           } 
              //          $(".con2 ul").append(pic3);
              //          onOff = true;
              //        }else
              //        {
              //          onOff = false;
              //        }
                   
              // });
            //}
            
                
          }
          $(window).scroll(function() {
            scrollScreen(dtUrl);
          });



          function getactivity(dtUrl){ 
            $.getJSON(dtUrl,function(data){
              if(data.result=="succ")
              {
                  $(".title_c .p1").html(data.info.activity.title);
                  $(".tp img").attr("src",data.info.activity.thumb_url);
                  $(".title_c .n1").html(data.info.activity.follower);
                  $(".title_c .p2").html(data.info.activity.intro);
                   var pic=""
                  for (var i = 0;i<data.info.list.length; i++) {
                          pic+=''
                          +'<li><a href=""><img src="'+data.info.list[i].attach[0].attach_thumb_url+'" width="100%"></a></li>'                        
                  } 
                  $(".con ul").append(pic);
                  $(".con li").css("width",($(window).width()-3)/3+"px");
                }
            });
          }
          getactivity(dtUrl);

           $(".jf").click(function(){
            $(".con").show();
            $(".con2").hide();
            $(".nav i").removeClass();
              $(this).find("i").addClass("c");
           // fl=1;
          });
          $(".pl").click(function(){
            $(".con2").show();
            $(".con").hide();
            $(".nav i").removeClass();
            $(this).find("i").addClass("c");
            //fl=2;
            $.getJSON(activity_ph,function(data){
              if(data.result=="succ")
              {
                   var pic3=""
                  for (var i = 0;i<data.info.list.length; i++) {
                        pic3+=''
                        +'<li>'
                           +'<span class="n">'+data.info.list[i].grade+'</span>'
                           +'<span class="p"><img src="'+data.info.list[i].avatar+'" width="100%"></span>'
                           +'<div class="head_t">'
                           +'<span class="t">'+data.info.list[i].uname+'</span>'
                           +'<span class="c">'+data.info.list[i].content+'</span>'
                           +'</div>'
                           +'<span class="dn"><em>'+data.info.list[i].digg_count+'</em></span>'
                         +'</li>'                        
                  } 
                  $(".con2 ul").append(pic3);
                  $(".con2 li").eq(0).find(".n").addClass("r");
                  $(".con2 li").eq(1).find(".n").addClass("g");
                  $(".con2 li").eq(2).find(".n").addClass("h");
                }
            });

          });


});
	