
$(function(){
          var onOff = true;
          var times = 1;
          var f1=1;
          function scrollScreen(plUrl){
            dHeight=parseInt($(document).height());
            sHeight=parseInt($(document).scrollTop());
            if((dHeight-sHeight)<=$(window).height() && onOff){
              getData();
            }
          }
          
          function getData(){ 
            times++;
            onOff = false;
            if(f1==1)
            {
                 show1(times);
            }else if(f1==2)
            {
                show2(times);
            }else if(f1==3)
            {
                show3(times);
            }       
          }
          $(window).scroll(function() {
              scrollScreen();
          });

          function getactivity(grurl){ 
            $.getJSON(grurl,function(data){
              if(data.result=="succ")
              {
                  if(data.info.sex==1)
                  {
                     $(".title_c .name").html(data.info.uname+"<em></em>");
                  }else
                  {
                    $(".title_c .name").html(data.info.uname+"<em class='sex2'></em>");
                  }
                  if(data.info.official_icon!=undefined)
                  {
                      $(".headbg").append("<span></span>");
                  }
                
                  $(".headbg img").attr("src",data.info.avatar);
                  $(".title_c .level").html(data.info.level);


                  $(".three .l .c").html(data.info.feed);
                  $(".three .m .c").html(data.info.follow);
                  $(".three .r .c").html(data.info.fans);
                 
              }else
              {
                //alert(data.msg);
              }
                 
            });
            show1(1);
              
          }
          getactivity(grurl);

          function show1(times)
          {
             $.getJSON(purl1,{page:times},function(data){
                if(data.result=="succ")
                {
                    if(data.info.length>0)
                    { 
                      var pic1=""
                      for(i=0;i<data.info.length;i++)
                      {
                         pic1+=''
                             +'<li><a href=""><img src="'+data.info[i].attach[0].attach_thumb_url+'" width="100%"></a></li>'  
                          
                      }
                      $(".con ul").append(pic1);
                      $(".con li").css("width",($(window).width()-3)/3+"px");
                       onOff = true;
                    }else
                    {
                      onOff = false;
                    }
                }else
                {
                  //alert(data.msg);
                }

              });
          }

          function show2(times)
          {
             $.getJSON(purl2,{page:1},function(data){
                  if(data.result=="succ")
                  {
                   if(data.info.join.length>0)
                   {
                        if(times==1)
                        {
                            var p1=""
                            for(i=0;i<data.info.in.length;i++)
                            {
                               p1+=''
                                   +'<li>'
                                    +'<p class="t">我发起的话题</p>'
                                    +'<div class="c">'
                                      +'<div class="l"><img src="'+data.info.in[i].pic_url+'" width="100%"></div>'
                                      +'<div class="r">'
                                        +'<p>'+data.info.in[i].title+'</p>'
                                        +'<div class="gp">'
                                          +'<span class="ls"><em></em>'+data.info.in[i].pic_count+'</span>'
                                          +'<span class="rs"><em></em>'+data.info.in[i].digg_count+'</span>'
                                        +'</div>'
                                      +'</div>'
                                    +'</div>'
                                  +'</li>'
                                
                            }
                            $(".con2 ul").append(p1);
                        }
                        
                        if(data.info.join.length>0)
                         {
                            var p2=""

                              for(i=0;i<data.info.join.length;i++)
                              {
                                 p2+=''
                                      +'<div class="c">'
                                        +'<div class="l"><img src="'+data.info.join[i].pic_url+'" width="100%"></div>'
                                        +'<div class="r">'
                                          +'<p>'+data.info.join[i].title+'</p>'
                                          +'<div class="gp">'
                                            +'<span class="ls"><em></em>'+data.info.join[i].pic_count+'</span>'
                                            +'<span class="rs"><em></em>'+data.info.join[i].digg_count+'</span>'
                                          +'</div>'
                                        +'</div>'
                                      +'</div>'                                  
                              }
                              $(".con2 ul").append("<li><p class='t'>Ta参与的话题</p>"+p2+"</li>");
                               onOff = true;
                         }

                   }else
                   {
                       onOff = false;
                   }
                }else
                {
                  //alert(data.msg);
                }
                        

              });
          }
           function show3(times)
          {
             $.getJSON(purl3,{page:times},function(data){
               if(data.result=="succ")
               {
                    if(data.info.length>0)
                    { 
                      var pic1=""
                      for(i=0;i<data.info.length;i++)
                      {
                         pic1+=''
                             +'<li><a href=""><img src="'+data.info[i].attach[0].attach_thumb_url+'" width="100%"></a></li>'  
                          
                      }
                      $(".con3 ul").append(pic1);
                      $(".con3 li").css("width",($(window).width()-3)/3+"px");
                       onOff = true;
                    }else
                    {
                      onOff = false;
                    }
                }else
                {
                  //alert(data.msg);
                }

              });
          }


           $("#part1").click(function(){
              times = 1;
              show1(1);
              fl=1;
              $(".con").show();
              $(".con2,.con3").hide();
              $(".con li").css("width",($(window).width()-3)/3+"px");
              $(".con ul").html("");
              $(".nav i").removeClass();
              $(this).find("i").addClass("c");
            });


           $("#part2").click(function(){
              fl=2;
              times = 1;
              show2(1);
              $(".con2").show();
              $(".con,.con3").hide();
              $(".con2 ul").html("");
              $(".nav i").removeClass();
              $(this).find("i").addClass("c");
            });

          $("#part3").click(function(){
            fl=3;
            times = 1;
            show3(1);
            $(".con3").show();
            $(".con,.con2").hide();
            $(".con3 li").css("width",($(window).width()-3)/3+"px");
            $(".con3 ul").html("");
            $(".nav i").removeClass();
            $(this).find("i").addClass("c");  
          });


});
	