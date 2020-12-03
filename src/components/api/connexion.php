<?php
	//  établir la connexion à notre base MySQL.
    // $hote = 'localhost';
    // $base = 'test';
    // $user = 'root';
    // $pass = 'Tatiom@00';

    $hote = 'sql190.main-hosting.eu';
    $base = 'u908793191_DB_Gallery';
    $user = 'u908793191_Sylvain';
    $pass = 'oldPaperGallery2020';
	
	$cnx = new PDO("mysql:host=$hote;dbname=$base", $user, $pass);
    // $cnx->exec("SET CHARACTER SET utf8");
?>