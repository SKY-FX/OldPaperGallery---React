<?php 
    // The HTML beginning tags must be there or the output won't render 
    // as a web page

    $refAnnonce = $ref;

    $basePathServer = 'uploadPics';
    $dirToModify    = $basePathServer . "/" . $refAnnonce;

    // Existe t'il au moins une ref d'annonce à supprimer
    if ($ref != '')
    {
        // Now do your FTP connection
        $ftp_server     = "oldpapergallery.com";
        $ftp_username   = "u908793191";
        $ftp_password   = "Tatiom@00";

        $conn_id = ftp_connect($ftp_server);
        $login_result = ftp_login($conn_id, $ftp_username, $ftp_password);

        // check connection
        if ((!$conn_id) || (!$login_result)) { 
            echo "La connection FTP a échouée : ";
            echo "A essayé de se connecté à $ftp_server pour l'utilisateur $ftp_username\n"; 
        } else {
            echo "Connecté à $ftp_server, pour l'utilisateur $ftp_username \n";
           
            // Mode passif activé : les données de connexion sont initiées par le client, plutôt que par le serveur
            ftp_pasv($conn_id, true); 

            // Lit le répertoire des images des annonces sur le serveur
            $dirs = ftp_nlist($conn_id, $basePathServer);
            
            $isExist = false;
            foreach($dirs as $dir_) {

                $_dir = basename($dir_);
                // echo "SORTIE REPERTOIRE : $_dir\n";

                // Vérifie que cette référence n'existe pas
                if ($refAnnonce == $_dir)
                {
                    echo "Une annonce avec la référence $refAnnonce existe et c'est bon signe !\n";
                    $isExist = true;
                    break;
                }
            }

            // Si le répertoire existe
            if ($isExist)
            {
                // Lit les images du répertoire
                $picNames = ftp_nlist($conn_id, $dirToModify);

                // On supprime toutes les images du répertoire trouvé
                foreach($picNames as $picName) {
                    $_picName = basename($picName);

                    // Vérifie qu'il ne s'agit pas des redirections '.' et '..'
                    if ( $_picName!='.' && $_picName!='..' )
                    {
                        $resultDelete = ftp_delete($conn_id, $picName);
                        if ($resultDelete) {echo "Le fichier $_picName a été supprimé de $dirToModify\n";}
                        else {echo "Un prôblème est survenue lors de la suppression de $_picName dans $dirToModify\n";}
                    }
                }

                // On supprime le répertoire parent
                $resultDelete = ftp_rmdir($conn_id, $dirToModify);
                
                if ($resultDelete!='')
                {echo "Le fichier $_picName a été supprimé de $dirToModify\n";}
                else {echo "Un prôblème est survenue lors de la suppression de $_picName dans $dirToModify\n";}
            }
            else
            {
                echo "Le répertoire $dirToModify n'existe pas sur le serveur et ne peux pas être supprimé !\n";
            }

        }
            
        // Close the connection
        ftp_close( $conn_id );
    }
    else{
        echo "Pas d'image à supprimer !\n";
    }
?> 