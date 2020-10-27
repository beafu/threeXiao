let init=()=>{
    fenlei()
    nav()
    first()
    initEvent()
    show()
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
// 三个层级的触发事件，交给父级来做
let initEvent=()=>{
    $("#first").on("click","dd",firstClick);
    $("#second").on("click","dd",secondClick);
    $("#thired").on("click","dd",thirdClick)
  }
// 一级分类
let first=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/category/first"
    })
    let html=template("nav_first",{data})
    $("#first").html(html)
    let first_id = data[0].first_id;
    second(first_id)
}
//二级分类
let second=async(first_id)=>{
    let data=await myAjax({
        url:"http://localhost:4005/category/second",
        data:{first_id}
    })
    let html=template("nav_second",{data})
    $("#second").html(html)
    let second_id=data[0].second_id
    thired(second_id)
}
// 三级分类
let thired=async(second_id)=>{
    let data=await myAjax({
        url:"http://localhost:4005/category/third",
        data:{second_id}
    })
    let html=template("nav_third",{data})
    $("#thired").html(html)
    let third_id=data[0].thired_id
    goodsList(third_id)
}
// 清单列表
let goodsList=async(third_id)=>{
    let data=await myAjax({
        url:"http://localhost:4005/category/goodsList",
        data:{third_id}
    })
    let html=template("nav_list",{data})
    $("#main").html(html)
}
// 一级分类的触发事件
let firstClick = function(){
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let first_id = $(this).data("id");
    second(first_id)
}
let secondClick=function(){
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let second_id = $(this).data("id");
    thired(second_id)
}
let thirdClick=function(){
    $(this).find("a").addClass("active").parent().siblings().find("a").removeClass("active")
    let thired_id = $(this).data("id");
    goodsList(thired_id)

}
// 橱窗信息
let show=async()=>{
    let data=await myAjax({
        url:"http://localhost:4005/category/shopwindow"
    })
    let html=template("showwindo",{data})
   $("#show").html(html)

}
init()
