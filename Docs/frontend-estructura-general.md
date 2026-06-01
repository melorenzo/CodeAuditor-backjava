# Bitácora de Proyecto: Plataforma de Auditoría de Código

## 1. Descripción General del Proyecto
Diseño e implementación de un sistema basado en arquitectura de microservicios para el análisis estático y lógico de código fuente. El sistema busca identificar vulnerabilidades, errores y oportunidades de mejora. Su principal diferencial es el enfoque pedagógico: utiliza un Modelo de Lenguaje de Gran Escala (LLM) para explicar los errores al usuario, fomentando el aprendizaje autónomo.

## 2. Pila Tecnológica (Stack) Definida hasta el momento
*   **Frontend (Interfaz de Usuario):** React.js inicializado con Vite.
*   **Editor de Código Integrado:** Monaco Editor (`@monaco-editor/react`).
*   **Entorno de Ejecución:** Node.js (v24.15.0).
*   **Backend / Microservicios:** [A definir]
*   **Integración LLM:** [A definir]

## 3. Requerimientos de Frontend (Estado Actual)
- [ ] Ingreso de código fuente mediante editor con resaltado de sintaxis. 
- [ ] Visualización de resultados categorizados (Crítico, Advertencia, Sugerencia). 
- [ ] Historial de consultas previas por usuario. 

---

## 4. Registro de Avances (Log de Desarrollo)

### Hito 1: Configuración del Entorno Base
*   **Instalación de Node.js:** Se instaló y verificó la versión LTS de Node.js (v24.15.0) necesaria para gestionar los paquetes del frontend.
*   **Configuración de Terminal:** Se resolvieron restricciones de seguridad nativas en Windows PowerShell modificando las políticas de ejecución (`Set-ExecutionPolicy RemoteSigned`) para permitir correr los scripts de inicialización de React.

### Hito 2: Inicialización del Frontend
*   Se generó la estructura base del proyecto utilizando la herramienta de construcción Vite junto con el template de React.
*   Se levantó con éxito el servidor de desarrollo local (`localhost:5173`).

### Hito 3: Preparación del Lienzo e Instalación de Dependencias
*   **Limpieza de Componentes:** Se purgó el código de ejemplo autogenerado en `App.jsx` para establecer una estructura limpia y modular ("Plataforma de Auditoría de Código").
*   **Incorporación del Motor de Edición:** Se instaló la dependencia `@monaco-editor/react`, la cual proveerá el motor visual (el mismo que utiliza Visual Studio Code) para cumplir con el requerimiento de resaltado de sintaxis en el navegador.

