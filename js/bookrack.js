$(function(){
//对返回上一页
var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
	var sCollectBookId = localStorage.getItem("CollectBookId");
	var sCollectBookName = localStorage.getItem("CollectBookName");
	var sCollectBookAuthor = localStorage.getItem("CollectBookAuthor");
	
	var aBookId = [];
	var aBookName = [];
	var aBookAuthor = [];
	
	if(sCollectBookId == undefined){
		$("#reminder_first").css("display","block");
		$("#reminder_secand").css("display","block");
	}else{
		 aBookId = sCollectBookId.split("&");
		 aBookName = sCollectBookName.split("&");
    	 aBookAuthor = sCollectBookAuthor.split("&");
    	for(var i=0; i < aBookName.length;i++){
	    	$("section").append($("#template").html());
	    	$(".bookname").eq(i).html(aBookName[i]);
			$(".author").eq(i).html(aBookAuthor[i]+"◎著");
    	}
	}
	
	$("section div .bookname").live("click",function(){
		var n = $("section div .bookname").index(this);
		window.open("catalog.html?bookid="+aBookId[n],"_self");
		})
  
  
  $(".cancel_collect").live("click",function(){
  		var n = $(".cancel_collect").index(this);
  		if(confirm("你确定取消该书籍的收藏么？")){
  			var aNewBookId = [];
  			var aNewBookName = [];
  			var aNewBookAuthor = [];
  			if(aBookId.length==1){
  				localStorage.removeItem("CollectBookId");
				localStorage.removeItem("CollectBookName");
				localStorage.removeItem("CollectBookAuthor");
				$("section div").eq(n).css("display","none");
				$("#reminder_first").css("display","block");
				$("#reminder_secand").css("display","block");
  			}else{
  				for(var j=0;j<aBookId.length;j++){
  				if(j!=n){
  				  	aNewBookId.push(aBookId[j]);
  				  	aNewBookName.push(aBookName[j]);
  				  	aNewBookAuthor.push(aBookAuthor[j]);
 
  				}
  				}
  				var sBookId = aNewBookId.join("&");
  				var sBookName = aNewBookName.join("&");
  				var sBookAuthor = aNewBookAuthor.join("&");
  				localStorage.setItem("CollectBookId",sBookId);
				localStorage.setItem("CollectBookName",sBookName);
				localStorage.setItem("CollectBookAuthor",sBookAuthor);
  				
  			}
  			
  		}
  		
  	
  })

	//去逛逛吧
 	$("#reminder_secand").click(function(){
 		window.open("../index.html","_self");
 	})
})