<?php 
    // The HTML beginning tags must be there or the output won't render 
    // as a web page

    $newRepImages[0] = $img_tmp1;
    $newRepImages[1] = $img_tmp2;
    $newRepImages[2] = $img_tmp3;
    $newRepImages[3] = $img_tmp4;
    $newRepImages[4] = $img_tmp5;
    $newRepImages[5] = $img_tmp6;
    
    $newImages[0] = $newImg_nom1;
    $newImages[1] = $newImg_nom2;
    $newImages[2] = $newImg_nom3;
    $newImages[3] = $newImg_nom4;
    $newImages[4] = $newImg_nom5;
    $newImages[5] = $newImg_portrait;

    $old_nomImages[0] = $img_nom1;
    $old_nomImages[1] = $img_nom2;
    $old_nomImages[2] = $img_nom3;
    $old_nomImages[3] = $img_nom4;
    $old_nomImages[4] = $img_nom5;
    $old_nomImages[5] = $img_portrait;

    $refAnnonce = $reference;

    $IsChangePortrait = $portraitIsChange;
    $IsChangeImages = $imagesIsChange;

    echo "IsChangePortrait : $IsChangePortrait\n";
    echo "imagesIsChange : $imagesIsChange\n";



    $basePathServer = 'uploadPics';
    $dirToModify    = $basePathServer . "/" . $refAnnonce;

    // Existe t'il au moins une image à uploader et une référence d'annonce
    if ($IsChangePortrait != '' || $IsChangeImages != '')
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

            // Si le répertoire n'esxite pas alors on le créé
            $createResult = true;
            if (!$isExist)
            {
                echo "Le répertoire $dirToModify n'existe pas sur le serveur !\n";

                $createResult = ftp_mkdir($conn_id, $dirToModify);
                if ($createResult)
                {
                    echo "Le répertoire $dirToModify a été créé sur le serveur !\n";
                }
            }

            // Si le répertoire existe
            if ($createResult)
            {
                // Lit les images du répertoire
                $picNames = ftp_nlist($conn_id, $dirToModify);

                // Suppression des images sauf le portrait
                echo "IsChangeImages : $IsChangeImages\n";
                if ($IsChangeImages == 'true')
                {
                    // On parse chaque images du serveur
                    foreach($picNames as $picName) {
                        $_picName = basename($picName);

                        // Vérifie qu'il ne s'agit pas des redirections '.' et '..'
                        if ( $_picName!='.' && $_picName!='..' )
                        {
                            // et on supprime l'image sauf si c'est le portrait
                            if ($_picName!=$img_portrait)
                            {
                                $resultDelete = ftp_delete($conn_id, $picName);
                                if ($resultDelete) {echo "Le fichier $_picName a été supprimé de $dirToModify : $img_portrait\n";}
                                else {echo "Un prôblème est survenue lors de la suppression de $_picName dans $dirToModify\n";}
                            }
                        }
                    }
                }

                // Suppression seulement du portrait
                echo "IsChangePortrait : $IsChangePortrait\n";
                if ($IsChangePortrait == 'true')
                {
                    $pathPortrait = $dirToModify . "/" . $img_portrait;
                    $resultDelete = ftp_delete($conn_id, $pathPortrait);
                    if ($resultDelete) {echo "L'image du portrait $img_portrait a été supprimé de $dirToModify\n";}
                    else {echo "Un prôblème est survenue lors de la suppression de $img_portrait dans $dirToModify\n";}  
                }

            
                $max = sizeof($newImages);
                // Pour chaque image : upload vers serveur les nouvelles images reçues
                for ($ii=0; $ii<$max; $ii++) 
                {
                    if ($newImages[$ii] != '')
                    {
                        $remote_file_path = $dirToModify . "/" . $newImages[$ii];
                        
                        // crée le répertoire de destination sur le serveur
                        $upload = ftp_put( $conn_id, $remote_file_path, $newRepImages[$ii], FTP_BINARY );

                        // check upload status
                        if (!$upload) { 
                            echo "Le transfert de l'image a échouée";
                            } else {
                            echo "OK pour le transfert de $newImages[$ii] à $ftp_server dans $remote_file_path\n";
                        }
                    }
                }
            }
            else
            {
                echo "Un prôblème est survenue lors de la création du répertoire $dirToModify sur le serveur !\n";
            }
        }
            

        // Close the connection
        ftp_close( $conn_id );
    }
    else{
        echo "Pas d'image à modifier !\n";
    }
?> 