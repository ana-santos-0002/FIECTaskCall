<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Teste de Usuário</title>
</head>
<body>

    <h1>Cadastrar usuário</h1>

    <form action="/salvar-usuario" method="POST">

        @csrf

        <label for="nome">Nome:</label>

        <input
            type="text"
            id="nome"
            name="nome"
            required
        >

        <button type="submit">
            Salvar
        </button>

    </form>

</body>
</html>
