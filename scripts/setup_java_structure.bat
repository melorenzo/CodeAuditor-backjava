@echo off
echo === Generando estructura de paquetes para Backend Java (Spring Boot) ===

set BASE=backend-java\src\main\java\com\auditoria

:: Crear carpetas
mkdir %BASE%\config 2>nul
mkdir %BASE%\controller 2>nul
mkdir %BASE%\dto 2>nul
mkdir %BASE%\entity 2>nul
mkdir %BASE%\repository 2>nul
mkdir %BASE%\service 2>nul

:: Crear archivos .java con contenido base (package y esqueleto minimo)

echo package com.auditoria.config; > %BASE%\config\SecurityConfig.java
echo. >> %BASE%\config\SecurityConfig.java
echo public class SecurityConfig { >> %BASE%\config\SecurityConfig.java
echo     // Configuracion de seguridad y JWT >> %BASE%\config\SecurityConfig.java
echo } >> %BASE%\config\SecurityConfig.java

echo package com.auditoria.config; > %BASE%\config\JwtUtil.java
echo. >> %BASE%\config\JwtUtil.java
echo public class JwtUtil { >> %BASE%\config\JwtUtil.java
echo     // Utilidades JWT >> %BASE%\config\JwtUtil.java
echo } >> %BASE%\config\JwtUtil.java

echo package com.auditoria.controller; > %BASE%\controller\AuthController.java
echo. >> %BASE%\controller\AuthController.java
echo public class AuthController { >> %BASE%\controller\AuthController.java
echo     // Endpoints de autenticacion >> %BASE%\controller\AuthController.java
echo } >> %BASE%\controller\AuthController.java

echo package com.auditoria.dto; > %BASE%\dto\LoginRequest.java
echo. >> %BASE%\dto\LoginRequest.java
echo public class LoginRequest { >> %BASE%\dto\LoginRequest.java
echo     // DTO para login >> %BASE%\dto\LoginRequest.java
echo } >> %BASE%\dto\LoginRequest.java

echo package com.auditoria.dto; > %BASE%\dto\RegisterRequest.java
echo. >> %BASE%\dto\RegisterRequest.java
echo public class RegisterRequest { >> %BASE%\dto\RegisterRequest.java
echo     // DTO para registro >> %BASE%\dto\RegisterRequest.java
echo } >> %BASE%\dto\RegisterRequest.java

echo package com.auditoria.dto; > %BASE%\dto\AuthResponse.java
echo. >> %BASE%\dto\AuthResponse.java
echo public class AuthResponse { >> %BASE%\dto\AuthResponse.java
echo     // Respuesta con token JWT >> %BASE%\dto\AuthResponse.java
echo } >> %BASE%\dto\AuthResponse.java

echo package com.auditoria.entity; > %BASE%\entity\User.java
echo. >> %BASE%\entity\User.java
echo public class User { >> %BASE%\entity\User.java
echo     // Entidad de usuario >> %BASE%\entity\User.java
echo } >> %BASE%\entity\User.java

echo package com.auditoria.repository; > %BASE%\repository\UserRepository.java
echo. >> %BASE%\repository\UserRepository.java
echo public class UserRepository { >> %BASE%\repository\UserRepository.java
echo     // Repositorio JPA >> %BASE%\repository\UserRepository.java
echo } >> %BASE%\repository\UserRepository.java

echo package com.auditoria.service; > %BASE%\service\UserService.java
echo. >> %BASE%\service\UserService.java
echo public class UserService { >> %BASE%\service\UserService.java
echo     // Logica de negocio de usuarios >> %BASE%\service\UserService.java
echo } >> %BASE%\service\UserService.java

echo.
echo Estructura de paquetes creada en:
echo %BASE%
echo.
echo Archivos .java generados (contenido minimo para evitar errores).
echo Ahora podes empezar a completar cada clase.
pause