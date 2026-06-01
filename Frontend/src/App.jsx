import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth, AuthProvider } from './context/AuthContext';
import { analyzeCode, getHistory } from './services/auditService';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

function AppContent() {
  const { user, loading, logout } = useAuth();  // 👈 agregamos logout
  const [codigo, setCodigo] = useState('# Escribí o pegá tu código acá...');
  const [lenguaje, setLenguaje] = useState('python');
  const [resultados, setResultados] = useState(null);
  const [analizando, setAnalizando] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [historial, setHistorial] = useState([]);

  const cargarHistorial = async () => {
    if (!user) return;
    try {
      const data = await getHistory();
      setHistorial(data);
    } catch (error) {
      console.error('Error cargando historial:', error);
    }
  };

  useEffect(() => {
    if (user) cargarHistorial();
  }, [user]);

  const handleAnalizar = async () => {
    setAnalizando(true);
    setResultados(null);
    try {
      const resultado = await analyzeCode(codigo, lenguaje);
      const hallazgos = [];
      if (resultado.vulnerabilities?.length) {
        hallazgos.push({
          tipo: resultado.severity === 'Crítico' ? 'Crítico' :
            (resultado.severity === 'Advertencia' ? 'Advertencia' : 'Sugerencia'),
          mensaje: `Vulnerabilidades: ${resultado.vulnerabilities.join(', ')}`
        });
      }
      if (resultado.explanation) {
        hallazgos.push({ tipo: 'Explicación', mensaje: resultado.explanation });
      }
      if (resultado.cleanCodeTips?.length) {
        hallazgos.push({ tipo: 'Sugerencia', mensaje: `Tips: ${resultado.cleanCodeTips.join(', ')}` });
      }
      if (resultado.refactoredCode) {
        hallazgos.push({ tipo: 'Código Refactorizado', mensaje: resultado.refactoredCode });
      }
      setResultados(hallazgos);
      await cargarHistorial();
    } catch (error) {
      console.error(error);
      setResultados([{ tipo: 'Error', mensaje: 'No se pudo conectar con el servidor' }]);
    } finally {
      setAnalizando(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // Usuario logueado: vista principal
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0 }}>Plataforma de Auditoría de Código</h1>

        {/* 👇 Botones del header */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#6c757d', fontSize: '14px' }}>Hola, {user.username}</span>
          <button
            onClick={() => setMostrarHistorial(true)}
            style={{ padding: '10px 20px', fontSize: '15px', fontWeight: 'bold', backgroundColor: '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Ver Historial
          </button>
          <button
            onClick={logout}
            style={{ padding: '10px 20px', fontSize: '15px', fontWeight: 'bold', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <p>Ingresá tu algoritmo a continuación para iniciar el análisis:</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <label>Lenguaje: </label>
        <select value={lenguaje} onChange={(e) => setLenguaje(e.target.value)}>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden', marginTop: '10px' }}>
        <Editor
          height="45vh"
          language={lenguaje}
          value={codigo}
          onChange={(value) => setCodigo(value)}
          theme="vs-dark"
        />
      </div>

      <button
        onClick={handleAnalizar}
        disabled={analizando}
        style={{ marginTop: '20px', padding: '12px 24px', fontSize: '16px', fontWeight: 'bold', backgroundColor: analizando ? '#6c757d' : '#0d6efd', color: 'white', border: 'none', borderRadius: '6px', cursor: analizando ? 'not-allowed' : 'pointer' }}
      >
        {analizando ? 'Analizando código...' : 'Ejecutar Auditoría'}
      </button>

      {resultados && (
        <div style={{ marginTop: '30px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
          <h2>Reporte de Análisis</h2>
          {resultados.map((hallazgo, index) => {
            let colorBorde = '#0dcaf0';
            if (hallazgo.tipo === 'Crítico') colorBorde = '#dc3545';
            if (hallazgo.tipo === 'Advertencia') colorBorde = '#ffc107';
            return (
              <div key={index} style={{ padding: '15px', marginBottom: '15px', borderRadius: '6px', borderLeft: `6px solid ${colorBorde}`, backgroundColor: '#f8f9fa', color: '#212529' }}>
                <strong style={{ color: colorBorde }}>{hallazgo.tipo}: </strong>
                {hallazgo.mensaje}
              </div>
            );
          })}
        </div>
      )}

      {mostrarHistorial && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#242424', color: 'white', padding: '30px', borderRadius: '10px', width: '80%', maxWidth: '700px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0 }}>Historial de Análisis</h2>
              <button onClick={() => setMostrarHistorial(false)} style={{ background: 'none', border: 'none', color: '#dc3545', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>X</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '400px', overflowY: 'auto' }}>
              {historial.length === 0 && <p>No hay análisis previos.</p>}
              {historial.map((item) => (
                <div key={item.id} style={{ padding: '15px', backgroundColor: '#333', borderRadius: '6px' }}>
                  <div><strong>Fecha:</strong> {new Date(item.createdAt).toLocaleString()}</div>
                  <div><strong>Lenguaje:</strong> {item.language}</div>
                  <div><strong>Código:</strong> <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{item.code.substring(0, 100)}...</pre></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
