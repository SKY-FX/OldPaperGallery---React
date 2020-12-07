<?php
    
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    
    if (!isset($_POST['id'])){$id = "";}
    else {$id = htmlspecialchars(trim($_POST['id']));}

    $id = intval ($id);
    $return = $id;
    
    include ("connexion.php");

    // On récupère la ref de l'annonce pour la suprimer sur le serveur
    $req = "SELECT ref FROM images WHERE img_id = '".$id."'";
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    $ref = $col[0];
    
    if ($ref!='')
    {
        $req = "DELETE FROM images WHERE img_id=" . $id;
        $sth = $cnx->prepare($req);
        $return = $sth->execute();	

        if ($return)
        {
            echo "L'annonce a été effacée en base\n";

            

            // Supprime les images et le répertoire parent de Hostinger via FTP
            include ("deletePicToFtp.php");	
        }
        else
        {
            echo "Un prôblème est survenue lors de la suppression de l'annonce en base\n";
        }
    }
    else
    {
        echo "Il n'y a pas de référence pour l'annonce avec l'id : $id\n";
    }
    
    echo json_encode($return);
?>
