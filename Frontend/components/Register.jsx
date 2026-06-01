import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            await register(username, email, password);
            navigate('/');
        } catch (err) {
            setError('El usuario o email ya existen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #111827 40%, #020617 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                backgroundColor: '#242424',
                padding: '40px',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '420px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                border: '1px solid #333'
            }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{
                        color: '#fff',
                        margin: '0 0 8px 0',
                        fontSize: '28px',
                        fontWeight: 'bold'
                    }}>
                        Crear Cuenta
                    </h1>

                    <p style={{
                        color: '#888',
                        margin: 0,
                        fontSize: '14px'
                    }}>
                        Registrate para comenzar
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        backgroundColor: 'rgba(220, 53, 69, 0.15)',
                        border: '1px solid rgba(220, 53, 69, 0.4)',
                        color: '#ff6b7a',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Usuario */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '14px',
                            marginBottom: '8px',
                            fontWeight: '500'
                        }}>
                            Usuario
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Elegí un usuario"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                backgroundColor: '#333',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '14px',
                            marginBottom: '8px',
                            fontWeight: '500'
                        }}>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="tuemail@ejemplo.com"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                backgroundColor: '#333',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '28px' }}>
                        <label style={{
                            display: 'block',
                            color: '#ccc',
                            fontSize: '14px',
                            marginBottom: '8px',
                            fontWeight: '500'
                        }}>
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Elegí una contraseña"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                backgroundColor: '#333',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Botón */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '13px',
                            backgroundColor: loading ? '#0a58ca' : '#0d6efd',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.8 : 1
                        }}
                    >
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                {/* Footer */}
                <p style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    color: '#888',
                    fontSize: '14px'
                }}>
                    ¿Ya tenés cuenta?{' '}
                    <Link
                        to="/login"
                        style={{
                            color: '#0d6efd',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Iniciá sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;