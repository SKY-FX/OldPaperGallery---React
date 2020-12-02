<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    if (!isset($_POST['email'])){$email = "";}
    else {$email = htmlspecialchars(trim($_POST['email']));}
    
    if (!isset($_POST['mot_de_passe'])){$mot_de_passe = "";}
    else {$mot_de_passe = htmlspecialchars(trim($_POST['mot_de_passe']));}
        
        
    // établir la connexion à notre base MySQL.
    include ("connexion.php");
    

    // On vérifie si il y a déjà un client à cet email
    $req = "SELECT COUNT(id) FROM clients WHERE email = '".$email."'";
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    
    $return[0] = 0;
    if ($col[0] == 0)
    {
        // PAS DE CLIENT A CET EMAIL
    }
    else
    {
        $req = "SELECT mot_de_passe, nom_prenom, statut FROM clients WHERE email = '".$email."'";
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        
        // MOT DE PASSE OK
        if ($col[0] == $mot_de_passe)
        {        
            // $result = "Vous êtes connecté en tant que \" $col[1]\" !";
            // $_SESSION['username'] = $col[1];
            // $_SESSION['login'] = $email;
            // $_SESSION['pwd'] = $mot_de_passe;

            $return[0] = $col[1];
            $return[1] = $col[2];
        }
        else
        {
            // MAUVAIS MOT DE PASSE
        }
    }

    echo json_encode($return);
?>