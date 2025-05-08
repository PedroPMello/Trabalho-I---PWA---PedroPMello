import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  const loginData = { email, senha };

  try {
    const data = await api.post('/api/login', loginData);

    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);

    if (data.role === 'admin') {
      localStorage.setItem('administradorId', data.administradorId);
    } else {
      localStorage.setItem('usuarioId', data.usuarioId);
    }

    navigate('/filmes');
  } catch (error) {
    setErro(error.message || 'Erro ao tentar realizar login');
  }
};

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>

        <Form.Group controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </Form>

      {erro && <Alert variant="danger">{erro}</Alert>}
    </Container>
  );
}

export default Login;