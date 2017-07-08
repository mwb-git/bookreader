$(function(){
//对返回上一页
var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
	
	var oBtn = $("#btn");
	var oUserName = $("#username");
	oBtn.click(function(){
			$.ajax({
			type:"GET",
			url:"http://192.168.43.45:88/enter.php?username="+oUserName.val()+"&password="+$("#psd").val(),
			success:function(data){
				if(data==1){
					localStorage.setItem("username",oUserName.val());
					window.open("../index.html","_self");
				}else if(data==0){
					alert("密码错误！");
				}else if(data==2){
					alert("用户名不存在！");
				}
				}
			})
		})
	})


