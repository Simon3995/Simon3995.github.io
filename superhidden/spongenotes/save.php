<?php
    file_put_contents("objects.json", file_get_contents("php://input"));
    file_put_contents("version.txt", time());
?>