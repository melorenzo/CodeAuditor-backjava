\# Estructura de paquetes del Backend Java



Este documento describe la organización de paquetes dentro del microservicio Spring Boot.



\## Ubicación base

`backend-java/src/main/java/com/auditoria/`



\## Paquetes y responsabilidad



| Paquete       | Propósito                                                                 |

|---------------|---------------------------------------------------------------------------|

| `config`      | Clases de configuración (Security, JWT, CORS, etc.)                      |

| `controller`  | Controladores REST que exponen los endpoints públicos                    |

| `dto`         | Objetos de transferencia de datos (LoginRequest, RegisterRequest, AuthResponse) |

| `entity`      | Entidades JPA que mapean las tablas de la base de datos relacional        |

| `repository`  | Interfaces que extienden JpaRepository para operaciones CRUD             |

| `service`     | Lógica de negocio (registro, login, validaciones, encriptación)          |



\## Por qué esta organización

Seguimos el patrón de arquitectura por capas (controlador → servicio → repositorio), común en Spring Boot. Permite separar responsabilidades y facilita el testing.



\## Fecha de creación

2026-04-24 (generada mediante script `setup\_java\_structure.bat`)

