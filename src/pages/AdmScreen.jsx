import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import api from '../api';

function AdmScreen() {
  const [filmes, setFilmes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    titulo: '',
    sinopse: '',
    ano: '',
    genero: '',
    elenco: '',
    plataforma: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchFilmes = () => {
    api.get('/api/filmes')
      .then((data) => setFilmes(data))
      .catch((error) => console.error('Erro ao carregar filmes', error));
  };

  const handleShowModal = (filme = null) => {
    if (filme) {
      setFormData({ ...filme });
      setIsEditMode(true);
    } else {
      setFormData({
        id: '',
        titulo: '',
        sinopse: '',
        ano: '',
        genero: '',
        elenco: '',
        plataforma: ''
      });
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveFilme = async () => {
    const administradorId = localStorage.getItem('administradorId');
    const dataToSend = {
      ...formData,
      ano: Number(formData.ano),
      administrador_id: Number(administradorId),
    };
    try {
      if (!isEditMode) {
        delete dataToSend.id;
        await api.post('/api/filmes', dataToSend);
      } else {
        await api.put(`/api/filmes/${formData.id}`, dataToSend);
      }
      fetchFilmes();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
    }
  };

  const handleDeleteFilme = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este filme?')) {
      api.delete(`/api/filmes/${id}`)
        .then(() => fetchFilmes())
        .catch((error) => console.error('Erro ao deletar filme:', error));
    }
  };

  useEffect(() => {
    fetchFilmes();
  }, []);

  return (
    <Container className="my-4">
      <h1 className="mb-4">Administração de Filmes</h1>

      <Button variant="success" onClick={() => handleShowModal()}>
        Adicionar Filme
      </Button>

      <Row className="mt-4">
        {filmes.map((filme) => (
          <Col key={filme.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{filme.titulo}</Card.Title>
                <Card.Text>{filme.sinopse}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(filme)}>
                  Editar
                </Button>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleDeleteFilme(filme.id)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Editar Filme' : 'Adicionar Filme'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="titulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Título do filme"
              />
            </Form.Group>

            <Form.Group controlId="sinopse">
              <Form.Label>Sinopse</Form.Label>
              <Form.Control
                type="text"
                name="sinopse"
                value={formData.sinopse}
                onChange={handleInputChange}
                placeholder="Sinopse do filme"
              />
            </Form.Group>

            <Form.Group controlId="ano">
              <Form.Label>Ano</Form.Label>
              <Form.Control
                type="number"
                name="ano"
                value={formData.ano}
                onChange={handleInputChange}
                placeholder="Ano de lançamento"
              />
            </Form.Group>

            <Form.Group controlId="genero">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                placeholder="Gênero do filme"
              />
            </Form.Group>

            <Form.Group controlId="elenco">
              <Form.Label>Elenco</Form.Label>
              <Form.Control
                type="text"
                name="elenco"
                value={formData.elenco}
                onChange={handleInputChange}
                placeholder="Elenco do filme"
              />
            </Form.Group>

            <Form.Group controlId="plataforma">
              <Form.Label>Plataforma</Form.Label>
              <Form.Control
                type="text"
                name="plataforma"
                value={formData.plataforma}
                onChange={handleInputChange}
                placeholder="Plataforma onde o filme está disponível"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSaveFilme}>
            {isEditMode ? 'Salvar Alterações' : 'Adicionar Filme'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdmScreen;