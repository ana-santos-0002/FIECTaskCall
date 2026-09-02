<?php

require_once "db.php";

$sql = "SELECT * FROM chamados";
$resultado = $conn->query($sql);

if (!$resultado) {
    die("Erro ao buscar chamados: " . $conn->error);
}

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Chamados</title>
</head>
<body>

<h1>Chamados</h1>

<?php while ($chamado = $resultado->fetch_assoc()): ?>

    <div>
        <p>ID: <?= $chamado['id'] ?></p>
        <p>Chamado: <?= $chamado['descricao'] ?></p>
    </div>

<?php endwhile; ?>

</body>
</html>