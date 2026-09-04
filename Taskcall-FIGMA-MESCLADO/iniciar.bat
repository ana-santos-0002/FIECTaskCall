@echo off
setlocal EnableExtensions

set "ROOT=%~dp0"
set "BACKEND=%ROOT%src\backend"
set "FRONTEND=%ROOT%src\frontend"

echo ========================================
echo       FIEC TASKCALL - INICIALIZANDO
echo ========================================

echo.
echo [1/5] Verificando PHP...
where php >nul 2>&1
if errorlevel 1 (
    echo ERRO: PHP nao foi encontrado no PATH.
    echo Instale o PHP 8.2 ou superior e adicione a pasta do PHP ao PATH.
    pause
    exit /b 1
)

php -v

echo.
echo [2/5] Verificando Composer...
where composer >nul 2>&1
if errorlevel 1 (
    echo ERRO: Composer nao foi encontrado no PATH.
    echo Instale-o em https://getcomposer.org/download/ e reabra este arquivo.
    pause
    exit /b 1
)

call composer --version

echo.
echo [3/5] Instalando dependencias do Laravel...

cd /d "%BACKEND%"

if not exist composer.json (
    echo ERRO: composer.json nao foi encontrado em "%BACKEND%".
    pause
    exit /b 1
)

if not exist .env (
    if exist .env.example (
        echo Criando arquivo .env...
        copy /Y .env.example .env >nul
    ) else (
        echo ERRO: .env.example nao foi encontrado.
        pause
        exit /b 1
    )
)

call composer install --no-interaction

if errorlevel 1 (
    echo ERRO: Composer nao conseguiu instalar as dependencias.
    pause
    exit /b 1
)

if not exist vendor\autoload.php (
    echo ERRO: vendor\autoload.php ainda nao foi criado.
    pause
    exit /b 1
)

echo.
echo Gerando chave do Laravel...
call php artisan key:generate

if errorlevel 1 (
    echo ERRO: nao foi possivel gerar a chave do Laravel.
    pause
    exit /b 1
)

echo.
echo [4/5] Verificando Node.js e instalando dependencias do frontend...

where npm >nul 2>&1

if errorlevel 1 (
    echo AVISO: npm nao foi encontrado.
    echo O backend continuara, mas o frontend nao sera iniciado.
    goto iniciar_backend
)

cd /d "%FRONTEND%"

if not exist package.json (
    echo ERRO: package.json nao foi encontrado em "%FRONTEND%".
    pause
    exit /b 1
)

if not exist node_modules (
    echo Instalando dependencias do frontend...
    call npm install

    if errorlevel 1 (
        echo ERRO: npm install falhou.
        pause
        exit /b 1
    )
)

echo Iniciando frontend...

start "FIEC Taskcall - Frontend" cmd /k "cd /d ""%FRONTEND%"" && npm run dev -- --host 127.0.0.1"

:iniciar_backend

echo.
echo [5/5] Iniciando Laravel em http://127.0.0.1:8000 ...

start "FIEC Taskcall - Laravel" cmd /k "cd /d ""%BACKEND%"" && php artisan serve --host=127.0.0.1 --port=8000"

echo.
echo Aguardando os servidores iniciarem...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo       FIEC TASKCALL - PRONTO
echo ========================================
echo.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://127.0.0.1:5173
echo Banco:    verifique src\backend\.env
echo.

start "" "http://127.0.0.1:5173/"

pause
