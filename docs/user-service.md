\# UserService - Lógica de autenticación y gestión de usuarios



\## Responsabilidades

\- Registro de nuevos usuarios con encriptación de contraseña (BCrypt).

\- Autenticación de usuarios (verificación de credenciales).

\- Integración con Spring Security mediante `UserDetailsService`.

\- Búsqueda de usuarios por ID (para asociar auditorías).



\## Métodos principales



| Método                     | Descripción                                                                 |

|----------------------------|-----------------------------------------------------------------------------|

| `register(...)`            | Crea un nuevo usuario si el username y email son únicos. Retorna el `User` persistido. |

| `authenticate(...)`        | Verifica credenciales. Si son correctas, retorna el `User` autenticado.     |

| `loadUserByUsername(...)`  | Requerido por Spring Security para cargar el usuario durante la autenticación JWT. |

| `findById(...)`            | Busca un usuario por su ID, útil para asociar auditorías.                   |



\## Encriptación de contraseñas

Se usa `BCryptPasswordEncoder` (algoritmo de hash con salt). Las contraseñas nunca se guardan en texto plano.



\## Manejo de errores

\- Si username o email ya existen: lanza `RuntimeException` (luego el controlador devolverá 400).

\- Si usuario no existe o contraseña inválida: lanza `RuntimeException`.



\## Integración con JWT

El método `authenticate` solo verifica credenciales; la generación del token se hará en `JwtUtil` y el controlador llamará a ambos.



\## Fecha de creación: 2026-04-24

