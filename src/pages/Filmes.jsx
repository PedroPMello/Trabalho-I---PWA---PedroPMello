import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from '../api';

function Filmes() {
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);

const handleShow = (filme) => {
  setFilmeSelecionado(filme);
  setShowModal(true);
};

const handleClose = () => {
  setShowModal(false);
  setFilmeSelecionado(null);
};

useEffect(() => {
  const carregarFilmes = async () => {
    try {
      const data = await api.get('/api/filmes');
      setFilmes(data);
    } catch (error) {
      setErro(error.message);
    }
  };

  carregarFilmes();
}, []);

  if (erro) {
    return <Container><p>{erro}</p></Container>;
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">Filmes em Destaque</h1>
      <Row>
        {filmes.map((filme) => (
          <Col key={filme.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{filme.titulo}</Card.Title>
                <Card.Text>{filme.descricao}</Card.Text>
                <Button variant="primary" onClick={() => handleShow(filme)}>Ver detalhes</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#2f4f4f', color: 'white' }}>
          <Modal.Title>{filmeSelecionado?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#808080' }}>
          <section>
            <h5>Sinopse</h5>
            <p>{filmeSelecionado?.sinopse || 'Sinopse não informada.'}</p>
          </section>

          <hr />

          <section>
            <h5>Ano</h5>
            <p>{filmeSelecionado?.ano || 'Ano não informado.'}</p>
          </section>

          <hr />

          <section>
            <h5>Gênero</h5>
            <p>{filmeSelecionado?.genero || 'Gênero não informado.'}</p>
          </section>

          <hr />

          <section>
            <h5>Elenco</h5>
            {filmeSelecionado?.elenco ? (
              <p>{filmeSelecionado.elenco}</p>
            ) : (
              <p>Elenco não informado.</p>
            )}
          </section>

          <hr />

          <section>
            <h5>Plataforma</h5>
            <p>{filmeSelecionado?.plataforma || 'Plataforma não informada.'}</p>
          </section>

        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#2f4f4f' }}>
          <Button variant="light" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Filmes;