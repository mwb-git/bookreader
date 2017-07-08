<?php
header("Access-Control-Allow-Origin: *");
header('Conent-type:type/html;charset=UTF-8');
parse_str($_SERVER['QUERY_STRING'],$sarr);
	
function add($sql){
  $mysqli = new mysqli('localhost','mwba','123456','mwba');
  mysqli_set_charset($mysqli,'utf8'); 
  if($mysqli->errno){
      echo $mysqli->error;
  }else{
   
  }
  $res = $mysqli->query($sql);
   if($res){
       return true;
   }else{
       return false;
   }

}
	$name = $sarr['username'];
	$psd = $sarr['password'];
	$sql = "INSERT INTO users (username,psd) VALUES ('$name','$psd')";
	$res = add($sql);
	if($res){        
   	echo '1';
	}else{
   	echo '0';
}
?>