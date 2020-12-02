<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

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
    else if ($type==2)
    {
        $return = "mailto:" . $acheteur_email
            ."?cc=" . $vendeur_email
            ."&subject="
                ."Facture 12456 : " . $acheteur_nom . " - Achat article " . $annonce_ref . " - " . $annonce_nomAuteur . " - OLD PAPER GALLERY"
            ."&body="
                ."FACTURE : 12456                                 Fait le " . $currentDate . "%0D%0A%0D%0A"
                
                ."Pour " . $acheteur_nom . "%0D%0A" 
                . $acheteur_email . "%0D%0A"  
                . $acheteur_adresse . "%0D%0A"
                . $acheteur_codePostal . " " . $acheteur_ville . "%0D%0A%0D%0A"
                
                ."Type article : " . $annonce_typeDoc . "%0D%0A"
                ."Auteur : " . $annonce_nomAuteur . "%0D%0A"
                ."Titre : " . $annonce_titre . "%0D%0A"
                ."Code article : " . $annonce_ref . "%0D%0A"
                ."Prix : " . $annonce_prix . " euros %0D%0A%0D%0A"
                
                ."Achat de cet article le " . $buildDate . " par " . $acheteur_nom . ".%0D%0A%0D%0A"
        
                ."OLD PAPER GALLERY" . "%0D%0A"
                ."2 rue de la Concorde" . "%0D%0A"
                ."33000 Bordeaux"
        ;
    }


    echo json_encode($return);
?>