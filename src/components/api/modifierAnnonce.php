<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Disposition, Content-Type, Content-Length, Accept-Encoding");
    header("Content-type:application/json");

	$ret = 0;

	if (!isset($_POST['id'])){$id = "";}
	else {$id = $_POST['id'];}

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
	else {$notice = trim(strip_tags(addslashes($_POST['notice'])));}

	if (!isset($_POST['infos'])){$infos = "";}
	else {$infos = trim(strip_tags(addslashes($_POST['infos'])));} 
	
	
	
	if (!isset($_POST['A_nom_prenom'])){$A_nom_prenom = "";}
	else {$A_nom_prenom = trim(strip_tags(addslashes($_POST['A_nom_prenom'])));}
	
	if (!isset($_POST['A_profession'])){$A_profession = "";}
	else {$A_profession = trim(strip_tags(addslashes($_POST['A_profession'])));}
	
	if (!isset($_POST['A_annees'])){$A_annees = "";}
	else {$A_annees = trim(strip_tags(addslashes($_POST['A_annees'])));}
	
	if (!isset($_POST['A_lieu'])){$A_lieu = "";}
	else {$A_lieu = trim(strip_tags(addslashes($_POST['A_lieu'])));}
	
	if (!isset($_POST['A_biographie'])){$A_biographie = "";}
	else {$A_biographie = trim(strip_tags(addslashes($_POST['A_biographie'])));}	
	
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

	
	

	if (!isset($_FILES['img_file1']['name'])){$newImg_nom1 = "";}
	else {$newImg_nom1 = trim(strip_tags(addslashes($_FILES['img_file1']['name'])));}
	
	if (!isset($_FILES['img_file2']['name'])){$newImg_nom2 = "";}
	else {$newImg_nom2 = trim(strip_tags(addslashes($_FILES['img_file2']['name'])));}
	
	if (!isset($_FILES['img_file3']['name'])){$newImg_nom3 = "";}
	else {$newImg_nom3 = trim(strip_tags(addslashes($_FILES['img_file3']['name'])));}
	
	if (!isset($_FILES['img_file4']['name'])){$newImg_nom4 = "";}
	else {$newImg_nom4 = trim(strip_tags(addslashes($_FILES['img_file4']['name'])));}
	
	if (!isset($_FILES['img_file5']['name'])){$newImg_nom5 = "";}
	else {$newImg_nom5 = trim(strip_tags(addslashes($_FILES['img_file5']['name'])));}
	
	if (!isset($_FILES['portrait_file']['name'])){$newImg_portrait = "";}
	else {$newImg_portrait = trim(strip_tags(addslashes($_FILES['portrait_file']['name'])));}




	if (!isset($_FILES['img_file1']['tmp_name'])){$img_tmp1 = "";}
	else {$img_tmp1 = trim(strip_tags(addslashes($_FILES['img_file1']['tmp_name'])));}
	echo "img_tmp1: $img_tmp1\n";

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
	


	if (!isset($_POST['img_nom1'])){$img_nom1 = "";}
	else {$img_nom1 = trim(strip_tags(addslashes($_POST['img_nom1'])));}

	if (!isset($_POST['img_nom2'])){$img_nom2 = "";}
	else {$img_nom2 = trim(strip_tags(addslashes($_POST['img_nom2'])));}

	if (!isset($_POST['img_nom3'])){$img_nom3 = "";}
	else {$img_nom3 = trim(strip_tags(addslashes($_POST['img_nom3'])));}

	if (!isset($_POST['img_nom4'])){$img_nom4 = "";}
	else {$img_nom4 = trim(strip_tags(addslashes($_POST['img_nom4'])));}

	if (!isset($_POST['img_nom5'])){$img_nom5 = "";}
	else {$img_nom5 = trim(strip_tags(addslashes($_POST['img_nom5'])));}

	if (!isset($_POST['img_portrait'])){$img_portrait = "";}
	else {$img_portrait = trim(strip_tags(addslashes($_POST['img_portrait'])));}
	


	if (!isset($_POST['portraitIsChange'])){$portraitIsChange = "";}
	else {$portraitIsChange = trim(strip_tags(addslashes($_POST['portraitIsChange'])));}

	if (!isset($_POST['imagesIsChange'])){$imagesIsChange = "";}
	else {$imagesIsChange = trim(strip_tags(addslashes($_POST['imagesIsChange'])));}



	// # Gestion de la requete pour les IMAGES
	if (($newImg_nom1 != "") && ($newImg_portrait != ""))
	{
		$reqImg = "img_nom1 = '".$newImg_nom1."', img_nom2 = '".$newImg_nom2."', img_nom3 = '".$newImg_nom3."', img_nom4 = '".$newImg_nom4."', img_nom5 = '".$newImg_nom5."', img_portrait = '".$newImg_portrait."',";
	}
	else if (($newImg_nom1 != "") && ($newImg_portrait == ""))
	{
		$reqImg = "img_nom1 = '".$newImg_nom1."', img_nom2 = '".$newImg_nom2."', img_nom3 = '".$newImg_nom3."',	img_nom4 = '".$newImg_nom4."', img_nom5 = '".$newImg_nom5."',";
	
	}
	else if (($newImg_nom1 == "") && ($newImg_portrait != ""))
	{
		$reqImg = "img_portrait= '".$newImg_portrait."',";
	}
	else
	{
		$reqImg ="";
	}

	// # Gestion de la requete pour DISCIPLINE et TYPE_DOC
	if (($discipline != "") && ($type_doc == ""))
	{
		$reqType = "discipline= '".$discipline."',";
	}
	else if (($discipline == "") && ($type_doc != ""))
	{
		$reqType = "type_doc= '".$type_doc."',";
	}
	else if (($discipline != "") && ($type_doc != ""))
	{
		$reqType = "discipline = '".$discipline."', type_doc = '".$type_doc."',";
	}
	else
	{
		$reqType = "";
	}

	echo "img_nom1 : $img_nom1\n";
	echo "newImg_nom1 : $newImg_nom1\n";
	echo "img_portrait : $img_portrait\n";
	echo "newImg_portrait : $newImg_portrait\n";
	echo "img_tmp1 : $img_tmp1\n";
	

	// établir la connexion à notre base MySQL.
	include ("connexion.php");

	$req = "UPDATE images 
				SET 
					".$reqImg."
					".$reqType."
					titre = '".$titre."',
					prix = '".$prix."',
					etat = '".$etat."',
					notice = '".$notice."',
					infos = '".$infos."',
					dimension = '".$dimension."',
					A_biographie = '".$A_biographie."',
					A_nom_prenom = '".$A_nom_prenom."',
					A_profession = '".$A_profession."',
					A_annees = '".$A_annees."',
					A_lieu = '".$A_lieu."',
					D_nom_prenom = '".$D_nom_prenom."',
					D_profession = '".$D_profession."',
					D_annees = '".$D_annees."',
					D_lieu = '".$D_lieu."',
					ref = '".$reference."'			
				WHERE
					img_id = '".$id."'
			";
	$ret = $cnx->exec($req);

	if ($ret=="1")
	{
		echo "Les modifications de l'annonce ont été réalisées en base\n";
		
		// Modisie les images vers Hostinger via FTP
		include ("modifyPicToFtp.php");
	}
	else
	{
		echo "Un prôblème est survenue lors de la modifications de l'annonce en base\n";
	}

	
    echo json_encode($ret);
	
?>