<?php
    if(isset($_POST["index"]) && isset($_POST["data0"]) && isset($_POST["data1"])){
        $file = fopen("db.txt", "a");
        fwrite($file, $_POST["index"] . "|" . $_POST["data0"] . "|" . $_POST["data1"] . "|\n");
    }
