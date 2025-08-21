<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "feng20050504@gmail.com";
    $subject = "Contact Form Submission";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $headers = "From: $email\r\nReply-To: $email\r\n";
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    mail($to, $subject, $body, $headers);
    header("Location: thankyou.html");
    exit();
}
?>