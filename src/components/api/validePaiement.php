<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // Import PHPMailer classes into the global namespace
    // These must be at the top of your script, not inside a function
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    // Load Composer's autoloader
    require 'vendor/autoload.php';
    

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    setlocale (LC_TIME, 'fr_FR.utf8','fra');  
    date_default_timezone_set('Europe/Paris');
    $currentDate=date('d/m/Y H:i:s');

    if (!isset($_POST['type'])) {$type = "";} else {$type = $_POST['type'];}
    if (!isset($_POST['acheteur_email'])) {$acheteur_email = "";} else {$acheteur_email = $_POST['acheteur_email'];}
    if (!isset($_POST['annonce_ref'])) {$annonce_ref = "";} else {$annonce_ref = $_POST['annonce_ref'];}
    

    if (!isset($_POST['buildDate'])) {$buildDate = "";} else {$buildDate = $_POST['buildDate'];}
    if (!isset($_POST['vendeur_email'])) {$vendeur_email = "";} else {$vendeur_email = $_POST['vendeur_email'];}
    if (!isset($_POST['acheteur_email'])) {$acheteur_email = "";} else {$acheteur_email = $_POST['acheteur_email'];}
    if (!isset($_POST['acheteur_nom'])) {$acheteur_nom = "";} else {$acheteur_nom = $_POST['acheteur_nom'];}
    if (!isset($_POST['acheteur_adresse'])) {$acheteur_adresse = "";} else {$acheteur_adresse = $_POST['acheteur_adresse'];}
    if (!isset($_POST['acheteur_codePostal'])) {$acheteur_codePostal = "";} else {$acheteur_codePostal = $_POST['acheteur_codePostal'];}
    if (!isset($_POST['acheteur_ville'])) {$acheteur_ville = "";} else {$acheteur_ville = $_POST['acheteur_ville'];}
    if (!isset($_POST['annonce_typeDoc'])) {$annonce_typeDoc = "";} else {$annonce_typeDoc = $_POST['annonce_typeDoc'];}
    if (!isset($_POST['annonce_nomAuteur'])) {$annonce_nomAuteur = "";} else {$annonce_nomAuteur = $_POST['annonce_nomAuteur'];}
    if (!isset($_POST['annonce_titre'])) {$annonce_titre = "";} else {$annonce_titre = $_POST['annonce_titre'];}
    if (!isset($_POST['annonce_prix'])) {$annonce_prix = "";} else {$annonce_prix = $_POST['annonce_prix'];}
    
    
    $return = '';
    if ($type!=2)
    {
        // Si type = 0 : Annonce vendu
        if ($type==0)
        {
            $etat_annonce = "vendu à " . $acheteur_email;
        }
        // Si type = 1 : Annonce remis en vente
        else if ($type==1)
        {
            $etat_annonce = "";
        }

        $req = "UPDATE images 
                    SET etat_annonce = '".$etat_annonce."',
                        date_etat = '".$currentDate."'
                    WHERE etat_annonce = '".$acheteur_email."' 
                    AND ref = '".$annonce_ref."'   
                "; 
                
        $return = $cnx->exec($req); 

    }
    else if ($type==2) // Envoie EMAIL POUR LA FACTURE
    {
        // La facture est envoyé du compte mail Hostinger (oldpapergallery)
        // vers le compte mail du client acheteur
        // Si le client répond à l'email depuis sa boite perso alors :
        // l'email est envoyé su le compte mail de ADMIN
        
        // Récupère les infos de connexion de HOSTINGER.
        include ("emailHostinger.php");

        // Récupère les infos de connexion de ADMIN.
        include ("emailAdmin.php");

        // EMAIL DU DESTINATAIRE
        $email_dst = $acheteur_email;
        $name_dst = $acheteur_nom;

        // EMAIL DEEXPEDITEUR
        $email_exp = $email_hostinger;
        $name_exp = $name_hostinger;
        $mdp_exp = $mdp_hostinger;

        // EMAIL POUR LA REPONSE
        $reply_email = $email_admin;
        $reply_name = $name_admin;

        // Instantiation and passing `true` enables exceptions
        $mail = new PHPMailer(true);

        try {
            $mail->Debugoutput = 'html';
            $mail->SMTPDebug  = 2;

            // SMTP configuration
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';
            
            // Gmail smpt configuration
            $mail->Host = $host;
            $mail->Port = $port;

            // Identifiant gmail
            $mail->Username = $email_exp;
            $mail->Password = $mdp_exp;
        
            // From email address and name
            $mail->setFrom($email_exp, $name_exp);

            // Give the User email to response the email
            $mail->AddReplyTo($reply_email, $reply_name);
            
            //To address and name
            $mail->addAddress($email_dst, $name_dst);

            // // Send HTML or Plain Text email
            $mail->isHTML(true);

            $mail->Subject = "Facture 12456 : $acheteur_nom - Achat article $annonce_ref - $annonce_nomAuteur - OLD PAPER GALLERY";
            $mail->Body = "
                
                <b>Facture 12456</b> <br/>
                Fait le $currentDate <br/><br/>
                
                <b>Acheteur</b> <br/>
                $acheteur_nom <br/>
                $acheteur_email <br/>
                $acheteur_adresse <br/>
                $acheteur_codePostal $acheteur_ville <br/><br/>
        
                <b>Article</b> <br/>
                <u>Type article</u> : $annonce_typeDoc <br/>
                <u>Auteur</u> : $annonce_nomAuteur <br/>
                <u>Titre</u> : $annonce_titre <br/>
                <u>Code article</u> : $annonce_ref <br/>
                <u>Prix</u> : $annonce_prix euros <br/><br/>
                
                Achat de cet article le $buildDate par $acheteur_nom <br/><br/>
        
                <b>Vendeur</b> <br/>
                OLD PAPER GALLERY <br/>
                2 rue de la Concorde <br/>
                33000 Bordeaux <br/>
                $vendeur_email
            ";
            
            // // Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        

            $return = $mail->send();
        }
        catch(Exception $e)
        {
            $return = $mail->ErrorInfo;
        }

        

        // $return = "mailto:" . $acheteur_email
        //     ."?cc=" . $vendeur_email
        //     ."&subject="
        //         ."Facture 12456 : " . $acheteur_nom . " - Achat article " . $annonce_ref . " - " . $annonce_nomAuteur . " - OLD PAPER GALLERY"
        //     ."&body="
        //         ."FACTURE : 12456                                 Fait le " . $currentDate . "%0D%0A%0D%0A"
                
        //         ."Pour " . $acheteur_nom . "%0D%0A" 
        //         . $acheteur_email . "%0D%0A"  
        //         . $acheteur_adresse . "%0D%0A"
        //         . $acheteur_codePostal . " " . $acheteur_ville . "%0D%0A%0D%0A"
                
        //         ."Type article : " . $annonce_typeDoc . "%0D%0A"
        //         ."Auteur : " . $annonce_nomAuteur . "%0D%0A"
        //         ."Titre : " . $annonce_titre . "%0D%0A"
        //         ."Code article : " . $annonce_ref . "%0D%0A"
        //         ."Prix : " . $annonce_prix . " euros %0D%0A%0D%0A"
                
        //         ."Achat de cet article le " . $buildDate . " par " . $acheteur_nom . ".%0D%0A%0D%0A"
        
        //         ."OLD PAPER GALLERY" . "%0D%0A"
        //         ."2 rue de la Concorde" . "%0D%0A"
        //         ."33000 Bordeaux"
        // ;
    }


    echo json_encode($return);
?>