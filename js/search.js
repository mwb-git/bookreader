$(function(){
//对返回上一页
var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
var oSearch = $("#search"); 
var oHeaderSearch = $("#header_search");
var oSection = $("section");
var aBookId = [];

oHeaderSearch.click(function(){
	oSection.html("");
	aBookId = [];
 $.ajax({
		type: "GET",
		url: "http://route.showapi.com/211-2?showapi_appid=38324&showapi_sign=9dee672bb4564640a1608072f5c1566e&keyword="+oSearch.val(),
		success:function(data){
			//获取查询到的书籍列表对象
			var oBookData = data.showapi_res_body.pagebean.contentlist;
			for(var i=0;i<oBookData.length;i++){
				oSection.append($("#template").html());	
				$(".bookname").eq(i).html(oBookData[i].name);
				aBookId[i] = oBookData[i].id;
				$(".author").eq(i).html(oBookData[i].author+"◎著");
				$(".new_chapter").eq(i).html("最新章节："+oBookData[i].newChapter);
			}	
				
				$("section div").live("click",function(){
					var n = $("section div").index(this);
					window.open("catalog.html?bookid="+aBookId[n],"_self");
				})
			}
		})
})




})