<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    if (!isset($_POST['nom_prenom'])){$nom_prenom = "";}
    else {$nom_prenom = trim(strip_tags(addslashes($_POST['nom_prenom'])));}
    
    if (!isset($_POST['email'])){$email = "";}
    else {$email = trim(strip_tags(addslashes($_POST['email'])));}
    
    if (!isset($_POST['adresse'])){$adresse = "";}
    else {$adresse = trim(strip_tags(addslashes($_POST['adresse'])));}
    
    if (!isset($_POST['tel'])){$tel = "";}
    else {$tel = trim(strip_tags(addslashes($_POST['tel'])));}
    
    if (!isset($_POST['mot_de_passe'])){$mot_de_passe = "";}
    else {$mot_de_passe = trim(strip_tags(addslashes($_POST['mot_de_passe'])));}
    
    if (!isset($_POST['newsletters'])){$newsletters = "non";}
    else {$newsletters = "oui";}
            
    
    // On vérifie si il y a déjà un client à cet email
    $req = "SELECT COUNT(id) FROM clients WHERE email = '".$email."'";
    $sth = $cnx->prepare($req);
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    
    // valeur par defaut à 2 pour signaler qu'il y a dejà un client à cette adresse
    $return = 2;
    if ($col[0] == 0)
    {
        setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
        date_default_timezone_set('Europe/Paris');
        $date=date('d/m/Y H:i:s');
        
        //enregistrer dans la base MySQL le contenu des informations
        $statut ="user";
        $req = "INSERT INTO clients (" . 
                            "nom_prenom, email, adresse, tel, mot_de_passe, date_inscription, statut, newsletters" .
                            ") VALUES (" .
                            "'" . $nom_prenom . "', " .
                            "'" . $email . "', " .
                            "'" . $adresse . "', " .
                            "'" . $tel . "', " .
                            "'" . $mot_de_passe . "', " .
                            "'" . $date . "', " .
                            "'" . $statut . "', " .
                            "'" . $newsletters . "') "; 
        $return = $cnx->exec($req);
    }

    echo json_encode($return);
?>