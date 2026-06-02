@echo off
echo === Configurando estrategia de ramas ===

:: Verificar que estamos dentro de un repositorio git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ERROR: No estas dentro de un repositorio git.
    echo Ejecuta primero: git init
    echo Luego conecta con GitHub: git remote add origin URL_DEL_REPO
    pause
    exit /b
)

:: Crear rama develop desde main
git checkout main
git pull origin main 2>nul
git checkout -b develop
git push -u origin develop

:: Crear ramas de features tipicas
git checkout develop
git checkout -b feature/auth-java
git push -u origin feature/auth-java

git checkout develop
git checkout -b feature/ia-python
git push -u origin feature/ia-python

git checkout develop
git checkout -b feature/frontend-editor
git push -u origin feature/frontend-editor

:: Volver a develop para empezar a trabajar
git checkout develop

echo.
echo === Ramas creadas ===
echo main
echo develop
echo feature/auth-java
echo feature/ia-python
echo feature/frontend-editor
echo.
echo Estrategia: 
echo   - main: solo codigo estable y versiones entregables.
echo   - develop: integracion continua.
echo   - feature/*: nuevas funcionalidades.
echo   Al terminar una feature, hacer merge a develop mediante Pull Request.
pause