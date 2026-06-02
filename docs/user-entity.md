\# Entidad User (JPA)



\## Propósito

Representa el usuario registrado en la plataforma. Se almacena en la tabla `usuarios` de PostgreSQL.



\## Anotaciones utilizadas



| Anotación                | Explicación                                                                 |

|--------------------------|-----------------------------------------------------------------------------|

| `@Entity`                | Indica que es una entidad JPA                                              |

| `@Table(name = "usuarios")` | Nombre de la tabla en la base de datos (por defecto sería `user`)        |

| `@Id`                    | Clave primaria                                                             |

| `@GeneratedValue(strategy = IDENTITY)` | Auto-incremental (serial)                                |

| `@NotBlank`              | Validación: no nulo ni vacío                                                |

| `@Email`                 | Validación de formato de email                                              |

| `@Column`                | Detalles de la columna (único, no nulo, etc.)                               |



\## Campos



| Campo       | Tipo             | Restricciones                         |

|-------------|------------------|---------------------------------------|

| id          | Long             | PK, autogenerado                      |

| username    | String           | único, no nulo                        |

| email       | String           | único, no nulo, formato email         |

| password    | String           | no nulo (se guardará encriptado)      |

| createdAt   | LocalDateTime    | se asigna automáticamente al crear    |



\## Métodos destacados

\- Constructor con username, email, password (inicializa `createdAt`).

\- Getters y setters estándar (necesarios para JPA y serialización JSON).



\## Relaciones actuales

Ninguna todavía. En el futuro, una auditoría tendrá una relación @ManyToOne con User.



\## Fecha de creación

2026-04-24

