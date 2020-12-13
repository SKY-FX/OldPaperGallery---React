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

    if (!isset($_POST['exp'])){$expediteur = "";}
    else {$expediteur = trim(strip_tags($_POST['exp']));}

    if (!isset($_POST['objet'])){$Objet = "";}
    else {$Objet = trim(strip_tags($_POST['objet']));}

    if (!isset($_POST['message'])){$Message = "";}
    else {$Message = nl2br(trim(strip_tags($_POST['message'])));}



    if (!isset($_POST['clientEmail'])){$clientEmail = "";}
    else {$clientEmail = trim(strip_tags(addslashes($_POST['clientEmail'])));}

    if (!isset($_POST['clientName'])){$clientName = "";}
    else {$clientName = trim(strip_tags($_POST['clientName']));}
    

    // Init valeur de retour
    $return = "";

    // ******************************************** // 
    // Configure l'envoie de l'email avec phpMailer //
    // Récupère les infos de connexion de ADMIN.    //
    // ******************************************** // 

    // EMAIL DU DESTINATAIRE --> LE VENDEUR
    $email_dst = $email_admin;
    $name_dst = $name_admin;

    // EMAIL POUR LA REPONSE --> LE CLIENT
    $reply_email = $clientEmail;
    $reply_name = $clientName;

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
    

    echo json_encode($return);
?>