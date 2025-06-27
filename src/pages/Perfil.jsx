import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const role = localStorage.getItem('role');
        let id;
        let endpoint;

        if (role === 'admin') {
          id = localStorage.getItem('administradorId');
          endpoint = `/api/administradores/${id}`;
        } else if (role === 'usuario') {
          id = localStorage.getItem('usuarioId');
          endpoint = `/api/usuarios/${id}`;
        } else {
          setError('Usuário não autenticado ou função desconhecida.');
          setLoading(false);
          return;
        }

        if (!id) {
          setError('ID do usuário não encontrado no localStorage. Por favor, faça login novamente.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await api.get(endpoint);
        setUserData(response);
        setFormData({
          nome: response.nome,
          email: response.email,
          senhaAtual: '',
          novaSenha: '',
          confirmarNovaSenha: '',
        });
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError(`Erro ao carregar dados do perfil: ${err.message || 'Erro desconhecido.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.novaSenha && formData.novaSenha !== formData.confirmarNovaSenha) {
      setError('A nova senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      const role = localStorage.getItem('role');
      let id;
      let endpoint;

      if (role === 'admin') {
        id = localStorage.getItem('administradorId');
        endpoint = `/api/administradores/${id}`;
      } else if (role === 'usuario') {
        id = localStorage.getItem('usuarioId');
        endpoint = `/api/usuarios/${id}`;
      }

      const updatePayload = {
        nome: formData.nome,
        email: formData.email,
      };

      if (formData.novaSenha) {
        updatePayload.senha = formData.novaSenha;
      }



      const response = await api.put(endpoint, updatePayload);
      setUserData(response); 
      setSuccessMessage('Perfil atualizado com sucesso!');
      setFormData(prev => ({ ...prev, senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' }));

    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError(`Erro ao atualizar perfil: ${err.message || 'Erro desconhecido.'}`);
    }
  };

  if (loading) {
    return <Container className="mt-5">Carregando perfil...</Container>;
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Meu Perfil</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      {userData && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Dados Atuais</Card.Title>
            <p><strong>Nome:</strong> {userData.nome}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Tipo de Usuário:</strong> {localStorage.getItem('role') === 'admin' ? 'Administrador' : 'Usuário Comum'}</p>
          </Card.Body>
        </Card>
      )}

      <Form onSubmit={handleSubmit}>
        <h3 className="mb-3">Atualizar Dados</h3>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNovaSenha">
          <Form.Label>Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="novaSenha"
            value={formData.novaSenha}
            onChange={handleInputChange}
            placeholder="Deixe em branco para manter a senha atual"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmarNovaSenha">
          <Form.Label>Confirmar Nova Senha</Form.Label>
          <Form.Control
            type="password"
            name="confirmarNovaSenha"
            value={formData.confirmarNovaSenha}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Salvar Alterações
        </Button>
      </Form>
    </Container>
  );
}

export default Perfil;