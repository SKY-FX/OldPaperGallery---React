<?php		
	header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    $searchText = $_POST['searchText'];
    $return['titre'][0] = '';

    if ( ($searchText == 'Boutique') )
    {
        $searchText = '';
    }

    // établir la connexion à notre base MySQL.
    include ("connexion.php");

    // On compte le nombre d'annonce dans la BDD
    $req = "SELECT 
                COUNT(img_id) as countid 
            FROM 
                images 
            WHERE 
            (
                img_id LIKE '%".$searchText."%'
                OR 
                titre LIKE '%".$searchText."%'
                OR 
                A_nom_prenom LIKE '%".$searchText."%'
                OR 
                discipline LIKE '%".$searchText."%'
                OR 
                type_doc LIKE '%".$searchText."%'
                OR 
                ref LIKE '%".$searchText."%'
            )
            AND
            (
                etat_annonce LIKE '%'
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
            titre, prix, A_nom_prenom, img_id, img_nom1, ref, etat_annonce, A_profession
        FROM 
            images 
        WHERE 
            img_id LIKE '%".$searchText."%'
            OR 
            titre LIKE '%".$searchText."%'
            OR 
            A_nom_prenom LIKE '%".$searchText."%'
            OR 
            discipline LIKE '%".$searchText."%'
            OR 
            type_doc LIKE '%".$searchText."%'
            OR
            ref LIKE '%".$searchText."%'
        ";

        $sth = $cnx->prepare($req);
        $sth->execute();


        // on concatene les résulats
        $i=0;
        while ( $col = $sth->fetch(PDO::FETCH_BOTH) )
        {
            // $return = $col[0];
            $return['titre'][$i] = $col[0];
            $return['prix'][$i] = $col[1];
            $return['A_nom_prenom'][$i] = $col[2];
            $return['img_id'][$i] = $col[3];
            $return['img_nom1'][$i] = $col[4];
            $return['ref'][$i] = $col[5];
            $return['etat_annonce'][$i] = $col[6];
            $return['A_profession'][$i] = $col[7];
            ++$i;
        }
    }

    
    echo json_encode($return);    
?>