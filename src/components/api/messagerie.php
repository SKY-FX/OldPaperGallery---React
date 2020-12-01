<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

    if (!isset($_POST['nom_prenom'])){$nom_prenom = "";}
    else {$nom_prenom = trim(strip_tags(addslashes($_POST['nom_prenom'])));}
    
    $text_mess = '';
    $tab_mess[0]['EXP'] = '';

    if ($nom_prenom)
    {    
        include ("connexion.php");
        
        $req = "SELECT messages FROM clients WHERE nom_prenom LIKE '".$nom_prenom."' ";
        $sth = $cnx->prepare($req);
        $sth->execute();
        $col = $sth->fetch(PDO::FETCH_BOTH);
        $text_mess = $col[0];
        
        $NB_MESS = substr_count($text_mess, '#FIN#');
        $findEXP = "#EXPEDITEUR#";
        $findDEST = "#DESTINATAIRE#";
        $findDATE = "#DATE#";
        $findOBJET = "#OBJET#";
        $findCORPS = "#CORPS#";
        $findFIN = "#FIN#";

        // IL Y A NB MESSAGE
        if($NB_MESS!=0)
        {
            for ($ii=0; $ii<$NB_MESS; $ii++) 
            {
                $pos_fin = strpos($text_mess, $findFIN);
                $pos_dest = strpos($text_mess, $findDEST);
                $pos_exp = strpos($text_mess, $findEXP);
                $pos_date = strpos($text_mess, $findDATE);
                $pos_objet = strpos($text_mess, $findOBJET);
                $pos_corps = strpos($text_mess, $findCORPS);
                
                $tab_mess[$ii]['EXP'] = substr($text_mess, $pos_exp+strlen($findEXP), $pos_dest-strlen($findEXP)); // EXP
                $tab_mess[$ii]['DST'] = substr($text_mess, $pos_dest+strlen($findDEST), $pos_date-($pos_dest+strlen($findDEST))); // DST
                $tab_mess[$ii]['DATE'] = substr($text_mess, $pos_date+strlen($findDATE), $pos_objet-($pos_date+strlen($findDATE))); // DATE
                $tab_mess[$ii]['OBJET'] = substr($text_mess, $pos_objet+strlen($findOBJET), $pos_corps-($pos_objet+strlen($findOBJET))); // OBJET
                $tab_mess[$ii]['CORPS'] = substr($text_mess, $pos_corps+strlen($findCORPS), $pos_fin-($pos_corps+strlen($findCORPS))); // MESSAGER
            
                $text_mess = substr($text_mess, $pos_fin+strlen($findFIN));

            }
        }
        else
        {
            // AUCUN MESSAGE
        }
    }
    else
    {
        // AUCUNE SESSION CONNECTEE
    }

    echo json_encode($tab_mess);
?>