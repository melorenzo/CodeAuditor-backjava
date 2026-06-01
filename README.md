# Backend Java - Microservicio de Gestión y Persistencia

Este es el **Microservicio de Gestión y Persistencia** de la Plataforma de Auditoría de Código, diseñado bajo el framework **Spring Boot** de Java. Actúa como el **orquestador central** de todo el ecosistema de la aplicación.

---

## 1. Finalidad del Microservicio

La finalidad principal de este componente es coordinar los flujos de negocio, administrar la identidad y seguridad de los usuarios, y dar persistencia al historial de auditorías. Es el punto de unión y control del sistema, garantizando que el análisis de código sea seguro, estructurado y auditable.

---

## 2. Relación con los demás Componentes

Este backend de Java no trabaja solo; funciona como el puente de orquestación central:

```
                  ┌─────────────────────────┐
                  │   Frontend (React/Vite) │
                  └────────────┬────────────┘
                               │
                Peticiones API │ (HTTP + JWT)
                               ▼
  ┌────────────────────────────────────────────────────────┐
  │         Backend Java (Spring Boot Orchestrator)        │
  │  - Valida seguridad JWT                                │
  │  - Registra solicitudes en PostgreSQL                  │
  └────────────┬─────────────────────────────▲─────────────┘
               │                             │
 Petición POST │ (JSON síncrono)             │ Retorna reporte
   /analyze    │                             │ final formateado
               ▼                             │
  ┌──────────────────────────────────────────┴─────────────┐
  │          Backend Python (FastAPI / IA Agent)           │
  │  - Integra Groq Cloud (Llama-3.3-70b-versatile)        │
  └────────────────────────────────────────────────────────┘
```

*   **Relación con el Frontend (React.js)**: Expone los endpoints públicos para registro (`/api/auth/register`) y login (`/api/auth/login`), y el endpoint protegido (`/api/audit`) para enviar código. Está configurado detrás del proxy inverso de Nginx para compartir dominio y evitar problemas de CORS.
*   **Relación con el Backend Python (FastAPI)**: Actúa como cliente. Cuando el frontend solicita una auditoría, el backend de Java intercepta la petición, valida la firma del token JWT, guarda el registro de la solicitud en su propia base de datos relacional y hace una llamada síncrona HTTP POST (`/analyze`) al microservicio de Python para obtener la respuesta detallada de la IA.

---

## 3. Tecnologías Utilizadas

*   **Java 17 (LTS)**: Lenguaje y plataforma base.
*   **Spring Boot 3.2.2**: Framework ágil para desarrollo rápido de microservicios.
*   **Spring Security & JWT (JSON Web Tokens)**: Implementación de seguridad sin estado (stateless) para restringir el acceso a rutas confidenciales.
*   **Spring Data JPA / Hibernate**: Mapeo objeto-relacional (ORM) para la base de datos de manera automatizada.
*   **Spring WebFlux (WebClient)**: Cliente HTTP reactivo utilizado para realizar llamadas eficientes al backend de Python.
*   **H2 Database**: Base de datos SQL en memoria utilizada por defecto para desarrollo ágil sin dependencias de instalación.
*   **PostgreSQL 16**: Base de datos relacional robusta en producción.

---

## 4. Funcionalidades Principales

El microservicio provee dos grandes funcionalidades:

### A. Autenticación y Gestión de Usuarios
*   **Registro Seguro**: Registro de nuevos programadores validando que el correo y el nombre de usuario sean únicos. Las contraseñas se almacenan encriptadas criptográficamente con el algoritmo de hash adaptativo **BCrypt** (`BCryptPasswordEncoder`).
*   **Inicio de Sesión y Emisión de JWT**: Autenticación de credenciales y generación de un token JWT firmado de 24 horas de validez para que el frontend pueda realizar peticiones autorizadas en las rutas privadas.

### B. Orquestación y Persistencia de Auditorías
*   **Recepción y Registro de Auditoría**: Recibe el fragmento de código de cualquier lenguaje (Python, Java, JavaScript) enviado por el usuario, valida su token JWT, y lo almacena de forma persistente en la tabla `audit_records` vinculándolo al nombre del usuario.
*   **Delegación a la IA**: Utiliza `WebClient` para enviar la solicitud al microservicio de Python, recupera el análisis detallado (severidad, explicación pedagógica, código mejorado y tips de Clean Code) y lo entrega perfectamente estructurado al frontend.
*   **Historial de Consultas**: Expone un endpoint seguro (`/api/audit/history`) para listar ordenadamente los análisis de código previos que ha realizado el programador conectado.

---

## 5. Cómo levantar el proyecto paso a paso

### Opción A: Con Docker (Recomendado)
Es la manera más rápida ya que Docker se encarga de levantar PostgreSQL, el backend de Python y el frontend en un entorno integrado.

1.  Asegúrate de estar en la **raíz del proyecto** (donde está el archivo `docker-compose.yml`).
2.  Levanta los contenedores con compilación limpia:
    ```bash
    docker compose up -d --build
    ```
3.  El microservicio de Java se compilará usando un *Multi-Stage Build* y estará escuchando peticiones en:
    *   **`http://localhost:8080`**

---

### Opción B: Sin Docker (Local / Nativo)
Si deseas ejecutarlo directamente en tu máquina local para depurar paso a paso (debugging).

#### Requisitos Previos:
*   **JDK 17** instalado localmente.
*   **Maven 3.9+** (o puedes usar el wrapper `./mvnw` incluido).
*   *Opcional*: Base de datos **PostgreSQL** corriendo en tu máquina en el puerto `5432` con usuario/contraseña `postgres`/`postgres`.

#### Pasos:

1.  **Configuración de Base de Datos**:
    *   Por defecto, el proyecto está configurado en `src/main/resources/application.properties` para utilizar una base de datos **H2 en memoria** (no necesitas instalar nada).
    *   Si quieres usar **PostgreSQL local**, abre `application.properties` y asegúrate de configurar las credenciales correctas:
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/auditoria_db
        spring.datasource.username=tu_usuario
        spring.datasource.password=tu_contraseña
        ```

2.  **Entrar al directorio del backend Java**:
    ```bash
    cd backend-java
    ```

3.  **Compilar y empaquetar el proyecto**:
    ```bash
    ./mvnw clean package -DskipTests
    ```
    *(Usa `mvnw.cmd` si estás en CMD tradicional de Windows).*

4.  **Ejecutar la aplicación**:
    ```bash
    ./mvnw spring-boot:run
    ```

5.  El servidor Spring Boot arrancará exitosamente y estará disponible en:
    *   **`http://localhost:8080`**
    *   Puedes consultar la consola de H2 local en: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:auditoria_db`).
