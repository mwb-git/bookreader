$(function(){
//对返回上一页
var oCancel = $("#cancel");
    oCancel.click(function(){
    	window.history.back();
    })
	var oUserName = $("#username");
	var oUserLoginBtn =false;
	var oPassBtn = false;
	oUserName.blur(function(){
		var reg = /^[a-zA-Z_]\w{4,20}$/ig;
		if(reg.test(oUserName.val())){
			$.ajax({
			type:"GET",
			url:"http://192.168.43.45:88/checkusername.php?username="+oUserName.val(),
			success:function(data){
				if(data==1){
					$("#login_prompt p").html("账号已存在");
					$("#login_prompt").css("display","block");
				}else if(data==0){
					oUserLoginBtn = true;
				}
			},
			error:function(){
				alert("失败")
			}
		})
		}else if(oUserName.val()==""){
			$("#login_prompt p").html("账号不能为空");
			$("#login_prompt").css("display","block");
		}else{
			$("#login_prompt p").html("数字不能开头，4-20位字符，由英文数字'_'组成");
			$("#login_prompt").css("display","block");
		}
	})

	if($("#psd").val()==""){
		
	}else{
		oPassBtn = true;
	}
	 
	 console.log(oPassBtn)
	 console.log(oUserLoginBtn)
	var oBtn = $("#btn");
	oBtn.click(function(){
		if($("#psd").val()==""){
			$("#login_prompt p").html("密码不能为空！");
			$("#login_prompt").css("display","block");
		}else{
			oPassBtn = true;
		}
		if(oPassBtn && oUserLoginBtn){
			$.ajax({
			type:"GET",
			url:"http://192.168.43.45:88/login.php?username="+oUserName.val()+"&password="+$("#psd").val(),
			success:function(data){
				if(data==1){
					alert("注册成功，即将跳转到登录页面！");
					setTimeout(function(){
						window.open("personalcenter.html","_self");
					},1000)
				}else if(data==0){
					alert("注册失败！");
					}
				}
			})
		}
	})

	$("#login_prompt div").click(function(){
		$("#login_prompt").css("display","none");
	})
})