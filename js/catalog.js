$(function(){
	var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
	var oParameter = location.search;
	var s = oParameter.indexOf("=");
    oBookId =  oParameter.slice(s+1);
    var bookName = "";
    var bookAuthor = "";
    oCid = [];
	 $.ajax({
		type: "GET",
		url: "http://route.showapi.com/211-1?showapi_appid=38324&showapi_sign=9dee672bb4564640a1608072f5c1566e&bookId="+oBookId,
		success:function(data){
			//获取查询到的书籍列表对象
			var oChapterList = data.showapi_res_body.book.chapterList;
			bookName = data.showapi_res_body.book.name;
			bookAuthor = data.showapi_res_body.book.author;
				for(var i=0;i<oChapterList.length;i++){
				   var oP = document.createElement("p");
				   oCid[i] = oChapterList[i].cid;
				   oP.innerHTML = oChapterList[i].name;
				   $("section")[0].appendChild(oP);
				}	
				
				$("section p").live("click",function(){
					var n = $("section p").index(this);
					window.open("read.html?"+oBookId+"&"+oCid[n],"_self");
				})
			}
		})
	
	
	var oCollect = $("#collect");
	oCollect.click(function(){
		var sCollectBookId = localStorage.getItem("CollectBookId");
		var sCollectBookName = localStorage.getItem("CollectBookName");
		var sCollectBookAuthor = localStorage.getItem("CollectBookAuthor");
		if(sCollectBookId == undefined){
			localStorage.setItem("CollectBookId",oBookId);
			localStorage.setItem("CollectBookName",bookName);
			localStorage.setItem("CollectBookAuthor",bookAuthor);
			alert("收藏成功！");
		}else{
			var aArr = sCollectBookId.split("&");
			var oFlag = checkStr(oBookId,aArr);
			if(oFlag == 0){
				sNewCollectBookId = sCollectBookId+"&"+oBookId;
				sNewCollectBookName = sCollectBookName+"&"+bookName;
				sNewCollectBookAuthor = sCollectBookAuthor+"&"+bookAuthor;
				localStorage.setItem("CollectBookId",sNewCollectBookId);
				localStorage.setItem("CollectBookName",sNewCollectBookName);
				localStorage.setItem("CollectBookAuthor",sNewCollectBookAuthor);
				alert("收藏成功！");
			}else if(oFlag == 1){
				alert("本书已收藏！");
			}
			
		}
		
	})
	
	function checkStr(str,arr){
		var s = arr.indexOf(str);
		if(s<0){
			return 0;
		}else{
			return 1;
		}
	}
	
	
	
})
