<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");
 
 
    
    if (!isset($_POST['id'])) { $id_annonce = ""; }
    else { $id_annonce = trim(strip_tags(addslashes($_POST['id']))); }
    
    if (!isset($_POST['nom_prenom'])){$nom_prenom = "";}
    else {$nom_prenom = trim(strip_tags(addslashes($_POST['nom_prenom'])));}
    
    if (!isset($_POST['email'])){$email = "";}
    else {$email = trim(strip_tags(addslashes($_POST['email'])));}
    
    if (!isset($_POST['adresse'])){$adresse = "";}
    else {$adresse = trim(strip_tags(addslashes($_POST['adresse'])));}

    if (!isset($_POST['codePostal'])){$code_postal = "";}
    else {$code_postal = trim(strip_tags(addslashes($_POST['codePostal'])));}

    if (!isset($_POST['ville'])){$ville = "";}
    else {$ville = trim(strip_tags(addslashes($_POST['ville'])));}
    
    if (!isset($_POST['tel'])){$tel = "";}
    else {$tel = trim(strip_tags(addslashes($_POST['tel'])));}
    
    if (!isset($_POST['mot_de_passe'])){$mot_de_passe = "";}
    else {$mot_de_passe = trim(strip_tags(addslashes($_POST['mot_de_passe'])));}
    
    if (!isset($_POST['newsletters'])){$newsletters = "non";}
    else {$newsletters = "oui";}

    if (!isset($_POST['emailClient'])){$emailClient = "non";}
    else {$emailClient = trim(strip_tags(addslashes($_POST['emailClient'])));}
    
    if (!isset($_POST['nameClient'])){$nameClient = "non";}
    else {$nameClient = trim(strip_tags(addslashes($_POST['nameClient'])));}
    
  

    $return = '';

    
    // établir la connexion à notre base MySQL.
    include ("connexion.php");
    
    // On vérifie si il y a déjà un client à cet email
    $req = "SELECT COUNT(id) FROM clients WHERE email = '".$email."'";
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    
    // Le client acheteur n'existe pas dans la base
    $Login = '';
    $Username = '';
    if ($col[0] == 0)
    {
        $Login = $email;
        $Username = $nom_prenom;

        setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
        date_default_timezone_set('Europe/Paris');
        $date=date('d/m/Y H:i:s');
        
        //enregistrer dans la base MySQL le contenu des informations
        $statut ="User";
        $req = "INSERT INTO clients (" . 
                            "nom_prenom, email, adresse, code_postal, ville, tel, mot_de_passe, date_inscription, statut, newsletters" .
                            ") VALUES (" .
                            "'" . $nom_prenom . "', " .
                            "'" . $email . "', " .
                            "'" . $adresse . "', " .
                            "'" . $code_postal . "', " .
                            "'" . $ville . "', " .
                            "'" . $tel . "', " .
                            "'" . $mot_de_passe . "', " .
                            "'" . $date . "', " .
                            "'" . $statut . "', " .
                            "'" . $newsletters . "') "; 
        $ret = $cnx->exec($req);				
    }
    // Le client acheteur existe dans la base
    // On met à jour son adresse et sa ville
    else
    {
        $Login = $emailClient;
        $Username = $nameClient;

        $req = "UPDATE clients 
        SET 
            code_postal = '".$code_postal."',
            ville = '".$ville."'				
        WHERE
            email = '".$email."'
        ";

        $ret = $cnx->exec($req);
    }

    ////////////////////////////
    //////////////////////////
    /////////////////////////
// STATUT	TYPE	RESULT
// user		0		REPONSE DE USER VERS VENDEUR
// user		1		NOUVEAU MESSAGE DE USER VERS VENDEUR
// admin	0		REPONSE DE ADMIN VERS USER
// admin	1		NEWSLETTERS DE ADMIN VERS TOUS LES CLIENTS ABONNES NEWSLETTERS

	setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
	date_default_timezone_set('Europe/Paris');
	
	// établir la connexion à notre base MySQL.
	include ("connexion.php");
	
	// Récupère les variables de session
	// $Login = $emailClient;
    // $Username = $nameClient;
	
	// Requete pour recuperer les messages et statut de l'expéditeur
	$req = "	SELECT messages
				FROM clients
				WHERE email 
				LIKE '".$Login."'
			";
			
	$sth = $cnx->prepare($req);
	$sth->execute();
	$col = $sth->fetch(PDO::FETCH_BOTH);
	$MESSAGES = $col[0];
    
    include ("connexion.php");
    // Requete pour recuperer la ref, nom_prenom et titre de l'annonce à acheter
	$req = "	SELECT ref, A_nom_prenom, titre, prix
                FROM images
                WHERE img_id 
                LIKE '".$id_annonce."'
            ";

    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    $Ref = $col[0];
    $Nom_prenom = $col[1];
    $titre = $col[2];
    $prix = $col[3];
	
	// Formatage du message pour la DB
    // EXPEDITEUR + DESTINATAIRE + DATE + OBJET + CORPS
    // On crée le message et l'objet
    $Objet = $Username . " - En attente de paiement : " . $Nom_prenom . " (" . $prix . " €).";
    $Message = "Mr " . $Username . " a fait une demande d'achat pour la référence : " . $Ref . ".\r\nDocument de " . $Nom_prenom . ". \r\n\"" . $titre . "\".\r\n" . $prix . "€.";

	$exp = "#EXPEDITEUR#" . $Username;
    $desti = "#DESTINATAIRE#" . "Chabaud François";
	$date = "#DATE#" . date('d/m/Y H:i:s');
	$objet = "#OBJET#" . $Objet;
	$message = "#CORPS#" . $Message;
	$fin = "#FIN#";
    
    // On concatene pour former le message formaté
    $mess = $exp.$desti.$date.$objet.$message.$fin;
	
	// On concatene tous les autres messages de la base avec le nouveau
	$MESSAGES = addslashes($mess.$MESSAGES);
	
	// Requete pour enregistrer le message sur le compte de l'expéditeur
	$req = "UPDATE clients SET messages = '".$MESSAGES."' WHERE email = '".$Login."'";
	$ret = $cnx->exec($req);
	
	
	// MESSAGE CLIENT POUR LE VENDEUR ADMIN
	
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


    setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
    date_default_timezone_set('Europe/Paris');
    $date=date('d/m/Y H:i:s');

    // Requete pour enregistrer le statut "etat_annonce" sur l'annonce réservée'
	$req = "UPDATE images SET etat_annonce = '".$Login."', date_etat = '".$date."' WHERE img_id = '".$id_annonce."'";
    $ret = $cnx->exec($req);
    

    echo json_encode($ret);
?>