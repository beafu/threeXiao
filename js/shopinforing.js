let init=()=>{
    fenlei()
    nav()
}
//搜索框下边内容
let fenlei=async()=>{
    let {result}=await myAjax({
        url:"http://www.ujiuye.tech:3000/api/hot"
    })
    let html5=template("fen_cont",result)
    $("#fen").html(html5)
}
// 精细导航栏
let nav=async()=>{
    let{result}=await myAjax({
        url:"http://www.ujiuye.tech:3000/api/category/first"
    })
   let html6=template("jin_nav",result)
   $(".menv-nav").html(html6)
}
init()