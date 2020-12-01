<?php
    
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    
    if (!isset($_POST['id'])){$id = "";}
    else {$id = htmlspecialchars(trim($_POST['id']));}

    $id = intval ($id);
    
    include ("connexion.php");
        
    $req = "DELETE FROM images WHERE img_id=" . $id;
    $sth = $cnx->prepare($req);
    $return = $sth->execute();	

    echo json_encode($return);
?>
