import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Navbar';
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import AdmScreen from './pages/AdmScreen';
import Perfil from './pages/Perfil';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#2F4F4F', minHeight: '100vh', color: 'white' }}> 
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route path="/filmes" element={
            <ProtectedRoute>
              <Filmes />
            </ProtectedRoute>
          } />
          
          <Route path="/perfil" element={
            <ProtectedRoute> 
              <Perfil />
            </ProtectedRoute>
          } />

          <Route path="/admin/filmes" element={
            <ProtectedRoute requiredRole="admin">
              <AdmScreen />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;