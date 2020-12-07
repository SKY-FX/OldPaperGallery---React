<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

	$return = 0;

	if (!isset($_POST['reference'])){$reference = "";}
	else {$reference = trim(strip_tags(addslashes($_POST['reference'])));}
	
	if (!isset($_POST['titre'])){$titre = "";}
	else {$titre = trim(strip_tags(addslashes($_POST['titre'])));}

	$discipline = trim(strip_tags(addslashes($_POST['discipline'])));
	$type_doc = trim(strip_tags(addslashes($_POST['type_doc'])));

	if (!isset($_POST['prix'])){$prix = "";}
	else {$prix = trim(strip_tags(addslashes($_POST['prix'])));}
	
	if (!isset($_POST['etat'])){$etat = "";}
	else {$etat = trim(strip_tags(addslashes($_POST['etat'])));}
	
	if (!isset($_POST['notice'])){$notice = "";}
	else {$notice = nl2br(trim(strip_tags(addslashes($_POST['notice']))));}

	if (!isset($_POST['infos'])){$infos = "";}
	else {$infos = nl2br(trim(strip_tags(addslashes($_POST['infos']))));}
	
	
	
	if (!isset($_POST['A_nom_prenom'])){$A_nom_prenom = "";}
	else {$A_nom_prenom = trim(strip_tags(addslashes($_POST['A_nom_prenom'])));}
	
	if (!isset($_POST['A_profession'])){$A_profession = "";}
	else {$A_profession = trim(strip_tags(addslashes($_POST['A_profession'])));}
	
	if (!isset($_POST['A_annees'])){$A_annees = "";}
	else {$A_annees = trim(strip_tags(addslashes($_POST['A_annees'])));}
	
	if (!isset($_POST['A_lieu'])){$A_lieu = "";}
	else {$A_lieu = trim(strip_tags(addslashes($_POST['A_lieu'])));}
	
	if (!isset($_POST['A_biographie'])){$A_biographie = "";}
	else {$A_biographie = nl2br(trim(strip_tags(addslashes($_POST['A_biographie']))));}	
	
	if (!isset($_POST['dimension'])){$dimension = "";}
	else {$dimension = trim(strip_tags(addslashes($_POST['dimension'])));}


	if (!isset($_POST['D_nom_prenom'])){$D_nom_prenom = "";}
	else {$D_nom_prenom = trim(strip_tags(addslashes($_POST['D_nom_prenom'])));}
	
	if (!isset($_POST['D_profession'])){$D_profession = "";}
	else {$D_profession = trim(strip_tags(addslashes($_POST['D_profession'])));}
	
	if (!isset($_POST['D_annees'])){$D_annees = "";}
	else {$D_annees = trim(strip_tags(addslashes($_POST['D_annees'])));}
	
	if (!isset($_POST['D_lieu'])){$D_lieu = "";}
	else {$D_lieu = trim(strip_tags(addslashes($_POST['D_lieu'])));}




	if (!isset($_FILES['img_file1']['name'])){$img_nom1 = "";}
	else {$img_nom1 = trim(strip_tags(addslashes($_FILES['img_file1']['name'])));}

	if (!isset($_FILES['img_file2']['name'])){$img_nom2 = "";}
	else {$img_nom2 = trim(strip_tags(addslashes($_FILES['img_file2']['name'])));}

	if (!isset($_FILES['img_file3']['name'])){$img_nom3 = "";}
	else {$img_nom3 = trim(strip_tags(addslashes($_FILES['img_file3']['name'])));}

	if (!isset($_FILES['img_file4']['name'])){$img_nom4 = "";}
	else {$img_nom4 = trim(strip_tags(addslashes($_FILES['img_file4']['name'])));}

	if (!isset($_FILES['img_file5']['name'])){$img_nom5 = "";}
	else {$img_nom5 = trim(strip_tags(addslashes($_FILES['img_file5']['name'])));}

	if (!isset($_FILES['portrait_file']['name'])){$img_portrait = "";}
	else {$img_portrait = trim(strip_tags(addslashes($_FILES['portrait_file']['name'])));}


	if (!isset($_FILES['img_file1']['tmp_name'])){$img_tmp1 = "";}
	else {$img_tmp1 = trim(strip_tags(addslashes($_FILES['img_file1']['tmp_name'])));}

	if (!isset($_FILES['img_file2']['tmp_name'])){$img_tmp2 = "";}
	else {$img_tmp2 = trim(strip_tags(addslashes($_FILES['img_file2']['tmp_name'])));}

	if (!isset($_FILES['img_file3']['tmp_name'])){$img_tmp3 = "";}
	else {$img_tmp3 = trim(strip_tags(addslashes($_FILES['img_file3']['tmp_name'])));}

	if (!isset($_FILES['img_file4']['tmp_name'])){$img_tmp4 = "";}
	else {$img_tmp4 = trim(strip_tags(addslashes($_FILES['img_file4']['tmp_name'])));}

	if (!isset($_FILES['img_file5']['tmp_name'])){$img_tmp5 = "";}
	else {$img_tmp5 = trim(strip_tags(addslashes($_FILES['img_file5']['tmp_name'])));}

	if (!isset($_FILES['portrait_file']['tmp_name'])){$img_tmp6 = "";}
	else {$img_tmp6 = trim(strip_tags(addslashes($_FILES['portrait_file']['tmp_name'])));}

	
	setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
    date_default_timezone_set('Europe/Paris');
	$date=date('d/m/Y H:i:s');
	
			
	// établir la connexion à notre base MySQL.
	include ("connexion.php");
	
	//enregistrer dans la base MySQL le contenu des informations
	$req = "INSERT INTO images (" . 
						"img_nom1, img_nom2, img_nom3, img_nom4, img_nom5, titre, discipline, prix, etat, notice, infos, dimension, A_biographie, A_nom_prenom, A_profession, A_annees, A_lieu, D_nom_prenom, D_profession, D_annees, D_lieu, type_doc, img_portrait, ref, date_etat" .
						") VALUES (" .
						"'" . $img_nom1 . "', " .
						"'" . $img_nom2 . "', " .
						"'" . $img_nom3 . "', " .
						"'" . $img_nom4 . "', " .
						"'" . $img_nom5 . "', " .
						"'" . $titre . "', " .
						"'" . $discipline . "', " .
						"'" . $prix . "', " .
						"'" . $etat . "', " .
						"'" . $notice . "', " .
						"'" . $infos . "', " .
						"'" . $dimension . "', " .
						"'" . $A_biographie . "', " .
						"'" . $A_nom_prenom . "', " .
						"'" . $A_profession . "', " .
						"'" . $A_annees . "', " .
						"'" . $A_lieu . "', " .
						"'" . $D_nom_prenom . "', " .
						"'" . $D_profession . "', " .
						"'" . $D_annees . "', " .
						"'" . $D_lieu . "', " .
						"'" . $type_doc . "', " .
						"'" . $img_portrait . "', " .
						"'" . $reference . "', " .
						"'" . $date . "') ";
	$return = $cnx->exec($req);


	if ($return=='1')
	{
		echo "L'ajout de l'annonce a été réalisé en base\n";

		// Ajoute les images vers Hostinger via FTP
		include ("addPicToFtp.php");	
	}
	else
	{
		echo "Un prôblème est survenue lors de l'ajout de l'annonce en base\n";
	}


	
	
    echo json_encode($return);

?>