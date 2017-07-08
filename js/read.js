$(function(){
	var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
	
	var oParameter = location.search;
	var oNewParmeter = oParameter.slice(1);
	var aData =  oNewParmeter.split("&");
    sBookId =  aData[0];//当前书籍ID
	 sCid =aData[1];//当前章节ID
    var aCid = [];//存储章节ID
	 $.ajax({
		type: "GET",
		url: "http://route.showapi.com/211-1?showapi_appid=38324&showapi_sign=9dee672bb4564640a1608072f5c1566e&bookId="+sBookId,
		success:function(data){
			//获取查询到的书籍列表对象
			var oChapterList = data.showapi_res_body.book.chapterList;
				for(var i=0;i<oChapterList.length;i++){
				   aCid[i] = oChapterList[i].cid;
				}	
			}
		})
	
	
	
	getTxt(sCid);
	
	$("section").toggle(function(){
		$("#down_and_up").css("display","block");
	},function(){
		$("#down_and_up").css("display","none");
	})
	
	var oDown = $("#down");
	var oUp = $("#up");
	//上一章
	oDown.click(function(){
	   var n  =	aCid.indexOf(sCid);
	   sCid = aCid[n-1];
	   if(n===0){
	   		alert("当前章节已经是第一章！");
	   		sCid = aCid[n];
	   }else{
	   		getTxt(aCid[n-1])
	   }
	})
	
	//下一章
	oUp.click(function(){
	   var n  =	aCid.indexOf(sCid);
	   sCid = aCid[n+1];
	   if(n===aCid.length-1){
	   		alert("当前章节已经是最后一章！");
	   		 sCid = aCid[n];
	   }else{
	   		getTxt(aCid[n+1])
	   }
	})
	
	//对模式进行存储
	var oDayAndNight = $("#day_and_night");
	if(localStorage.getItem("dayAndNight")==undefined){	
	
		}else if(localStorage.getItem("dayAndNight") == "日间"){
		oDayAndNight.html("日间");
		$("section")[0].style.background = "#666";
		$("section")[0].style.color = "#fff";
		}else{
		$("section")[0].style.background = "#lightgoldenrodyellow";
		$("section")[0].style.color = "#000";
		oDayAndNight.html("夜间");	
		}
	
	//夜间模式与日间模式的转换
	
	oDayAndNight.click(function(){
		if(oDayAndNight.html()=="夜间"){
			$("section")[0].style.background = "#666";
			$("section")[0].style.color = "#fff";
			oDayAndNight.html("日间");
			localStorage.setItem("dayAndNight","日间");
		}else{
			$("section")[0].style.background = "lightgoldenrodyellow";
			$("section")[0].style.color = "#000";
			oDayAndNight.html("夜间");
			localStorage.setItem("dayAndNight","夜间");
		}
	})
	
	
	
	//获取章节内容函数
	function  getTxt(cid){
		$("section").html("")
		$.ajax({
		type: "GET",
		url: "http://route.showapi.com/211-4?showapi_appid=38324&showapi_sign=9dee672bb4564640a1608072f5c1566e&bookId="+sBookId+"&cid="+cid,
		success:function(data){
			var oTxt = data.showapi_res_body.txt;
			$("section").html(oTxt);
			if(oTxt == ""){
				alert("当前页面内容存在错误，正在紧急修复，给你造成的不便，还请见谅！");
			}
			$("#bookname").html(data.showapi_res_body.cname)
			}
		})
	}
	
	var oAdd = $("#add");
	var oReduce = $("#reduce");
	var oNumber = $("#number");
	var oClose = $("#close");
	
	//获取存储好的字体大小
	var oTextSize = localStorage.getItem("textsize");
	if(oTextSize == undefined){
	}else{
		$("section").css("font-size",oTextSize+"rem");
		oNumber.html(oTextSize*100)
	}
	
	//增加字体大小
	oAdd.click(function(){
		var s = Number(oNumber.html());
		s++;
		if(s>24){
			alert("字体大小已经达最大");
		}else{
			oNumber.html(s);
			var oRem = s/100;
			$("section").css("font-size",oRem+"rem");
			localStorage.setItem("textsize",oRem);
		}
		
	})
	//减小字体大小
	oReduce.click(function(){
		var s = Number(oNumber.html());
		s--;
		if(s<11){
			alert("字体大小已经达最小");
		}else{
			oNumber.html(s);
			var oRem = s/100;
			$("section").css("font-size",oRem+"rem");
			localStorage.setItem("textsize",oRem);
		}
		
	})
	
	$("#set").click(function(){
		$("#setcontent").css("display","block");
	})
	
	oClose.click(function(){
		$("#setcontent").css("display","none");
	})
	
	
	$("#chapterlist").live("click",function(){
			var n = $("section div").index(this);
			window.open("catalog.html?bookid="+sBookId,"_self");
		})
	
	
	
	
})