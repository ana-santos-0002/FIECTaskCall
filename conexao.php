<?php

function conectarBanco()
{
    $host = "localhost";
    $porta = "3310";
    $dbname = "taskcall";
    $username = "root";
    $password = "";

    try {
        $conn = new PDO(
            "mysql:host=$host;port=$porta;dbname=$dbname;charset=utf8",
            $username,
            $password
        );

        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $conn;

    } catch (PDOException $e) {
        die("Erro na conexão: " . $e->getMessage());
    }
}






/*
Pegar as variaveis:

(email, cargo, nome)

linkar o BD

return (insert bd_tasckcall)



---------------------------------------------------------------
express js -> bd_tasckcall
jwt -> 
bccrypt


*/




















?>
