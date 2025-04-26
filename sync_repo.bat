
@echo off
:: Script de sincronização automática para Git
echo ========================================
echo  Sincronizando repositório gerador-pirata
echo ========================================

:: 1. Navega até a pasta do projeto
cd /d "C:\Users\first\Desktop\sites\gerador-pirata" || (
    echo Erro: Pasta não encontrada!
    pause
    exit
)

:: 2. Verifica o status
git status

:: 3. Baixa atualizações
git pull origin main

:: 4. Pergunta se deseja commit/push
set /p resposta="Deseja fazer commit e push? (s/n): "
if /i "%resposta%"=="s" (
    set /p mensagem="Digite a mensagem do commit: "
    git add .
    git commit -m "%mensagem%"
    git push origin main
)

:: 5. Verificação final
git log --oneline -n 3
git remote -v

echo ========================================
echo  Sincronização concluída! Verifique acima
echo ========================================
pause