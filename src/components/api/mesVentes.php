<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    if (!isset($_POST['type'])){$type = "";}
    else {$type = trim(strip_tags(addslashes($_POST['type'])));}

    $result = [];


    // On récupère le contenu de soit les paiement en attente soit les vendus
    if ($type==0) // En attente
    {
        $req = "SELECT etat_annonce FROM images WHERE etat_annonce LIKE '%@%' AND etat_annonce NOT LIKE '%vendu%' ";
    
    }
    else if ($type==1) // Vendu
    {
        $req = "SELECT etat_annonce FROM images WHERE etat_annonce LIKE '%vendu%' ";
    
    }

    $sth = $cnx->prepare($req);
    $sth->execute();
    $input = $sth->fetchAll(PDO::FETCH_COLUMN, 0);
    
    
    $input = array_unique($input);
    $_col = array_values($input);
    $NB_MESS = count($_col);
    
    // Des annonces vendues ou en attentes ont été trouvées
    if ($NB_MESS!=0)
	{
        $ii=0;
        while ( $ii<$NB_MESS )
        {
        
            $StatutVente = $_col[$ii];
            if ($type==0) // En attente
            {
                $emailClient = $_col[$ii];
            }
            else if ($type==1) // Vendu
            {
                $emailClient = str_replace("vendu à ", "", $_col[$ii]);
            }
            
            // On récupère le nom de l'acheteur
            $req = "SELECT nom_prenom, email, adresse, code_postal, ville FROM clients WHERE email LIKE '".$emailClient."'";
            $sth = $cnx->prepare($req);
            $sth->execute();
            $col = $sth->fetch(PDO::FETCH_BOTH);

            

            // On récupère des données sur l'annonce réservée
            $req = "SELECT ref, A_nom_prenom, titre, prix, date_etat, type_doc FROM images WHERE etat_annonce LIKE '".$StatutVente."'";
            $sth = $cnx->prepare($req);
            $sth->execute();
            $__col = $sth->fetchAll();
            $nbElem = count($__col);
            
            for ($ind = 0; $ind<$nbElem; $ind++)
            {
                $result[$ii][$ind]['acheteur_nom'] = $col[0];
                $result[$ii][$ind]['acheteur_email'] = $col[1];
                $result[$ii][$ind]['acheteur_adresse'] = $col[2];
                $result[$ii][$ind]['acheteur_codePostal'] = $col[3];
                $result[$ii][$ind]['acheteur_ville'] = $col[4];

                $result[$ii][$ind]['annonce_ref'] = $__col[$ind][0];
                $result[$ii][$ind]['annonce_nomAuteur'] = $__col[$ind][1];
                $result[$ii][$ind]['annonce_titre'] = $__col[$ind][2];
                $result[$ii][$ind]['annonce_prix'] = $__col[$ind][3];
                $result[$ii][$ind]['annonce_date'] = $__col[$ind][4];
                $result[$ii][$ind]['annonce_typeDoc'] = $__col[$ind][5];
            }
            $ii++;
        }
    }
    else
    {
        // PAS D'ANNONCE TROUVEE
    }

    echo json_encode($result);
?>