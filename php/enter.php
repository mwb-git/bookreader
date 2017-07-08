 <?php
	header("Access-Control-Allow-Origin: *");
    header('Conent-type:type/html;charset=UTF-8');
	parse_str($_SERVER['QUERY_STRING'],$sarr);

 	function getlist($sql){
	$mysqli = new mysqli('localhost','mwba','123456','mwba');
	mysqli_set_charset($mysqli ,'utf8');
	if(mysqli_errno($mysqli )){
      	echo mysqli_error($mysqli);
	}else{
    	
	};

	$res = mysqli_query($mysqli ,$sql);
	while($list = mysqli_fetch_assoc($res)){
         $arr[] = $list;
	//$newarr = json_encode($arr);		

	}		
	return $arr ;        
}

    $sql  ="SELECT * FROM users";
 	$res = getlist($sql);
 	$flag = 0;
	$reslength = count($res);
	for($x=0;$x<$reslength;$x++){
		if($sarr['username'] == $res[$x]['username'] ){
			if($sarr['password'] == $res[$x]['psd'] ){
				echo'1';
				break;
			}else{
				echo'0';
				break;
			}
		}else{
			$flag++;	
		}
	}
	if($flag==$reslength){
				echo'2';	
			}
			
 ?>