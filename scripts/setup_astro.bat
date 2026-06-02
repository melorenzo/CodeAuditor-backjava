@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  Creando estructura para Astro + React
echo ========================================
echo.

REM Crear directorios
echo [1/4] Creando carpetas...
mkdir "src\pages" 2>nul
mkdir "src\components" 2>nul
mkdir "src\services" 2>nul
echo OK

REM ---------- pages ----------
echo [2/4] Creando archivos en pages\...

(
echo ---
echo import LoginForm from '../components/LoginForm.jsx';
echo ---
echo ^<html lang="es"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<title^>Login - Auditoria^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div class="container"^>
echo       ^<h1^>Iniciar sesion^</h1^>
echo       ^<LoginForm client:load /^>
echo     ^</div^>
echo   ^</body^>
echo ^</html^>
) > "src\pages\index.astro"

(
echo ---
echo import RegisterForm from '../components/RegisterForm.jsx';
echo ---
echo ^<html lang="es"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<title^>Registro - Auditoria^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div class="container"^>
echo       ^<h1^>Crear cuenta^</h1^>
echo       ^<RegisterForm client:load /^>
echo     ^</div^>
echo   ^</body^>
echo ^</html^>
) > "src\pages\register.astro"

(
echo ---
echo import CodeEditor from '../components/CodeEditor.jsx';
echo import AuditResult from '../components/AuditResult.jsx';
echo import History from '../components/History.jsx';
echo ---
echo ^<html lang="es"^>
echo   ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<title^>Dashboard - Auditoria^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div class="dashboard"^>
echo       ^<aside^>
echo         ^<h2^>Historial^</h2^>
echo         ^<History client:load /^>
echo       ^</aside^>
echo       ^<main^>
echo         ^<h1^>Editor de codigo^</h1^>
echo         ^<CodeEditor client:load /^>
echo         ^<div class="result"^>
echo           ^<h2^>Resultado del analisis^</h2^>
echo           ^<AuditResult client:load /^>
echo         ^</div^>
echo       ^</main^>
echo     ^</div^>
echo   ^</body^>
echo ^</html^>
) > "src\pages\dashboard.astro"

echo OK

REM ---------- components ----------
echo [3/4] Creando componentes React en components\...

REM LoginForm.jsx
(
echo import { useState } from 'react';
echo import api from '../services/api';
echo.
echo export default function LoginForm^(^) {
echo   const [email, setEmail] = useState('''');
echo   const [password, setPassword] = useState('''');
echo.
echo   const handleSubmit = async (e^) =^> {
echo     e.preventDefault(^);
echo     try {
echo       const res = await api.post('/login', { email, password }^);
echo       localStorage.setItem('token', res.token^);
echo       window.location.href = '/dashboard';
echo     } catch {
echo       alert('Error de autenticacion');
echo     }
echo   };
echo.
echo   return ^(
echo     ^<form onSubmit={handleSubmit}^>
echo       ^<input type="email" placeholder="Email" value={email} onChange={e =^> setEmail(e.target.value)} required /^>
echo       ^<input type="password" placeholder="Contraseña" value={password} onChange={e =^> setPassword(e.target.value)} required /^>
echo       ^<button type="submit"^>Ingresar^</button^>
echo     ^</form^>
echo   ^);
echo }
) > "src\components\LoginForm.jsx"

REM RegisterForm.jsx
(
echo import { useState } from 'react';
echo import api from '../services/api';
echo.
echo export default function RegisterForm^(^) {
echo   const [name, setName] = useState('''');
echo   const [email, setEmail] = useState('''');
echo   const [password, setPassword] = useState('''');
echo.
echo   const handleSubmit = async (e^) =^> {
echo     e.preventDefault(^);
echo     try {
echo       await api.post('/register', { name, email, password }^);
echo       alert('Registro exitoso. Ahora inicia sesion.');
echo       window.location.href = '/';
echo     } catch {
echo       alert('Error al registrar');
echo     }
echo   };
echo.
echo   return ^(
echo     ^<form onSubmit={handleSubmit}^>
echo       ^<input type="text" placeholder="Nombre" value={name} onChange={e =^> setName(e.target.value)} required /^>
echo       ^<input type="email" placeholder="Email" value={email} onChange={e =^> setEmail(e.target.value)} required /^>
echo       ^<input type="password" placeholder="Contraseña" value={password} onChange={e =^> setPassword(e.target.value)} required /^>
echo       ^<button type="submit"^>Registrarse^</button^>
echo     ^</form^>
echo   ^);
echo }
) > "src\components\RegisterForm.jsx"

REM CodeEditor.jsx
(
echo import { useState } from 'react';
echo.
echo export default function CodeEditor^(^) {
echo   const [code, setCode] = useState('// Escribe tu codigo aqui');
echo.
echo   return ^(
echo     ^<div^>
echo       ^<textarea rows={10} cols={60} value={code} onChange={e =^> setCode(e.target.value)} /^>
echo       ^<button onClick={^(^) =^> console.log('Enviar a backend', code)^}^>Analizar^</button^>
echo     ^</div^>
echo   ^);
echo }
) > "src\components\CodeEditor.jsx"

REM AuditResult.jsx
(
echo export default function AuditResult^(^) {
echo   return ^<pre^>{JSON.stringify({ status: 'pendiente', vulnerabilidades: [] }, null, 2)}^</pre^>;
echo }
) > "src\components\AuditResult.jsx"

REM History.jsx
(
echo import { useEffect, useState } from 'react';
echo import api from '../services/api';
echo.
echo export default function History^(^) {
echo   const [audits, setAudits] = useState([]^);
echo.
echo   useEffect(() =^> {
echo     api.get('/audits').then(res =^> setAudits(res)^).catch(console.error);
echo   }, []^);
echo.
echo   return ^(
echo     ^<ul^>
echo       {audits.map(a =^> ^<li key={a.id}^>{a.date} - {a.status}^</li^>)}
echo     ^</ul^>
echo   ^);
echo }
) > "src\components\History.jsx"

echo OK

REM ---------- services ----------
echo [4/4] Creando api.js en services\...

(
echo const API_BASE_URL = import.meta.env.PUBLIC_API_URL ^|^| 'http://localhost:8080/api';
echo.
echo export const api = {
echo   async request(endpoint, options = {}) {
echo     const token = localStorage.getItem('token');
echo     const headers = {
echo       'Content-Type': 'application/json',
echo       ...(token ^&^& { Authorization: `Bearer ${token}` }),
echo       ...options.headers
echo     };
echo     const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
echo     if (!response.ok) throw new Error(`HTTP ${response.status}`);
echo     return response.json();
echo   },
echo   get(endpoint) { return this.request(endpoint); },
echo   post(endpoint, data) { return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }); },
echo   put(endpoint, data) { return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }); },
echo   delete(endpoint) { return this.request(endpoint, { method: 'DELETE' }); }
echo };
echo.
echo export default api;
) > "src\services\api.js"

echo OK
echo.
echo ========================================
echo  Estructura creada exitosamente en ./src
echo ========================================
echo.
echo Recuerda instalar dependencias:
echo   npm install astro react react-dom
echo.
echo Luego puedes iniciar el proyecto con:
echo   npm run dev
echo.
pause