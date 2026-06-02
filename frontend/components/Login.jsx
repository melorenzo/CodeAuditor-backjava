import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#1a1a1a',
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
                maxWidth: '400px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                border: '1px solid #333'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ color: '#ffffff', margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>
                        Code Auditor
                    </h1>
                    <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
                        Iniciá sesión para continuar
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

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                            Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Tu nombre de usuario"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                backgroundColor: '#333',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={e => e.target.style.borderColor = '#0d6efd'}
                            onBlur={e => e.target.style.borderColor = '#444'}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Tu contraseña"
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                backgroundColor: '#333',
                                border: '1px solid #444',
                                borderRadius: '6px',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box',
                            }}
                            onFocus={e => e.target.style.borderColor = '#0d6efd'}
                            onBlur={e => e.target.style.borderColor = '#444'}
                        />
                    </div>

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
                            opacity: loading ? 0.8 : 1,
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                {/* Footer */}
                <p style={{ textAlign: 'center', marginTop: '24px', color: '#888', fontSize: '14px' }}>
                    ¿No tenés cuenta?{' '}
                    <Link to="/register" style={{ color: '#0d6efd', textDecoration: 'none', fontWeight: '500' }}>
                        Registrate
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
