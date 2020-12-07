<?php 
    // The HTML beginning tags must be there or the output won't render 
    // as a web page

    $repImages[0] = $img_tmp1;
    $repImages[1] = $img_tmp2;
    $repImages[2] = $img_tmp3;
    $repImages[3] = $img_tmp4;
    $repImages[4] = $img_tmp5;
    $repImages[5] = $img_tmp6;
    
    $nomImages[0] = $img_nom1;
    $nomImages[1] = $img_nom2;
    $nomImages[2] = $img_nom3;
    $nomImages[3] = $img_nom4;
    $nomImages[4] = $img_nom5;
    $nomImages[5] = $img_portrait;

    $refAnnonce = $reference;

    $basePathServer = 'uploadPics';
    $dirToBuild     = $basePathServer . "/" . $refAnnonce;
    

    // Existe t'il au moins une image à uploader et une référence d'annonce
    if ( ($img_nom1 != '' || $img_portrait != '') && $reference != '')
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
            
            $isExist = true;
            foreach($dirs as $dir_) {

                $_dir = basename($dir_);
                // echo "SORTIE REPERTOIRE : $_dir\n";

                // Vérifie que cette référence n'existe pas
                if ($refAnnonce == $_dir)
                {
                    echo "Une annonce avec la référence $refAnnonce existe déjà !\n";
                    $isExist = false;
                    break;
                }
            }

            if ($isExist)
            {
                // crée un répertoire avec un nom de la reference de l'annonce sur le serveur pour stocker ses images
                if (ftp_mkdir($conn_id, $dirToBuild)) 
                {
                    echo "Le dossier $dirToBuild a été créé avec succès\n";
                
                    $max = sizeof($nomImages);
                    // Pour chaque image
                    for ($ii=0; $ii<$max; $ii++) 
                    {
                        if ($nomImages[$ii] != '')
                        {
                            $remote_file_path = $dirToBuild . "/" . $nomImages[$ii];
                            
                            // crée le répertoire de destination sur le serveur
                            $upload = ftp_put( $conn_id, $remote_file_path, $repImages[$ii], FTP_BINARY );

                            // check upload status
                            if (!$upload) { 
                                echo "Le transfert de l'image a échouée";
                                } else {
                                echo "OK pour le transfert de $nomImages[$ii] à $ftp_server dans $remote_file_path\n";
                            }
                        }
                    }
                } 
                else 
                {
                    echo "Il y a eu un problème lors de la création du dossier $dirToBuild\n";
                }
            }

        }
            

        // Close the connection
        ftp_close( $conn_id );
    }
    else{
        echo "Pas d'image à ajouter sur le serveur!\n";
    }
?> 