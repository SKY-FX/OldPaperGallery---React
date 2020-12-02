<?php		
	header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    // On compte le nombre d'annonce dans la BDD
    $req = "SELECT 
                COUNT(img_id) as countid 
            FROM 
                images 
            WHERE 
            (
                A_nom_prenom NOT LIKE ''   
            )
            ";
            
    $sth = $cnx->prepare($req);
    $sth->execute();
    $col = $sth->fetch(PDO::FETCH_BOTH);
    $nb_element = $col[0];

    // On vérifie si il y a au moins une annonce dans la BDD
    if ($nb_element) 
    { 
        //On envoie ensuite une requête de sélection pour obtenir des infos sur les annonces
        $req = "SELECT 
            A_nom_prenom
        FROM 
            images
        ORDER BY
            A_nom_prenom
        ";

        $sth = $cnx->prepare($req);
        $sth->execute();


        // on concatene les résulats
        $i=0;
        while ( $col = $sth->fetch(PDO::FETCH_BOTH) )
        {
            // $return = $col[0];
            $return[$i] = $col[0];
            ++$i;
        }
    }

    
    echo json_encode($return);    
?>