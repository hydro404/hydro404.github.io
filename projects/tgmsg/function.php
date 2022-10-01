<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Responsive Web Practice</title>
        <script type="text/javascript" src="./js/bootstrap.bundle.js"></script>
        <link rel="stylesheet" type="text/css" href="./css/bootstrap.css">
        <link rel = "icon" href = "https://i.ibb.co/7yfT3Pm/depositphotos-81700460-stock-illustration-monogram-l-logo-letter.webp" type = "image/x-icon">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="./styles.css">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</html>

<?php
    $username = filter_input(INPUT_POST, 'Username');
    $password = filter_input(INPUT_POST, 'Message');
    $password2 = str_replace("'", "\'", $password);

    


    if (!empty($username)){
        if (!empty($password)){
           $apiToken = "5419783959:AAGslCXq1N3T1aRQi9apkVGpz9KdZXAdYjQ";
  

          $data = [
            'chat_id' => '-769046544',
            'text' => $password2
          ];



          $response = file_get_contents("https://api.telegram.org/bot$apiToken/sendMessage?" .
                                         http_build_query($data) . "%0D%0A %0D%0A" .  "- " . $username);
         
            echo "<h1 style='text-align: center; margin-top: 30px;'>Thank you for the message!</h1>";
            echo "
            <div class='form-row text-center'>
                <div class='col-12' style='margin-top: 50px'>
                <button class='btn btn-secondary'>
                <a href='./index.html' style='text-decoration:none; color: white;'> Click here to go back </a>
                </button>    
                </div>
            </div>";
        }


    else{
        echo "<h1 style='text-align: center; margin-top: 30px;'>Message should not be empty!</h1>";
        echo "
        <div class='form-row text-center'>
            <div class='col-12' style='margin-top: 50px'>
            <button class='btn btn-secondary'>
            <a href='./index.html' style='text-decoration:none; color: white;'> Click here to go back </a>
            </button>    
            </div>
        </div>";
    }
}

    else{
        echo "<h1 style='text-align: center; margin-top: 30px;'>Username should not be empty!</h1>";
        echo "
         <div class='form-row text-center'>
            <div class='col-12' style='margin-top: 50px'>
            <button class='btn btn-secondary'>
            <a href='./index.html' style='text-decoration:none; color: white;'> Click here to go back </a>
            </button>    
            </div>
        </div>";
    }
?>