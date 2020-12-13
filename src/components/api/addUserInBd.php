<?php

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
        $statut ="User";
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


    // On envoie un email au nouvel utilisateur pour la fidélité :-)
    // Init valeur de retour
    $_return = "";

    // ******************************************** // 
    // Configure l'envoie de l'email avec phpMailer //
    // Récupère les infos de connexion de ADMIN.    //
    // ******************************************** // 

    // EMAIL DU DESTINATAIRE --> LE NOUVEAU CLIENT
    $email_dst = $email;
    $name_dst = $nom_prenom;

    // EMAIL POUR LA REPONSE --> LE VENDEUR via Hostinger OLD PAPER GALLERY
    $reply_email = $email_admin;
    $reply_name = $name_admin;

    // Message HTML a envoyé
    $Objet = "Bienvenue Mr $nom_prenom sur Old Paper Gallery";
    $messageHtml = $mail->Body = "
        <h1>
            <b>Bienvenue et merci pour votre inscription !</b><br/>
        <h1/>

        <p>
            Vous pouvez désormais vous connecter sur notre site Old Paper Gallery.<br/>
            Un espace dédié vous y est réservé. Nous vendons régulièrement de nouvelles lettres autographes,<br/>
            archives, manuscrits et gravures. Vous pouvez nous répondre par cet email,<br/>
            ou directement sur notre site <a href='www.oldpapergallery.com'>Old Paper Gallery.<a/><br/><br/>

            Vos informations de connection sont les suivantes :
        <p/>

        <h3>
            Courriel : $email_dst<br/>
            Mot de passe : $mot_de_passe<br/>
        <h3/>

        <p>
            <b>En vous souhaitant une bonne visite sur notre site.</b> <br/><br/>
            OLD PAPER GALLERY <br/>
            2 rue de la Concorde <br/>
            33000 Bordeaux <br/>
            $email_admin
        <p/>
    ";

    // Essaye d'envoyer l'email avec PHP MAILER sur le compte du vendeur ADIMN
    try {
        include ("envoieEmail.php");
        $_return = $mail->send();
    }
    catch(Exception $e)
    {
        $_return = $mail->ErrorInfo;
    }

    echo json_encode($return);
?>