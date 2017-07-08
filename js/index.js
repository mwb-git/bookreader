$(function(){
//对返回上一页
var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
    var aBookId = [];
    
	$.ajax({
		type: "GET",
		url: "http://route.showapi.com/211-2?showapi_appid=38324&showapi_sign=9dee672bb4564640a1608072f5c1566e&keyword="+"",
		success:function(data){
			//获取查询到的书籍列表对象
			var oBookData = data.showapi_res_body.pagebean.contentlist;
				for(var i=0;i<oBookData.length;i++){
					oDiv = document.createElement("div");
					aBookId[i] = oBookData[i].id;
					oDiv.innerHTML = oBookData[i].author+":"+oBookData[i].name;
					$("#list").append(oDiv);
				}	
				
				$("#list div").live("click",function(){
					var n = $("#list div").index(this);
					window.open("html/catalog.html?bookid="+aBookId[n],"_self");
				})
			}
		})
		
	var oName = localStorage.getItem("username");	
    	if(oName){
    		$("#my_accounts").html(oName);
    		$("#my_accounts").attr("href","javascript:;");
    	}else{
    		
    	}
	
	var oFlag = 0;
	
    $("#my_accounts").click(function(){
    	if($("#my_accounts").html()=="登录/注册"){
    		window.open("html/personalcenter.html","_self");
    	}else{
    		oFlag++;
    		console.log(oFlag)
    		if(oFlag%2!=0){
    			$("#exit").css("display","block");
    		}else{
    			$("#exit").css("display","none");
    		}
    		
    	}
    })
    
    $("#exit").click(function(){
    	localStorage.removeItem("username");
    	$("#my_accounts").html("登录/注册");
    	$("#my_accounts").attr("href","html/personalcenter.html");
    	$("#exit").css("display","none");
    	
    })
    
})