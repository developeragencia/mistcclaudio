@echo off
echo ========================================
echo Build do Frontend - Conselhos Esotericos
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERRO: Node.js nao encontrado!
    echo Por favor, instale o Node.js de: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Verificando npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERRO: npm nao encontrado!
    echo Por favor, instale o Node.js de: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo npm encontrado!
echo.

echo Verificando dependencias...
cd client
if not exist "node_modules" (
    echo.
    echo Dependencias nao encontradas. Instalando...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERRO ao instalar dependencias!
        echo.
        cd ..
        pause
        exit /b 1
    )
    echo.
    echo Dependencias instaladas com sucesso!
    echo.
) else (
    echo Dependencias encontradas.
    echo.
)

echo Executando build...
echo.
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Build concluido com sucesso!
    echo ========================================
    echo.
    echo Os arquivos estao em: client\dist\
    echo.
) else (
    echo.
    echo ========================================
    echo ERRO no build!
    echo ========================================
    echo.
)

pause

