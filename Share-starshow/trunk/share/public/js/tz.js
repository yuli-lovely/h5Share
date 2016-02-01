
$(function(){
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
			//howTimeText = ''+Year+'年'+Month+'月'+Day+'日';
			howTimeText = Math.round(howTime/day)+"天前";
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

	
		  var onOff = true;
		  var times = 0;
		  function scrollScreen(plUrl){

		    dHeight=parseInt($(document).height());
		    sHeight=parseInt($(document).scrollTop());
		    if((dHeight-sHeight)<=$(window).height() && onOff){
		      getData(plUrl);
		    }
		  }
		  function getData(plUrl){ 
		    times++;
		    var firList = '';
		    var dec='';
		    var com='';
		    var imgs='';
		    var tag='';
		    var embassy='';
		    var userN='';
		    onOff = false;
		    $.getJSON(plUrl,{page:times},function(data){
		        var service=$(".comment-list");
		        if(data.comment.length>0)
		        { 
		          for(i=0;i<data.comment.length;i++)
		          {
		          	 formatTime=formatTime2(data.comment[i].create_at);

		          	  function getString(string) {
                          return /\[(\S+)\]/i.test(string) ? RegExp.$1 : string; 
                      }
                      var string = data.comment[i].content;
                      var arr = string.split(/\]/);
                      var back = [];
                      for (var j in arr) {
                          if (/\#{2}/.test(getString(arr[j]) ) ) {
                              var b = arr[j].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/') + '.gif">';
                          } else if ( /\#{1}/.test( getString(arr[j]) ) ){
                              var b = arr[j].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/') + '.jpg">';
                          } else {
                               var b = arr[j].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/');
                              //var b='';
                          }
                          back.push(b);
                      }
                      var back = back.join().replace(/,/g, '');
		              var com='';
		              com+=''
		              +'<div class="comment-item">'
		                  +'<img class="item-avatar" src="'+data.comment[i].user.avatar+'">'
		                  +'<span class="item-author" data-userid="2qRXw1" data-name="Uerchy">'
		               		 +''+data.comment[i].user.nickname+''
		                  +'</span>'
		                     +'<span class="item-content">'
		                         +''+back+''
		                      +'</span>'
		                     +'<span class="item-datetime">'
		                       +''+parseInt(i+1)+'楼'
		                  		+'</span>'
		                  +'<div class="item-action">'
		                     +''+formatTime+''
		                +'</div>'
		            +'</div>' 
		            service.append(com);
		            
		          }
		           onOff = true;

		        }else
		        {
		           onOff = false;
		        }
		     
		    });
		        
		  }
		  // $(window).scroll(function() {
		  //   scrollScreen(plUrl);
		  // });
		  getData(plUrl);


		  function getTz(tzUrl){ 
		    $.getJSON(tzUrl,function(data){
		    	 formatTime=formatTime2(data.topic.create_at);
		          $(".thumb .item-avatar").attr("src",""+data.topic.user.avatar+"");
		          $(".thumb .item-author").html(data.topic.user.nickname);
		          function getString(string) {
                          return /\[(\S+)\]/i.test(string) ? RegExp.$1 : string; 
                      }
		          var string = data.topic.text;
                      var arr2 = string.split(/\]/);
                      var back = [];
                      for (var k in arr2) {
                          if (/\#{2}/.test(getString(arr2[k]) ) ) {
                             var  b = arr2[k].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/') + '.gif">';
                          }else if( /\#{1}/.test( getString(arr2[k]) )){
                            var  b = arr2[k].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/') + '.jpg">';
                          }else{
                             var  b = arr2[k].replace(/\[/g, '<img style="width:80px; height:80px" src="http://appimages01.bazaarstar.cn/exp').replace(/\#+/g, '/')+'</br>';
                              
                          }
                          back.push(b);
                      }
                      var back = back.join().replace(/,/g, '');

		          $(".thumb .icontent").html(back);

		          $(".thumb .pl").html('<span class="ic"></span>'+data.topic.comment_num);
		          if (data.topic.pic_paths!=undefined)
		          {
		          	for(i=0;i<data.topic.pic_paths.length;i++)
		          	{
		          		$(".pic ul").append('<li><img style="" src="'+data.topic.pic_paths[i].thumb_url+'"></li>');
		          	}
		          }
		          $(".thumb .item-action").html(formatTime);
		    });
		        
		  }
		  getTz(tzUrl);
});
	