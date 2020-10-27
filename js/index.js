// 图片轮播
$.ajax({
   type:"get",
   url:"http://localhost:4005/api/banner",
   success:function(response){
     show(response)
    }
})
function show(response){
    let{result:{data}}=response;
    let html=template("banner",{data})
    $("#banne").html(html)
    var n=0
    $(".circle>span").click(function(){
        var ind=$(this).index()
        $(this).addClass("sp_gs").siblings().removeClass("sp_gs")
        $(".backg>ul>li").eq($(this).index()).fadeIn().siblings().fadeOut()
       $(this).parent().parent().parent().parent().css("background",ind.background)
        n=ind
    })
    var time=setInterval(lun,3000)
    function lun(){
        n++;
        if(n==data.length){
            n=0
        }
        $(".circle>span").eq(n).addClass("sp_gs").siblings().removeClass("sp_gs")
        $(".backg>ul>li").eq(n).fadeIn().siblings().fadeOut()
    }
    $(".men-content").mouseover(function(){
        clearInterval(time)
    })
    $(".men-content").mouseout(function(){
        time=setInterval(lun,3000)
    })
    $(".backg>.inner>.jian-left").click(function(){
        n--;
        if(n<0){
            n=data.length-1
        }
        $(".circle>span").eq(n).addClass("sp_gs").siblings().removeClass("sp_gs")
        $(".backg>ul>li").eq(n).fadeIn().siblings().fadeOut()
    })
    $(".backg>.inner>.jian-right").click(function(){
        n++;
        if(n>data.length-1){
            n=0
        }
        $(".circle>span").eq(n).addClass("sp_gs").siblings().removeClass("sp_gs")
        $(".backg>ul>li").eq(n).fadeIn().siblings().fadeOut()
    })
}
let init=()=>{
    popularityRequest()
    people()
    diffent()
    fenlei()
    nav()
}
// 猜你喜欢
let popularityRequest=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/api/like"
    })
    let html=template("red",{data})
    $(".like-conter").html(html)
}
//搜索框下边内容
let fenlei=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/api/nav"
    })
    let html5=template("fen_cont",{data})
    $("#fen").html(html5)
}
// 精细导航栏
let nav=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/api/main"
    })
   let html6=template("jin_nav",{data})
   $(".menv-nav").html(html6)
}
// 人气好货
let people=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/api/popularity"
    })
    let html3=template("peoplecont",{data})
    $(".mood").html(html3)
}
//各大板块
let diffent=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/api/home"
    })
    console.log(data)
    let html4=template("ban",{data})
    $(".main-three").html(html4)
}
init()

 // 置顶效果
 $(window).scroll(function(){
    var top=$(window).scrollTop()
    if(top>700){
        $(".zhiding").fadeIn(1000)
    }else{
        $(".zhiding").fadeOut(1000)
    }
})
$(".zhiding").click(function(){
    $("html").animate({
        "scrollTop":0
    }),4000,"linear"
})
// 排行榜
$.ajax({
    type:"get",
    url:"http://localhost:4005/api/ranking",
    success:function(res){
      mice(res)
     }
})
function mice(res){
    let {result:{data}}=res
    let ypai=template("ying",{data})
    $("#pai").html(ypai)
    $(".list-nav").eq(0).addClass("list_gs")
    $(".yyue").eq(0).addClass("y_gs")
    $(".list-nav>.choice").click(function(){
        $(".yyue").eq($(this).index()).addClass("y_gs").siblings().removeClass("y_gs")
    })
}
// 限时抢购
$.ajax({
    type:"get",
    url:"http://localhost:4005/f/flash",
    success:function(time){
      xian(time)
     }
})
function xian(time){
    let {result:{data}}=time
    let x=Object.values(data[0])
    let a=Object.values(x[0])
    let te=x[1]

    let y=Object.values(data[1])
    let b=Object.values(y[0])
    let tm=y[1]

    let p=[{aa:a,tme:te,tit:"正在疯抢"},{aa:b,tme:tm,tit:"即将开抢"}]
   
    let xi=template("qiang",{p})
    $("#xin_tou").html(xi)
    $("#chan").eq(0).addClass("xin_gs")
    $(".time-limited .span6").click(function(){
            $(".xintime").eq($(this).index()).addClass("xin_gs").siblings().removeClass("xin_gs")
    })
    dtime()
    setInterval(dtime,1000)
    function dtime(){
        let b1=$(".time-limited .span6 b").eq(0).text()
        let bb1=Number(b1)
        let now=new Date()
        now.setHours(bb1)
    
        let b2=$(".time-limited .span6 b").eq(1).text()
        let bb2=Number(b2)
        let futer=new Date()
        futer.setHours(bb2)
        futer.setMinutes(00)
        futer.setSeconds(00)
    
        let dao=parseInt((futer-now)/1000)
        let hourse=add(parseInt(dao%86400/3600))
        let miu=add(parseInt(dao%3600/60))
        let sec=add(parseInt(dao%60))

        $(".time-limited>.p1>.span3").html(hourse)
        $(".time-limited>.p1>.span4").html(miu)
        $(".time-limited>.p1>.span5").html(sec)
        function add(value){
            return value<10?"0"+value:value;
        }
    }
    
}