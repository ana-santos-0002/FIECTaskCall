# FIEC Taskcall — integração real com MySQL

Esta versão mantém a estrutura original do projeto e conecta Painel, Login, Criação de Chamado e Inbox ao banco MySQL.

## Banco
Use o banco `taskcall` no MySQL, porta `3306`, usuário `root` sem senha, conforme a configuração do projeto. Os arquivos SQL fornecidos podem ser importados no banco `taskcall`; eles criam as tabelas `usuarios`, `equipamentos`, `chamados`, `computador` e `sala`.

## Fluxo
`/` -> clique no FIEC Taskcall -> `/login` -> `/painel` -> Criação chamado (etapa 1) -> revisão (etapa 2) -> grava em `chamados` -> abre o Inbox com o chamado selecionado -> finalizar/excluir/alterar status.

## Usuário de teste
Pode usar um dos usuários existentes no SQL, por exemplo `joao.silva@fiec.edu.br` com a senha cadastrada no dump.

## Execução no Windows

O arquivo `vendor/autoload.php` não é versionado no projeto. Ele é criado automaticamente pelo Composer. Portanto, não execute `php artisan` antes de instalar as dependências.

A forma recomendada é executar `iniciar-taskcall.bat` na raiz do projeto. O script verifica PHP, Composer e npm, instala as dependências e só depois inicia o Laravel e o frontend.

Para executar manualmente, abra o Prompt de Comando na pasta do projeto e rode:

```bat
cd /d "C:\caminho\para\Taskcall\src\backend"
composer install
if not exist .env copy .env.example .env
php artisan key:generate
php artisan serve --host=127.0.0.1 --port=8000
```

Em outro terminal, execute:

```bat
cd /d "C:\caminho\para\Taskcall\src\frontend"
npm install
npm run dev
```

Antes de iniciar, confirme que `php -v`, `composer --version` e `npm --version` funcionam no terminal. Se Composer não for reconhecido, instale-o em `https://getcomposer.org/download/` e reabra o terminal.

## Banco de dados

O arquivo `src/backend/.env` contém a configuração de conexão usada pelo projeto. Confira principalmente `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD` antes de usar a aplicação. Importe os SQLs fornecidos no banco configurado no `.env`.

A API usa `/api/login`, `/api/painel`, `/api/equipamentos` e `/api/chamados`.
