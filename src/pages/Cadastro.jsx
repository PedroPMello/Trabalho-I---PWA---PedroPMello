import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!nome || !email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha })
      });
  
      const responseBody = await response.text();
  
      if (!response.ok) {
        console.error('Erro do servidor:', responseBody);
        throw new Error('Erro ao registrar usuário.');
      }
  
      console.log('Cadastro realizado com sucesso:', responseBody);
      setSucesso('Cadastro realizado com sucesso!');
      setErro('');
  
      setTimeout(() => {
        navigate('/login');
      }, 2000);
  
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErro('Erro ao cadastrar usuário.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Registrar</h2>

      {erro && <Alert variant="danger">{erro}</Alert>}
      {sucesso && <Alert variant="success">{sucesso}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSenha">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
}

export default Cadastro;