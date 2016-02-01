/*0724众筹活动界面*/
$(function(){
    $('.load').css('display','none');//loading

   
         
       

    var rand = String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0));
   // $(".az").html(rand);//默认字母头像
    
   

    var bflag = true;
    $('.updownBtn').tap(function(){
        if(bflag){
            $(this).find('span').removeClass().addClass('upbtn');
            $('.activity .friendDiv').css('height','auto');
            bflag = false;
        }else{
            $(this).find('span').removeClass().addClass('downbtn');
            $('.activity .friendDiv').css('height','2.5rem');
            bflag = true;
        }
    });//赞过我的好友箭头控制
    $('.updownBtn2').tap(function(){
        if(bflag){
            $(this).find('span').removeClass().addClass('upbtn');
            $('.sm-txt').removeClass('multi-no-wrap');
            bflag = false;
        }else{
            $(this).find('span').removeClass().addClass('downbtn');
            $('.sm-txt').addClass('multi-no-wrap');
            bflag = true;
        }
    });//活动说明文字溢出箭头控制
    
    $('.updownBtn3').tap(function(){
        if(bflag){
            $(this).find('span').removeClass().addClass('upbtn');
            $(ranking).css('display','block');
            bflag = false;
        }else{
            $(this).find('span').removeClass().addClass('downbtn');
            $(ranking).css('display','none');
            $(ranking).eq(0).css('display','block');
            $(ranking).eq(1).css('display','block');
            $(ranking).eq(2).css('display','block');
            bflag = true;
        }
    });//排行榜箭头控制 前三个默认显示
})