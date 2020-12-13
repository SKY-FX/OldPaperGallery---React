<?php
    // clear all the receipients conatained in AddReplyTo
    $mail->ClearAllRecipients( );

    $mail->Debugoutput = 'html';
    $mail->SMTPDebug  = 2;

    // SMTP configuration
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    
    // Gmail smpt configuration
    $mail->Host = $host;
    $mail->Port = $port;

    // Identifiant gmail
    $mail->Username = $email_exp;
    $mail->Password = $mdp_exp;

    // From email address and name
    $mail->setFrom($email_exp, $name_exp);

    // Give the User email to response the email
    $mail->AddReplyTo($reply_email, $reply_name);
    
    //To address and name
    $mail->addAddress($email_dst, $name_dst);

    // // Send HTML or Plain Text email
    $mail->isHTML(true);

    $mail->Subject = $Objet;
    $mail->Body = $messageHtml;
    
    // // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

?>