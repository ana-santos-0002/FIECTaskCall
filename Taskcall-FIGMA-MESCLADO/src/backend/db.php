<?php

$host = "127.0.0.1";
$usuario = "root";
$senha = "1234";
$banco = "suporte_ti";
$porta = 3310;

$conn = new mysqli($host, $usuario, $senha, $banco, $porta);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>