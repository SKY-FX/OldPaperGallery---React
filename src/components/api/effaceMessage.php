<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    if (!isset($_POST['date'])){$dateAeffacer = "";}
    else {$dateAeffacer = trim(strip_tags(addslashes($_POST['date'])));}
    
    if (!isset($_POST['emailClient'])){$emailClient = "";}
    else {$emailClient = trim(strip_tags(addslashes($_POST['emailClient'])));}

    $return = '';

    $req = "SELECT messages FROM clients WHERE email LIKE '".$emailClient."' ";
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch();
    $text_mess = $col[0];
    
    $NB_MESS = substr_count($text_mess, '#FIN#');
    $findEXP = "#EXPEDITEUR#";
    $findDEST = "#DESTINATAIRE#";
    $findDATE = "#DATE#";
    $findOBJET = "#OBJET#";
    $findCORPS = "#CORPS#";
    $findFIN = "#FIN#";
        
    $MESSAGES = "";
    for ($ii=0; $ii<$NB_MESS; $ii++)
    {
        // $text_mess =
        $pos_fin = strpos($text_mess, $findFIN);
        $pos_dest = strpos($text_mess, $findDEST);
        $pos_exp = strpos($text_mess, $findEXP);
        $pos_date = strpos($text_mess, $findDATE);
        $pos_objet = strpos($text_mess, $findOBJET);
        $pos_corps = strpos($text_mess, $findCORPS);
        
        $exp = "#EXPEDITEUR#" . substr($text_mess, $pos_exp+strlen($findEXP), $pos_dest-strlen($findEXP)); // EXP
        $dest = "#DESTINATAIRE#" . substr($text_mess, $pos_dest+strlen($findDEST), $pos_date-($pos_dest+strlen($findDEST))); // DST
        $_mess_date = substr($text_mess, $pos_date+strlen($findDATE), $pos_objet-($pos_date+strlen($findDATE))); // DATE
        $mess_date = "#DATE#" . $_mess_date;
        $objet = "#OBJET#" . substr($text_mess, $pos_objet+strlen($findOBJET), $pos_corps-($pos_objet+strlen($findOBJET))); // OBJET
        $mess = "#CORPS#" . substr($text_mess, $pos_corps+strlen($findCORPS), $pos_fin-($pos_corps+strlen($findCORPS))); // MESSAGE
        $fin = "#FIN#";

        // On compare sur les dates:
        // Si différent alors construit le message
        // Sinon on ne le construit pas --> efface le message
        if ($_mess_date != $dateAeffacer)
        {
            // Formatage du message pour la DB
            // EXPEDITEUR + DESTINATAIRE + DATE + OBJET + CORPS
            $Messages = $exp.$dest.$mess_date.$objet.$mess.$fin;
            
            // On concatene tous les autres messages de la base avec le nouveau
            $MESSAGES = $MESSAGES.$Messages;
            // echo $Messages;
        }

        // Sélectionne le message suivant
        $text_mess = substr($text_mess, $pos_fin+strlen($findFIN));		
        
    }

    $_mess = addslashes($MESSAGES);

    // Requete pour enregistrer le message sur le compte de l'expéditeur
    $req = "UPDATE clients SET messages = '".$_mess."' WHERE email = '".$emailClient."'";
    $return = $cnx->exec($req);


    echo json_encode($return);
?>