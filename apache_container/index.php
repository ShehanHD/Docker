<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    echo "test";
    ?>
    aaaa
</body>

</html>

<?php
$servername = "mysql";
$username = "root";
$password = "1993";

$conn = new mysqli($servername, $username, $password);

echo $conn;
echo "ciaooo";
?>