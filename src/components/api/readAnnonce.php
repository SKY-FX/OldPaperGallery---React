<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    if (!isset($_POST['id'])){$id = "";}
    else {$id = trim(strip_tags(addslashes($_POST['id'])));}

    // On vérifie si il y a des images dans la base de donnée
    $req = "SELECT COUNT(img_id) as countid FROM images WHERE img_id LIKE '%".$id."%'";
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    $NB_ELEMENT = $col[0];

    $return = 0;
    if ($NB_ELEMENT)
    {
        $req = "SELECT img_nom1, img_nom2, img_nom3, img_nom4, img_nom5, titre, discipline, prix, etat, notice, infos, dimension, A_biographie, A_nom_prenom, A_profession, A_annees, A_lieu, D_nom_prenom, D_profession, D_annees, D_lieu, type_doc, img_portrait, ref, certificat FROM images WHERE img_id LIKE '%".$id."%'";
        
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        
        if ($col[6]=="")
        {
            $col[6]="Sélectionnez une discipline";
        }

        if ($col[21]=="")
        {
            $col[21]="Sélectionnez un type de document";
        }

        if ($col[24]=="")
        {
            $col[24]="Certificat d'authenticité ?";
        }

        $return = $col;
    }
    

    echo json_encode($return);
?>