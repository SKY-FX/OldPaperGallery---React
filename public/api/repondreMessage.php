<?php

// STATUT	TYPE	RESULT
// user		0		REPONSE DE USER VERS VENDEUR
// user		1		NOUVEAU MESSAGE DE USER VERS VENDEUR
// admin	0		REPONSE DE ADMIN VERS USER
// admin	1		NEWSLETTERS DE ADMIN VERS TOUS LES CLIENTS ABONNES NEWSLETTERS

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    if (!isset($_POST['type'])){$type = "";}
    else {$type = trim(strip_tags(addslashes($_POST['type'])));}


    if (!isset($_POST['dest'])){$dest = "";}
    else {$dest = trim(strip_tags($_POST['dest']));}

    if (!isset($_POST['exp'])){$expediteur = "";}
    else {$expediteur = trim(strip_tags($_POST['exp']));}

    if (!isset($_POST['objet'])){$Objet = "";}
    else {$Objet = trim(strip_tags($_POST['objet']));}

    if (!isset($_POST['message'])){$Message = "";}
    else {$Message = nl2br(trim(strip_tags($_POST['message'])));}



    if (!isset($_POST['clientEmail'])){$Login = "";}
    else {$Login = trim(strip_tags(addslashes($_POST['clientEmail'])));}

    if (!isset($_POST['clientName'])){$Username = "";}
    else {$Username = trim(strip_tags($_POST['clientName']));}
    


    $return = "";


    // Requete pour recuperer les messages de l'expéditeur
	$req = "	SELECT messages, statut
                FROM clients
                WHERE email 
                LIKE '".$Login."'
            ";

    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    $MESSAGES = $col[0];
    $STATUT = $col[1];

    // Formatage du message pour la DB
    // EXPEDITEUR + DESTINATAIRE + DATE + OBJET + CORPS
    $exp = "#EXPEDITEUR#" . $Username;
    if (($STATUT == "Admin") && ($type == 1)) {$desti = "#DESTINATAIRE#" . "Tous les abonnés";}
    else if ($STATUT == "User") {$desti = "#DESTINATAIRE#" . "Chabaud François";}
    else if (($STATUT == "Admin") && ($type == 0)) {$desti = "#DESTINATAIRE#" . $dest;}
    $date = "#DATE#" . date('d/m/Y H:i:s');
    $objet = "#OBJET#" . $Objet;
    $message = "#CORPS#" . $Message;
    $fin = "#FIN#";
    $mess = $exp.$desti.$date.$objet.$message.$fin;

    // On concatene tous les autres messages de la base avec le nouveau
    $MESSAGES = addslashes($mess.$MESSAGES);

    // Requete pour enregistrer le message sur le compte de l'expéditeur
    $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE email = '".$Login."'";
    $ret = $cnx->exec($req);


    if ($STATUT == "User") // MESSAGE CLIENT POUR LE VENDEUR (NOUVEAU OU REPONSE)
    {
        // Requete pour recuperer les messages du destinataire (vendeur OLD PAPER GALLERY)
        $req = "	SELECT messages
                FROM clients
                WHERE statut 
                LIKE 'Admin'
            ";
            
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        $MESSAGES = $col[0];

        // On concatene tous les autres messages de la base avec le nouveau
        $MESSAGES = addslashes($mess.$MESSAGES);

        // Requete pour enregistrer les messages sur le compte du destinataire (vendeur OLD PAPER GALLERY)
        $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE statut = 'Admin'";
        $ret = $cnx->exec($req);
    }
    else if (($STATUT == "Admin") && ($type == 1)) // ENVOIE DE NEWSLETTERS POUR TOUS LES CLIENTS ABONNES
    {		
        // Requete pour recuperer les messages des destinataires (clients abonnés)
        $req = "	SELECT id, messages
                FROM clients
                WHERE statut = 'User'
                AND newsletters = 'oui'
            ";

        $sth = $cnx->prepare($req, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
        $sth->execute();

        while ($col = $sth->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT))
        {
            // Récupère ID et MESSAGE de chaque client abonnés aux newsletters
            $ID = $col[0];
            $MESSAGES = $col[1];

            // On concatene tous les autres messages de la base avec le nouveau
            $MESSAGES = addslashes($mess.$MESSAGES);

            // Requete pour enregistrer les messages sur les comptes des destinataires (tous les clients abonnés)
            $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE id = '".$ID."'";
            $ret = $cnx->exec($req);
        }
    }
    else if (($STATUT == "Admin") && ($type == 0)) // REPONSE DE ADMIN VERS USER
    {
        // Requete pour recuperer le messages du destinataire (client)
        $req = "	SELECT messages
                FROM clients
                WHERE nom_prenom 
                LIKE '".$dest."'
            ";
            
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        $MESSAGES = $col[0];

        // On concatene tous les autres messages de la base avec le nouveau
        $MESSAGES = addslashes($mess.$MESSAGES);

        // Requete pour enregistrer le messages sur le compte du destinataire (client)
        $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE nom_prenom = '".$dest."'";
        $ret = $cnx->exec($req);
    }

    echo json_encode($ret);
?>