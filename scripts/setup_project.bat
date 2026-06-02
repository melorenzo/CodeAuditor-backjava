@echo off
echo === Creando estructura de carpetas para Plataforma de Auditoria de Codigo ===

mkdir backend-java\src\main\java\com\auditoria
mkdir backend-java\src\main\resources
mkdir backend-java\src\test\java
mkdir backend-python\app
mkdir backend-python\tests
mkdir frontend\src
mkdir frontend\public
mkdir docs
mkdir scripts

echo > backend-java\pom.xml
echo > backend-java\Dockerfile
echo > backend-java\.env.example

echo > backend-python\requirements.txt
echo > backend-python\Dockerfile
echo > backend-python\.env.example
echo > backend-python\app\main.py

echo > frontend\package.json
echo > frontend\Dockerfile
echo > frontend\nginx.conf

echo > docker-compose.yml
echo > .gitignore
echo > README.md
echo > docs\arquitectura.md
echo > docs\api-spec.md
echo > docs\database-diagram.md

echo.
echo Estructura creada exitosamente.
echo.
echo Archivos vacios generados. Luego los completaras con el contenido real.
pause