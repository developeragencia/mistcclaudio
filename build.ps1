Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Build do Frontend - Conselhos Esotericos" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodePath = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodePath) {
    Write-Host ""
    Write-Host "ERRO: Node.js nao encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js de: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "Node.js encontrado: $($nodePath.Source)" -ForegroundColor Green
Write-Host ""

Write-Host "Verificando npm..." -ForegroundColor Yellow
$npmPath = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmPath) {
    Write-Host ""
    Write-Host "ERRO: npm nao encontrado!" -ForegroundColor Red
    Write-Host "Por favor, instale o Node.js de: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host "npm encontrado: $($npmPath.Source)" -ForegroundColor Green
Write-Host ""

Write-Host "Executando build..." -ForegroundColor Yellow
Write-Host ""

Set-Location client
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "Build concluido com sucesso!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Os arquivos estao em: client\dist\" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "ERRO no build!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
}

Read-Host "Pressione Enter para sair"

