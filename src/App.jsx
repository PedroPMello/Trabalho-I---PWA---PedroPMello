import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Filmes from './pages/Filmes';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Navbar'; 
import Cadastro from './pages/Cadastro';
import AdmScreen from './pages/AdmScreen';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route
              path="/admin/filmes"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdmScreen />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/filmes" 
              element={
                <ProtectedRoute>
                  <Filmes />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;