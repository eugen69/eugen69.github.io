<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Applications for Android</title>
<meta http-equiv="Refresh" content="5; URL=http://aqoleg.space/contactus.html">
<META name="description" CONTENT="Applications for Android. Bookkeeper - personal financial count. Cat - count real cats">
<META name="keywords" CONTENT="bookkeeper, finance, control, cash, cat, counter, description, application, google play, yandex disk, independence, count, Android, apk, mobile">
<link rel="stylesheet" media="screen and (min-width: 701px)" href="bigstyle.css" type="text/css">
<link rel="stylesheet" media="screen and (max-width:700px)" href="smallstyle.css" type="text/css">
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>

<?php
    $name = $_POST['name']; // получаем имя из формы
    $email = $_POST['email']; 
    $message = $_POST['message']; // получаем текст из формы
    $message = wordwrap($message, 70, "\r\n");
    $send = "Name: ".$name.".\r\n Message: ".$message.".\r\n email: ".$email;
    $from = "noreply@aqoleg.space"; // от кого отправлена форма
    $subject = "message from site"; // тема сообщения
    $to='mae@aqoleg.space';
    if (mail($to, $subject, $send)) {echo "Your message send successfully, thank you!";}
else {
    echo "Some error happen";
} 
    // адрес страницы, с которой посетитель пришёл на данную страницу
    $redir = $_SERVER['HTTP_REFERER']; 
?>
</body>
