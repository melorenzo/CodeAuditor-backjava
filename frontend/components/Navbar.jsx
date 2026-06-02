import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
            <h2>Code Auditor</h2>
            <div>
                {user ? (
                    <>
                        <span>Hola, {user.username}</span>
                        <button onClick={logout} style={{ marginLeft: 10, padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 4 }}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: 10 }}>Iniciar sesión</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;