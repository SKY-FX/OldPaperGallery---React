<?php
	//  établir la connexion à notre base MySQL.
    $hote = 'localhost';
    $base = 'test';
    $user = 'root';
    $pass = '';
	
	$cnx = new PDO("mysql:host=$hote;dbname=$base", $user, $pass);
    $cnx->exec("SET CHARACTER SET utf8");
?>