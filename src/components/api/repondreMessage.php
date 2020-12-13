<?php

// STATUT	TYPE	RESULT
// user		0		REPONSE DE USER VERS VENDEUR
// user		1		NOUVEAU MESSAGE DE USER VERS VENDEUR
// admin	0		REPONSE DE ADMIN VERS USER
// admin	1		NEWSLETTERS DE ADMIN VERS TOUS LES CLIENTS ABONNES NEWSLETTERS


// On envoie aussi en doublon un email automatique vers la boite email perso 
// en plus du message envoyé sur la messagerie interne du site
// L'utilisateur recevra donc un message sur sa messagerie privé du site et un autre message sur sa boite perso.
        

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");


    // ####################### //
    // ####################### //
    // Import PHPMailer classes into the global namespace
    // These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    // Load Composer's autoloader
    require 'vendor/autoload.php';

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer(true);

    // L'email est envoyé du compte mail Hostinger (oldpapergallery)
    // Récupère les infos de connexion email de HOSTINGER.
    include ("emailHostinger.php");

    // Récupère les infos de connexion email de ADMIN vendeur.
    include ("emailAdmin.php");

    // EMAIL EXPEDITEUR
    $email_exp = $email_hostinger;
    $name_exp = $name_hostinger;
    $mdp_exp = $mdp_hostinger;

    // ####################### //
    // ####################### //

    
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
    

    // Init valeur de retour
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


        // ******************************************** // 
        // Configure l'envoie de l'email avec phpMailer //
        // Récupère les infos de connexion de ADMIN.    //
        // ******************************************** // 

        // EMAIL DU DESTINATAIRE --> LE VENDEUR
        $email_dst = $email_admin;
        $name_dst = $name_admin;

        // EMAIL POUR LA REPONSE --> LE CLIENT
        $reply_email = $Login;
        $reply_name = $Username;

        // Conversion message en html pour les auts de lignes
        $messageHtml = str_replace('<br />', '<br/>', $Message);

        // Essaye d'envoyer l'email avec PHP MAILER sur le compte du vendeur ADIMN
        try {
            include ("envoieEmail.php");
            $return = $mail->send();
        }
        catch(Exception $e)
        {
            $return = $mail->ErrorInfo;
        }

    }
    else if (($STATUT == "Admin") && ($type == 1)) // ENVOIE DE NEWSLETTERS POUR TOUS LES CLIENTS ABONNES
    {		
        // Requete pour recuperer les messages des destinataires (clients abonnés)
        $req = "SELECT id, messages, nom_prenom, email
                FROM clients
                WHERE statut = 'User'
                AND newsletters = 'oui'
            ";

        $sth = $cnx->prepare($req, array(PDO::ATTR_CURSOR, PDO::CURSOR_SCROLL));
        $sth->execute();

        //####################
        // EMAIL POUR LA REPONSE --> LE VENDEUR ADMIN
        $reply_email = $email_admin;
        $reply_name = $name_admin;
        //####################

        // Conversion message en html pour les auts de lignes
        $messageHtml = str_replace('<br />', '<br/>', $Message);

        while ($col = $sth->fetch(PDO::FETCH_NUM, PDO::FETCH_ORI_NEXT))
        {
            // Récupère ID et MESSAGE de chaque client abonnés aux newsletters
            $ID = $col[0];
            $MESSAGES = $col[1];
            $nomClient = $col[2];
            $emailClient = $col[3];

            // On concatene tous les autres messages de la base avec le nouveau
            $MESSAGES = addslashes($mess.$MESSAGES);

            // Requete pour enregistrer les messages sur les comptes des destinataires (tous les clients abonnés)
            $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE id = '".$ID."'";
            $ret = $cnx->exec($req);


            // ******************************************** // 
            // Configure l'envoie de l'email avec phpMailer //
            // Récupère les infos de connexion de ADMIN.    //
            // ******************************************** // 

            // EMAIL DU DESTINATAIRE --> LE VENDEUR
            $email_dst = $emailClient;
            $name_dst = $nomClient;

            // Essaye d'envoyer l'email avec PHP MAILER sur le compte du client
            try {
                include ("envoieEmail.php");
                $return = $mail->send();
            }
            catch(Exception $e)
            {
                $return = $mail->ErrorInfo;
            }

        }
    }
    else if (($STATUT == "Admin") && ($type == 0)) // REPONSE DE ADMIN VERS USER
    {
        // Requete pour recuperer le messages du destinataire (client)
        $req = "	SELECT messages, email
                FROM clients
                WHERE nom_prenom 
                LIKE '".$dest."'
            ";
            
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        $MESSAGES = $col[0];
        $emailClient = $col[1];

        // On concatene tous les autres messages de la base avec le nouveau
        $MESSAGES = addslashes($mess.$MESSAGES);

        // Requete pour enregistrer le messages sur le compte du destinataire (client)
        $req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE nom_prenom = '".$dest."'";
        $ret = $cnx->exec($req);


        // ******************************************** // 
        // Configure l'envoie de l'email avec phpMailer //
        // Récupère les infos de connexion de ADMIN.    //
        // ******************************************** // 

        // EMAIL DU DESTINATAIRE --> LE CLIENT
        $email_dst = $emailClient;
        $name_dst = $dst;

        // EMAIL POUR LA REPONSE --> LE VENDEUR
        $reply_email = $email_admin;
        $reply_name = $name_admin;

        // Conversion message en html pour les auts de lignes
        $messageHtml = str_replace('<br />', '<br/>', $Message);

        // Essaye d'envoyer l'email avec PHP MAILER sur le compte du client
        try {
            include ("envoieEmail.php");
            $return = $mail->send();
        }
        catch(Exception $e)
        {
            $return = $mail->ErrorInfo;
        }
    }
    

    echo json_encode($return);
?>