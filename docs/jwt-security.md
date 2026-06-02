\# Autenticación JWT en Spring Boot



\## Componentes implementados



| Clase | Responsabilidad |

|-------|----------------|

| `JwtUtil` | Generación, validación y extracción de claims de tokens JWT. |

| `JwtRequestFilter` | Intercepta cada request, extrae el token del header y autentica al usuario. |

| `SecurityConfig` | Configura Spring Security: deshabilita CSRF, define rutas públicas, agrega el filtro JWT. |

| `AuthController` | Endpoints `/register` y `/login`. |



\## Flujo de registro

1\. Cliente POST `/api/auth/register` con username, email, password.

2\. Servicio registra usuario (encripta password).

3\. Genera JWT y lo retorna.



\## Flujo de login

1\. Cliente POST `/api/auth/login` con username y password.

2\. `AuthenticationManager` valida credenciales.

3\. Genera JWT y lo retorna.



\## Protección de rutas

\- Cualquier otra ruta (ej. `/api/audit`) requiere header: `Authorization: Bearer <token>`.



\## Fecha de implementación: 2026-04-24

